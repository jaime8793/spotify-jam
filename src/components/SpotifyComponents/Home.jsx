import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { LogsIcon } from "lucide-react";
import SpotifyWebApi from "spotify-web-api-js";
import { Skeleton } from "../ui/skeleton";
import AlbumArtWork from "./AlbumArtwork";

const spotifyApi = new SpotifyWebApi();

function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

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
        setAccessToken(response.data.accessToken);
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
      //(data) => console.log("User playlists:", data),
      (data) => setSpotifyData(data),
      (err) => console.error("Error fetching playlists:", err)
    );
  }

  return (
    <>
      <div>This is the home component</div>
      <div className="flex flex-col">
        <div>
          <h1>Spotify Integration</h1>
          <Button onClick={getAuthentiation}>
            <LogsIcon />
            Authenticate with Spotify
          </Button>
          <Button onClick={getSessionData}>
            <LogsIcon />
            Fetch Access Token
          </Button>
          <Button onClick={getUserData}>
            <LogsIcon />
            Fetch User Playlists
          </Button>
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {spotifyData ? (
           <p>Playlist Got</p>
          ) : (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          )}
          {spotifyData ? (
            <>
              <p>This is the artwork</p>
              <AlbumArtWork playlists={spotifyData.items} accessToken={accessToken} />
            </>
          ) : (
            `we will get it`
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
