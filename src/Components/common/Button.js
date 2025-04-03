import React from 'react';

export const Button = ({ name, type, color = 'blue', onClick, icon }) => {
    return (
        <button className={`ui ${color} large button`} type={type} onClick={onClick}>
            {name}
        </button>
    );
};
