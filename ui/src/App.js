import React from 'react';
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Orders from './features/onlineStore/orders';
import New from './features/onlineStore/new';
import CheckOut from './features/onlineStore/checkout';

const App = () =>
  <div className="container">
    <div className="row">
    <div className="col-md-12 text-center mt-3">
      <Link to="/orders"><img src="/assets/images/logo.png" alt="" className="logo" /> </Link>
      </div>
    </div>
    <Routes>
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/new" element={<New />} />
      <Route path="/orders/new/checkout" element={<CheckOut />} />
      <Route path="*" element={<Navigate replace to="/orders" />} />
    </Routes>
  </div>

export default App;
