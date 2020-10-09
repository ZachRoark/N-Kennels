import React from "react"
import "./Kennel.css"

export const Home = (props) => (
    <>
        <div className="homeContent">
            <h1>Nashville Kennels</h1>
            <small>{props.greeting}, Loving care when you're not there.</small>
            <address>
                <div>Visit us at the Nashville North Location</div>
                <div>500 Puppy Way</div>
            </address>
        </div>
    </>
)