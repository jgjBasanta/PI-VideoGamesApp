import './input.styles.css';
import { useState } from 'react';

const FormInput = (props) => {
    const [focus, setFocus] = useState(false);
    const { label, onChange, id, ...inputProps } = props;
    const handleFocus = () => {
        setFocus(true);
    }

    return (
        <div className="form-input-container">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} focus={focus.toString()}/>
            <span>{inputProps.errorMessage}</span>
        </div>
    )
}

export default FormInput;