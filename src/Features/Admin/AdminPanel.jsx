import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaBlog, FaCog, FaChartLine } from "react-icons/fa";
import axios from "axios";
import "./AdminPanel.css";
import Sales from "./Components/Sales";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [dashboardStats, setDashboardStats] = useState({
    totalSales: 0,
    orders: 0,
    products: 0,
    customers: 0
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (!token || !userData.isAdmin) {
      navigate("/loginSignUp");
    }
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      switch (activeMenu) {
        case "products":
          fetchProducts();
          break;
        case "orders":
          fetchOrders();
          break;
        case "users":
          fetchUsers();
          break;
        default:
          break;
      }
    }
  }, [activeMenu, isAdmin]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardStats(response.data);
    } catch (err) {
      setError("Failed to fetch dashboard stats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div className="content-area">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p className="stat-value">${dashboardStats.totalSales.toLocaleString()}</p>
                <p className="stat-change positive">+15% from last month</p>
              </div>
              <div className="stat-card">
                <h3>Orders</h3>
                <p className="stat-value">{dashboardStats.orders}</p>
                <p className="stat-change positive">+24 new orders</p>
              </div>
              <div className="stat-card">
                <h3>Products</h3>
                <p className="stat-value">{dashboardStats.products}</p>
                <p className="stat-change negative">-2 out of stock</p>
              </div>
              <div className="stat-card">
                <h3>Customers</h3>
                <p className="stat-value">{dashboardStats.customers}</p>
                <p className="stat-change positive">+18 this week</p>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="content-area">
            <h2>Products Management</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "orders":
        return (
          <div className="content-area">
            <h2>Orders Management</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>${order.total_amount}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="view-btn">View</button>
                      <button className="update-btn">Update Status</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "sales":
        return (
          <div className="content-area">
            <h2>Sales Management</h2>
            <Sales />
          </div>
        );
      case "users":
        return (
          <div className="content-area">
            <h2>Users Management</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="view-btn">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "blog":
        return (
          <div className="content-area">
            <h2>Blog Posts Management</h2>
            {/* Blog management content */}
          </div>
        );
      case "settings":
        return (
          <div className="content-area">
            <h2>Settings</h2>
            {/* Settings content */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          {[
            { id: "dashboard", icon: <FaHome />, label: "Dashboard" },
            { id: "products", icon: <FaBox />, label: "Products" },
            { id: "orders", icon: <FaShoppingCart />, label: "Orders" },
            { id: "sales", icon: <FaChartLine />, label: "Sales" },
            { id: "users", icon: <FaUsers />, label: "Users" },
            { id: "blog", icon: <FaBlog />, label: "Blog Posts" },
            { id: "settings", icon: <FaCog />, label: "Settings" },
          ].map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      <div className="admin-main">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
