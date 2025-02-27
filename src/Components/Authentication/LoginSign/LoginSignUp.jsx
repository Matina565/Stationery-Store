import React, { useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Features/Auth/authSlice";
import toast from "react-hot-toast";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load registered users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem("registeredUsers");
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }
  }, []);

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem("registeredUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  // Handle login form submission
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    
    // Check for admin credentials
    if (email === "admin@stationery.com" && password === "admin123") {
      const adminUser = {
        email,
        isAdmin: true,
      };
      localStorage.setItem("adminToken", "admin-token-" + Date.now());
      localStorage.setItem("userData", JSON.stringify(adminUser));
      dispatch(loginSuccess(adminUser));
      toast.success("Admin login successful!");
      navigate("/admin");
      return;
    }

    // Regular user login
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      const userData = {
        email: user.email,
        isAdmin: false,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(loginSuccess(userData));
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    
    // Check if email already exists
    if (registeredUsers.some(user => user.email === registerEmail)) {
      toast.error("Email already registered!");
      return;
    }

    // Store the registered user
    const newUser = { email: registerEmail, password: registerPassword, name: registerName };
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    
    toast.success("Registration successful! You can now log in.");
    setActiveTab("tabButton1");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterName("");
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 - Login */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    placeholder="Email address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password *"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit">Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 - Register */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleRegisterSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email address *"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password *"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <button type="submit">Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
