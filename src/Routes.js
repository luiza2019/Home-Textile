import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';
import Home from './components/main/Home';
import AuthPage from './components/pages/AuthPage'
import ProductPage from './components/pages/ProductPage';
import MerchContextProvider from './contexts/MerchContext';
import CartPage from './components/pages/CartPage';
import RightSideCart from './components/cart/RightSideCart';

const MyRoutes = () => {
    return (
        <UserContextProvider>

            <AuthContextProvider>
                <MerchContextProvider>

                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/auth" element={<AuthPage />} />
                            <Route exact path="/products/:category" element={<ProductPage />} />
                            <Route exact path="/cart" element={<RightSideCart />} />



                            {/* <Navigate /> */}

                        </Routes>
                    </BrowserRouter>
                </MerchContextProvider>

            </AuthContextProvider>
        </UserContextProvider>

    );
};

export default MyRoutes;