import React, { Fragment, useState } from "react";

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);
  const [date, setDate] = useState(todo.date);

  //Edit Todo function
  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description, date };
      const response = await fetch(
        `http://localhost:5000/dashboard/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      setTodosChange(true);
    //   window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  try {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={`#id${todo.todo_id}`}
        >
          Edit
        </button>

        <div
          className="modal fade"
          id={`id${todo.todo_id}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          // onClick={() => {setDescription(todo.description); setDate(todo.date);}}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setDescription(todo.description);
                    setDate(todo.date);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Description</h6>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <h6 className="mt-3">Deadline</h6>
                <input
                  type="text"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                  onClick={(e) => updateTodo(e)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setDescription(todo.description);
                    setDate(todo.date);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } catch (err) {
    console.error(err.message);
  }
};

export default EditTodo;
