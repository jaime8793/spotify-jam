import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  // Fetch data from the backend
  useEffect(() => {
    // Trigger Spotify authentication
    axios
      .get("http://localhost:3003/api/auth/spotify", { withCredentials: true }) // Include cookies
      .then((response) => {
        console.log("Authenticated:", response.data);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
  }, []);
  useEffect(() => {
    // Trigger Spotify Data Exchange
    axios
      .get("http://localhost:3003/api/v1/getUserSpotify")
      .then((userData) => {
        console.log("User Got!!!", userData.data);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
  }, []);

  return (
    <>
      <div>This is the home component</div>
      <div className="flex flex-col">
        <div>
          <h1>Spotify Integration</h1>
          <a href="http://localhost:3003/api/auth/spotify">
            Authenticate with Spotify
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
