// import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'
import useAuth from './useAuth'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailMovies from './pages/DetailMovies';

function RequireAuth({ children }) {
  const { authed } = useAuth()
  const location = useLocation()

  return authed === true ? children : <Navigate to='/login' replace state={{ path: location.pathname }} />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={
        <RequireAuth>
          <HomePage/>
        </RequireAuth>
      } />
      <Route path='/details/movies/:id' element={
        <RequireAuth>
          <DetailMovies/>
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
