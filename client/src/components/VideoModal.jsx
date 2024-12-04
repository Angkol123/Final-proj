import React, { useState } from "react";

const VideoModal = ({ isOpen, onClose, onUpload }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !file) {
      alert("Please fill in all fields and select a file!");
      return;
    }
    onUpload({ name, description, file });
    onClose();
    setName("");
    setDescription("");
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 ">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline focus:outline-[#CD9A57]" placeholder="Enter video name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline focus:outline-[#CD9A57]" placeholder="Enter description" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Upload Video</label>
            <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F2B053] text-white rounded-md hover:bg-[#F2B053]">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoModal;
