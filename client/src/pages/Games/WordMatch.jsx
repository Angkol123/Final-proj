// src/WordMatch.js
import React, { useState, useEffect } from "react";
import "./WordMatch.css"; // Import your CSS file here
import { useNavigate } from "react-router-dom";
import bg from "../../images/games/matchBg.png";
import loading from "../../images/games/loading.gif";
import db from "../../images/games/dogApple.png";
import pd from "../../images/games/pd.png";
import matching from "../../images/games/matching.png";
import arow from "../../images/games/arow.png";
import Confetti from 'react-confetti';

//background music
import background from "../../Audio/gameloop.mp3";

import car from "../../images/games/cvc imgs/a-car.jpg";
import cat from "../../images/games/cvc imgs/a-cat.jpg";
import map from "../../images/games/cvc imgs/a-map.jpg";
import pan from "../../images/games/cvc imgs/a-pan.jpg";
import bed from "../../images/games/cvc imgs/e-bed.jpg";
import net from "../../images/games/cvc imgs/e-net.jpg";
import numberTen from "../../images/games/cvc imgs/e-numberTen.jpg";
import wet from "../../images/games/cvc imgs/e-wet.jpg";
import bin from "../../images/games/cvc imgs/i-bin.jpg";
import pig from "../../images/games/cvc imgs/i-pig.jpg";
import six from "../../images/games/cvc imgs/i-six.jpg";
import zip from "../../images/games/cvc imgs/i-zip.avif";
import box from "../../images/games/cvc imgs/o-box.jpg";
import cop from "../../images/games/cvc imgs/o-cop.jpg";
import dog from "../../images/games/cvc imgs/o-dog.jpg";
import hot from "../../images/games/cvc imgs/o-hot.jpg";
import bug from "../../images/games/cvc imgs/u-bug.jpg";
import cup from "../../images/games/cvc imgs/u-cup.jpg";
import hut from "../../images/games/cvc imgs/u-hut.jpg";
import sun from "../../images/games/cvc imgs/u-sun.jpg";




const wordsAndImages = [
  { word: "Car", image: car },
  { word: "Cat", image: cat },
  { word: "Map", image: map },
  { word: "Pan", image: pan },
  { word: "Bed", image: bed },
  { word: "Net", image: net },
  { word: "Ten", image: numberTen },
  { word: "Wet", image: wet },
  { word: "Bin", image: bin },
  { word: "Pig", image: pig },
  { word: "Six", image: six },
  { word: "Zip", image: zip },
  { word: "Box", image: box },
  { word: "Cop", image: cop },
  { word: "Dog", image: dog },
  { word: "Hot", image: hot },
  { word: "Bug", image: bug },
  { word: "Cup", image: cup },
  { word: "Hut", image: hut },
  { word: "Sun", image: sun },
];

const difficultyLevels = [
  { level: "Easy", time: 25 },
  { level: "Medium", time: 20 },
  { level: "Hard", time: 10 },
];
const difficulty = 0;

