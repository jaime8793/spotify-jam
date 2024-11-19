import "./App.css";
import { AppSidebar } from "./components/SpotifyComponents/app-sidebar";
import Home from "./components/SpotifyComponents/Home";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
      <SidebarProvider>
        <AppSidebar />
        <main>
        <SidebarTrigger />
        <Home/>
        </main>
      </SidebarProvider>
  );
}

export default App;
