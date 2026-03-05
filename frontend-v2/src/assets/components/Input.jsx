export const Input = ({ type, name, placeholder, onChange, formData = {}, errors = {} }) => {
    return (
        <input type={type} id={name} name={name} placeholder={placeholder} className={`text-blue-600 px-4 py-4 border ${errors[name] ? 'border-red-600' : 'border-blue-600'} placeholder:text-xs focus:outline-none focus:border-2 justify-self-center w-full bg-none h-7 placeholder:text-black/25 text-sm rounded-full group-focus:delay-500 group-focus:transition-all`} onChange={onChange} value={formData[name]} />
    )
}
