import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { AudioLines, Disc3 } from "lucide-react";

function SpotifyStats({ spotifyApi, accessToken }) {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      fetchSpotifyStats();
    }
  }, [accessToken]);

  const fetchSpotifyStats = async () => {
    setIsLoading(true);
    try {
      // Fetch top artists
      const artistsResponse = await spotifyApi.getMyTopArtists({
        limit: 10,
        time_range: "medium_term",
      });
      setTopArtists(artistsResponse.items);

      // Fetch top tracks
      const tracksResponse = await spotifyApi.getMyTopTracks({
        limit: 10,
        time_range: "medium_term",
      });
      setTopTracks(tracksResponse.items);
    } catch (err) {
      console.error("Error fetching Spotify stats:", err);
      setError("Could not fetch Spotify statistics");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatCard = (title, items, renderItem) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title === "Top Artists" ? <Disc3 /> : <AudioLines />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          {items.map((item, index) => renderItem(item, index))}
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderArtistItem = (artist, index) => (
    <div
      key={artist.id}
      className="flex items-center space-x-4 p-2 hover:bg-gray-100"
    >
      <img
        src={artist.images[0]?.url || "/placeholder-artist.png"}
        alt={artist.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold">{artist.name}</p>
        <Badge variant="secondary">{index + 1}</Badge>
      </div>
    </div>
  );

  const renderTrackItem = (track, index) => (
    <div
      key={track.id}
      className="flex items-center space-x-4 p-2 hover:bg-gray-100"
    >
      <img
        src={track.album.images[0]?.url || "/placeholder-track.png"}
        alt={track.name}
        className="w-12 h-12 rounded"
      />
      <div>
        <p className="font-semibold">{track.name}</p>
        <p className="text-sm text-gray-500">{track.artists[0].name}</p>
        <Badge variant="secondary">{index + 1}</Badge>
      </div>
    </div>
  );

  if (isLoading) return <div>Loading Spotify stats...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="artists" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="artists">Top Artists</TabsTrigger>
          <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
        </TabsList>
        <TabsContent value="artists">
          {renderStatCard("Top Artists", topArtists, renderArtistItem)}
        </TabsContent>
        <TabsContent value="tracks">
          {renderStatCard("Top Tracks", topTracks, renderTrackItem)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SpotifyStats;
