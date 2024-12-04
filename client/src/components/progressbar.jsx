// ProgressBar.js
import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0)); // Loop from 0 to 100
    }, 100); // Adjust speed here if needed (e.g., 100ms per step)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-200 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
