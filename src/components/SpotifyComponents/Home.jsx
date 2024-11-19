import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState(null);
  // Fetch data from the backend
  function getSpotifyUserData() {
    axios
      .get("http://localhost:3003/api/v1/getUserSpotify")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching Spotify data:", error));
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/v1/getUserSpotify`)
      .then(console.log("Spotify Data Function Working"))
      .catch((error) => console.error("Error fetching data Home 1:", error));
  }, []);
  return (
    <>
      <div>This is the home component</div>
      <div className="flex flex-col">
        {/* <a
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="http:localhost//3003"
          onClick={}
          //onClick={getSpotifyUserData}
        >
          Connect Thy Spotify
        </a>*/}
        <a
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          //href="http:localhost//3003"
          onClick={getSpotifyUserData}
        >
          Get Thy Data
        </a>
        {data ? data : `loading..`}
      </div>
    </>
  );
}

export default Home;
