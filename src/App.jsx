import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const toggleFinished = () => {
    setfinished(!finished);
  };

  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((p) => p.id === id);
    settodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    saveTols();
  };
  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    saveTols();
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveTols();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveTols();
  };
  return (
    <>
      <Navbar />
      <div className="md:container bg-gradient-to-r from-purple-500 to-cyan-500  md:mx-auto rounded-xl my-8 p-8 min-h-[80vh] md:w-[35%] mx-3">
        <h1 className="text-center text-3xl font-semibold">
          Todo List - Manage your Daily Todos.
        </h1>
        <div className="add my-10">
          <h3 className="text-xl font-semibold my-2">Add a Todo</h3>
          <div className="flex">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              placeholder="Todos"
              className="w-[85%] h-[40px] rounded-lg"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-blue-500 disabled:bg-pink-500 hover:bg-purple-800 mx-2 px-2 py-1 p-3 text-white rounded-lg   font-semibold text-md"
            >
              Save
            </button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={finished} />{" "}
         Finished Todos.
        <hr />
        <h3 className="text-xl font-semibold my-4">Your Todos</h3>
        <div className="todo">
          {todos.length === 0 && <div className="m-4">Empty Todo List</div>}
          {todos.map((item) => {
            return (
              (finished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todos flex   my-4 justify-between"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-blue-500 hover:bg-purple-800  py-1 p-2 text-white rounded-lg mx-1  font-semibold text-md"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-blue-500 hover:bg-purple-800  py-1 p-2 text-white rounded-lg mx-1  font-semibold text-md"
                    >
                      <MdDeleteSweep />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
