import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddEntry from "./pages/AddEntry";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ListEntries from "./pages/ListEntries";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* this is public route */}
          <Route path="/" element={<Login />} />

          {/* all other are protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/entries"
            element={
              <ProtectedRoute>
                <Layout>
                  <ListEntries />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-entry"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddEntry />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
