import React, { useState, useEffect, useCallback } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import BackgroundAudio from "../../../src/Audio/backgroundAudio.mp3";
import progressbar from "../../components/progressbar";
import ArrowBackModal from "../../components/ArrowBackModal";
import RetryLimitModal from "../../components/RetryLimitModal";
import "./MemoryGame.css"; // Import separate CSS file
import img1 from "../../images/games/load.png";
import img2 from "../../images/games/cbl.png";
import img3 from "../../images/games/robot.png";
import img4 from "../../images/games/2bg.png";
import logo from "../../images/footer/logo.png";
import img5 from "../../images/games/memory.png";
import img6 from "../../images/games/mct.png";
import img7 from "../../images/games/letters.png";
import loading from "../../images/games/loading.gif";
import GameModal from "../general/GameModal";
import arow from "../../images/games/arow.png";

//import the letter sound 
import a from "../../Audio/letters/a.mp3"
import b from "../../Audio/letters/b.mp3"
import c from "../../Audio/letters/c.mp3"
import d from "../../Audio/letters/d.mp3"
import e from "../../Audio/letters/e.mp3"
import f from "../../Audio/letters/f.mp3"
import g from "../../Audio/letters/g.mp3"
import h from "../../Audio/letters/h.mp3"
import i from "../../Audio/letters/i.mp3"
import j from "../../Audio/letters/j.mp3"

//import the bacground muscic for the game
import bgMusic from "../../Audio/letters/gameloop.mp3"

const icons = [
  "Aa",
  "Bb",
  "Cc",
  "Dd",
  "Ee",
  "Ff",
  "Gg",
  "Hh",
  "Ii",
  "Jj",
  // "Kk",
  // "Ll",
  // "Mm",
  // "Oo",
  // "Pp",
  // "Qr",
  // "Rr",
  // "Ss",
  // "Tt",
  // "Uu",
  // "Vv",
  // "Ww",
  // "Xx",
  // "Yy",
  // "Zz",
];

// Create an object to map letters to their sound files
const letterSounds = {
  'Aa': new Audio(a),
  'Bb': new Audio(b),
  'Cc': new Audio(c),
  'Dd': new Audio(d),
  'Ee': new Audio(e),
  'Ff': new Audio(f),
  'Gg': new Audio(g),
  'Hh': new Audio(h),
  'Ii': new Audio(i),
  'Jj': new Audio(j),
};

