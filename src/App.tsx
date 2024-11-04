import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Dashboard, Navbar, Sidebar } from "./components";
import { PrivateRoute } from "./components/PrivateRoute";
import { NavigationProvider } from "./context/NavigationContext";
import "./styles/components/app.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="app-container">
                <div className="main-content">
                  <NavigationProvider>
                    <Navbar />
                    <Sidebar />
                  </NavigationProvider>
                  <Dashboard />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
