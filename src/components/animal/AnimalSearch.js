import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animals.css"

export const AnimalSearch = (props) => {
    const { setSearch } = useContext(AnimalContext)

    return (
        <>
            Animal search:
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearch(keyEvent.target.value)
                }
                placeholder="Search for an animal... " />
        </>
    )
}