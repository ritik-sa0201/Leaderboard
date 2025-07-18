import { Navigate, Route, Routes } from "react-router";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Signup from "./pages/Signup";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen" data-theme="forest">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Leaderboard authUser={authUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
