import { useEffect, useRef, useState } from "react";
import { navItems } from "../../../config/data"
import { TbFileInvoice, TbLogin2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { ButtonBlue600 } from "../ButtonBlue600";
import { NavMobile } from "./NavMobile";

export const Navbar = ({ search, setSearch, user, onOpenLogin, onOpenInvoice, token, onConfirmation, setOpen, open, selectedType, setSelectedType }) => {
    const [focus, setFocus] = useState(false);
    const searchRef = useRef(null);
    const [isDropDown, setIsDropDown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const pressEsc = (e) => {
            if (e.key === 'Escape') {
                setFocus(false) || setIsDropDown(false);
            }
        }

        const pressCtrlK = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setFocus(true);
            }
        }

        if (focus) {
            searchRef.current.focus();
        }

        window.addEventListener('keydown', pressEsc);
        window.addEventListener('keydown', pressCtrlK);

        return () => {
            window.removeEventListener('keydown', pressEsc);
            window.removeEventListener('keydown', pressCtrlK);
        }
    }, [focus]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropDown(false);
            }
        }

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div id="navbar" className={`grid grid-cols-2 ${open ? 'bg-white' : 'bg-white/80'} shadow-sm h-15 px-4 sm:px-8 w-full fixed inset-0 lg:grid-cols-5 z-20 content-center delay-100 transition-all flex items-center`}>
            <a className={`cursor-pointer lg:col-span-2`} onClick={() => setSelectedType(null)}>
                <img src="../public/logo.png" alt="" className="w-20" />
            </a>
            <ul className={`hidden lg:flex gap-4 text-blue-600 justify-center items-center font-light lg:col-span-1 delay-100 transition-all`}>
                {
                    navItems.map((item, index) => (
                        <li key={index} className={`hover:bg-blue-600 hover:text-white hover:font-medium px-4 py-1 rounded-full active:text-white delay-75 transition-all cursor-pointer ${selectedType === item.type ? 'bg-blue-600 text-white' : ''}`} onClick={() => setSelectedType(selectedType === item.type ? null : item.type)}><a>{item.label}</a></li>
                    ))
                }
            </ul>
            <div className={`hidden lg:flex gap-4 justify-end items-center lg:col-span-2`}>
                <form action="" className='delay-25 transition-all'>
                    <input type="search" placeholder='Ctrl K...' className={`border border-slate-950/25 placeholder:text-xs px-2 py-1 rounded-full outline-none delay-25 transition-all placeholder:text-slate-950/25 placeholder:font-light text-slate-950/25 ${focus ? 'w-40 border-2' : 'w-20'}`} onFocus={() => setFocus(!focus)} onBlur={() => setFocus(false)} ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} />
                </form>
                <button className='px-6 py-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer delay-75 transition-all flex justify-center items-center gap-2' onClick={user ? onOpenInvoice : onOpenLogin}><TbFileInvoice /> Invoice</button>
                {
                    user && token ? (
                        <div className="flex relative">
                            <button className="hidden lg:flex w-10 h-10 rounded-full bg-slate-200 justify-center items-center text-blue-600 cursor-pointer" onClick={() => setIsDropDown(!isDropDown)}>
                                {user?.name?.charAt(0)}
                            </button>
                            <ul className={`flex flex-col gap-2 lg:bg-white lg:shadow-sm lg:p-4 text-sm lg:rounded-md ${isDropDown ? 'lg:absolute' : 'lg:hidden'} top-12 right-0 lg:gap-0 delay-75 transition-all`} ref={dropdownRef}>
                                <li className="lg:px-4 lg:py-2 lg:hover:bg-blue-600 lg:hover:text-white lg:rounded-full delay-75 transition-all cursor-pointer"><button className="flex gap-2 items-center cursor-pointer"><CgProfile /> Profile</button></li>
                                <li className="lg:px-4 lg:py-2 lg:hover:bg-red-600 lg:rounded-full lg:text-red-600 lg:hover:text-white delay-75 transition-all cursor-pointer"><button className="flex gap-2 items-center cursor-pointer" onClick={onConfirmation}><RiLogoutCircleLine /> Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <ButtonBlue600 onClick={onOpenLogin} type="submit" ><TbLogin2 /> Sign In</ButtonBlue600>
                    )
                }
            </div>

            {/* MOBILE */}
            <NavMobile navItems={navItems} onOpenLogin={onOpenLogin} token={token} user={user} open={open} setOpen={setOpen} onOpenInvoice={onOpenInvoice} onConfirmation={onConfirmation} search={search} setSearch={setSearch} selectedType={selectedType} setSelectedType={setSelectedType} />
            {/* END MOBILE */}
        </div >
    )
}
