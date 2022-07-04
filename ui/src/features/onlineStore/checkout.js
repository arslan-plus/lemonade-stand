
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { checkOutAsync, loadCustomerAsync, updateCustomer } from './onlineStoreSlice';

const validateEmail = (value) => {
    if (!value)
        return null;

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

const validateName = (value) => {
    if (!value)
        return null;

    return value.trim().length > 4;
}

const patternPhone = "[0-9]{3}-[0-9]{3}-[0-9]{4}";
const validatePhone = (value) => {
    if (!value)
        return null;

    const regex = new RegExp(patternPhone);
    return regex.test(value);
}

const CheckOut = () => {
    const order = useSelector(x => x.onlineStore.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (order.bill === 0)
            navigate('/orders/new');
    }, [])

    const customer = order.customer;
    const isEmailValid = validateEmail(customer.email);
    const isNameValid = validateName(customer.name);
    const isPhoneValid = validatePhone(customer.phone);

    const canSerchCustomer = () => isEmailValid || isPhoneValid;

    const canCheckout = () => {
        if (!isNameValid)
            return false;

        if (isEmailValid === false || isPhoneValid === false)
            return false;

        return isEmailValid || isPhoneValid;
    }

    const checkOut = async () => {
        const isEmailValid = validateEmail(customer.email);
        const isNameValid = validateName(customer.name);
        const isPhoneValid = validatePhone(customer.phone);

        const action = await dispatch(checkOutAsync());
        if (action.type === 'onlineStore/checkOut/fulfilled')
            navigate('/orders');
    }

    return (<div className="row">
        <div className="mt-3 col-md-8">
            <div className='card'>
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Check Out</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="mb-3 row">
                        <label htmlFor="customerType" className="col-md-3 col-form-label pt-0">Customer Type: </label>
                        <div className="col-md-9">
                            <div className="form-check form-check-inline">
                                <input id="new" className="form-check-input" type="radio" name="customerType" value="new" checked={customer.type === 'new'} onClick={x => dispatch(updateCustomer(i => ({ type: x.currentTarget.value })))} />
                                <label className="form-check-label" htmlFor="new">New</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input id="existing" className="form-check-input" type="radio" name="customerType" value="existing" checked={customer.type === 'existing'} onClick={x => dispatch(updateCustomer(i => ({ type: x.currentTarget.value })))} />
                                <label className="form-check-label" htmlFor="existing">Existing</label>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="mb-3 row">
                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone: </label>
                        <div className="col-sm-10">
                            <input className={`form-control ${isPhoneValid === null ? '' : (isPhoneValid === true ? 'is-valid' : 'is-invalid')}`} type="tel" id="phone" name="phone" placeholder="123-123-1234" maxLength={12} pattern={patternPhone} value={customer.phone} onChange={x => dispatch(updateCustomer(i => ({ phone: x.currentTarget.value })))} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>
                        <div className="col-sm-10">
                            <input className={`form-control ${isEmailValid === null ? '' : (isEmailValid === true ? 'is-valid' : 'is-invalid')}`} type="email" id="email" name="email" placeholder="joe@doe.com" maxLength={200} value={customer.email} onChange={x => dispatch(updateCustomer(i => ({ email: x.currentTarget.value })))} />
                        </div>
                    </div>

                    {customer.type === 'new' || customer.name
                        ? <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Name: </label>
                            <div className="col-sm-10">
                                <input className={`form-control ${isNameValid === null ? '' : (isNameValid === true ? 'is-valid' : 'is-invalid')}`} type="text" id="name" name="name" placeholder="Joe Doe" maxLength={100} value={customer.name} onChange={x => dispatch(updateCustomer(i => ({ name: x.currentTarget.value })))} readOnly={customer.type === 'existing'} />
                            </div>
                        </div>
                        : <></>}

                    <Link to={'/orders/new'} className="btn btn-dark">Update Cart</Link>
                    {customer.type === 'new'
                        ? <></>
                        : <button type="button" className="btn btn-dark float-end" disabled={!canSerchCustomer()} onClick={() => dispatch(loadCustomerAsync())}>Search Customer</button>}
                </div>
            </div>
        </div>

        <div className="mt-3 col-md-4">
            <div className="card">
                <div className="card-header"><b>Summary</b></div>
                <div className="card-body">

                    <b className="float-start mt-3 mb-5">Total</b>
                    <b className="float-end mt-3 mb-5">${order.bill.toFixed(2)}</b>

                    <button type="button" className="col-md-12 btn btn-dark" disabled={!canCheckout()} onClick={() => checkOut()}>Check Out</button>
                </div>
            </div>
        </div>
    </div>);
}

export default CheckOut;