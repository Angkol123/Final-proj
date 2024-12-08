import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Image imports
import mathImage1 from "../../images/games/mathImage1.png";
import mathLetters from "../../images/games/mathLetters.png";
import lutters from "../../images/games/lutters.png";
import mathcount from "../../images/games/mathcount.png";
import rb from "../../images/games/rb.png";
import arow from "../../images/games/arow.png";

// Style imports
import "./MathGames.css";

// Audio imports
import bgMusic from "../../Audio/letters/gameloop.mp3"

// Create background music instance
const backgroundMusic = new Audio(bgMusic);
backgroundMusic.loop = true;

const MathGame = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [Level, setLevel] = useState(null);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { width, height } = useWindowSize(); // Confetti dimensions
  const [correctMatches, setCorrectMatches] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [missedScore, setMissedScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //getting the player name from local storage and the game name
  const playerName = localStorage.getItem("playerName");
  const gameName = localStorage.getItem("selectedGame");


  const categories = [
    { name: "ADDITION", value: "addition" },
    { name: "SUBTRACTION", value: "subtraction" },
    { name: "MULTIPLICATION", value: "multiplication" },
  ];


  const difficulties = [
    { name: "EASY", value: "easy" },
    { name: "NORMAL", value: "normal" },
    { name: "HARD", value: "hard" },
  ];


  const questionLimit = {
    easy: 10,
    normal: 15,
    hard: 20,
  };


  const generateQuestion = React.useCallback((cat, diff) => {
    try {
      let num1, num2;
      if (diff === "easy") {
        num1 = Math.floor(Math.random() * 5);
        num2 = Math.floor(Math.random() * 5);
      } else if (diff === "normal") {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
      } else {
        num1 = Math.floor(Math.random() * 20);
        num2 = Math.floor(Math.random() * 20);
      }


      let questionText, correctAnswer;


      switch (cat) {
        case "addition":
          questionText = `${num1} + ${num2}`;
          correctAnswer = num1 + num2;
          break;
        case "subtraction":
          questionText = `${num1} - ${num2}`;
          correctAnswer = num1 - num2;
          break;
        case "multiplication":
          questionText = `${num1} × ${num2}`;
          correctAnswer = num1 * num2;
          break;
        default:
          return null;
      }


      const options = generateOptions(correctAnswer, Level);
      return { questionText, correctAnswer, options };
    } catch (error) {
      console.error('Error generating question:', error);
      return null;
    }
  }, [Level]);


  const generateOptions = (correctAnswer, difficulty) => {
    const options = new Set();
    options.add(correctAnswer);


    // Define a range based on difficulty for wrong answers
    const range = difficulty === "easy" ? 2 : difficulty === "normal" ? 5 : 10;


    // Generate wrong answers close to the correct answer
    while (options.size < 4) {
      const wrongAnswer =
        correctAnswer + (Math.floor(Math.random() * (range * 2 + 1)) - range);
      // Ensure the wrong answer is not the same as the correct answer and within reasonable bounds
      if (wrongAnswer !== correctAnswer && wrongAnswer >= 0) {
        options.add(wrongAnswer);
      }
    }


    return Array.from(options).sort(() => Math.random() - 0.5);
  };


  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setLevel(null);
    setQuestion(null);
  };


  const handleDifficultySelect = (diff) => {
    try {
      setIsLoading(true);
      setLevel(diff);
      const newQuestion = generateQuestion(category, diff);
      if (newQuestion) {
        setQuestion(newQuestion);
        setQuestionsCount(0);
      } else {
        toast.error('Error generating question. Please try again.');
      }
    } catch (error) {
      console.error('Error selecting difficulty:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const postGameResults = async () => {
    try {
      if (!playerName || !gameName) {
        console.error('Missing player name or game name');
        return;
      }

      const gameData = {
        playerName: playerName,
        gameName: gameName,
        difficulty: Level || 'easy', // provide default if Level is null
        score: score,
        missedScore: missedScore
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
        throw new Error(`Failed to post game results: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Game results posted successfully:', responseData);
      
      // Show success toast
      toast.success('Game results saved!', {
        position: "top-center",
        autoClose: 2000,
      });

    } catch (error) {
      console.error('Error posting game results:', error);
      toast.error('Failed to save game results', {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };


  const handleAnswer = async (selectedAnswer) => {
    if (isLoading || answered) return;
    
    try {
      setIsLoading(true);
      setAnswered(true);
      
      if (selectedAnswer === question.correctAnswer) {
        setScore(prev => prev + 1);
        toast.success('Correct Answer! 🎉', {
          autoClose: 1000,
        });
      } else {
        setMissedScore(prev => prev + 1);
        toast.error(`Wrong! Correct answer was ${question.correctAnswer} ❌`, {
          autoClose: 1000,
        });
      }

      setQuestionsCount(prev => {
        const newCount = prev + 1;
        if (newCount >= questionLimit[Level]) {
          setShowModal(true);
          backgroundMusic.pause();
          backgroundMusic.currentTime = 0;
        }
        return newCount;
      });
    } catch (error) {
      console.error('Error handling answer:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleNextQuestion = () => {
    if (questionsCount + 1 < questionLimit[Level]) {
      setQuestion(generateQuestion(category, Level));
      setAnswered(false);
    } else {
      setShowModal(true);
    }
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10); // Brief delay to restart animation
  };


  const resetGame = () => {
    console.log("Resetting game");
    setLevel(null);
    setQuestion(null);
    setScore(0);
    setMissedScore(0);
    setAnswered(false);
    setQuestionsCount(0);
    setShowModal(false);
    setCorrectMatches([]);
    setQuestionIndex(0);
    setAnimate(false);
    backgroundMusic.play();
  };


  const startGame = () => {
    setCorrectMatches([]);
    setQuestionIndex(0);
    setGameStarted(true);
    setModalMessage("");
    // Start background music
    backgroundMusic.play();
  };
  const handleBackNavigation = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    navigate("/GamesSection");
  };

 useEffect(() => {
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("selectedGame", gameName);
 }, [playerName, gameName]);


  // Add cleanup for background music
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setAnswered(false);
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);


  // Add new function for exiting to game section
  const exitToGameSection = () => {
    console.log("Exiting to game section");
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    navigate("/GamesSection");
  };

  const handlePlayAgain = async () => {
    console.log("Play Again clicked");
    // First post the current game results
    await postGameResults();
    
    // Then reset everything
    setLevel(null);
    setQuestion(null);
    setScore(0);
    setMissedScore(0);
    setAnswered(false);
    setQuestionsCount(0);
    setShowModal(false);
    setCorrectMatches([]);
    setQuestionIndex(0);
    setAnimate(false);
    backgroundMusic.play();
  };

  const handleExit = async () => {
    console.log("Exit clicked");
    // First post the game results
    await postGameResults();
    
    // Then cleanup and navigate
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    setShowModal(false);
    navigate("/GamesSection");
  };

  // Separate modal component to ensure proper event handling
  const ScoreModal = () => {
    return (
      <>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black/70 z-[1000]" />
        
        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center z-[1001]">
          <div className="bg-[#FFE7C7] p-8 rounded-lg shadow-xl w-[500px] relative">
            {/* Close Button */}
            <button
              onClick={handleExit}
              className="absolute top-2 right-2 text-[#7E4F0E] hover:text-red-600 text-xl font-bold cursor-pointer pointer-events-auto"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-[#7E4F0E]">
              🎊 Congratulations! 🎊
            </h2>
            
            <p className="mt-4 text-lg text-center">
              You completed the game
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-lg text-center">Score: {score}</p>
              <p className="text-lg text-center">Missed: {missedScore}</p>
              <p className="text-lg text-center">Level: {Level}</p>
            </div>

            {/* Action Buttons */}
            <div className="relative z-[1002] mt-6 flex justify-center space-x-4 pointer-events-auto">
              <button
                onClick={handlePlayAgain}
                className="relative z-[1002] bg-[#7E4F0E] hover:bg-[#6A4310] text-white text-lg font-bold rounded-lg transition-colors pointer-events-auto select-none"
                style={{
                  padding: '16px',
                  width: '40%',
                  height: '6vh',
                }}
              >
                Play Again
              </button>
              
              <button
                onClick={handleExit}
                className="relative z-[1002] bg-[#E74C3C] hover:bg-[#C0392B] text-white text-lg font-bold rounded-lg transition-colors pointer-events-auto select-none"
                style={{
                  padding: '16px',
                  width: '40%',
                  height: '6vh',
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FFECD2]">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="flex items-center justify-center h-screen ">
        <img
          src={mathImage1}
          alt="bg"
          className="w-full absolute inset-0 h-full object-cover"
          style={{ opacity: 0.8 }}
        />


        {!gameStarted ? (
          <div className="flex flex-col items-center relative">
            <img
              src={mathLetters}
              alt=""
              style={{ filter: "brightness(100%)" }}
            />
            <img src={lutters} alt="" style={{ filter: "brightness(100%)" }} />


            <button
              onClick={startGame}
              className="px-8 py-4 text-2xl font-bold text-[#94682A] bg-[#FFE0B5] rounded-3xl shadow-2xl hover:bg-[#FFE0B5]-600 transition-colors duration-200 animate-pulse"
              style={{ filter: "brightness(100%)", position: "relative" }}
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-start mr-[10rem]">
              {!category && ( // Only show the image if no category is selected
                <img
                  src={mathcount}
                  alt="mathcount"
                  className="w-[90%]"
                  style={{ filter: "brightness(100%)" }}
                />
              )}
            </div>


            <div className="flex">
              <h1
                className="text-4xl font-extrabold text-blue-700 mb-4"
                style={{ filter: "brightness(100%)" }}
              >
                {/* 🎉 Math Card Game 🎉 */}
              </h1>


              <h2
                className="text-2xl font-semibold text-green-600"
                style={{ filter: "brightness(100%)" }}
              >
                {/* Score: {score} */}
              </h2>


              {!category && (
                <div
                  className="flex flex-col items-center space-y-10 mr-[10rem]"
                  style={{ filter: "brightness(100%)" }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      className="bg-[#FFC87A] text-[#7E4F0E] text-[40px] font-bold p-7  rounded-[40px] shadow-lg hover:bg-[##7E4F0E] transition duration-300 w-[100%] gap-y-2"
                      onClick={() => handleCategorySelect(cat.value)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
              <img
                src={arow}
                alt="arrowback"
                onClick={handleBackNavigation}
                className="absolute left-0 top-4 cursor-pointer w-40h-40 z-20"
              />
              {category && !Level && (
                <div className="ml-[-9rem] flex flex-col items-center space-y-4 gap-3">
                  <div
                    className="flex items-center text-[#7E4F0E] text-3xl font-bold bg-[#E1F2F4] border-8 border-[#3CA1B5] rounded-2xl px-10 py-4 shadow-md"
                    style={{
                      filter: "brightness(100%)",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                      width: "100%", // Full width of the container
                      maxWidth: "800px", // Optional: limit max width
                    }}
                  >
                    <img src={rb} alt="" className="w-20 h-auto mr-5" />
                    <p className="flex-grow text-center">
                      CHOOSE YOUR FAVORITE LEVEL
                    </p>
                  </div>


                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      style={{ filter: "brightness(100%)" }}
                      className="bg-[#FFCF8C] text-[#7E4F0E] text-[30px] font-bold px-9 py-3 w-[70%] rounded-[40px] shadow-lg hover:bg-[#FFCF8C] transition duration-300 border border-[#7E4F0E]"
                      onClick={() => handleDifficultySelect(diff.value)}
                    >
                      {diff.name}
                    </button>
                  ))}
                </div>
              )}


              {question && (
                <div
                  className="items-center justify-center ml-[-20vh] md:mt-[-16rem] h-[50vh]"
                  style={{ filter: "brightness(100%)" }}
                >
                  <div className=" grid grid-cols-2 gap-9">
                    {question.options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`bg-[#ED9726] text-5xl ml-[5rem] font-bold w-[50%] py-5 rounded-xl 
                          ${!isLoading && !answered ? 'hover:bg-[#FFECD2]' : ''} 
                          transition duration-200 
                          ${isLoading || answered ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={() => handleAnswer(option)}
                        disabled={isLoading || answered}
                        style={{
                          animation: animate
                            ? `dropdown 0.5s ease-out both, bounceTwice 0.8s ease-in-out 0.5s forwards`
                            : "none",
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <h3 className="text-[200px] font-bold text-[#7E4F0E] border top-0 sm:mt-[2rem] border-[#FFCF8C] bg-[#FFECD2] sm:w-[60%] sm:h-[400px] md:w-[700px] md:h-[250px] flex items-center justify-center rounded-[90px]">
                    {question.questionText}
                  </h3>


                  {answered && !showModal && (
                    <div className=" relative w-[500px] h-[90px] flex justify-center items-center ">
                      <button
                        className="bg-[#FFC87A] text-[#7E4F0E] text-lg font-bold py-3 px-6 rounded-lg shadow-lg hover: transition duration-300 mt-8 p-4 md:ml-[13rem] "
                        style={{ filter: "brightness(100%)" }}
                        onClick={handleNextQuestion}
                      >
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>


      {/* Modal and Confetti */}
      {showModal && (
        <>
          <ScoreModal />
          <div className="fixed inset-0 z-[999]">
            <Confetti width={width} height={height} />
          </div>
        </>
      )}
    </div>
  );
};


export default MathGame;


