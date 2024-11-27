import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AudioLines, Disc3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SpotifyStats({ spotifyApi, accessToken, onTokenRefresh }) {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpotifyStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Top Artists
      const artistsResponse = await spotifyApi.getMyTopArtists({
        limit: 30,
        time_range: "medium_term",
      });
      setTopArtists(artistsResponse.items);

      // Top Tracks with Audio Features
      const tracksResponse = await spotifyApi.getMyTopTracks({
        limit: 30,
        time_range: "medium_term",
      });
      const tracks = tracksResponse.items;
      setTopTracks(tracks);

      // Fetch Audio Features
      const trackIds = tracks.map((track) => track.id);
      const featuresResponse = await spotifyApi.getAudioFeaturesForTracks(
        trackIds
      );
      const processedFeatures = featuresResponse.audio_features.map(
        (feature, index) => ({
          name: tracks[index].name,
          danceability: feature.danceability * 100,
          energy: feature.energy * 100,
          valence: feature.valence * 100,
        })
      );
      setAudioFeatures(processedFeatures);
    } catch (err) {
      console.error("Spotify Stats Error:", err);

      // Specific error handling
      if (err.status === 401) {
        // Token expired
        setError({
          type: "token_expired",
          message: "Access token has expired. Please refresh.",
        });
      } else {
        setError({
          type: "fetch_error",
          message: err.message || "Failed to fetch Spotify statistics",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      fetchSpotifyStats();
    }
  }, [accessToken]);

  const handleTokenRefresh = () => {
    if (onTokenRefresh) {
      onTokenRefresh();
    }
  };

  const renderErrorAlert = () => {
    if (!error) return null;

    return (
      <Alert variant="destructive">
        <AlertTitle>
          {error.type === "token_expired" ? "Token Expired" : "Error"}
        </AlertTitle>
        <AlertDescription>
          {error.message}
          {error.type === "token_expired" && (
            <Button onClick={handleTokenRefresh} className="ml-2" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Token
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  };

  const AudioFeaturesChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={audioFeatures}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="danceability" fill="#8884d8" name="Danceability" />
        <Bar dataKey="energy" fill="#82ca9d" name="Energy" />
        <Bar dataKey="valence" fill="#ffc658" name="Valence" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="space-y-4">
      {renderErrorAlert()}

      <Tabs defaultValue="artists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="artists">Top Artists</TabsTrigger>
          <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
          <TabsTrigger value="features">Track Features</TabsTrigger>
        </TabsList>

        <TabsContent value="artists">
          {/* Artists List */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topArtists.map((artist) => (
              <div
                key={artist.id}
                className="group text-center transition-transform transform hover:scale-105 hover:shadow-lg bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-spotify-green aspect-square"
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <p className="mt-2 p-2 font-medium text-gray-800 group-hover:text-spotify-green">
                    {artist.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tracks">
          {/* Tracks List */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topTracks.map((track) => (
              <div
                key={track.id}
                className="group text-center transition-transform transform hover:scale-105 hover:shadow-lg bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-spotify-green aspect-square"
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <p className="font-medium text-gray-800 group-hover:text-spotify-green">
                      {track.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {track.artists[0]?.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features">
          <AudioFeaturesChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SpotifyStats;
