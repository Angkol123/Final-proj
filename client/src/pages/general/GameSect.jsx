import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import memory from "../../images/games/MemoryGames.png";
import math from "../../images/games/MathCardGames.png";
import img12 from "../../images/games/WordGames.png";
import Footer from "../../components/Footer";
import animalScrumble from "../../images/games/animalScrumble.png";
import exit from "../../images/image 126.png"; // Make sure this path is correct

const GameSect = () => {
  const navigate = useNavigate();

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childName, setChildName] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = () => {
    if (childName.trim() === "") {
      alert("Please enter the child's name");
      return;
    }

    // Store data in localStorage
    localStorage.setItem("playerName", childName);
    localStorage.setItem("selectedGame", selectedGame);

    setIsGameStarted(true);
    setIsModalOpen(false); // Close modal

    // Navigate to the respective game
    if (selectedGame === "Memory Games") {
      navigate("/MemoryGames");
    } else if (selectedGame === "Math Games") {
      navigate("/MathGames");
    } else if (selectedGame === "Word Games") {
      navigate("/WordGames");
    } else if (selectedGame === "Animal Games") {
      navigate("/AnimalGames");
    }
  };

  const openModalForGame = (game) => {
    setClicked(game);
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setChildName("");
  };

  const filteredGames = () => {
    if (selectedCategory === "Math") {
      return [
        {
          image: math,
          title: "Math Game",
          description: "Simple but enjoying Math games with add, subtract and multiply symbol.",
          game: "Math Games",
        },
      ];
    } else if (selectedCategory === "Literacy") {
      return [
        {
          image: memory,
          title: "Memory Game",
          description: "Match the elements shapes to their same elements.",
          game: "Memory Games",
        },
      ];
    } else if (selectedCategory === "Phonics") {
      return [
        {
          image: img12,
          title: "Word Pic Game",
          description: "Knowing the name of the picture make u know the name.",
          game: "Word Games",
        },
        {
          image: animalScrumble,
          title: "Animal Games",
          description: "Fun games to unscramble animal names!",
          game: "Animal Games",
        },
      ];
    }
    return [
      {
        image: memory,
        title: "Memory Game",
        description: "Match the elements shapes to their same elements.",
        game: "Memory Games",
      },
      {
        image: math,
        title: "Math Game",
        description: "Simple but enjoying Math games with add, subtract and multiply symbol.",
        game: "Math Games",
      },
      {
        image: img12,
        title: "Word Pic Game",
        description: "Knowing the name of the picture make u know the name.",
        game: "Word Games",
      },
      {
        image: animalScrumble,
        title: "Animal Games",
        description: "Fun games to unscramble animal names!",
        game: "Animal Games",
      },
    ];
  };

  return (
    <div>
      {!isGameStarted}

      <div className="bg-[#EB9721] w-full px-5 relative">
        <div className="bg-[#EBCEA8] w-full px-5 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-9">
            <h2 className="text-2xl font-semibold text-start mb-4 md:mb-0">
              Educational Games
            </h2>
            <select
              className="border border-[#EB9721] text-gray-800 font-semibold py-2 px-4 rounded-md ml-auto outline-none w-full md:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Games Categories</option>
              <option value="Math">Math</option>
              <option value="Literacy">Literacy</option>
              <option value="Phonics">Phonics</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 md:px-10">
            {filteredGames().map((game, index) => (
              <div
                key={index}
                className="bg-[#F3CA79] rounded-lg shadow-lg p-5"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <button
                  onClick={() => openModalForGame(game.game)}
                  className={`${
                    clicked === game.game ? "bg-orange-600" : "bg-orange-500"
                  } text-white py-2 px-4 rounded hover:bg-orange-600 active:scale-95 transition-transform`}
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
            <span
              onClick={closeModal}
              className="absolute top-1 right-2 cursor-pointer"
            >
              <img src={exit} alt="Exit" className="w-10 h-10" />
            </span>
            <div className="p-[2%]">
              <h2 className="text-xl font-bold mb-4 p-[1%]">
                Enter Student's Name
              </h2>
            </div>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Student's Name"
            />
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 active:scale-95 transition-transform w-full mb-2"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GameSect;
