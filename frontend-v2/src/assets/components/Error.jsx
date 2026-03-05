export const Error = ({ errors, name }) => {
    return (
        errors[name] && (<small className="text-red-600">{errors[name][0]}</small>)
    )
}
