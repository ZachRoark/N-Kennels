import React, { useState, useEffect, createContext } from "react"


export const AnimalContext = createContext()

export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location")
            .then(res => res.json())
            .then(setAnimals)
    }

    const addAnimal = (animal) => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAnimals)
    }

    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${ id }?_expand=location&_expand=customer`)
            .then(res => res.json())
    }

    const releaseAnimal = (animalId) => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }

    const updateAnimal = (animalObj) => {
        return fetch(`http://localhost:8088/animals/${animalObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
            .then(getAnimals)
    }


   return (
    <AnimalContext.Provider value={{
        animals, getAnimals, addAnimal, getAnimalById, releaseAnimal, updateAnimal
    }}>
        {props.children}
    </AnimalContext.Provider>
    )
}
