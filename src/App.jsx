import "./App.css";
import { AppSidebar } from "./components/SpotifyComponents/app-sidebar";
import Home from "./components/SpotifyComponents/Home";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </SidebarProvider>
    </Router>
  );
}

export default App;
