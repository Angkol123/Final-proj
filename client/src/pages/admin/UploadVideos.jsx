import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoModal from "../../components/VideoModal";
import { FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadVideos() {
  const [username, setUserName] = useState("");
  const [activeSection, setActiveSection] = useState("uploaded");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showMenu, setShowMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  // Date 
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/video`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleUpload = async ({ name, description, file }) => {
    if (!file || !name || !description) {
      toast.warn("Please complete all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/video/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log('Upload response:', response.data); // Debug log

      setLoading(false);
      toast.success("Video uploaded successfully", {
        className: "error-success",
      });
      fetchVideos();
      setIsModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error('Upload error:', error.response || error); // Enhanced error logging
      toast.error("Error uploading video", {
        className: "error-error",
      });
    }
  };

  const confirmDelete = (video) => {
    setVideoToDelete(video);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${process.env.REACT_APP_API_URL}/video/${videoToDelete.id}`);
      setLoading(false);
      toast.success("Video deleted successfully", {
        className: "error-success",
      });
      fetchVideos();
      setDeleteModal(false);
      setShowMenu(null);
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting video", {
        className: "error-error",
      });
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video.id);
    setEditName(video.name);
    setEditDescription(video.description);
    setShowMenu(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${process.env.REACT_APP_API_URL}/video/${id}`, {
        name: editName,
        description: editDescription,
      });
      setLoading(false);
      toast.success("Video updated successfully", {
        className: "error-success",
      });
      setEditingVideo(null);
      fetchVideos();
    } catch (error) {
      setLoading(false);
      toast.error("Error updating video", {
        className: "error-error",
      });
      console.error("Error updating video:", error);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);

      // Format the current date
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
    }
  }, []);

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    return nameParts[0]?.charAt(0).toUpperCase() + nameParts[1]?.charAt(0).toUpperCase();
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white font-bold text-lg">Loading...</div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FFF0DD] p-6 rounded shadow-lg w-[30vw] h-[25vh]">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you want to delete the video <strong>{videoToDelete?.name}</strong>?</p>
            <div className="flex justify-between gap-4 px-9 mt-9">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-[#F2B053] text-gray-800 py-2 px-4 rounded hover:bg-[#f2a335]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#F2B053] text-gray-800 py-2 px-4 rounded hover:bg-[#f2a335]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
     

      {/* Sections */}
      <h2 className="text-[1.5rem] font-bold ml-9 text-[#F47C21]">Videos</h2>
      <div className="w-full h-[8vh] flex gap-9 items-center pl-9">
  <h2
    onClick={() => setActiveSection("uploaded")}
    className={`cursor-pointer relative ${activeSection === "uploaded" ? "font-bold text-[#D18A26]" : ""}`}
  >
    Uploaded
    {activeSection === "uploaded" && (
      <span
        className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 bg-[#D18A26] h-[2px]"
        style={{ width: "69%" }}
      ></span>
    )}
  </h2>
  
  <h2
    onClick={() => setActiveSection("upload")}
    className={`cursor-pointer relative ${activeSection === "upload" ? "font-bold text-[#D18A26]" : ""}`}
  >
    Upload
    {activeSection === "upload" && (
      <span
        className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 bg-[#D18A26] h-[2px]"
        style={{ width: "69%" }}
      ></span>
    )}
  </h2>
</div>


      {/* Uploaded Videos */}
      {activeSection === "uploaded" && (
        <div className="shadow-lg w-full h-[80vh] rounded-lg overflow-auto  ">
          <div className="grid grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-white shadow-md rounded overflow-hidden relative border border-[orange]">
                <video controls src={video.url} className="w-full h-48" />
                <div className="p-4">
                  {editingVideo === video.id ? (
                    <>
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full mb-2 p-1 border rounded" />
                      <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full mb-2 p-1 border rounded" />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingVideo(null)} className="p-1 rounded hover:bg-gray-100"><FiX className="text-red-500" /></button>
                        <button onClick={() => handleSaveEdit(video.id)} className="p-1 rounded hover:bg-gray-100"><FiCheck className="text-green-500" /></button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">{video.name}</h3>
                          <p className="text-gray-700">{video.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(video)} className="text-gray-500 hover:text-blue-500">
                            <FiEdit2 />
                          </button>
                          <button onClick={() => confirmDelete(video)} className="text-gray-500 hover:text-red-500">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Section */}
      {activeSection === "upload" && (
        <div className="h-[60vh] flex items-center justify-center">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#EB9721] text-white py-2 px-4 rounded hover:bg-[#EB9721]">Upload Video</button>
        </div>
      )}

      {/* Video Modal */}
      {isModalOpen && (
        <VideoModal
        isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

export default UploadVideos;
