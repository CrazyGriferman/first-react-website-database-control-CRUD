import './App.css';
import {useState} from "react";
import Axios from 'axios';




function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    // the second variable is an object which should be sent to the back-end
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country:country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployee = () => {
    // 这里的employee 一定要和 数据库里的table名字对应？
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  }

  /* const displayInfo = () => {
    console.log(name + age + country + position + wage);
  }; */

  return (
    <div className="App">
      <div className="information" >
        <label>Name:</label>
        <input type="text" onChange={(event) => {
          setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input type="number" onChange={(event) => {
          setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input type="text" onChange={(event) => {
          setCountry(event.target.value);
          }}
        />
        <label>Position</label>
        <input type="text" onChange={(event) => {
          setPosition(event.target.value);
          }}
        />
        <label>Wage (year)):</label>
        <input type="number" onChange={(event) => {
          setWage(event.target.value);
          }}
        />
        {/* 如何用button触发函数 使用 onClick={function_name} */}
        <button onClick={addEmployee}/* onClick={displayInfo} */>Add Employee</button>
      </div>
      <hr />
      <div className="employees">
        <button onClick={getEmployee}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee"> 
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3> 
              <h3>Country: {val.country}</h3> 
              <h3>Position: {val.position}</h3> 
              <h3>Wage: {val.wage}</h3> 
            </div>
          
          );
        })}
      </div>
    </div>
  );
}

export default App;
