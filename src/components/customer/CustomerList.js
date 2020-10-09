import React, { useContext, useEffect } from "react" 
import { CustomerContext } from "./CustomerProvider.js" 
import { CustomerCard } from "./CustomerCard.js"
import "./Customer.css"

export const CustomerList = () => {
    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        console.log("CustomerList: useEffect - getCustomers")
		getCustomers()
		
    }, []) 

    return (	
		<div className="customers">
            <div className="title--customer">
                <h1>Customers</h1>
            </div>
		    {console.log("CustomerList: Render")}
            <article className="customerList">
                {
                    customers.map(customer => {
                        return <CustomerCard key={customer.id} customer={customer} />
                    })
                }
            </article>
        </div>
    )
}