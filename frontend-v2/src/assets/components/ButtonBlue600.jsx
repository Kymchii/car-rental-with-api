export const ButtonBlue600 = ({ children, onClick, disabled = false, type = 'button' }) => {
    return (
        <button className='px-6 py-1 rounded-full delay-50 transition-all bg-blue-600 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-800 text-xs lg:text-sm flex justify-center items-center gap-2' onClick={onClick} disabled={disabled} type={type}>{children}</button>
    )
}
