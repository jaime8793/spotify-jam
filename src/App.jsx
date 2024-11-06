import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);
  function handleClick() {
    return setCount(count + 1)
  }
  return (
    <>
      <Button onClick={handleClick}>Secondary</Button>
      <p>{count}</p>
    </>
  );
}

export default App;
