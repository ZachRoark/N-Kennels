import React, { useContext, useEffect } from "react" 
import { EmployeeContext } from "./EmployeeProvider.js"
import { EmployeeCard } from "./EmployeeCard.js"
import "./Employee.css"

export const EmployeeList = (props) => {
    const { employees, getEmployees } = useContext(EmployeeContext)
    useEffect(() => {
        console.log("EmployeeList: useEffect - getEmployees")
		getEmployees()		
    }, []) 



    return (
        <div className="employees">
            <div className="titleAndButton--employee">
                <h1>Employees</h1>
                <button onClick={() => {props.history.push("/employees/create")}}>
                    Add Employee
                </button>
            </div>
            <article className="employeeList">
                {
                    employees.map(employee => {
                        return <EmployeeCard key={employee.id} employee={employee} />
                    })
                }
            </article>
        </div>
    )
}