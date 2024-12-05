import React, { useState, useEffect } from 'react';

const ScoreTracking = () => {
  const [students, setStudents] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [gamesLevel, setGamesLevel] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("All");
  const [selectedTournament, setSelectedTournament] = useState("All");
  const [selectedGameLevel, setSelectedGameLevel] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [scoreData, setScoreData] = useState([]);
  const [username, setUserName] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/games`); // Replace with your API endpoint
        const data = await response.json();

        const uniqueTournaments = [...new Set(data.map((item) => item.gameName))];
        const uniqueStudents = [...new Set(data.map((item) => item.playerName))];

        setScoreData(data);
        setTournaments(uniqueTournaments);
        setStudents(uniqueStudents.map((name, id) => ({ id, name })));
        setGamesLevel(["Easy", "Normal", "Hard"]); // Replace with actual levels if available
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchScoreData();
  }, []);

  // Fetch username
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setUserName(name);
  }, []);

  // Filter scores based on selected criteria
  const filteredScores = scoreData.filter((data) => {
    const dateMatch = selectedDate ? data.playDate === selectedDate : true;
    const studentMatch = selectedStudent === "All" || data.playerName === selectedStudent;
    const tournamentMatch = selectedTournament === "All" || data.gameName === selectedTournament;
    const levelMatch = selectedGameLevel === "All" || data.difficulty === selectedGameLevel;

    return dateMatch && studentMatch && tournamentMatch && levelMatch;
  });

  const renderStars = (score) => {
    const stars = Math.round(score / 10);
    return (
      <span>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={index < stars ? "text-yellow-500" : "text-gray-300"}>★</span>
        ))}
      </span>
    );
  };

  return (
    <div className="p-8 bg-[#FAF3EB] h-[92vh]">
      <h2 className="text-3xl font-bold text-[#F47C21] mb-6">Score Tracking</h2>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-6 justify-center">
        {/* Student Filter */}
        <div>
          <label className="block font-semibold mb-2">Student Name</label>
          <select
            className="w-1/2 p-2 border border-gray-300 rounded"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="All">All</option>
            {students.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block font-semibold mb-2">Date</label>
          <input
            type="date"
            className="w-1/2 p-2 border border-gray-300 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Game Filter */}
        <div>
          <label className="block font-semibold mb-2">Games</label>
          <select
            className="w-1/2 p-2 border border-gray-300 rounded"
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
          >
            <option value="All">All</option>
            {tournaments.map((tournament, index) => (
              <option key={index} value={tournament}>
                {tournament}
              </option>
            ))}
          </select>
        </div>

        {/* Game Level Filter */}
        <div>
          <label className="block font-semibold mb-2">Games Level</label>
          <select
            className="w-1/2 p-2 border border-gray-300 rounded"
            value={selectedGameLevel}
            onChange={(e) => setSelectedGameLevel(e.target.value)}
          >
            <option value="All">All</option>
            {gamesLevel.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Updated Table with Sticky Header */}
      <div className="overflow-auto" style={{ height: '55vh' }}>
        <table className="w-full border-collapse border border-[#EADFD2] rounded-lg shadow-md">
          <thead className="bg-[#EB9721] sticky top-0" style={{ filter: "brightness(1.2)" }}>
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Student Name</th>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Games</th>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Games Level</th>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Score</th>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Missed</th>
              <th className="px-6 py-3 text-left font-semibold text-black-600 border-b border-[#EADFD2]">Stars Received</th>
            </tr>
          </thead>
          <tbody>
            {filteredScores.length > 0 ? (
              filteredScores.map((data, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FBF7F0]'
                  } border-t border-[#db8e30]`}
                >
                  <td className="px-6 py-4 rounded-l-lg truncate">{data.playerName}</td>
                  <td className="px-6 py-4 truncate">{data.playDate}</td>
                  <td className="px-6 py-4 truncate">{data.gameName}</td>
                  <td className="px-6 py-4 truncate">{data.difficulty}</td> 
                  <td className="px-6 py-4 truncate">{data.score}</td>
                  <td className="px-6 py-4 truncate">{data.missedScore || 0}</td>
                  <td className="px-6 py-4 rounded-r-lg truncate">{renderStars(data.score)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7" // Updated colspan to match new column count
                  className="px-6 py-4 text-center text-gray-500 bg-[#FBF7F0] rounded-lg"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTracking;
