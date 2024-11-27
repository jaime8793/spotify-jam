import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { LogsIcon } from "lucide-react";
import SpotifyWebApi from "spotify-web-api-js";
import AlbumArtWork from "./AlbumArtwork";
import SpotifyStats from "./spotifyStatsDashbord"; // Import the new component

const spotifyApi = new SpotifyWebApi();

function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Existing authentication and data fetching methods remain the same
  function getAuthentiation() {
    axios
      .get("http://localhost:3003/api/auth/spotify", { withCredentials: true })
      .then((response) => {
        getSessionData();
        console.log("Authenticated:", response.data);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
  }

  function getSessionData() {
    setIsLoading(true);
    setError(null);

    axios
      .get("http://localhost:3003/api/session", { withCredentials: true })
      .then((response) => {
        console.log("Session Data", response.data);
        spotifyApi.setAccessToken(response.data.accessToken);
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true); // Add this line to track authentication state
      })
      .catch((error) => {
        console.error("Error accessing access token:", error);
        setError("Failed to fetch session data.");
      })
      .finally(() => setIsLoading(false));
  }

  function getUserData() {
    if (!accessToken) {
      console.error("Access token is missing. Authenticate first.");
      return;
    }

    spotifyApi.getUserPlaylists().then(
      (data) => setSpotifyData(data),
      (err) => console.error("Error fetching playlists:", err)
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Spotify Integration</h1>

        {/* Authentication Buttons */}
        <div className="flex space-x-2">
          <Button onClick={getAuthentiation}>
            <LogsIcon className="mr-2" />
            Authenticate with Spotify
          </Button>
          <Button onClick={getSessionData}>
            <LogsIcon className="mr-2" />
            Fetch Access Token
          </Button>
          <Button onClick={getUserData}>
            <LogsIcon className="mr-2" />
            Fetch User Playlists
          </Button>
        </div>

        {/* Loading and Error States */}
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Spotify Stats Component - Conditionally Rendered */}
        {isAuthenticated && (
          <SpotifyStats spotifyApi={spotifyApi} accessToken={accessToken} />
        )}

        {/* Existing Playlist Rendering */}
        {spotifyData && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
            <AlbumArtWork
              playlists={spotifyData.items}
              accessToken={accessToken}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
