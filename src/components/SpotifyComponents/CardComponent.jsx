import React from "react";

const CardComponent = ({ item, type }) => {
  const imageSrc =
    type === "artist" ? item.images[0]?.url : item.album?.images[0]?.url;

  const name = type === "artist" ? item.name : item.name || item.album?.name;
  const subTitle = type === "track" ? item.artists[0]?.name : null;

  return (
    <div className="p-4 bg-white rounded-md shadow hover:shadow-lg transform hover:scale-105 transition duration-300">
      <img
        src={imageSrc || "/placeholder-image.jpg"}
        alt={name}
        className="w-full h-48 object-cover rounded-t-md"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder-image.jpg";
        }}
      />
      <div className="mt-2">
        <h3 className="text-base font-semibold truncate">{name}</h3>
        {subTitle && (
          <p className="text-sm text-gray-600 truncate">{subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
