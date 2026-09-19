import { useState } from "react";
import Dashboard from "./Dashboard";
import ResidentDashboard from "./ResidentDashboard";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("Checking login...");

    try {
      const response = await fetch(
        "http://localhost:8080/societyhub/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setRole(data.role);
        console.log("Logged in role:", data.role);
        setIsLoggedIn(true);
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setMessage("Cannot connect to Java backend");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
  };

if (isLoggedIn) {
  if (role === "RESIDENT") {
    return (
      <ResidentDashboard
        onLogout={handleLogout}
        username={username}
      />
    );
  }
  return (
    <Dashboard
      onLogout={handleLogout}
    />
  );
}

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <div className="brand">
            <div className="brand-icon">🏢</div>
            <div className="brand-name">SocietyHub</div>
          </div>

          <div className="hero-content">
            <h1>
              Manage your society
              <span> smarter.</span>
            </h1>

            <p>
              A simple and modern platform to manage residents,
              complaints, notices and everyday society activities
              from one place.
            </p>
          </div>

          <div className="features">
            <div className="feature">👥 Residents</div>
            <div className="feature">📢 Notices</div>
            <div className="feature">📝 Complaints</div>
            <div className="feature">📊 Dashboard</div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">

            <h2>Welcome</h2>

            <p className="login-subtitle">
              Sign in to your SocietyHub account
            </p>

            <form onSubmit={handleLogin}>

              <div className="input-group">
                <label>Username</label>

                <div className="input-wrapper">
                  <span className="input-icon">👤</span>

                  <input
                    type="text"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button className="login-button" type="submit">
                Sign In →
              </button>

            </form>

            {message && (
              <div className="message">
                {message}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;