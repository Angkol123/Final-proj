import React from 'react'

const GameCards = ({ imgSrc, title }) => {
  return (
    <div className="p-5 px-[5%] max-w-xs">
            <img
                src={imgSrc}
                alt={title}
                className="w-[100%] h-[16vh] object-cover border-4 border-[#FF9500]"
            />
            <h1 className="text-xl font-bold mt-4">{title}</h1>
        </div>
  )
}

export default GameCards