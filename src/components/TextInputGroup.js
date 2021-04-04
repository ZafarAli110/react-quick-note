import React from 'react';

import '../styles/util.css';
import '../styles/typography.css';

function TextInputGroup({
    labelTitle,
    TagName,
    className,
    placeholder,
    type,
    name,
    value,
    onChange,
    error }) {
    return (
        <>
            <label className='font-bold fs-12 mt-10'>
                {labelTitle}
            </label>
            <TagName
                className={className}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={onChange}/>
            {error && <span className="fs-10 color-danger">{error}</span>}
        </>
    )

}
export default TextInputGroup;