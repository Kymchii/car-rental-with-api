/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../../../config/api"
import { IoCloseOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { CiFileOff } from "react-icons/ci";

export const Invoice = ({ openInvoice, setOpenInvoice, invoices, onOpenInvoiceDetail }) => {
    const invoiceRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (invoiceRef.current && !invoiceRef.current.contains(e.target)) {
                setOpenInvoice(false);
            }
        }

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div className={`bg-white shadow-xl flex flex-col gap-4 p-6 fixed z-30 top-0 bottom-0 ${openInvoice ? 'left-0 right-1/4 sm:right-1/2 md:right-[60%] lg:right-0 lg:left-[60%] xl:left-[70%] 2xl:left-[73%]' : 'right-full -left-full lg:left-full lg:-right-full'} delay-100 transition-all overflow-y-auto`} ref={invoiceRef}>
            <div className='flex justify-end w-full lg:justify-start'>
                <button className='text-blue-600 cursor-pointer' onClick={() => setOpenInvoice(false)}><IoCloseOutline /></button>
            </div>
            {invoices.length > 0 ? (
                invoices.map(invoice => (
                    <div key={invoice.id} className='rounded-lg bg-linear-to-t from-blue-600 via-blue-400 to-blue-200 p-4 flex flex-col gap-2 items-stretch text-white'>
                        <div>
                            <h1 className='border-b border-white/75 pb-2 font-bold'>{invoice.invoice_number}</h1>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <img src={`${API_BASE_URL}/storage/${invoice.car_type.photo}`} alt={invoice.car_type.name} className='w-20' />
                            <div className='flex flex-col gap-0.5'>
                                <h2 className='font-semibold'>{invoice.car_type.name}</h2>
                                <small className='text-white/75'>{invoice.car_type.car_brand.name}</small>
                            </div>
                        </div>
                        <div className='flex flex-col items-end gap-2'>
                            <small className='font-light'>Total Rp. {invoice.total.toLocaleString('id-ID')}</small>
                            <button className='flex gap-2 items-center py-1 px-4 rounded-full bg-white text-blue-600 text-xs cursor-pointer' onClick={() => onOpenInvoiceDetail(invoice)}><TbFileInvoice /> Detail</button>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex flex-col items-center justify-center h-full text-black/25'>
                    <CiFileOff className='w-20 h-20' />
                    <p>Data masih kosong</p>
                </div>
            )}
        </div>
    )
}
