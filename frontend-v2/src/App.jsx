/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { sedan, swiper } from './config/data';
import axios from 'axios';
import { API_BASE_URL } from './config/api';

import { useEffect, useRef, useState } from 'react';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Confirmation } from './assets/components/Confirmation';
import { QuickRent } from './pages/QuickRent';
import Alert from '@mui/material/Alert';

import { IoMdCheckmark } from 'react-icons/io';
import { Navbar } from './assets/components/navbar/Navbar';
import { Hero } from './assets/components/hero/Hero';
import { Invoice } from './assets/components/invoice/Invoice';
import { InvoiceDetail } from './assets/components/invoice/InvoiceDetail';
import { CarBrand } from './assets/components/car-brand/CarBrand';
import { CarModel } from './assets/components/car-model/CarModel';
import { Footer } from './assets/components/footer/Footer';

function App() {
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [openQuickRent, setOpenQuickRent] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openInvoiceDetail, setOpenInvoiceDetail] = useState(false);
  const [client, setClient] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCarModels = async (searchQuery = '', brandId = null, type = null) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/car-models`, {
        params: {
          search: searchQuery,
          brand_id: brandId,
          type: type,
        }
      });
      setCarModels(response.data.data);
    } catch (error) {
      console.log('Terjadi error', error);
    } finally {
      setLoading(false);
    }
  }

  const getCarBrands = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/car-brands`);
      setCarBrands(response.data.data);
    } catch (error) {
      console.log('Terjadi error', error);
    } finally {
      setLoading(false);
    }
  }

  const getInvoices = async () => {
    try {
      if (!token) return;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${API_BASE_URL}/api/auth/invoices`);
      setInvoices(response.data.data);
    } catch (error) {
      console.log('Terjadi error', error);
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
  }, []);

  const handleRegisterSuccess = (userData, authToken) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('access_token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsRegister(false);
  }

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setConfirmation(false);
    setInvoices([]);
    delete axios.defaults.headers.common['Authorization'];
    setOpenMessage(!openMessage);
    setMessage('Logout Success');
    setTimeout(() => {
      setOpenMessage(false);
      setMessage('');
    }, 3000);
  }

  const handleLoginSuccess = (userData, authToken) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('access_token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLogin(false);
    setOpenMessage(!openMessage);
    setMessage('Login Success');
    setTimeout(() => {
      setOpenMessage(false);
      setMessage('');
    }, 3000);
  }

  const handleOpenInvoice = (e) => {
    e.preventDefault();
    setOpenInvoice(!openInvoice);
    setOpen(false);
  }

  const handleConfirmation = (e) => {
    e.preventDefault();
    setConfirmation(!confirmation);
    setOpen(false);
  }

  const handleOpenQuickRent = (carModel) => {
    setSelectedCar(carModel);
    setOpenQuickRent(true);
  }

  const handleCloseQuickRent = () => {
    setSelectedCar(null);
    setOpenQuickRent(false);
  }

  const handleCheckoutSuccess = () => {
    setOpenQuickRent(false);
    getInvoices();

    axios.get(`${API_BASE_URL}/api/auth/client`).then(res => {
      if (res.data.success && res.data.data) {
        setEditClient(res.data.data);
        setClient(res.data.data);
      }
    }).catch(() => { });
  }

  const handleOpenInvoiceDetail = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenInvoiceDetail(!openInvoiceDetail);
    setOpenInvoice(false);
  }

  const handleOpenLogin = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setOpenQuickRent(false);
    setOpen(false);
  }

  useEffect(() => {
    const pressEsc = (e) => {
      if (e.key === 'Escape') {
        setOpenInvoice(false);
      }
    }

    window.addEventListener('keydown', pressEsc);

    return () => {
      window.removeEventListener('keydown', pressEsc);
    }
  }, []);

  useEffect(() => {
    getCarBrands();
    getCarModels();
  }, []);

  useEffect(() => {
    if (user && token) {
      getInvoices();
    }
  }, []);

  useEffect(() => {
    if (token) {
      getInvoices();

      axios.get(`${API_BASE_URL}/api/auth/client`).then(res => {
        if (res.data.success && res.data.data) {
          setEditClient(res.data.data);
          setClient(res.data.data);
        }
      }).catch(() => { });
    }
  }, [token]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCarModels(search, selectedBrand, selectedType);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, selectedBrand, selectedType]);

  return (
    <>
      {/* NAVBAR */}
      <Navbar onConfirmation={handleConfirmation} onOpenInvoice={handleOpenInvoice} onOpenLogin={handleOpenLogin} search={search} setOpen={setOpen} setSearch={setSearch} token={token} user={user} open={open} selectedType={selectedType} setSelectedType={setSelectedType} />
      {/* END NAVBAR */}

      {/* HERO SECTION */}
      {
        selectedType === 'sedan' && (
          <Hero swiper={sedan} />
        )
      }
      {
        !selectedType && (
          <Hero swiper={swiper} />
        )
      }
      {/* END HERO SECTION */}

      {/* CAR BRAND SECTION */}
      <CarBrand carBrands={carBrands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} loading={loading} />
      {/* END CAR BRAND SECTION */}

      {/* CAR MODEL SECTION */}
      <CarModel carModels={carModels} onOpenQuickRent={handleOpenQuickRent} loading={loading} />
      {/* END CAR MODEL SECTION */}

      {/* LOGIN */}
      <Login isLogin={isLogin} setIsLogin={setIsLogin} setIsRegister={setIsRegister} onLoginSuccess={handleLoginSuccess} />
      {/* END LOGIN */}

      {/* REGISTER */}
      <Register isRegister={isRegister} setIsLogin={setIsLogin} setIsRegister={setIsRegister} onRegisterSuccess={handleRegisterSuccess} />
      {/* END REGISTER */}

      {/* LOGOUT */}
      <Confirmation confirmation={confirmation} setConfirmation={setConfirmation} onLogout={handleLogout} />
      {/* END LOGOUT */}

      {/* Alert */}
      <div className={`flex justify-end items-end fixed inset-0 z-50 p-4 pointer-events-none ${openMessage ? 'opacity-100' : 'opacity-0'} duration-100 transition-opacity`}>
        <div className={`h-fit w-fit absolute ${openMessage ? 'translate-x-0' : 'translate-x-full'} duration-100 transition-transform`}>
          <Alert icon={<IoMdCheckmark fontSize="inherit" />} severity="success">
            {message}
          </Alert>
        </div>
      </div>
      {/* End Alert */}

      {/* INVOICE */}
      <Invoice invoices={invoices} onOpenInvoiceDetail={handleOpenInvoiceDetail} openInvoice={openInvoice} setOpenInvoice={setOpenInvoice} />
      {/* END INVOICE */}

      {/* INVOICE DETAIL */}
      <InvoiceDetail client={client} openInvoiceDetail={openInvoiceDetail} selectedInvoice={selectedInvoice} setOpenInvoiceDetail={setOpenInvoiceDetail} user={user} />
      {/* END INVOICE DETAIL */}

      {/* FOTTER */}
      <Footer />
      {/* END FOOTER */}

      {/* QUICK RENT */}
      <QuickRent onCloseQuickRent={handleCloseQuickRent} openQuickRent={openQuickRent} carModel={selectedCar} token={token} editClient={editClient} onQuickRentSuccess={handleCheckoutSuccess} onOpenLogin={handleOpenLogin} user={user} />
      {/* END QUICK RENT */}
    </>
  )
}

export default App