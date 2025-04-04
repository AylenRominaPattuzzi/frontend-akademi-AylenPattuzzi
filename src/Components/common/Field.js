import React from 'react';

export const Field = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    disabled = false,
    isTextArea = false,
    rows = 3,
    placeholder = '',
    wide = '' 
}) => {
    return (
        <div className={`ui field ${wide ? `${wide} wide` : ''}`}>
            <label>{label}</label>
            {isTextArea ? (
                <textarea
                    name={name}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};
