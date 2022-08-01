import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = ({ setAuth }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  //Function to hide/unhide password
  const togglePassword = (e) => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const value = passwordShown ? "Hide password" : "Show password";

  //To get the profile from database
  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setNewName(parseRes[0].user_name);
      setNewEmail(parseRes[0].user_email);
    } catch (err) {
      console.error(err.message);
    }
  };

  //To update name in the database to the specified name
  const updateName = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { newName };
      const response = await fetch(
        "http://localhost:5000/settings/changename",
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      // if (parseRes[0].user_name) {
      //   toast.success("Name changed successfully!");
      // } else {
      //   toast.error(parseRes);
      // }
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err.message);
    }
  };

  //To update email in the database to the specified email
  const updateEmail = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { newEmail };
      const response = await fetch(
        "http://localhost:5000/settings/changeemail",
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      // if (parseRes[0].user_email) {
      //   toast.success("Email changed successfully!");
      // } else {
      //   toast.error(parseRes);
      // }
    } catch (err) {
      console.error(err.message);
    }
  };

  //To update password in the database to the specified password
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { newPassword };
      const response = await fetch(
        "http://localhost:5000/settings/changepassword",
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      // if (parseRes[0].user_password) {
      //   toast.success("Password changed successfully!");
      // } else {
      //   toast.error(parseRes);
      // }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  //For navigation back to dashboard
  const navigate = useNavigate();
  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Fragment>
      <Navbar setAuth={setAuth} />
      <form>
        <div className="mt-4">
          <label className="form-label" style={{ fontSize: "18px" }}>
            Name
          </label>
          <input
            type="name"
            name="name"
            placeholder="name"
            value={newName}
            className="form-control mb-4"
            onChange={(e) => setNewName(e.target.value)}
          ></input>
          <label className="form-label" style={{ fontSize: "18px" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={newEmail}
            className="form-control mb-4"
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
          <label className="form-label" style={{ fontSize: "18px" }}>
            Password
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="password"
            className="form-control mb-1"
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <button
            className="btn btn-secondary mb-4"
            type="button"
            onClick={togglePassword}
          >
            {value}
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success me-3"
            onClick={(e) => {
              updateName(e);
              updateEmail(e);
              updatePassword(e);
              navigateDashboard();
            }}
          >
            Save Changes
          </button>
          <button className="btn btn-danger">Cancel</button>
        </div>
      </form>
    </Fragment>
  );
};

export default Settings;
