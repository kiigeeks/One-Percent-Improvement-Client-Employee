import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profil from './pages/Profil';
import PrivateRoutes from './utilities/PrivateRoute';
import NotFound from './pages/Error/notFound';
import ServerError from './pages/Error/internalServer';


function App() {
  return (
    <>
      <Router>
				<Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profil />} />
          </Route>
          <Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
					<Route path="/500" element={<ServerError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
