export const ButtonWhite = ({ children, onClick }) => {
    return (
        <button className='px-6 py-1 rounded-full delay-50 transition-all bg-white text-blue-600 cursor-pointer text-xs lg:text-sm' onClick={onClick}>{children}</button>
    )
}
