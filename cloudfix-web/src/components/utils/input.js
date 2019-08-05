import React, { useState } from 'react';
import _ from 'lodash';

export const Input = ({ type, placeholder, value, onChange, style, pattern }, props) => {

    const [sideEffects, setSideEffects] = useState({validate: false, warning: ''});

    const regex = pattern || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validate = () => {
        let obj = {};

        obj.validate = regex.test(value);
        (!obj.validate) ?
            obj.warning = {border: '1px solid red'}
        :
            obj.warning = {border: '1px solid green'};
        
        setSideEffects(obj);
    }

    return (
        <>
        <h1>{(sideEffects.validate && value)}</h1>
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {onChange(e)}}
            onKeyDown={validate}
            style={{...defaultStyle, ...style, ...sideEffects.warning}}
            {...props}
        />
        </>
    )
}

const defaultStyle = {
    color: 'black',
    height: 20,
    padding: 5,
    border: null,
    outline: 'none'
}