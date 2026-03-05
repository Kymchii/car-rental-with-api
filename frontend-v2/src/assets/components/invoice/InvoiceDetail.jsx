import { IoCloseOutline } from "react-icons/io5";
import { API_BASE_URL } from "../../../config/api"

export const InvoiceDetail = ({ setOpenInvoiceDetail, user, client, openInvoiceDetail, selectedInvoice }) => {
    const formatPaymentMethod = (method) => {
        if (!method) return '';
        return method.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    return (
        <div id='invoice-detail' className={`w-full h-full backdrop-blur-xs bg-slate-950/50 fixed z-50 inset-0 items-center justify-center flex ${openInvoiceDetail ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} duration-200 transition-opacity`}>
            <div className={`flex w-2xs sm:w-sm md:w-md lg:w-lg flex-col items-stretch gap-4 px-4 sm:px-8 bg-slate-50 shadow-md rounded-md delay-100 transition-all pb-8 sm:pb-16 ${openInvoiceDetail ? 'opacity-100' : 'opacity-0'} duration-200 transition-opacity h-[80%]`}>
                <div className='flex justify-between text-base pt-4 sm:pt-8 text-blue-600 sm:pb-4'>
                    <h1 className='font-semibold'>Invoice Detail</h1>
                    <button className='text-blue-600 cursor-pointer' onClick={() => setOpenInvoiceDetail(false)}><IoCloseOutline /></button>
                </div>
                <div className='flex flex-col gap-4 overflow-y-auto'>
                    <div className='bg-linear-to-b from-blue-600 via-blue-400 to-blue-200 shadow-sm p-6 rounded-md text-white'>
                        <div className='flex gap-2'>
                            <h1 className='font-semibold'>{user?.name || ''}</h1>
                            <p className='text-white/50'>({client?.phone || ''})</p>
                        </div>
                        <p className='text-white/75'>{client?.address || ''}</p>
                    </div>
                    <div className='bg-linear-to-b from-blue-600 via-blue-400 to-blue-200 shadow-sm p-6 rounded-md text-white flex flex-col items-stretch'>
                        <div className='h-fit flex gap-4 items-start pb-2'>
                            <img src={`${API_BASE_URL}/storage/${selectedInvoice?.car_type?.photo || ''}`} alt={selectedInvoice?.car_type?.name || ''} className='w-18' />
                            <div className='flex flex-col w-full'>
                                <h1 className='font-semibold'>{selectedInvoice?.car_type?.name || ''}</h1>
                                <p className='text-white/75'>{selectedInvoice?.car_type?.car_brand?.name || ''}</p>
                                <p className='self-end text-xs text-white/75'>Rp. {selectedInvoice?.total?.toLocaleString('id-ID') || ''}</p>
                            </div>
                        </div>
                        <div className='flex justify-between text-xs text-white/75'>
                            <p>Start at</p>
                            <p>{selectedInvoice?.start_at || ''}</p>
                        </div>
                        <div className='flex justify-between text-xs text-white/75'>
                            <p>End of</p>
                            <p>{selectedInvoice?.end_of || ''}</p>
                        </div>
                    </div>
                    <div className='bg-linear-to-b from-blue-600 via-blue-400 to-blue-200 shadow-sm p-6 rounded-md text-white flex flex-col items-stretch gap-4 text-xs'>
                        <div className='flex flex-col'>
                            <p className='font-medium text-white/50'>Payment method</p>
                            <p>{formatPaymentMethod(selectedInvoice?.payment_method) || ''}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-white/50'>Invoice Number</p>
                            <p>{selectedInvoice?.invoice_number || ''}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-white/50'>Transaction Number</p>
                            <p>{selectedInvoice?.va_number || ''}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-white/50'>Payment status</p>
                            <p className={`${(selectedInvoice?.payement ? 'text-green-600' : 'text-red-600') || ''}`}>{(selectedInvoice?.payment == 1 ? 'Paid' : 'Unpaid') || ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
