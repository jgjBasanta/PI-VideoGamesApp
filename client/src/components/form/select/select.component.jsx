import "./select.styles.css";

const FormSelect = (props) => {
    return (
        <div className="form-select">
            <select className="form-select-input" onChange={props.onChange}>
                {props.options.map(option => (
                    <option key={option.id} value={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default FormSelect;