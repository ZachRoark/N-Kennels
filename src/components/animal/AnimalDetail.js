import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Animal.css"

export const AnimalDetail = (props) => {
    const { getAnimalById, releaseAnimal } = useContext(AnimalContext)
    const [animal, setAnimal] = useState()
    const {animalId} = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", animalId) 
        getAnimalById(animalId)
            .then((response) => {
                setAnimal(response) 
            })
    }, [])

    return (
        <section className="animal">
            <h3 className="animal__name">{animal?.name}</h3>
            <div className="animal__breed"><strong>Breed:</strong> {animal?.breed}</div>


            <div className="animal__location"><strong>Location:</strong> {animal?.location.name}</div>
            <div className="animal__owner"><strong>Customer:</strong> {animal?.customer.name}</div>
            <button onClick={
                () => {
                    releaseAnimal(animal.id) 
                        .then(() => {
                            history.push("/animals")
                        })
                }
            }>Release Animal</button>
            <button onClick={() => {
                history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button>
        </section>
    )
}