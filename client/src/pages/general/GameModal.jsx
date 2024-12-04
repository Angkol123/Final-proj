import React from 'react';

const GameModal = ({ level, mission, letters, onNext }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-80 text-center relative">
        {/* Level Badge */}
        <div className="bg-[#f9d5a2] w-40 mx-auto rounded-full text-sm py-2 absolute -top-6 left-1/2 transform -translate-x-1/2">
          <span className="font-semibold">LEVEL : {level.toUpperCase()}</span>
        </div>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mt-8 text-[#b17d4e]">
          That was <span className="text-[#9b622d]">Awesome!</span>
        </h2>
        <div className="bg-[#f5efe6] mt-4 p-4 rounded-xl">
          <h3 className="text-sm font-bold text-[#8a4b18]">Mission:</h3>
          <p className="text-xs font-semibold text-[#6b4321] mt-2">{mission}</p>
          <div className="flex justify-around mt-4">
            {letters.map((letter, index) => (
              <span key={index} className="text-lg font-bold text-[#3b1b0c]">
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="mt-6 py-2 px-8 bg-[#ffb758] text-white rounded-full shadow hover:bg-[#f4a848] transition-all duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GameModal;
