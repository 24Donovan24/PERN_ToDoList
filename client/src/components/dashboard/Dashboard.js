import React, { Fragment, useState, useEffect } from "react";
// import { toast } from "react-toastify";

//Components
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodo";
import Navbar from "../Navbar";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAlltodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  async function getProfile() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      setAlltodos(parseRes);
      setName(parseRes[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <Fragment>
      <Navbar setAuth={setAuth} />
      <div className="d-flex mt-5 justify-content-center">
        <h1>✨Welcome {name}✨</h1>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </Fragment>
  );
};

export default Dashboard;
