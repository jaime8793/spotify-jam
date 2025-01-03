import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { LogsIcon } from "lucide-react";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyStats from "./spotifyStatsDashbord"; // Import the new component

const spotifyApi = new SpotifyWebApi();

function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  function onTokenRefresh() {
    if (!accessToken) {
      console.error("Access token is missing. Cannot refresh token.");
      return;
    }

    axios
      .post("http://localhost:3003/api/refresh-token", {
        refresh_token: "your-refresh-token",
      })
      .then((response) => {
        const { access_token } = response.data;
        spotifyApi.setAccessToken(access_token); // Update Spotify API instance
        setAccessToken(access_token); // Update state
        console.log("Token refreshed successfully");
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
      });
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Spotify Integration</h1>

        {/* Authentication Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              window.location.href = "http://localhost:3003/api/auth/spotify";
            }}
          >
            <LogsIcon className="mr-2" />
            Authenticate with Spotify
          </Button>
          <Button onClick={getSessionData}>
            <LogsIcon className="mr-2" />
            Fetch Access Token
          </Button>
        </div>

        {/* Loading and Error States */}
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Spotify Stats Component - Conditionally Rendered */}
        {isAuthenticated && (
          <SpotifyStats
            spotifyApi={spotifyApi}
            accessToken={accessToken}
            onTokenRefresh={onTokenRefresh}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
