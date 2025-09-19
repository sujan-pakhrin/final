import { FiX } from 'react-icons/fi'

const OrdersDropdown = ({onClose}) => {
  const orders = [
    { id: "ORD001", status: "Delivered", date: "2024-01-15", total: "$125.99" },
    { id: "ORD002", status: "Shipped", date: "2024-01-20", total: "$89.50" },
    { id: "ORD003", status: "Processing", date: "2024-01-22", total: "$199.99" },
  ];

  return (
    <div className="absolute top-full right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {orders.map((order) => (
            <div key={order.id} className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-800">#{order.id}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{order.date}</span>
                <span className="font-medium">{order.total}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrdersDropdown