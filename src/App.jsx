import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as hootService from '../src/services/hootService'; // import the hootservice
import HootList from './components/HootList/HootList';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [hoots, setHoots] = useState([]); // create a state for hoots

  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
        // Set state:
        setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

 

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes:
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/hoots" element={<HootList hoots={hoots}  />} />
            </>
          ) : (
            // Public Route:
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
