import React from "react"
import { AnimalList } from "./AnimalList"
import { Link } from "react-router-dom"
import "./Animal.css"

export const AnimalCard = ({ animal }) => (
    <section className="animal">
        <h3 className="animal-card--name">
            <Link to={`/animals/${animal.id}`}>
                { animal.name }
            </Link>
        </h3>
        <div className="animal-card--breed">{ animal.breed }</div>
    </section>
)
