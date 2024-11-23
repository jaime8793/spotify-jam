


function AlbumArtWork({ playlists }) {
  console.log("Received Playlists:", playlists);
  console.log("Received Access Token:");
  return (
    <div>
      {playlists.map((playlist, id) => {
        return (
          <div key={id}>
            <p>Playlist name:{playlist.name}</p>
            <img src={playlist.images[0].url} />
          </div>
        );
      })}
    </div>
  );
}

export default AlbumArtWork;
