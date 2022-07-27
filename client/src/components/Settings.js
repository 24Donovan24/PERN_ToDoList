import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Settings = ({setAuth}) => {
  const [newName, setNewName] = useState("");
  const [nameChange, setNameChange] = useState(false);

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      setNewName(parseRes[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateName = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { newName };
      const response = await fetch("http://localhost:5000/settings", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes[0].user_name) {
        setNameChange(true);
        toast.success("Name changed successfully!");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
    setNameChange(false);
  }, [nameChange]);

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
        </div>
        <button className="btn btn-success me-3" onClick={(e) => updateName(e)}>
          Save Changes
        </button>
        <button className="btn btn-danger" onClick={() => setNameChange(false)}>
          Cancel
        </button>
      </form>
    </Fragment>
  );
};

export default Settings;
