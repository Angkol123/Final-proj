const Modal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    );
  };