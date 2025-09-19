import {  useContext } from 'react'
import { FiUser, FiX } from 'react-icons/fi'
import { AuthContext } from '../../context/AuthContext';
const ProfileDropdown = ({ onClose }) => {
    const {user}=useContext(AuthContext);
    console.log(user)
  return (
  <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">My Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all duration-300">
              Edit Profile
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all duration-300">
              Account Settings
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all duration-300">
              Privacy Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown