import React from "react"
import { Link } from "react-router-dom"
import "./Employee.css"

export const EmployeeCard = ({ employee }) => (
    <section className="employee">
        <Link key={employee.id} to={`/employees/${employee.id}`}>
            <h3 className="employee-card--name">{employee.name}</h3>
        </Link>
        <div className="employee-card--location">{employee.location.name}</div>
    </section>
)