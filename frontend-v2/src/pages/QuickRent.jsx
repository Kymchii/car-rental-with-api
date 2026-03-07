/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { InputGroup } from "../assets/components/InputGroup";
import { Label } from "../assets/components/Label";
import { Error } from "../assets/components/Error";
import { ButtonBlue600 } from "../assets/components/ButtonBlue600";

import { API_BASE_URL, IMAGEKIT_URL } from "../config/api";
import { useEffect, useState } from "react";
import axios from "axios";

import { IoCloseOutline } from "react-icons/io5";

export const QuickRent = ({ carModel, openQuickRent, onCloseQuickRent, token, editClient, onQuickRentSuccess, user, onOpenLogin }) => {
    const [formData, setFormData] = useState({
        car_type_id: carModel?.id || '',
        start_at: '',
        end_of: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState(null);
    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [clientData, setClientData] = useState({
        phone: '',
        address: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone' || name === 'address') {
            setClientData({ ...clientData, [name]: value })
        } else {
            setFormData({ ...formData, [name]: value })
        }

        if (name === 'start_at' || name === 'end_of') {
            const updatedFormData = {
                ...formData,
                [name]: value,
            }

            if (updatedFormData.start_at && updatedFormData.end_of) {
                const start = new Date(updatedFormData.start_at);
                const end = new Date(updatedFormData.end_of);

                if (end >= start) {
                    const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                    const total = carModel.price * dayCount;

                    setDays(dayCount);
                    setTotalPrice(total);
                } else {
                    setDays(0);
                    setTotalPrice(0);
                }
            }
        }

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        setMessage('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log('formData:', formData);

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (editClient) {
                await handleUpdateClient(e);
            } else {
                await handleStoreClient(e);
            }

            const response = await axios.post(`${API_BASE_URL}/api/auth/checkout`, formData);

            if (response.data.success && response.data.data.snap_token) {
                const paymentData = response.data.data;

                window.snap.pay(paymentData.snap_token, {
                    onSuccess: function (result) {
                        axios.put(`${API_BASE_URL}/api/auth/checkout/${paymentData.invoice_id}`, {
                            payment_method: result.payment_type,
                            va_number: result.va_numbers?.[0]?.bank
                                ? `${result.va_numbers[0].bank.toUpperCase()} - ${result.va_numbers[0].va_number}`
                                : result.va_numbers?.[0]?.va_number || null,
                        });

                        setPayment({
                            status: 'success',
                            invoice_number: paymentData.invoice_number,
                            payment_code: paymentData.payment_code,
                            va_number: result.va_numbers?.[0]?.bank
                                ? `${result.va_numbers[0].bank.toUpperCase()} - ${result.va_numbers[0].va_number}`
                                : result.va_numbers?.[0]?.va_number || null,
                        });

                        onQuickRentSuccess();
                    },
                    onPending: function (result) {
                        setPayment({
                            status: 'pending',
                            invoice_number: paymentData.invoice_number,
                            payment_code: paymentData.payment_code,
                        });

                        axios.put(`${API_BASE_URL}/api/auth/checkout/${paymentData.invoice_id}`, {
                            payment_method: result.payment_type,
                            va_number: result.va_numbers?.[0]?.bank
                                ? `${result.va_numbers[0].bank.toUpperCase()} - ${result.va_numbers[0].va_number}`
                                : result.va_numbers?.[0]?.va_number || null,
                        });

                        onQuickRentSuccess();
                    },
                    onError: function (result) {
                        console.log('Payment error:', result);
                        setMessage('Pembayaran gagal');
                    },
                    onClose: function () {
                        console.log('Snap closed');
                    }
                });
            }

            setFormData({
                car_type_id: '',
                start_at: '',
                end_of: '',
            });

            setClientData({
                phone: '',
                address: '',
            });

            setTotalPrice(0);
        } catch (error) {
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleStoreClient = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/client`, clientData);
        } catch (error) {
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage(error.response.data.message);
            }
        }
    }

    const handleUpdateClient = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/auth/client/`, clientData);
        } catch (error) {
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        if (editClient) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setClientData({
                phone: editClient.phone,
                address: editClient.address,
            });
        }
    }, [editClient]);

    useEffect(() => {
        if (!user) {
            setClientData({
                phone: '',
                address: '',
            });
            setFormData({
                car_type_id: carModel?.id || '',
                start_at: '',
                end_of: '',
            })
            setTotalPrice(0);
            setDays(0);
        }
    }, [user]);

    useEffect(() => {
        if (carModel) {
            setFormData(prev => ({
                ...prev,
                car_type_id: carModel.id,
            }));
        }
    }, [carModel]);

    return (
        <div className={`w-full h-full fixed inset-0 z-50 justify-center flex bg-black/50 ${openQuickRent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} duration-300 transition-opacity`}>
            <div className={`bg-white shadow-lg w-full h-fit absolute bottom-0 px-4 duration-300 transition-transform lg:right-0 lg:h-full lg:w-1/3 sm:px-8 ${openQuickRent ? 'translate-y-0 lg:translate-x-0 lg:-translate-y-0' : 'translate-y-full lg:translate-x-full lg:-translate-y-full'} overflow-y-auto text-blue-600`}>
                <div className='flex justify-between py-4 sm:py-8 text-base'>
                    <h1>Quick Rent</h1>
                    <button onClick={onCloseQuickRent} className="cursor-pointer"><IoCloseOutline /></button>
                </div>
                <div className='flex justify-start gap-4 items-center py-4'>
                    <img src={`${IMAGEKIT_URL}/${carModel?.photo || ''}`} alt={carModel?.name || ''} className="w-25" />
                    <div className="flex flex-col gap-0.5">
                        <h2 className="font-semibold text-base">{carModel?.name || ''}</h2>
                        <p className="text-black/50">Rp. {carModel?.price?.toLocaleString('id-ID') || ''}</p>
                        <p className={`${(carModel?.is_available ? 'text-green-600' : 'text-red-600') || ''} font-light`}>{(carModel?.is_available ? 'Ready' : 'Not ready') || ''}</p>
                    </div>
                </div>
                <form className='flex flex-col gap-4 pb-4 sm:pb-8 items-stretch' onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label name='phone' />
                        <input type='text' id='phone' name='phone' placeholder='+628...' className="text-blue-600 px-4 py-4 border border-blue-600 placeholder:text-xs focus:outline-none focus:border-2 justify-self-center w-full bg-none h-7 placeholder:text-black/25 text-sm rounded-lg group-focus:delay-500 group-focus:transition-all read-only:bg-black/10" onChange={handleChange} value={clientData.phone} readOnly={(!carModel?.is_available) || ''} />
                        <Error errors={errors} name='phone' />
                    </InputGroup>
                    <InputGroup>
                        <Label name='address' />
                        <textarea className='text-blue-600 px-4 py-4 border border-blue-600 placeholder:text-xs focus:outline-none focus:border-2 justify-self-center w-full bg-none placeholder:text-black/25 text-sm rounded-lg group-focus:delay-500 group-focus:transition-all read-only:bg-black/10 h-20' name="address" id="address" placeholder='Insert your address...' onChange={handleChange} value={clientData.address} readOnly={(!carModel?.is_available) || ''}></textarea>
                        <Error errors={errors} name='address' />
                    </InputGroup>
                    <InputGroup>
                        <Label name='start at' />
                        <input type='date' id='start_at' name='start_at' className="text-blue-600 px-4 py-4 border border-blue-600 placeholder:text-xs focus:outline-none focus:border-2 justify-self-center w-full bg-none h-7 placeholder:text-black/25 text-sm rounded-lg group-focus:delay-500 group-focus:transition-all read-only:bg-black/10" onChange={handleChange} value={formData.start_at} readOnly={(!carModel?.is_available) || ''} />
                        <Error errors={errors} name='start_at' />
                    </InputGroup>
                    <InputGroup>
                        <Label name='end of' />
                        <input type='date' id='end_of' name='end_of' className="text-blue-600 px-4 py-4 border border-blue-600 placeholder:text-xs focus:outline-none focus:border-2 justify-self-center w-full bg-none h-7 placeholder:text-black/25 text-sm rounded-lg group-focus:delay-500 group-focus:transition-all read-only:bg-black/10" onChange={handleChange} value={formData.end_of} readOnly={(!carModel?.is_available) || ''} />
                        <Error errors={errors} name='end_of' />
                    </InputGroup>
                    <div className="flex justify-center pb-4">
                        <ButtonBlue600 disabled={loading ? true : false} onClick={user && token ? undefined : onOpenLogin} type={user && token ? 'submit' : 'button'}>
                            {
                                loading ? (
                                    <>
                                        <svg aria-hidden="true" className={`w-3 h-3 text-neutral-tertiary animate-spin fill-orange-600`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        Rp. {totalPrice.toLocaleString('id-ID')}
                                    </>
                                ) : (
                                    totalPrice > 0 ? `Rp. ${totalPrice.toLocaleString('id-ID')}` : 'Rent now'
                                )
                            }
                        </ButtonBlue600>
                    </div>
                </form>
            </div>
        </div>
    )
}
