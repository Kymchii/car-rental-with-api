import { PiListLight } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbFileInvoice, TbLogin2 } from "react-icons/tb";

export const NavMobile = ({ navItems, onOpenLogin, user, token, open, setOpen, onOpenInvoice, onConfirmation, search, setSearch, selectedType, setSelectedType }) => {
    return (
        <>
            <div className='flex items-center justify-end gap-4 lg:hidden'>
                <form action="" className='w-30 group delay-25 transition-all'>
                    <input type="search" placeholder='Search' className='border border-blue-600 w-full placeholder:text-xs px-2 py-2 rounded-full outline-none focus:border-2 delay-25 transition-all placeholder:text-blue-600/25 placeholder:font-light' value={search} onChange={(e) => setSearch(e.target.value)} />
                </form>
                <button className='text-base text-blue-600' onClick={() => setOpen(!open)}><PiListLight /></button>
            </div>
            <div className={`fixed shadow-sm bg-white ${open ? 'top-15 opacity-100' : 'opacity-0 -top-full'} p-8 w-full grid grid-cols-1 gap-2 content-start justify-items-center text-blue-600 delay-250 transition-all z-10 text-base`}>
                <button className='text-blue-600 text-base absolute right-4 top-4 sm:right-8 sm:top-8' onClick={() => setOpen(false)}><IoCloseOutline /></button>
                <ul className='pt-4 w-full flex flex-col gap-4 items-center'>
                    {
                        navItems.map((item, index) => (
                            <li key={index} className={`active:bg-blue-600 px-4 py-1 rounded-full active:text-white active:font-medium delay-50 transition-all cursor-pointer ${selectedType === item.type ? 'bg-blue-600 text-white' : ''}`} onClick={() => setSelectedType(selectedType === item.type ? null : item.type)}><a>{item.label}</a></li>
                        ))
                    }
                </ul>
                <div className='flex flex-col gap-4'>
                    <button className='active:bg-blue-600 px-4 py-1 rounded-full active:text-white delay-50 transition-all flex justify-center gap-2 items-center' onClick={user ? onOpenInvoice : onOpenLogin}><TbFileInvoice /> Invoice</button>
                    {user && token ? (
                        <>
                            <button className='active:bg-blue-600 px-4 py-1 rounded-full active:text-white delay-50 transition-all flex justify-center gap-2 items-center' ><CgProfile /> Profile</button>
                            <button className='active:bg-blue-600 px-4 py-1 rounded-full active:text-white delay-50 transition-all flex justify-center gap-2 items-center' onClick={onConfirmation}><RiLogoutCircleLine /> Logout</button>
                        </>
                    ) : (
                        <button className='active:bg-blue-600 px-4 py-1 rounded-full active:text-white delay-50 transition-all flex justify-center gap-2 items-center' onClick={onOpenLogin}><TbLogin2 /> Sign In</button>
                    )}
                </div>
            </div>
        </>
    )
}
