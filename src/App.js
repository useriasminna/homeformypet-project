import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase, { auth, db } from "./utils/firebase";
import createActivityDetector from "activity-detector";

import FirstTime from "./pages/FirstTime";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import NavAppLayout from "./components/common/NavAppLayout";

import ResetPassword from "./pages/ResetPassword";
import Welcome from "./pages/Welcome";
import OwnerForm from "./pages/OwnerForm";
import SitterForm from "./pages/SitterForm";
import Home from "./pages/Home";

function useIdle() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const activityDetector = createActivityDetector();
    activityDetector.on("active", () => setIsIdle(false));
    activityDetector.on("idle", () => setIsIdle(true));
    return () => activityDetector.Detector?.stop();
  }, []);
  return isIdle;
}

function App() {
  const [authentication, setAuthentication] = useState({
    loggedIn: false,
    loading: true,
  });

  const isIdle = useIdle();

  if (!isIdle && authentication.loggedIn) {
    db.collection("users").doc(auth.currentUser.uid).set(
      {
        userLastActive: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthentication({
          loggedIn: true,
          loading: false,
        });
      } else {
        setAuthentication({
          loggedIn: false,
          loading: false,
        });
      }
    });
  }, [setAuthentication]);

  if (authentication.loading) return null;
  return authentication.loggedIn ? (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login">
          {/* <Redirect to="/home" /> */}
        </Route>
        <Route exact path="/resetpassword">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <NavAppLayout>
          <Route exact path="/home" component={Home} />
          <Route path="/profile/:id" component={Profile} />
          <Route exact path="/direct" component={Messages} />

          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/ownerform" component={OwnerForm} />
          <Route exact path="/sitterform" component={SitterForm} />
        </NavAppLayout>
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={FirstTime} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/resetpassword" component={ResetPassword} />
      </Switch>
    </Router>
  );
}

export default App;
