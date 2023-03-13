import React, { useEffect, useState } from "react";
import { addTask, deleteDocument } from "../../firebase";
import { faker } from "@faker-js/faker";

const Employee = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState('')
  const [task, setTask] = useState({
    title:'',
    description: '',
    assignee: '',
    dueDate: '',
  })
  useEffect(() =>{
    setUrl(faker.image.avatar())
  },[])
  

  const emDate = new Date(user.dateOfBirth).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
});

const handleAddTask = (e) => {
  e.preventDefault()
  addTask(user.documentid, {...user, tasks: [...user.tasks, task]})
  setShowForm(false)
}

const handleTasksAdding = (e) => setTask({ ...task, [e.target.name]: e.target.value });
const handleDeleteEmployee = () => deleteDocument(user.documentid)
const handleDeleteTask = (indicator) => {
  const updatedTasks = user.tasks
  updatedTasks.splice(indicator, 1)
  addTask(user.documentid, {...user, tasks: updatedTasks})
}

  return (
    <div>
      <div className="mx-2 sm:mx-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 bg-slate-600 text-white py-4 px-6 shadow-2xl rounded-md my-3 content-center">
          <img className="w-16 h-16 rounded-full" src={url} alt="faket img" />
          <div>
          <li className="font-bold flex items-center">Full name</li>
          <li className="font-bold flex items-center"> {user.fullName}</li>
          </div>
          <div>
          <li className="font-bold flex items-center">E-mail</li>
          <li className="font-bold flex items-center">{user.email}</li>
          </div>
          <div>
          <li className="font-bold flex items-center">Phone number</li>
          <li className="font-bold flex items-center">+{user.phoneNumber}</li>
          </div>
          <div>
          <li className="font-bold flex items-center">Date of birth</li>
          <li className="font-bold flex items-center">{emDate}</li>
          </div>
          <div>
          <li className="font-bold flex items-center">Monthly salary</li>
          <li className="font-bold flex items-center"> {user.monthlySalary}</li>

          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 sm:col-span-2 md:col-span-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
              Update
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded"
            onClick={handleDeleteEmployee}
            >
              Delete
            </button>
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold rounded" onClick={() => setShowForm(!showForm)}>
              Add Task
            </button>
          </div>
        </ul>
        {user.tasks.map((task, index) => {
          const formatDate = new Date(task.dueDate).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        });
          return (
            <div key={index}>
              <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-slate-300 p-4 rounded-md shadow-2xl my-1">
                <li className="font-bold flex items-center">Title: {task.title}</li>
                <li className="font-bold flex items-center">Description: {task.description}</li>
                <li className="font-bold flex items-center">Assignee: {task.assignee}</li>
                <li className="font-bold flex items-center">Due date: {formatDate}</li>
                <div>
                  <button className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                  <button className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
                  onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </ul>
            </div>
          );
        })}
      </div>
      {showForm && (
        <form
        className="absolute top-[5%] left-[50%] w-[500px] transform translate-x-[-50%] bg-slate-300 p-10 rounded-lg shadow-2xl"
            onSubmit={handleAddTask}
            >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="title"
                >
                Title:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter Title"
                onChange={handleTasksAdding}
                name="title"
                value={task.title}
                />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="description"
                >
                E-mail:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Description"
                onChange={handleTasksAdding}
                name="description"
                value={task.description}
                />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="assignee"
                >
                Phone number:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="assignee"
                type="text"
                placeholder="Assignee"
                onChange={handleTasksAdding}
                name="assignee"
                value={task.assignee}
                />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="dueDate"
                >
                Date of birth:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dueDate"
                type="date"
                placeholder="Enter your age"
                onChange={handleTasksAdding}
                name="dueDate"
                value={task.dueDate}
                />
            </div>
           
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Submit
              </button>
            </div>
          </form>
                )}
    </div>
  );
};

export default Employee;
