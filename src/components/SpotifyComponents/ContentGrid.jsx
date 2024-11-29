import React from "react";
import CardComponent from "./CardComponent";
import Loader from "./Loader";

const ContentGrid = ({ items, type, isLoading }) => {
  if (isLoading) return <Loader />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <p className="text-xl text-gray-600 mb-4">No {type} found</p>
        <p className="text-sm text-gray-500">
          Try selecting a different time range or check your Spotify account
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map((item) => (
        <CardComponent key={item.id || item.album.id} item={item} type={type} />
      ))}
    </div>
  );
};

export default ContentGrid;
