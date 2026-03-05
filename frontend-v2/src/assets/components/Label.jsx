import React from 'react'

export const Label = ({ name }) => {
    return (
        <label htmlFor={name} className="group-focus-within:text-blue-500 delay-50 transition-all text-sm text-black/50 group">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
    )
}
