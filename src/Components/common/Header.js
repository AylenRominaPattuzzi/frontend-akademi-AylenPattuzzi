import React from 'react'
import '../styles/Header.css'

export const Header = ({title, description}) => {
    return (
        <div>
            <div className="header1">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}


