import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import EditProfile from '../pages/EditProfile';
import Profiles from '../pages/Profiles';
import UserProfile from '../pages/UserProfile';
import About from '../pages/About';
import ProfileFilter from '../pages/ProfileFilter';
import Policy from '../pages/Policy';
import Terms from '../pages/Terms';
import EditEvent from '../pages/EditEvent';
import Events from '../pages/EventFilter';
import AddEvent from '../pages/AddEvent';
import LandingPage from '../pages/LandingPage';
import UserEvent from '../pages/UserEvent';
import UserSchedule from '../pages/UserSchedule';
import ViewUserProfile from '../pages/ViewOtherProfilePage';

const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userevent" element={<UserEvent />} />
          <Route path="/view-user-profile" element={<ViewUserProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms&conditions" element={<Terms />} />
          <Route path="/userschedule" element={<ProtectedRoute><UserSchedule /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/editevent" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/addevent" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
          <Route path="/filter" element={<ProtectedRoute><ProfileFilter /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><Profiles /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <LandingPage />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <LandingPage />,
};

export default App;
