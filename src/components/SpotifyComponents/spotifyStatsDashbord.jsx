import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorAlert from "./ErrorAlert";
import ContentGrid from "./ContentGrid";
import { fetchSpotifyData } from "./utills/spotifyApiHelpers";
const SpotifyStats = ({ spotifyApi, accessToken, onTokenRefresh }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");
  const [activeTab, setActiveTab] = useState("artists");
  // we are so back
  
  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      setIsLoading(true);

      fetchSpotifyData(spotifyApi, selectedTimeRange, {
        setTopArtists,
        setTopTracks,
        setSavedAlbums,
        setError,
      }).finally(() => setIsLoading(false));
    }
  }, [accessToken, selectedTimeRange]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <ErrorAlert error={error} onTokenRefresh={onTokenRefresh} />

      {/* Time Range Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            selectedTimeRange === "short_term"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTimeRange("short_term")}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            selectedTimeRange === "medium_term"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTimeRange("medium_term")}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            selectedTimeRange === "long_term"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTimeRange("long_term")}
        >
          Year
        </button>
      </div>

      {/* Tabs for Artists, Tracks, Albums */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 rounded-md">
          <TabsTrigger value="artists">Top Artists</TabsTrigger>
          <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
          <TabsTrigger value="albums">Top Albums</TabsTrigger>
        </TabsList>

        <TabsContent value="artists">
          <ContentGrid items={topArtists} type="artist" isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="tracks">
          <ContentGrid items={topTracks} type="track" isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="albums">
          <ContentGrid items={savedAlbums} type="album" isLoading={isLoading} />
        </TabsContent>
      </Tabs>
      
    </div>
  );
};

export default SpotifyStats;