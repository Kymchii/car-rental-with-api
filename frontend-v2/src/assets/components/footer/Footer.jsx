import { MdContactPhone, MdEmail } from "react-icons/md"
import { navItems, socialMedia } from "../../../config/data"

export const Footer = () => {
    return (
        <div className="footer grid grid-cols-1 bg-white text-blue-600">
            <div className="p-4 grid grid-cols-2 gap-6 sm:p-8 lg:grid-cols-4">
                <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                    <h2 className="font-bold">Sosial Media</h2>
                    <ul className="flex gap-2">
                        {socialMedia.map((item) => (
                            <li key={item.id} className="group cursor-pointer p-3 border border-solid border-blue-600 rounded-full hover:bg-blue-600 active:bg-blue-600"><a href={item.href} target="_blank">{<item.icon className="text-lg text-blue-600 group-hover:text-white group-active:text-white" />}</a></li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className="font-bold">Navigations</h2>
                    <ul className='flex flex-col gap-2'>
                        {
                            navItems.map((item, index) => (
                                <li key={index}><a className="text-xs poppins-light text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white px-3 py-1 rounded-full delay-75 transition-all" href="">{item.label}</a></li>
                            ))
                        }
                    </ul>
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className="font-bold">Services</h2>
                    <ul className='flex flex-col gap-2'>
                        <li className="text-xs poppins-light text-blue-600 mb-1.5">Web Design</li>
                        <li className="text-xs poppins-light text-blue-600 mb-1.5">Web Development</li>
                        <li className="text-xs poppins-light text-blue-600 mb-1.5">Graphic Design</li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                    <h2 className="font-bold">Contact</h2>
                    <p className="text-xs poppins-light text-blue-600 mb-3">Jl. Kom Yos Sudarso Gg. Alpokat Indah Jalur 4 No. E15, Sungai Beliung, Kec. Pontianak Barat, Kota Pontianak, Kalimantan Barat.</p>
                    <ul className="flex flex-col gap-1.5">
                        <li className="text-xs poppins-light flex gap-1.5 items-center text-blue-600"><MdContactPhone className="text-base" /> 0895323110909</li>
                        <li className="text-xs poppins-light flex gap-1.5 items-center text-blue-600"><MdEmail className="text-lg" /> wwwahyu.march@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="bg-blue-600 p-6 text-center text-sm text-white">
                <p className="poppins-light">&copy; Copyright <span className="font-bold">Wahyu.</span> All Rights Reserved</p>
                <p className="poppins-light"><span className="poppins-semibold">Design By</span> Wahyu</p>
            </div>
        </div>
    )
}
