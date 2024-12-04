import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing Axios
import dropdownIcon from "../../images/Dashboard/dropdownIcon.png";
import { FaTrash } from 'react-icons/fa'; // Import trash icon
import { toast } from 'react-toastify'; // Import toast for notifications

const User = () => {
  const [students, setStudents] = useState([]); // Stores the list of students fetched from the API
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search query entered by the user
  const [userData, setUserData] = useState([]); // Stores the filtered user data to be displayed
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Move fetchStudents before useEffect
  const fetchStudents = async () => {
    try {
      // Replace this with your actual API URL
      const response = await axios.get('http://localhost:3000/auth/users');
      setStudents(response.data); // Set the fetched data to the students state
      setUserData(response.data); // Initially, display all users
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array means this will run only once when the component mounts

  // Function to filter the user data based on the search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter students based on the name or email
    const filteredData = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(query) || 
        student.email.toLowerCase().includes(query)
      );
    });
    setUserData(filteredData); // Set filtered data to be displayed in the table
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/auth/users/${userToDelete.id}`);
      toast.success('User deleted successfully');
      fetchStudents(); // Refresh the list
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="p-8 bg-[#FAF3EB] h-[93vh] overflow-auto">
      <h1 className="text-3xl font-bold text-[#F47C21] mb-8">List of Users</h1>

      {/* Search Box */}
      <div className="flex justify-end mb-6">
        <div className="relative w-[25%]">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch} // Update the search query as user types
            className="w-full p-3 border border-gray-300 rounded bg-[#FBF7F0] focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
          />
          <img
            src={dropdownIcon}
            alt="Dropdown Icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto"  style={{ height: '60vh' }}>
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-[#EB9721] sticky top-0 z-10">
            <tr>
              <th className="border border-[#E5E5E5] px-6 py-3 text-center text-[#333333] font-semibold text-lg">User</th>
              <th className="border border-[#E5E5E5] px-6 py-3 text-center text-[#333333] font-semibold text-lg">Email</th>
              <th className="border border-[#E5E5E5] px-6 py-3 text-center text-[#333333] font-semibold text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <tr key={user.id} className="bg-[#FBF7F0] hover:bg-[#F9E1B8]">
                  <td className="border border-[#E5E5E5] px-6 py-4 text-gray-700 text-left">{user.name}</td>
                  <td className="border border-[#E5E5E5] px-6 py-4 text-gray-700 text-left">{user.email}</td>
                  <td className="border border-[#E5E5E5] px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      title="Delete User"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-700">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold text-[#F47C21] mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete user <span className="font-semibold">{userToDelete?.name}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
