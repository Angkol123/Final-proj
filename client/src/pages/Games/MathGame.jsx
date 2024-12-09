import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
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

const questionBank = {
  addition: {
    easy: [
      { questionText: "2 + 3", correctAnswer: 5, options: [5, 4, 6, 3] },
      { questionText: "1 + 4", correctAnswer: 5, options: [5, 3, 7, 2] },
      { questionText: "3 + 1", correctAnswer: 4, options: [4, 5, 3, 6] },
      { questionText: "2 + 2", correctAnswer: 4, options: [4, 3, 5, 6] },
      { questionText: "0 + 3", correctAnswer: 3, options: [3, 2, 4, 1] },
      { questionText: "1 + 1", correctAnswer: 2, options: [2, 3, 1, 4] },
      { questionText: "4 + 0", correctAnswer: 4, options: [4, 3, 5, 2] },
      { questionText: "2 + 1", correctAnswer: 3, options: [3, 4, 2, 5] },
      { questionText: "3 + 2", correctAnswer: 5, options: [5, 4, 6, 3] },
      { questionText: "1 + 3", correctAnswer: 4, options: [4, 5, 3, 2] }
    ],
    normal: [
      { questionText: "5 + 7", correctAnswer: 12, options: [12, 10, 14, 11] },
      { questionText: "6 + 8", correctAnswer: 14, options: [14, 13, 15, 16] },
      { questionText: "9 + 4", correctAnswer: 13, options: [13, 12, 15, 11] },
      { questionText: "7 + 7", correctAnswer: 14, options: [14, 16, 12, 15] },
      { questionText: "8 + 6", correctAnswer: 14, options: [14, 13, 15, 12] },
      { questionText: "5 + 9", correctAnswer: 14, options: [14, 13, 15, 16] },
      { questionText: "8 + 8", correctAnswer: 16, options: [16, 15, 17, 14] },
      { questionText: "7 + 6", correctAnswer: 13, options: [13, 12, 14, 15] },
      { questionText: "9 + 9", correctAnswer: 18, options: [18, 17, 19, 16] },
      { questionText: "6 + 7", correctAnswer: 13, options: [13, 12, 14, 11] },
      { questionText: "8 + 5", correctAnswer: 13, options: [13, 12, 14, 15] },
      { questionText: "7 + 8", correctAnswer: 15, options: [15, 14, 16, 13] },
      { questionText: "9 + 6", correctAnswer: 15, options: [15, 14, 16, 17] },
      { questionText: "8 + 7", correctAnswer: 15, options: [15, 14, 16, 13] },
      { questionText: "6 + 9", correctAnswer: 15, options: [15, 14, 16, 17] }
    ],
    hard: [
      { questionText: "12 + 15", correctAnswer: 27, options: [27, 25, 29, 26] },
      { questionText: "18 + 14", correctAnswer: 32, options: [32, 30, 34, 31] },
      { questionText: "16 + 17", correctAnswer: 33, options: [33, 31, 35, 32] },
      { questionText: "19 + 13", correctAnswer: 32, options: [32, 30, 34, 31] },
      { questionText: "15 + 16", correctAnswer: 31, options: [31, 29, 33, 30] },
      { questionText: "17 + 15", correctAnswer: 32, options: [32, 31, 33, 30] },
      { questionText: "14 + 19", correctAnswer: 33, options: [33, 32, 34, 31] },
      { questionText: "16 + 16", correctAnswer: 32, options: [32, 31, 33, 30] },
      { questionText: "18 + 15", correctAnswer: 33, options: [33, 32, 34, 31] },
      { questionText: "17 + 17", correctAnswer: 34, options: [34, 33, 35, 32] },
      { questionText: "19 + 15", correctAnswer: 34, options: [34, 33, 35, 32] },
      { questionText: "16 + 19", correctAnswer: 35, options: [35, 34, 36, 33] },
      { questionText: "18 + 17", correctAnswer: 35, options: [35, 34, 36, 33] },
      { questionText: "19 + 16", correctAnswer: 35, options: [35, 34, 36, 33] },
      { questionText: "17 + 19", correctAnswer: 36, options: [36, 35, 37, 34] },
      { questionText: "18 + 18", correctAnswer: 36, options: [36, 35, 37, 34] },
      { questionText: "19 + 17", correctAnswer: 36, options: [36, 35, 37, 34] },
      { questionText: "18 + 19", correctAnswer: 37, options: [37, 36, 38, 35] },
      { questionText: "19 + 18", correctAnswer: 37, options: [37, 36, 38, 35] },
      { questionText: "19 + 19", correctAnswer: 38, options: [38, 37, 39, 36] }
    ]
  },
  subtraction: {
    easy: [
      { questionText: "5 - 2", correctAnswer: 3, options: [3, 2, 4, 1] },
      { questionText: "4 - 1", correctAnswer: 3, options: [3, 2, 4, 5] },
      { questionText: "5 - 3", correctAnswer: 2, options: [2, 3, 1, 4] },
      { questionText: "4 - 2", correctAnswer: 2, options: [2, 3, 1, 4] },
      { questionText: "3 - 1", correctAnswer: 2, options: [2, 1, 3, 0] },
      { questionText: "5 - 1", correctAnswer: 4, options: [4, 3, 5, 2] },
      { questionText: "4 - 3", correctAnswer: 1, options: [1, 2, 0, 3] },
      { questionText: "3 - 2", correctAnswer: 1, options: [1, 2, 0, 3] },
      { questionText: "5 - 4", correctAnswer: 1, options: [1, 2, 0, 3] },
      { questionText: "2 - 1", correctAnswer: 1, options: [1, 0, 2, 3] }
    ],
    normal: [
      { questionText: "12 - 5", correctAnswer: 7, options: [7, 6, 8, 5] },
      { questionText: "15 - 8", correctAnswer: 7, options: [7, 6, 9, 8] },
      { questionText: "14 - 6", correctAnswer: 8, options: [8, 7, 9, 6] },
      { questionText: "13 - 7", correctAnswer: 6, options: [6, 5, 7, 8] },
      { questionText: "16 - 9", correctAnswer: 7, options: [7, 8, 6, 5] },
      { questionText: "11 - 4", correctAnswer: 7, options: [7, 6, 8, 5] },
      { questionText: "17 - 9", correctAnswer: 8, options: [8, 7, 9, 6] },
      { questionText: "13 - 5", correctAnswer: 8, options: [8, 7, 9, 6] },
      { questionText: "14 - 8", correctAnswer: 6, options: [6, 5, 7, 8] },
      { questionText: "16 - 7", correctAnswer: 9, options: [9, 8, 10, 7] },
      { questionText: "18 - 9", correctAnswer: 9, options: [9, 8, 10, 7] },
      { questionText: "15 - 7", correctAnswer: 8, options: [8, 7, 9, 6] },
      { questionText: "12 - 6", correctAnswer: 6, options: [6, 5, 7, 8] },
      { questionText: "17 - 8", correctAnswer: 9, options: [9, 8, 10, 7] },
      { questionText: "14 - 5", correctAnswer: 9, options: [9, 8, 10, 7] }
    ],
    hard: [
      { questionText: "25 - 12", correctAnswer: 13, options: [13, 12, 14, 11] },
      { questionText: "28 - 15", correctAnswer: 13, options: [13, 12, 14, 15] },
      { questionText: "31 - 17", correctAnswer: 14, options: [14, 13, 15, 16] },
      { questionText: "27 - 13", correctAnswer: 14, options: [14, 13, 15, 12] },
      { questionText: "29 - 16", correctAnswer: 13, options: [13, 14, 12, 15] },
      { questionText: "32 - 18", correctAnswer: 14, options: [14, 13, 15, 16] },
      { questionText: "26 - 11", correctAnswer: 15, options: [15, 14, 16, 13] },
      { questionText: "33 - 19", correctAnswer: 14, options: [14, 15, 13, 16] },
      { questionText: "30 - 15", correctAnswer: 15, options: [15, 14, 16, 13] },
      { questionText: "35 - 19", correctAnswer: 16, options: [16, 15, 17, 14] },
      { questionText: "28 - 14", correctAnswer: 14, options: [14, 13, 15, 16] },
      { questionText: "34 - 18", correctAnswer: 16, options: [16, 15, 17, 14] },
      { questionText: "31 - 16", correctAnswer: 15, options: [15, 14, 16, 17] },
      { questionText: "36 - 19", correctAnswer: 17, options: [17, 16, 18, 15] },
      { questionText: "33 - 17", correctAnswer: 16, options: [16, 15, 17, 18] },
      { questionText: "29 - 13", correctAnswer: 16, options: [16, 15, 17, 14] },
      { questionText: "35 - 18", correctAnswer: 17, options: [17, 16, 18, 15] },
      { questionText: "32 - 15", correctAnswer: 17, options: [17, 16, 18, 15] },
      { questionText: "37 - 19", correctAnswer: 18, options: [18, 17, 19, 16] },
      { questionText: "34 - 16", correctAnswer: 18, options: [18, 17, 19, 16] }
    ]
  },
  multiplication: {
    easy: [
      { questionText: "2 × 1", correctAnswer: 2, options: [2, 3, 1, 4] },
      { questionText: "1 × 3", correctAnswer: 3, options: [3, 2, 4, 1] },
      { questionText: "2 × 2", correctAnswer: 4, options: [4, 3, 5, 2] },
      { questionText: "3 × 1", correctAnswer: 3, options: [3, 4, 2, 5] },
      { questionText: "1 × 4", correctAnswer: 4, options: [4, 3, 5, 2] },
      { questionText: "2 × 3", correctAnswer: 6, options: [6, 5, 7, 4] },
      { questionText: "3 × 2", correctAnswer: 6, options: [6, 5, 7, 4] },
      { questionText: "4 × 1", correctAnswer: 4, options: [4, 5, 3, 6] },
      { questionText: "1 × 5", correctAnswer: 5, options: [5, 4, 6, 3] },
      { questionText: "2 × 4", correctAnswer: 8, options: [8, 7, 9, 6] }
    ],
    normal: [
      { questionText: "4 × 3", correctAnswer: 12, options: [12, 11, 13, 10] },
      { questionText: "3 × 5", correctAnswer: 15, options: [15, 14, 16, 12] },
      { questionText: "4 × 4", correctAnswer: 16, options: [16, 15, 17, 14] },
      { questionText: "5 × 3", correctAnswer: 15, options: [15, 14, 16, 13] },
      { questionText: "3 × 6", correctAnswer: 18, options: [18, 17, 19, 16] },
      { questionText: "4 × 5", correctAnswer: 20, options: [20, 19, 21, 18] },
      { questionText: "6 × 3", correctAnswer: 18, options: [18, 17, 19, 16] },
      { questionText: "5 × 4", correctAnswer: 20, options: [20, 19, 21, 18] },
      { questionText: "3 × 7", correctAnswer: 21, options: [21, 20, 22, 19] },
      { questionText: "4 × 6", correctAnswer: 24, options: [24, 23, 25, 22] },
      { questionText: "7 × 3", correctAnswer: 21, options: [21, 20, 22, 19] },
      { questionText: "5 × 5", correctAnswer: 25, options: [25, 24, 26, 23] },
      { questionText: "6 × 4", correctAnswer: 24, options: [24, 23, 25, 22] },
      { questionText: "3 × 8", correctAnswer: 24, options: [24, 23, 25, 22] },
      { questionText: "4 × 7", correctAnswer: 28, options: [28, 27, 29, 26] }
    ],
    hard: [
      { questionText: "6 × 6", correctAnswer: 36, options: [36, 35, 37, 34] },
      { questionText: "7 × 5", correctAnswer: 35, options: [35, 34, 36, 33] },
      { questionText: "8 × 4", correctAnswer: 32, options: [32, 31, 33, 30] },
      { questionText: "6 × 7", correctAnswer: 42, options: [42, 41, 43, 40] },
      { questionText: "5 × 9", correctAnswer: 45, options: [45, 44, 46, 43] },
      { questionText: "8 × 6", correctAnswer: 48, options: [48, 47, 49, 46] },
      { questionText: "7 × 7", correctAnswer: 49, options: [49, 48, 50, 47] },
      { questionText: "9 × 6", correctAnswer: 54, options: [54, 53, 55, 52] },
      { questionText: "8 × 7", correctAnswer: 56, options: [56, 55, 57, 54] },
      { questionText: "6 × 9", correctAnswer: 54, options: [54, 53, 55, 52] },
      { questionText: "7 × 8", correctAnswer: 56, options: [56, 55, 57, 54] },
      { questionText: "9 × 7", correctAnswer: 63, options: [63, 62, 64, 61] },
      { questionText: "8 × 8", correctAnswer: 64, options: [64, 63, 65, 62] },
      { questionText: "7 × 9", correctAnswer: 63, options: [63, 62, 64, 61] },
      { questionText: "9 × 8", correctAnswer: 72, options: [72, 71, 73, 70] },
      { questionText: "8 × 9", correctAnswer: 72, options: [72, 71, 73, 70] },
      { questionText: "9 × 9", correctAnswer: 81, options: [81, 80, 82, 79] },
      { questionText: "7 × 6", correctAnswer: 42, options: [42, 41, 43, 40] },
      { questionText: "8 × 5", correctAnswer: 40, options: [40, 39, 41, 38] },
      { questionText: "6 × 8", correctAnswer: 48, options: [48, 47, 49, 46] }
    ]
  }
};

