import React, { useState, useEffect } from 'react'
import { FaUsers, FaShoppingCart, FaBox, FaDollarSign, FaChartLine, FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  })

  const [recentUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', joinDate: '2024-09-01', status: 'Active', avatar: 'JS' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinDate: '2024-08-28', status: 'Active', avatar: 'SJ' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@email.com', joinDate: '2024-08-25', status: 'Pending', avatar: 'MC' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@email.com', joinDate: '2024-08-22', status: 'Active', avatar: 'ED' },
    { id: 5, name: 'Alex Rodriguez', email: 'alex.r@email.com', joinDate: '2024-08-20', status: 'Inactive', avatar: 'AR' }
  ])

  useEffect(() => {
    const animateStats = () => {
      const targets = { totalUsers: 2847, totalOrders: 1203, totalProducts: 456, totalRevenue: 89420 }
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOutProgress = 1 - Math.pow(1 - progress, 3)

        setStats({
          totalUsers: Math.floor(targets.totalUsers * easeOutProgress),
          totalOrders: Math.floor(targets.totalOrders * easeOutProgress),
          totalProducts: Math.floor(targets.totalProducts * easeOutProgress),
          totalRevenue: Math.floor(targets.totalRevenue * easeOutProgress)
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setStats(targets)
        }
      }, stepTime)

      return () => clearInterval(timer)
    }

    animateStats()
  }, [])

  const StatCard = ({ icon: Icon, title, value, change, color, prefix = '', suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {prefix}{value.toLocaleString()}{suffix}
          </p>
          <div className="flex items-center mt-2">
            <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 text-sm font-semibold">{change}</span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaUsers}
            title="Total Users"
            value={stats.totalUsers}
            change="+12.5%"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={FaShoppingCart}
            title="Total Orders"
            value={stats.totalOrders}
            change="+8.3%"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            icon={FaBox}
            title="Total Products"
            value={stats.totalProducts}
            change="+15.2%"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            icon={FaDollarSign}
            title="Total Revenue"
            value={stats.totalRevenue}
            change="+23.1%"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            prefix="$"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Users</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
                <FaEye className="w-4 h-4 mr-2" />
                View All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{formatDate(user.joinDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 flex items-center mr-3">
                        <FaEdit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center">
                        <FaTrash className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Dashboard
