import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./views/loginPage";
import Register from "./views/Register";
import ProfilePage from "./views/Profile";
import UpdateProfilePage from "./views/updateProfile";
import GetNotes from "./views/GetNotes";
import HomeAuth from "./views/HomeAuth";
import HomeNonAuth from "./views/HomeNonAuth";
import NoteForm from "./components/NoteForm";
import NoteDetail from "./views/NoteDetail";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute component={HomeAuth} path="/" exact />
            <PrivateRoute component={ProfilePage} path="/profile" exact />
            <PrivateRoute component={UpdateProfilePage}path="/update" exact />
            <PrivateRoute component={GetNotes} path="/notes" exact />
            <PrivateRoute component={NoteForm} path="/notes/:id/edit" exact />
            <PrivateRoute component={NoteDetail} path="/notes/:id/" exact />
            <PrivateRoute component={NoteForm} path="/notes/new" exact />

            
            <Route component={HomeNonAuth} path="/welcome" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
