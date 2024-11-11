import React from "react";

const PlaceHeader: React.FC<{ name: string; imageUrl: string }> = ({
  name,
  imageUrl,
}) => (
  <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4">{name}</h1>
    <img src={imageUrl} alt={name} className="w-full max-w-md rounded-lg" />
  </div>
);

export default PlaceHeader;
