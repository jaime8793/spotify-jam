export const fetchSpotifyData = async (
  spotifyApi,
  timeRange,
  setStateFunctions
) => {
  const { setTopArtists, setTopTracks, setSavedAlbums, setError } =
    setStateFunctions;

  try {
    const [artistsResponse, tracksResponse, albumsResponse] = await Promise.all(
      [
        spotifyApi.getMyTopArtists({ limit: 50, time_range: timeRange }),
        spotifyApi.getMyTopTracks({ limit: 50, time_range: timeRange }),
        spotifyApi.getMySavedAlbums({ limit: 50 }),
      ]
    );

    setTopArtists(artistsResponse.items);
    setTopTracks(tracksResponse.items);
    setSavedAlbums(albumsResponse.items);
  } catch (err) {
    console.error("Spotify API Error:", err);
    setError({ type: "fetch_error", message: "Failed to fetch Spotify data" });
  }
};