// Add this function to shuffle the questions
const shuffleQuestions = (category, level) => {
  const questions = [...questionBank[category][level]];
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
};

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


  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setLevel(null);
    setQuestion(null);
  };


  const handleDifficultySelect = (diff) => {
    try {
      setIsLoading(true);
      setLevel(diff);
      
      // Get shuffled questions for this category and difficulty
      const shuffledQuestions = shuffleQuestions(category, diff);
      setQuestion(shuffledQuestions[0]); // Use first question from shuffled array
      setQuestionsCount(0);
    } catch (error) {
      console.error('Error selecting difficulty:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const postGameResults = async () => {
    try {
      const gameData = {
        playerName: playerName,
        gameName: gameName,
        difficulty: Level,
        score: score,
        missedScore: missedScore
      };

      console.log('Sending game data:', gameData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/games`, gameData);
      console.log('Game results posted successfully:', response.data);
      
    } catch (error) {
      console.error('Error posting game results:', error);
      toast.error('Failed to save game results', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'error-toast'
      });
    }
  };


  const handleAnswer = async (selectedAnswer) => {
    if (isLoading || answered) return; // Prevent multiple clicks
    
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
          postGameResults();
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
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      if (questionsCount + 1 < questionLimit[Level]) {
        const shuffledQuestions = shuffleQuestions(category, Level);
        const nextQuestion = shuffledQuestions[questionsCount + 1];
        
        setQuestion(nextQuestion);
        setAnswered(false);
        setAnimate(false);
        setTimeout(() => setAnimate(true), 10);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error getting next question:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  const handlePlayAgain = () => {
    console.log("Play Again clicked");
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

  const handleExit = () => {
    console.log("Exit clicked");
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
                  height: '7vh',
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
                  height: '7vh',
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
                    <div className="relative w-[500px] h-[90px] flex justify-center items-center">
                      <button
                        className={`bg-[#FFC87A] text-[#7E4F0E] text-lg font-bold py-3 px-6 rounded-lg shadow-lg 
                          hover:bg-[#FFD59E] transition duration-300 mt-8 p-4 md:ml-[13rem]
                          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        style={{ filter: "brightness(100%)" }}
                        onClick={handleNextQuestion}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Next Question'}
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