const WordMatch = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState([]);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [achievementVisible, setAchievementVisible] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0); // Track the current question index
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [timer, setTimer] = useState(20);
  //get the player name and the name of the game
  const [playerName, setPlayerName] = useState('');
  const [gameName, setGameName] = useState('');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [missedAnswers, setMissedAnswers] = useState(0);
  const TOTAL_QUESTIONS = 10; // Adjust the value as needed.
  const isGameActive = gameStarted;
  const showCorrectModal = modalVisible;
  const [audio] = useState(new Audio(background));
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    const name = localStorage.getItem("playerName");
    const game = localStorage.getItem("selectedGame");
    setPlayerName(name);
    setGameName(game);
  }, []);

  useEffect(() => {
    // Simulate loading delay (e.g., API call)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false when done
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    let countdown = null;
    if (isGameActive && timer > 0 && !showCorrectModal) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimeout();
    }
    return () => clearInterval(countdown);
  }, [isGameActive, timer, showCorrectModal]);

  useEffect(() => {
    if (gameStarted && !isLoading && shuffledQuestions.length > 0) {
      generateQuestion();
    }
  }, [gameStarted, questionIndex, isLoading, shuffledQuestions]);

  useEffect(() => {
    if (achievementVisible) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [achievementVisible]);

  const handleTimeout = () => {
    setModalMessage("Time's up! Try again.");
    setModalVisible(true);
    setMissedAnswers(prev => prev + 1);
    
    // Check if this was the last question
    if (questionIndex === TOTAL_QUESTIONS - 1) {
      setTimeout(() => {
        setModalVisible(false);
        setGameStarted(false);
        setShowConfetti(true);
        setAchievementVisible(true);
        postGameResults();
      }, 1000);
      return; // Add return here to prevent further execution
    }

    // Only proceed to next question if it wasn't the last one
    setTimeout(() => {
      setModalVisible(false);
      setQuestionIndex(prevIndex => prevIndex + 1);
      setTimer(10);
    }, 1000);
  };

  const generateQuestion = () => {
    // Check if shuffledQuestions exists and has the current index
    if (!shuffledQuestions || !shuffledQuestions[questionIndex]) {
      console.log("No questions available");
      return;
    }

    const selectedWord = shuffledQuestions[questionIndex];

    // Create options (4 options: 1 correct + 3 random)
    const otherWords = wordsAndImages.filter(
      (item) => item.word !== selectedWord.word
    );
    const randomOptions = otherWords
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setOptions(
      [selectedWord, ...randomOptions].sort(() => 0.5 - Math.random())
    );
    setCurrentWord(selectedWord.word);
  };

  const handleBackNavigation = () => {
    navigate("/GamesSection"); // Update to the actual path you want to navigate to
  };

  const handleOptionClick = (word) => {
    if (word === currentWord) {
      // Correct answer logic
      setCorrectAnswers(prev => prev + 1);
      setModalMessage("Correct match!");
    } else {
      // Wrong answer logic
      setMissedAnswers(prev => prev + 1);
      setModalMessage("Incorrect! Moving to next question...");
    }

    // Check if this was the last question
    if (questionIndex === TOTAL_QUESTIONS - 1) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setGameStarted(false);
        setShowConfetti(true);
        setAchievementVisible(true);
        postGameResults();
      }, 1000);
      return;
    }

    // Show modal and move to next question regardless of correct/incorrect
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setQuestionIndex(prevIndex => prevIndex + 1);
      setTimer(10);
    }, 1000);
  };

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000); // Modal will disappear after 1 second
  };

  const startGame = () => {
    // First shuffle the questions
    const shuffled = [...wordsAndImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_QUESTIONS);
    
    setShuffledQuestions(shuffled);
    setCorrectMatches([]);
    setQuestionIndex(0);
    setGameStarted(true);
    setTimer(10);
    setModalMessage("");
    setCorrectAnswers(0);
    setMissedAnswers(0);
    
    // Start playing background music
    audio.loop = true;
    audio.play().catch(error => {
      console.log("Audio play failed:", error);
    });
  };

  const calculateScore = () => {
    return parseInt(correctAnswers) || 0; // Ensure it returns a number, default to 0
  };

  const postGameResults = async () => {
    audio.pause();
    audio.currentTime = 0;
    
    try {
      const finalScore = calculateScore();
      console.log('Posting score:', finalScore);
      
      const gameData = {
        playerName: playerName,
        gameName: gameName,
        difficulty: "Easy",
        score: finalScore,
        missedScore: parseInt(missedAnswers) || 0
      };

      console.log('Sending game data:', gameData);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData)
      });

      if (!response.ok) {
        throw new Error('Failed to post game results');
      }

      const responseData = await response.json();
      console.log('Game results posted successfully:', responseData);
    } catch (error) {
      console.error('Error posting game results:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F0BC78]">
      {showConfetti && <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />}

      {isLoading ? (
        <div className="text-center">
          <img
            src={bg}
            alt="Loading background"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            style={{ filter: "brightness(100%)" }}
          />
          <img
            src={loading}
            alt="loading"
            style={{ filter: "brightness(100%)" }}
          />
        </div>
      ) : !gameStarted ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            src={arow}
            alt="arrowback"
            onClick={() => navigate('/GamesSection')}
            className="absolute left-0 top-4 cursor-pointer w-40 h-30 z-20"
          />
          
          <img
            src={bg}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />

          {/* Animate the db image dropping from above */}
          <img
            src={db}
            alt="dog-bird"
            className="animate-drop mt-0"
            style={{ filter: "brightness(100%)" }}
          />

          {/* Animate pd image coming from the right */}
          <img
            src={pd}
            alt="picture-word"
            className="animate-slide-right"
            style={{ filter: "brightness(100%)" }}
          />

          {/* Animate matching image coming from the left */}
          <img
            src={matching}
            alt="matching"
            className="animate-slide-left w-full "
            style={{ filter: "brightness(100%)" }}
          />

          <h1
            className="text-5xl font-extrabold mb-4 text-purple-600"
            style={{ filter: "brightness(100%)" }}
          ></h1>

          <p
            className="mb-4 text-xl text-gray-800"
            style={{ filter: "brightness(100%)" }}
          >
            {/* Click the button below to start the game. */}
          </p>

          {/* Button with animated cursor or icon to guide the start */}
          <button
            onClick={startGame}
            className="px-8 py-4 text-2xl font-bold text-[#94682A] bg-[#FFE0B5] rounded-3xl shadow-2xl hover:bg-[#FFE0B5]-600 transition-colors duration-200 animate-pulse"
            style={{ filter: "brightness(100%)", position: "relative" }}
          >
            Start Game
            <span
              className="animate-bounce pointer-icon"
              style={{ color: "#F4DAB5" }}
            >
              👉
            </span>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto text-center">
          <img
            src={bg}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            style={{ opacity: 0.7 }} // Adjust to your preferred opacity
          />
          <img
            src={arow}
            alt="arrowback"
            onClick={handleBackNavigation}
            className="absolute left-0 top-4 cursor-pointer w-40h-40 z-20"
          />
          <h1
            className="text-5xl font-extrabold mb-6 text-purple-600"
            style={{ filter: "brightness(100%)" }}
          >
            {/* Word Match Game */}
          </h1>
          <div className="mb-4">
            <div className="timer-bar w-[50vw] mx-auto bg-gray-200 rounded-full ml-[-12vw] h-6 mb-4 border border-[#EE910E] relative">
              <div
                className="bg-[#F0BC78] w-[90vw] h-full rounded-full transition-all duration-1000 flex items-center justify-center"
                style={{
                  width: `${(timer / 10) * 100}%`,
                }}
              >
                <p className="text-white font-semibold w-full text-center">
                  {timer}
                </p>
              </div>
            </div>
            <br />
            <br />
            <img
              src={shuffledQuestions[questionIndex]?.image}
              alt={currentWord}
              className="mb-6 mx-auto rounded-lg bg-[#ECFFD9]"
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
                filter: "brightness(100%)",
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center mb-6">
            {options.map((option) => (
              <button
                key={option.word}
                className={`m-2 px-6 py-3 text-lg font-bold text-[#7E4F0E] bg-[#E9FFEC] rounded-lg shadow-lg hover:bg-[##E9FFEC] transition-colors duration-200 border border-[#406817]`}
                onClick={() => handleOptionClick(option.word)}
                style={{ filter: "brightness(100%)" }}
              >
                {option.word}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-100 hover:scale-105">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
              {modalMessage}
            </h2>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {achievementVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300">
          <div className="bg-[#FFE7C7] p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-100 max-w-xs w-full">
            {/* Level Display */}

            {/* Congratulatory Message */}
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">
              Congratulations!
            </h2>

            {/* Stars Display */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-3xl">
                  ⭐
                </span>
              ))}
            </div>

            {/* Mission Display */}
            <div className="text-center mb-4">
              <p className="font-semibold text-gray-700">Mission:</p>
              <p className="text-gray-500">
                Completed {correctAnswers} out of {TOTAL_QUESTIONS} questions
              </p>
            </div>

            {/* Score and Missed */}
            <div className="flex justify-around mb-4">
              <div className="text-center">
                <p className="font-semibold text-gray-700">Score:</p>
                <p className="text-gray-500">{correctAnswers}/10</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">Missed:</p>
                <p className="text-gray-500">{missedAnswers}</p>
              </div>
            </div>

            {/* Exit and Retry Buttons */}
            <div className="flex justify-around mt-6">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-colors duration-200"
                onClick={() => {
                  setAchievementVisible(false);
                  setShowConfetti(false);
                  navigate("/GamesSection");
                }}
              >
                Exit
              </button>
              <button
                className="px-4 py-2 bg-orange-300 text-orange-700 rounded-lg shadow hover:bg-orange-400 transition-colors duration-200"
                onClick={() => {
                  setAchievementVisible(false);
                  setShowConfetti(false);
                  startGame();
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordMatch;
