import React, { useContext, useEffect, useState } from "react" 
import {useHistory} from "react-router-dom"
import { AnimalContext } from "./AnimalProvider.js" 
import { AnimalCard } from "./AnimalCard.js"
import "./Animal.css"

export const AnimalList = ({history}) => {
    const { animals, searchTerms, getAnimals } = useContext(AnimalContext)
    
        /*
        Since you are no longer ALWAYS going to be displaying all animals
    */

    // const history = useHistory()

    const [ filteredAnimals, setFiltered ] = useState([])

    useEffect(() => {
		getAnimals()		
    }, []) 

    /*
        This effect hook function will run when the following two state changes happen:
            1. The animal state changes. First when it is created, then once you get the animals from the API
            2. When the search terms change, which happens when the user types something in the AnimalSearch component
    */
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(animals)
        }
    }, [searchTerms, animals])

    return (	
        <>
            <div className="animals">
                <div className="titleAndButton--animal">
                    <h1>Animals</h1>
                        <button onClick={() => {history.push("/animals/create")}}>
                            Add Animal
                        </button>
                </div>
                <article className="animalList">
                    {
                        animals.map(animal => {
                            return <AnimalCard key={animal.id} breed={animal.breed} animal={animal} />
                        })
                    }
                </article>
            </div>
        </>
    )}