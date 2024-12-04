import React from 'react';

const RetryLimitModal = ({ show, difficulty, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-xl font-semibold text-red-600">Retry Limit Reached</h2>
        <p className="text-gray-700 mt-4">
          You have reached the retry limit for <strong>{difficulty}</strong>.
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default RetryLimitModal;
