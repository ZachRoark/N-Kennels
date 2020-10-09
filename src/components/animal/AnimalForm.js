import React, { useContext, useEffect, useState, useRef } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "./AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const [animal, setAnimal] = useState({})
    const [isLoading, setIsLoading] = useState(true); 
    const {animalId} = useParams(); 
	const history = useHistory();
    const handleControlledInputChange = (event) => {
        const newAnimal = { ...animal } 
        newAnimal[event.target.name] = event.target.value /
        console.log("newAnimal: ", newAnimal);
        setAnimal(newAnimal) 
    }
    useEffect(() => {
        getCustomers().then(getLocations).then(()=> {
            if (animalId){
                getAnimalById(animalId)
                .then(animal => {
                    setAnimal(animal)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
       })
    }, [])

    const constructAnimalObject = () => {
        if (parseInt(animal.locationId) === 0) {
            window.alert("Please select a location")
        } else {
            setIsLoading(true);
            if (animalId){
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                .then(() => history.push(`/animals/${animal.id}`))
                .then(() => console.log("Updating Animal: ", animalId))
            } else {
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                .then(() => history.push("/animals"))
                .then(() => console.log("Adding new animal"))
            }
        }
    }
    
    return (
        <form className="animalForm">
            <h2 className="animalForm__title">
                {animalId ? `Edit ${animal.name}` : "Add Animal"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="animalName" name="name" required autoFocus className="form-control" 
                    placeholder="Animal name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={animal.name}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal Breed: </label>
                    <input type="text" id="animalBreed" name="breed" required autoFocus className="form-control" placeholder="Animal breed" defaultValue={animal.breed}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={animal.locationId} /* <--- straight outta state */ name="locationId" /* <--- event.target.name */ id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Customer: </label>
                    <select value={animal.customerId} name="customerId" id="customerAnimal" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>


            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructAnimalObject()
                }}>
            {animalId ? <>Save Animal</> : <>Add Animal</>}</button> 
        </form>
    )
}
