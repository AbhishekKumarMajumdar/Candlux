'use client';

import React, { useState, useEffect } from 'react';
import {
  Package, // Products
  ListOrdered, // Orders
  Users, // Users
  Settings, // Settings
  PlusCircle, // Add New
  Edit, // Edit
  Trash2, // Delete
  Search, // Search (not used for these filters, but kept)
  X, // Close
  ShieldCheck, // Admin specific icon
  Eye, // View
  FolderKanban, // Icon for Projects
  BarChart2, // Icon for Analytics
  ListChecks, // Icon for Payment Details (new)
} from 'lucide-react';
// Recharts imports for graphs
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/**
 * AdminDashboardPage Component
 * Provides a simulated administrative interface for managing products, orders, users, projects, and payment details.
 * Features a sidebar navigation, content sections for each management area, and an Analytics dashboard.
 * In a real application, all data would be fetched from and sent to backend APIs.
 */
export default function AdminDashboardPage() {
  // State to manage the currently active section in the dashboard
  const [activeSection, setActiveSection] = useState('products'); // Default to 'products'
  // State to control mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Simulated Data for Admin Panel (Replace with API Calls in Production) ---
  const [products, setProducts] = useState([
    { id: 'prod001', name: 'Lavender Calm Candle', category: 'Scented', price: 499, stock: 150, status: 'Active', image: 'https://placehold.co/100x100/3f3f46/facc15?text=Candle1' },
    { id: 'prod002', name: 'Vanilla Spice Glow', category: 'Scented', price: 599, stock: 80, status: 'Active', image: 'https://placehold.co/100x100/3f3f46/facc15?text=Candle2' },
    { id: 'prod003', name: 'Rose Essence Jar', category: 'Decorative', price: 699, stock: 200, status: 'Active', image: 'https://placehold.co/100x100/3f3f46/facc15?text=Candle3' },
    { id: 'prod004', name: 'Coconut Luxe Candle', category: 'Scented', price: 799, stock: 50, status: 'Low Stock', image: 'https://placehold.co/100x100/3f3f46/facc15?text=Candle4' },
    { id: 'prod005', name: 'Forest Pine Pillar', category: 'Pillar', price: 629, stock: 120, status: 'Inactive', image: 'https://placehold.co/100x100/3f3f46/facc15?text=Candle5' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'Alice Smith', total: 799.00, status: 'Pending', date: '2024-06-15' },
    { id: 'ORD002', customer: 'Bob Johnson', total: 1249.50, status: 'Processing', date: '2024-06-14' },
    { id: 'ORD003', customer: 'Charlie Brown', total: 399.00, status: 'Shipped', date: '2024-06-13' },
    { id: 'ORD004', customer: 'Diana Prince', total: 850.00, status: 'Delivered', date: '2024-06-10' },
    { id: 'ORD005', customer: 'Eve Williams', total: 250.00, status: 'Cancelled', date: '2024-06-08' },
  ]);

  const [users, setUsers] = useState([
    { id: 'user001', name: 'Alice Smith', email: 'alice@example.com', role: 'Customer', registered: '2023-01-20' },
    { id: 'user002', name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', registered: '2023-03-10' },
    { id: 'user003', name: 'Admin User', email: 'admin@example.com', role: 'Admin', registered: '2022-11-01' },
  ]);

  // --- States for Project Management ---
  const [projects, setProjects] = useState([
    { id: 'proj001', name: 'Website Redesign', description: 'Complete overhaul of the e-commerce website UI/UX.', status: 'In Progress', startDate: '2024-03-01', endDate: '2024-09-30' },
    { id: 'proj002', name: 'New Product Line Launch', description: 'Introduction of eco-friendly candle line.', status: 'Planned', startDate: '2024-07-01', endDate: '2024-08-15' },
    { id: 'proj003', name: 'Marketing Campaign Q3', description: 'Develop and execute social media and email campaigns.', status: 'Completed', startDate: '2024-04-01', endDate: '2024-06-30' },
  ]);

  // --- States for Payment Details (NEW) ---
  const [paymentTransactions, setPaymentTransactions] = useState([
    { id: 'TXN001', orderId: 'ORD001', amount: 799.00, method: 'Razorpay', status: 'Success', date: '2024-06-15', customerEmail: 'alice@example.com' },
    { id: 'TXN002', orderId: 'ORD002', amount: 1249.50, method: 'Razorpay', status: 'Success', date: '2024-06-14', customerEmail: 'bob@example.com' },
    { id: 'TXN003', orderId: 'ORD003', amount: 399.00, method: 'Razorpay', status: 'Success', date: '2024-06-13', customerEmail: 'charlie@example.com' },
    { id: 'TXN004', orderId: 'ORD005', amount: 250.00, method: 'Razorpay', status: 'Failed', date: '2024-06-08', customerEmail: 'eve@example.com' },
    { id: 'TXN005', orderId: 'ORD004', amount: 850.00, method: 'Razorpay', status: 'Success', date: '2024-06-10', customerEmail: 'diana@example.com' },
  ]);

  // --- States for Analytics Data ---
  const [analytics, setAnalytics] = useState({
    totalUsers: users.length, // Dynamically get user count
    totalProducts: products.length, // Dynamically get product count
    productOfTheMonth: { name: 'Vanilla Spice Glow', sales: 250, image: 'https://placehold.co/100x100/3f3f46/facc15?text=Vanilla' },
    monthlyRevenue: [
      { name: 'Jan', Revenue: 40000 },
      { name: 'Feb', Revenue: 30000 },
      { name: 'Mar', Revenue: 20000 },
      { name: 'Apr', Revenue: 27800 },
      { name: 'May', Revenue: 18900 },
      { name: 'Jun', Revenue: 23900 },
      { name: 'Jul', Revenue: 34900 },
    ],
  });

  // States for product form (add/edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null); // Null for add, product object for edit
  const [productForm, setProductForm] = useState({
    id: '', name: '', category: '', price: '', stock: '', status: '', image: '', // Added image field
  });

  // States for order view modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  // States for user view modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // States for project form (add/edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null); // Null for add, project object for edit
  const [projectForm, setProjectForm] = useState({
    id: '', name: '', description: '', status: '', startDate: '', endDate: '',
  });

  // --- New Filter States ---
  const [productFilterStatus, setProductFilterStatus] = useState('All');
  const [orderFilterStatus, setOrderFilterStatus] = useState('All');
  const [paymentFilterStatus, setPaymentFilterStatus] = useState('All'); // New payment filter state

  /**
   * Opens the product modal for adding a new product.
   */
  const handleAddNewProduct = () => {
    setCurrentProduct(null); // Clear current product for "Add" mode
    setProductForm({ id: `prod${Date.now()}`, name: '', category: '', price: '', stock: '', status: 'Active', image: 'https://placehold.co/100x100/3f3f46/facc15?text=New' });
    setIsProductModalOpen(true);
  };

  /**
   * Opens the product modal for editing an existing product.
   * @param {Object} product - The product object to be edited.
   */
  const handleEditProduct = (product: any) => {
    setCurrentProduct(product); // Set current product for "Edit" mode
    // Populate form with existing product data, convert numbers to string for input
    setProductForm({ ...product, price: product.price.toString(), stock: product.stock.toString() });
    setIsProductModalOpen(true);
  };

  /**
   * Handles saving a product (either adding new or updating existing).
   * In a real app, this would be an API call (POST or PUT).
   */
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price), // Convert price back to number
      stock: parseInt(productForm.stock), // Convert stock back to number
    };

    if (currentProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === productData.id ? productData : p));
      console.log('Updating product:', productData);
      // API call: PUT /api/products/{id} with productData
    } else {
      // Add new product
      setProducts([...products, productData]);
      console.log('Adding new product:', productData);
      // API call: POST /api/products with productData
    }
    setIsProductModalOpen(false);
    // Update total products in analytics
    setAnalytics(prev => ({ ...prev, totalProducts: products.length + (currentProduct ? 0 : 1) }));
  };

  /**
   * Handles deleting a product.
   * In a real app, this would be an API call (DELETE).
   * @param {string} id - The ID of the product to delete.
   */
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      console.log('Deleting product with ID:', id);
      // API call: DELETE /api/products/{id}
      setAnalytics(prev => ({ ...prev, totalProducts: products.length - 1 })); // Update total products
    }
  };

  /**
   * Opens the order details modal.
   * @param {Object} order - The order object to display.
   */
  const handleViewOrder = (order: any) => {
    setCurrentOrder(order);
    setIsOrderModalOpen(true);
  };

  /**
   * Handles updating the status of an order.
   * In a real app, this would be an API call (PUT).
   * @param {string} id - The ID of the order to update.
   * @param {string} newStatus - The new status for the order.
   */
  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    console.log(`Updating order ${id} status to: ${newStatus}`);
    // API call: PUT /api/orders/{id} with { status: newStatus }
  };

  /**
   * Handles deleting an order.
   * @param {string} id - The ID of the order to delete.
   */
  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
      console.log('Deleting order with ID:', id);
      // API call: DELETE /api/orders/{id}
    }
  };

  /**
   * Opens the user details modal.
   * @param {Object} user - The user object to display.
   */
  const handleViewUser = (user: any) => {
    setCurrentUser(user);
    setIsUserModalOpen(true);
  };

  /**
   * Handles deleting a user.
   * @param {string} id - The ID of the user to delete.
   */
  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      console.log('Deleting user with ID:', id);
      // API call: DELETE /api/users/{id}
      setAnalytics(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 })); // Update total users
    }
  };

  /**
   * Opens the project modal for adding a new project.
   */
  const handleAddNewProject = () => {
    setCurrentProject(null); // Clear current project for "Add" mode
    setProjectForm({ id: `proj${Date.now()}`, name: '', description: '', status: 'Planned', startDate: '', endDate: '' });
    setIsProjectModalOpen(true);
  };

  /**
   * Opens the project modal for editing an existing project.
   * @param {Object} project - The project object to be edited.
   */
  const handleEditProject = (project: any) => {
    setCurrentProject(project); // Set current project for "Edit" mode
    setProjectForm({ ...project }); // Populate form with existing project data
    setIsProjectModalOpen(true);
  };

  /**
   * Handles saving a project (either adding new or updating existing).
   * In a real app, this would be an API call (POST or PUT).
   */
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = { ...projectForm };

    if (currentProject) {
      // Update existing project
      setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
      console.log('Updating project:', projectData);
      // API call: PUT /api/projects/{id} with projectData
    } else {
      // Add new project
      setProjects([...projects, projectData]);
      console.log('Adding new project:', projectData);
      // API call: POST /api/projects with projectData
    }
    setIsProjectModalOpen(false);
  };

  /**
   * Handles deleting a project.
   * In a real app, this would be an API call (DELETE).
   * @param {string} id - The ID of the project to delete.
   */
  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
      console.log('Deleting project with ID:', id);
      // API call: DELETE /api/projects/{id}
    }
  };


  // --- Helper function for dynamic sidebar classes ---
  const getSidebarLinkClass = (section: string) => `
    flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-colors duration-200
    ${activeSection === section ? 'bg-yellow-400 text-black' : 'hover:bg-zinc-700 text-zinc-200'}
  `;

  // --- Filtered Data Logic ---
  const filteredProducts = products.filter(product => {
    if (productFilterStatus === 'All') return true;
    return product.status === productFilterStatus;
  });

  const filteredOrders = orders.filter(order => {
    if (orderFilterStatus === 'All') return true;
    return order.status === orderFilterStatus;
  });

  const filteredPaymentTransactions = paymentTransactions.filter(transaction => {
    if (paymentFilterStatus === 'All') return true;
    return transaction.status === paymentFilterStatus;
  });


  // --- Render content based on active section ---
  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-2xl font-bold">Product Management</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <select
                  value={productFilterStatus}
                  onChange={(e) => setProductFilterStatus(e.target.value)}
                  className="p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button
                  onClick={handleAddNewProduct}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-300 transition-colors flex-shrink-0"
                >
                  <PlusCircle size={18} /> Add New
                </button>
              </div>
            </div>
            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tl-md">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredProducts.map((product) => ( // Use filteredProducts here
                    <tr key={product.id} className="hover:bg-zinc-800 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.currentTarget.src = "https://placehold.co/50x50/3f3f46/facc15?text=NoImg"; }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">₹{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'Active' ? 'bg-green-100 text-green-800' :
                          product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-400 hover:text-blue-300 mr-4"
                          title="Edit Product"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Add/Edit Modal */}
            {isProductModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-full max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={() => setIsProductModalOpen(false)} className="text-zinc-400 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label htmlFor="productName" className="block text-zinc-300 text-sm font-medium mb-1">Product Name</label>
                      <input
                        type="text"
                        id="productName"
                        name="name" // Added name attribute for consistency
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="productCategory" className="block text-zinc-300 text-sm font-medium mb-1">Category</label>
                      <input
                        type="text"
                        id="productCategory"
                        name="category" // Added name attribute
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="productImage" className="block text-zinc-300 text-sm font-medium mb-1">Image URL</label>
                      <input
                        type="text"
                        id="productImage"
                        name="image" // Added name attribute
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="productPrice" className="block text-zinc-300 text-sm font-medium mb-1">Price (₹)</label>
                        <input
                          type="number"
                          id="productPrice"
                          name="price" // Added name attribute
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          step="0.01"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="productStock" className="block text-zinc-300 text-sm font-medium mb-1">Stock</label>
                        <input
                          type="number"
                          id="productStock"
                          name="stock" // Added name attribute
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="productStatus" className="block text-zinc-300 text-sm font-medium mb-1">Status</label>
                      <select
                        id="productStatus"
                        name="status" // Added name attribute
                        value={productForm.status}
                        onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Low Stock">Low Stock</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold w-full hover:bg-yellow-300 transition-colors"
                    >
                      {currentProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'orders':
        return (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-2xl font-bold">Order Management</h3>
              <select
                value={orderFilterStatus}
                onChange={(e) => setOrderFilterStatus(e.target.value)}
                className="p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            {/* Order Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tl-md">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredOrders.map((order) => ( // Use filteredOrders here
                    <tr key={order.id} className="hover:bg-zinc-800 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">₹{order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`p-1 rounded-md text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800' // For Pending/Cancelled etc.
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-400 hover:text-blue-300 mr-4"
                          title="View Order Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Delete Order"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Details Modal */}
            {isOrderModalOpen && currentOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-full max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Order Details - {currentOrder.id}</h2>
                    <button onClick={() => setIsOrderModalOpen(false)} className="text-zinc-400 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-3 text-zinc-300">
                    <p><strong>Customer:</strong> {currentOrder.customer}</p>
                    <p><strong>Date:</strong> {currentOrder.date}</p>
                    <p><strong>Total:</strong> ₹{currentOrder.total.toFixed(2)}</p>
                    <p><strong>Status:</strong> {currentOrder.status}</p>
                    {/* Add more order details here (e.g., items, shipping address) */}
                    <h4 className="font-semibold mt-4">Order Items (Simulated)</h4>
                    <ul className="list-disc list-inside text-sm">
                        <li>Candle A x 2</li>
                        <li>Candle B x 1</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'users':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6">User Management</h3>
            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tl-md">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Registered</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-zinc-800 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{user.registered}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="text-blue-400 hover:text-blue-300 mr-4"
                          title="View User Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* User Details Modal */}
            {isUserModalOpen && currentUser && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-full max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">User Details - {currentUser.name}</h2>
                    <button onClick={() => setIsUserModalOpen(false)} className="text-zinc-400 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-3 text-zinc-300">
                    <p><strong>ID:</strong> {currentUser.id}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <p><strong>Role:</strong> {currentUser.role}</p>
                    <p><strong>Registered:</strong> {currentUser.registered}</p>
                    {/* Add more user details here (e.g., past orders, address) */}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Project Management</h3>
              <button
                onClick={handleAddNewProject}
                className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-300 transition-colors"
              >
                <PlusCircle size={18} /> Add New Project
              </button>
            </div>
            {/* Project Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tl-md">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-800 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{project.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{project.name}</td>
                      <td className="px-6 py-4 text-sm text-zinc-300 max-w-xs truncate">{project.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{project.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{project.endDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-blue-400 hover:text-blue-300 mr-4"
                          title="Edit Project"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Delete Project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Project Add/Edit Modal */}
            {isProjectModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-full max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{currentProject ? 'Edit Project' : 'Add New Project'}</h2>
                    <button onClick={() => setIsProjectModalOpen(false)} className="text-zinc-400 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div>
                      <label htmlFor="projectName" className="block text-zinc-300 text-sm font-medium mb-1">Project Name</label>
                      <input
                        type="text"
                        id="projectName"
                        name="name"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="projectDescription" className="block text-zinc-300 text-sm font-medium mb-1">Description</label>
                      <textarea
                        id="projectDescription"
                        name="description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24 resize-none"
                        placeholder="A brief description of the project"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="projectStatus" className="block text-zinc-300 text-sm font-medium mb-1">Status</label>
                      <select
                        id="projectStatus"
                        name="status"
                        value={projectForm.status}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                        className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="projectStartDate" className="block text-zinc-300 text-sm font-medium mb-1">Start Date</label>
                        <input
                          type="date"
                          id="projectStartDate"
                          name="startDate"
                          value={projectForm.startDate}
                          onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                          className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="projectEndDate" className="block text-zinc-300 text-sm font-medium mb-1">End Date</label>
                        <input
                          type="date"
                          id="projectEndDate"
                          name="endDate"
                          value={projectForm.endDate}
                          onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                          className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold w-full hover:bg-yellow-300 transition-colors"
                    >
                      {currentProject ? 'Update Project' : 'Add Project'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'paymentDetails': // New case for Payment Details
        return (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-2xl font-bold">Payment Details</h3>
              <select
                value={paymentFilterStatus}
                onChange={(e) => setPaymentFilterStatus(e.target.value)}
                className="p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
              >
                <option value="All">All Statuses</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            {/* Payment Transactions Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tl-md">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider rounded-tr-md">Customer Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredPaymentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-zinc-800 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{transaction.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">₹{transaction.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{transaction.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Success' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{transaction.customerEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6">Store Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Total Users Card */}
              <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center">
                <Users size={32} className="text-yellow-400 mx-auto mb-3" />
                <p className="text-zinc-300 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{analytics.totalUsers}</p>
              </div>

              {/* Total Products Card */}
              <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center">
                <Package size={32} className="text-yellow-400 mx-auto mb-3" />
                <p className="text-zinc-300 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-white">{analytics.totalProducts}</p>
              </div>

              {/* Product of the Month Card */}
              <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center">
                <img src={analytics.productOfTheMonth.image} alt={analytics.productOfTheMonth.name} className="w-16 h-16 mx-auto mb-3 rounded-full object-cover border-2 border-yellow-400" onError={(e) => { e.currentTarget.src = "https://placehold.co/50x50/3f3f46/facc15?text=NoImg"; }} />
                <p className="text-zinc-300 text-sm">Product of the Month</p>
                <p className="text-xl font-bold text-white">{analytics.productOfTheMonth.name}</p>
                <p className="text-zinc-400 text-sm">Sales: {analytics.productOfTheMonth.sales}</p>
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Monthly Revenue</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={analytics.monthlyRevenue}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#52525B" /> {/* Zinc-700 for grid */}
                  <XAxis dataKey="name" stroke="#A1A1AA" /> {/* Zinc-400 for axis labels */}
                  <YAxis stroke="#A1A1AA" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#27272A', border: '1px solid #71717A', borderRadius: '8px' }} // Zinc-900 background, Zinc-600 border
                    itemStyle={{ color: '#FACC15' }} // Yellow-400 for item text
                    labelStyle={{ color: '#E4E4E7' }} // Zinc-200 for label text
                  />
                  <Legend wrapperStyle={{ color: '#E4E4E7' }} /> {/* Zinc-200 for legend text */}
                  <Line type="monotone" dataKey="Revenue" stroke="#FACC15" activeDot={{ r: 8 }} strokeWidth={2} /> {/* Yellow-400 for line */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6">Admin Settings</h3>
            <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
              <p className="text-zinc-300 mb-4">
                This section would contain global administrative settings.
                Examples include:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                <li>Manage shipping rates</li>
                <li>Configure tax settings</li>
                <li>Update payment gateway credentials</li>
                <li>Manage promotional codes</li>
                <li>View site analytics (integration with external tools)</li>
              </ul>
              <button className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden w-full mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold w-full flex justify-between items-center"
          >
            Admin Menu
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`
            md:w-1/4 w-full md:sticky md:top-24 md:self-start
            space-y-4 p-6 rounded-xl shadow-lg bg-zinc-900
            ${isSidebarOpen ? 'block' : 'hidden md:block'}
          `}
        >
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-yellow-400">
            <ShieldCheck size={24} /> Admin Panel
          </h2>
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => { setActiveSection('products'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('products')}
                >
                  <Package size={20} /> Product Management
                </button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => { setActiveSection('orders'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('orders')}
                >
                  <ListOrdered size={20} /> Order Management
                </button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => { setActiveSection('users'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('users')}
                >
                  <Users size={20} /> User Management
                </button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => { setActiveSection('projects'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('projects')}
                >
                  <FolderKanban size={20} /> Project Management
                </button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => { setActiveSection('paymentDetails'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('paymentDetails')}
                >
                  <ListChecks size={20} /> Payment Details
                </button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => { setActiveSection('analytics'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('analytics')}
                >
                  <BarChart2 size={20} /> Analytics
                </button>
              </li>
              <li className="mt-2">
                <button
                  onClick={() => { setActiveSection('settings'); setIsSidebarOpen(false); }}
                  className={getSidebarLinkClass('settings')}
                >
                  <Settings size={20} /> Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="md:w-3/4 w-full bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
