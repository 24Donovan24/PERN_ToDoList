import React, { Fragment, useState } from "react";

const InputTodo = ({setTodosChange}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description, date };
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTodosChange(true);
      setDescription("");
      setDate("");


      //   window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List 📝</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's your To-Do?"
        />
        <input
          type="text"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Deadline for your To-Do?   eg. DD/MM/YYYY"
        />
        <button className="btn btn-dark">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
