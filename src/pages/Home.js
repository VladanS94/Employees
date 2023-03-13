import React, { useEffect, useState } from "react";
import Employee from "../components/Employee/Employee";
import { getCollectionSnapshot, setInfo } from "../firebase";

const Home = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    monthlySalary: "",
    tasks: [],
  });

  const sorrtedData = data.sort((a, b) => b.tasks.length - a.tasks.length)

  useEffect(() => {
    getCollectionSnapshot("Employees", setData)
  }, []);

 
  const mappedData = sorrtedData?.map((user, index) => {
    if(index < 5){
    return (
        <div key={index}>
        <Employee user={user} />
        </div>
        );
      }
  });

  const handleEmployee = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo("Employees", employee);
    setShowForm(false)
  }
  return (
    <div>
      <div className="flex justify-center items-center">

      <button
        className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(!showForm)}
        >
        Create Employee
      </button>
        </div>
      {mappedData}
      <div>
        {showForm && (
          <form
            className="absolute top-[5%] left-[50%] w-[500px] transform translate-x-[-50%] bg-slate-300 p-10 rounded-lg shadow-2xl"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="name"
              >
                Full name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={handleEmployee}
                name="fullName"
                value={employee.fullName}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="email"
              >
                E-mail:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleEmployee}
                name="email"
                value={employee.email}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="password"
              >
                Phone number:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="number"
                placeholder="Enter your Phone number"
                onChange={handleEmployee}
                name="phoneNumber"
                value={employee.phoneNumber}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="age"
              >
                Date of birth:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="date"
                placeholder="Enter your age"
                onChange={handleEmployee}
                name="dateOfBirth"
                value={employee.dateOfBirth}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                forhtml="salary"
              >
                Monthly salary:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="salary"
                type="text"
                placeholder="Enter your monthly salary"
                onChange={handleEmployee}
                name="monthlySalary"
                value={employee.monthlySalary}
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
    </div>
  );
};

export default Home;
