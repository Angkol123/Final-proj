import React from 'react';

const Card = ({ imgSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg max-w-xs">
      <img
        src={imgSrc}
        alt={title}
        className="w-32 h-32 rounded-full object-cover border-4 border-[#FF9500]"
      />
      <h1 className="text-xl font-bold mt-4">{title}</h1>
      <p className="text-center mt-2">{description}</p>
    </div>
  );
};

export default Card;
