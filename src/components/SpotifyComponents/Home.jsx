import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { LogsIcon } from "lucide-react";
import SpotifyWebApi from "spotify-web-api-js";

function Home() {
  // Fetch data from the backend
  const { userData, setUserData } = useState(null);
  const { accessToken, setAccessToken } = useState("");
  const spotifyApi = new SpotifyWebApi();

  function getAuthentiation() {
    // Trigger Spotify authentication
    axios
      .get("http://localhost:3003/api/auth/spotify") // Include cookies
      .then((response) => {
        console.log("Authenticated:", response.data);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
  }
  function getSessionData() {
    // Trigger Spotify authentication
    axios
      .get("http://localhost:3003/api/session", { withCredentials: true }) // Include cookies
      .then((response) => {
        console.log("Session Data", response.data);
        console.log("Session Data", response.data.accessToken);
        setAccessToken(response.data.accessToken);
        spotifyApi.setAccessToken(response.data.accessToken);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
  }
  // Trigger Spotify Data Exchange
  function getUserData() {
    /*axios
      .get("http://localhost:3003/api/v1/getUserSpotify")
      .then((response) => {
        setUserData(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });*/
    spotifyApi
      .getUserPlaylists() // note that we don't pass a user id
      .then(
        function (data) {
          console.log("User playlists", data);
        },
        function (err) {
          console.error(err);
        }
      );
  }

  return (
    <>
      <div>This is the home component</div>
      <div className="flex flex-col">
        <div>
          <h1>Spotify Integration</h1>
          <a href="http://localhost:3003/api/auth/spotify">
            Authenticate with Spotify
          </a>
          <a href="http://localhost:3003/api/status/spotify">
            Get Access Token
          </a>
          <Button onClick={getAuthentiation}>
            <LogsIcon />
            Get Thy Authentication
          </Button>
          <Button onClick={getUserData}>
            <LogsIcon />
            Get Thy Data
          </Button>
          <Button onClick={getSessionData}>
            <LogsIcon />
            Get Thy Access Session
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