// Create background music instance
const backgroundMusic = new Audio(bgMusic);
backgroundMusic.loop = true; // Make the background music loop

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flipCount, setFlipCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [gridCols, setGridCols] = useState("grid-cols-2");
  const [difficulty, setDifficulty] = useState("easy");
  const [showStats, setShowStats] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLevelSelection, setShowLevelSelection] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [missionStatus, setMissionStatus] = useState("Ongoing"); // Initial mission status
  const [timeLeft, setTimeLeft] = useState(40); // Example initial time

  const [playerName, setPlayerName] = useState("");
  const [gameName, setGameName] = useState("");

  const audio = new Audio(BackgroundAudio);

  const getButtonAnimationClass = (index) => {
    switch (index) {
      case 0:
        return "animate-from-top";
      case 1:
        return "animate-from-right";
      case 2:
        return "animate-from-left";
      default:
        return "";
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("playerName");
    const game = localStorage.getItem("selectedGame");
    setPlayerName(name);
    setGameName(game);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, gameOver]);
  // Simulate loading before showing the play button
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (flipCount && timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1050);
      return () => clearInterval(interval);
    }
    if (timer === 0 && flipCount) endGame();
  }, [flipCount, timer, gameOver]);

  useEffect(() => {
    const gameFinishedSuccessfully = true; // Replace with actual game logic
    if (gameFinishedSuccessfully) {
      onGameComplete();
    } else {
      onTimerEnd();
    }
  }, []); // Add dependencies to monitor actual game state or timer

  useEffect(() => {
    setTimeLeft(getInitialTime(difficulty));
  }, [difficulty]);

  const getInitialTime = (level) => {
    switch (level) {
      case "easy":
        return 40;
      case "normal":
        return 30;
      case "hard":
        return 20;
      default:
        return 40;
    }
  };

  const handleTimeUp = () => {
    setGameOver(true);
    setMissionStatus("Failed");
    setShowConfetti(false);
    clearInterval(intervalId);
    setTimer(timer);
    setTimeLeft(timeLeft);
    
    // Post game results when time is up
    postGameResults();
  };

  const startGame = (level, levelName) => {
    setIsGameActive(true);
    setSelectedLevel(levelName);
    setShowLevelSelection(false); // Hide level selection
    setDifficulty(levelName);
    setShowStats(true);
    
    // Reset game state
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setFlipCount(0);
    setGameOver(false);
    setShowConfetti(false);
    
    // Generate new cards
    generateCards(level);
    
    // Set time limit based on level
    const timeMapping = { easy: 40, normal: 30, hard: 20 };
    setTimeLimit(timeMapping[levelName]);
    setTimer(timeMapping[levelName]);
    
    // Start background music
    backgroundMusic.play();
  };

  const handleGameOver = (isSuccess) => {
    if (isSuccess) {
      setMissionStatus("Success");
    } else {
      setMissionStatus("Failed");
    }
  };

  const onTimerEnd = () => {
    BackgroundAudio.play();
    handleGameOver(false); // Mission failed if timer runs out
  };

  const onGameComplete = () => {
    handleGameOver(true); // Mission successful if game completed
  };

  const calculateScore = () => {
    // Score calculation based on flips
    const flipScore = Math.max(0, 30 - flipCount); // Higher flips reduce the score, capped at 20

    const finalScore = flipScore;
    setScore(finalScore);
    return finalScore;
  };

  const endGame = () => {
    setIsGameActive(false); // Game has ended
    setShowStats(false); // Hide stats
    setSelectedLevel(null); // Reset selected level to show all buttons
    setShowLevelSelection(true); // Show level selection again
    clearInterval(intervalId);
    setGameEnded(true);
    // const finalScore = calculateScore();
    // alert(`Game Over! Your Score: ${finalScore}`);
  };

  const getUniqueMatchedLetters = () => {
    // Create a Set from matchedCards to get unique letters
    const uniqueIcons = [...new Set(matchedCards.map((index) => cards[index]))];

    // Sort the unique letters in alphabetical order
    uniqueIcons.sort();

    return uniqueIcons;
  };

  const resetGame = () => {
    // Reset game states but keep difficulty
    setTimeLeft(getInitialTime(difficulty));
    setMissionStatus("Ongoing");
    setGameOver(false);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setFlipCount(0);
    setTimer(0);
    setShowConfetti(false);
    setTimerStarted(false);
    clearInterval(intervalId);
    setShowStats(false);
    setScore(0);
    setGameEnded(false);
    
    // Keep the game started and level selection hidden
    setGameStarted(true);
    setShowLevelSelection(false); // This will keep difficulty selection hidden
    
    // Generate new cards for the current difficulty level
    generateCards(difficultyLevels[difficulty]);
  };

  const [retryCount, setRetryCount] = useState({
    easy: 0,
    normal: 0,
    hard: 0,
  });

  const generateCards = (level) => {
    const iconPool = icons.slice(0, level / 2);
    const cardIcons = [...iconPool, ...iconPool];
    const shuffledCards = cardIcons.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);

    if (level === 6) {
      setGridCols("grid-cols-3");
    } else if (level === 8) {
      setGridCols("grid-cols-4");
    } else if (level === 12) {
      setGridCols("grid-cols-4");
    }
  };

  const flipCard = useCallback(
    (index) => {
      if (
        flippedCards.length >= 2 ||
        flippedCards.includes(index) ||
        matchedCards.includes(index)
      )
        return;
      
      setFlippedCards([...flippedCards, index]);
      setFlipCount((prev) => prev + 1);

      if (flippedCards.length === 1) {
        const firstIndex = flippedCards[0];
        // Add longer delay (1.5 seconds) before checking for match
        setTimeout(() => {
          if (cards[firstIndex] === cards[index]) {
            // Play the corresponding letter sound when there's a match
            const letter = cards[index];
            if (letterSounds[letter]) {
              letterSounds[letter].play();
            }
            setMatchedCards((prev) => [...prev, firstIndex, index]);
            setFlippedCards([]);
          } else {
            // Add delay (1 second) before hiding unmatched cards
            setTimeout(() => {
              setFlippedCards([]);
            }, 500);
          }
          checkForWin();
        }, 500);
      }
    },
    [flippedCards, matchedCards, cards]
  );

  const handleBackNavigation = async () => {
    if (window.confirm("Are you sure you want to exit? Your score will be saved.")) {
      // Stop background music
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      
      await postGameResults();
      setShowLevelSelection(true);
      setSelectedLevel(null);
      navigate("/GamesSection");
    }
  };
  const checkForMatch = (secondIndex) => {
    const firstIndex = flippedCards[0];
    if (cards[firstIndex] === cards[secondIndex]) {
      setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
    }
    setFlippedCards([]);
    checkForWin();
  };

  const checkForWin = () => {
    if (matchedCards.length + 2 === cards.length) {
      // Stop background music
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;

      clearInterval(intervalId);
      setTimer(timer);
      setGameOver(true);
      setGameEnded(true);
      setTimeLeft(timeLeft);

      const finalScore = calculateScore();
      setShowConfetti(true);
      setScore(finalScore);
    }
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const difficultyLevels = {
    easy: 6,
    normal: 8,
    hard: 12,
  };

  // Add this function to post game results
  const postGameResults = async () => {
    try {
      // Only post if there's a score to report
      if (gameEnded || timeLeft === 0) {
        const gameData = {
          playerName: playerName,
          gameName: gameName,
          difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
          score: score.toString(),
          missedScore: flipCount.toString()
        };

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

        console.log('Game results posted successfully:', gameData);
      }
    } catch (error) {
      console.error('Error posting game results:', error);
    }
  };

  // Add cleanup for background music when component unmounts
  useEffect(() => {
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 to-blue-400  overflow-auto h-[50vh]">
      {isLoading ? (
        <div
          className="flex flex-col items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <img
            src={img4}
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />

          <img
            src={loading}
            alt="loading"
            className=""
            style={{ filter: "brightness(100%)" }}
          />
        </div>
      ) : !gameStarted ? (
        <div className="text-center mt-[-15vh]">
          <img
            src={arow}
            alt="arrowback"
            onClick={() => navigate('/GamesSection')}
            className="absolute left-0 top-4 cursor-pointer w-40 h-30 z-20"
          />
          
          <img
            src={img4}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div>
            <img
              src={img5}
              alt="memory"
              className="relative lg:mt-[6rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl animate-slideInLeft"
              style={{
                animationDuration: "1.5s",
                animationTimingFunction: "ease-in-out",
                animationFillMode: "forwards",
              }}
            />
          </div>
          <div className="">
            <img
              src={img6}
              alt="match"
              className=" lg:w-full sm:ml-10 md:ml-16 lg:ml-20 z-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl animate-slideInRight"
              style={{
                animationDuration: "1.5s",
                animationTimingFunction: "ease-in-out",
                animationFillMode: "forwards",
              }}
            />
          </div>
          <div className="text-center">
            <img
              src={img7}
              alt="letters"
              className="w-full h-auto mt-[-2rem]  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              style={{ filter: "brightness(100%)" }}
            />
          </div>
          <div className="">
            <button
              onClick={() => setGameStarted(true)}
              className="transform mt-[1rem] hover:scale-110 transition-all w-[80%] h-[4rem] -translate-y-12"
            >
              <img
                src={img1}
                alt="Play Button"
                className="inline-block mr-2  w-[30%] h-[17vh]"
              />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <img
            src={img4}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          {showStats && (
            <div
              className="text-black text-xl right"
              style={{ filter: "brightness(100%)" }}
            >
              {/* <div>Time Left: {timer} seconds </div> */}

              <div className="timer-bar bg-gray-200 rounded-full h-6 mb-6 w-[100%] flex- justify-center">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${
                      (timer / difficultyLevels[difficulty].time) * 100
                    }%`,
                  }}
                >
                  <div className="timer-bar bg-gray-200 rounded-full h-6 mb-6">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-1000 flex justify-center items-center text-white font-bold border sm:border-[#FF5733] md:border-[#EB9721] lg:border-[#FFD700] sm:text-sm md:text-base lg:text-lg sm:h-5 md:h-6 lg:h-6"
                      style={{
                        width: `${(timer / timeLimit) * 100}%`, // Adjust the width of the bar based on time left
                      }}
                    >
                      {timer} {/* Display only the timer number */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <img
            src={arow}
            alt="arrowback"
            onClick={handleBackNavigation}
            className="absolute left-0 top-4 cursor-pointer w-40h-40 z-20"
          />

          <img
            src={img3}
            alt="Robot"
            className="absolute right-0 bottom-0"
            style={{ filter: "brightness(100%)" }}
          />

          {showLevelSelection && (
            <div className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold text-white mb-[2rem] sm:mb-[3rem] md:mb-[4rem] lg:mb-[5rem] flex space-x-1">
              {"CHOOSE".split("").map((letter, index) => (
                <span
                  key={`choose-${index}`}
                  className="bending-letter"
                  style={{
                    color: ["#FF5733", "#33FF57", "#3357FF"][index % 3], // Cycle through three colors
                    animationDelay: `${index * 0.1}s`, // Stagger the animation for each letter
                    filter: "brightness(100%)",
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="bending-letter" style={{ animationDelay: "1s" }}>
                &nbsp;
              </span>{" "}
              {/* Space between words */}
              {"LEVEL".split("").map((letter, index) => (
                <span
                  key={`level-${index}`}
                  className="bending-letter"
                  style={{
                    color: ["#FF5733", "#33FF57", "#3357FF"][index % 3], // Cycle through three colors
                    animationDelay: `${(index + 4) * 0.1}s`, // Stagger the animation for each letter
                    filter: "brightness(100%)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          )}

          <div className="mb-4 flex items-center justify-center flex-col gap-9 md:w-full">
            {Object.keys(difficultyLevels).map(
              (level, index) =>
                (showLevelSelection || selectedLevel === level) && (
                  <button
                    key={level}
                    onClick={() => startGame(difficultyLevels[level], level)}
                    className={`px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 mx-2 text-[#7E4F0E] bg-[#FFCF8C] rounded-full hover:bg-[#FFCF8C]-600 transition-transform transform hover:scale-110 text-lg sm:text-xl lg:text-2xl w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] ${getButtonAnimationClass(
                      index
                    )}`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                )
            )}
          </div>
          <div className={`grid ${gridCols} gap-4`}>
            {cards.map((icon, index) => (
              <div
                key={index}
                className={`w-30 h-30 sm:w-40 sm:h-40 md:w-30 md:h-30 lg:w-50 lg:h-50  flex items-center justify-center border-2 border-[#7E4F0E] rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105
                ${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? "bg-white text-gray-800"
                    : "bg-[#FFCF8C] text-white"
                }`}
                style={{
                  backgroundImage:
                    flippedCards.includes(index) || matchedCards.includes(index)
                      ? "none"
                      : `url(${logo})`,
                  backgroundSize: "50% auto",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => flipCard(index)}
              >
                {(flippedCards.includes(index) ||
                  matchedCards.includes(index)) && (
                  <span style={{ fontSize: "7rem", color: "#7E4F0E" }}>
                    {icon}
                  </span>
                )}
              </div>
            ))}
          </div>

          {gameOver && (

            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-[#EBCEA8] p-8 rounded-[20px] shadow-lg text-center relative z-50 w-80">
                {/* Level Badge */}
                <div className="text-sm font-bold bg-[#DFC3A2] text-[#5C4A30] py-2 px-4 rounded-full mb-4 w-fit mx-auto">
                  LEVEL:{" "}
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-[#5C4A30] italic mb-4">
                  {missionStatus === "Failed" ? "Oh no!" : "That was"}{" "}
                  <span className="text-[#A56922]">
                    {missionStatus === "Failed"
                      ? "Better Luck Next Time!"
                      : "Awesome!"}
                  </span>
                </h2>

                {/* Mission Box and Button */}
                <div className="bg-[#F3E2C5] border border-[#A56922] rounded-md p-4 mb-4">
                  <p className="text-[#5C4A30] font-semibold">Mission:</p>
                  <p
                    className={`text-[#5C4A30] mb-3 ${
                      missionStatus === "Failed"
                        ? "text-red-500"
                        : "text-[#AC854D]"
                    }`}
                  >
                    {missionStatus === "Failed"
                      ? "Mission Failed!"
                      : "Successfully Matched Letters"}
                  </p>
                  <br />
                  <div className="flipCount">Flips: {flipCount}</div>
                  {gameEnded && <div className="score"> Score: {score}</div>}
                  <br />
                  <div className="flex justify-around text-[#5C4A30] font-bold text-xl">
                    {getUniqueMatchedLetters().map((icon, index) => (
                      <span key={index}>{icon}</span>
                    ))}
                  </div>
                </div>

                {/* Exit Button Only */}
                <div className="flex justify-center">
                  <button
                    onClick={handleBackNavigation}
                    className="px-6 py-2 text-white bg-[#F2B053] rounded-full hover:bg-[#E1A443] shadow-lg"
                  >
                    Exit
                  </button>
                </div>
              </div>
              {showConfetti && <Confetti className="fixed inset-0 z-40" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
