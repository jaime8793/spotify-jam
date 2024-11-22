import { PlusCircle } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useState } from "react";

function AlbumArtWork({ playlists }) {
  return (
    <div>
      {playlists.map((playlist) => {
        <p>{playlist.name}</p>;
      })}
    </div>
  );
}
export default AlbumArtWork;
