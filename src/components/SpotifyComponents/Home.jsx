import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

function Home() {
  // Fetch data from the backend
  const { userData, setUserData } = useState(null);
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

  // Trigger Spotify Data Exchange
  function getUserData() {
    axios
      .get("http://localhost:3003/api/v1/getUserSpotify")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
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
          <Button onClick={getUserData} />
        </div>
      </div>
    </>
  );
}

export default Home;
