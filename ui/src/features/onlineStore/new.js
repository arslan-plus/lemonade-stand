
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { loadProductsAsync, updateItem } from './onlineStoreSlice';

const Cart = () => {
    const state = useSelector(x => x.onlineStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.products.length)
            dispatch(loadProductsAsync())
    }, [])

    return (<div className="row">
        <div className="mt-3 col-md-8">
            <div className='card'>
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-11 text-start">
                            <h3>Cart</h3>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th className="text-end">Price</th>
                                        <th className="text-center">QTY</th>
                                        <th className="text-end">Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.products.map(x => {
                                        const item = state.order.items.find(i => i.productId === x.id);
                                        return (<tr key={item.productId} className="item">
                                            <td className="item-img">
                                                <img src="/assets/images/lemon.png" alt="" />
                                            </td>
                                            <td>
                                                <div className="item-name">{x.name} </div>
                                                <div className="item-size">{x.size.toLowerCase()}</div>
                                            </td>
                                            <td className="item-price">${item.price.toFixed(2)}</td>
                                            <td className="text-center">
                                                <div className="item-quantity">
                                                    <button className="minus" type="button" onClick={() => dispatch(updateItem(item.productId, i => ({ quantity: i.quantity - 1 })))}>-</button>
                                                    <input className="value" value={item.quantity} readOnly={true} />
                                                    <button className="plus" type="button" onClick={() => dispatch(updateItem(item.productId, i => ({ quantity: i.quantity + 1 })))}>+</button>
                                                </div>
                                            </td>
                                            <td className="item-bill">${(item.price * item.quantity).toFixed(2)}</td>
                                            <td><button className="btn" onClick={() => dispatch(updateItem(item.productId, () => ({ quantity: 0 })))}><i className="fas fa-trash-alt"></i></button></td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-3 col-md-4">
            <div className="card">
                <div className="card-header"><b>Summary</b></div>
                <div className="card-body">

                    <b className="float-start mt-3 mb-5">Total</b>
                    <b className="float-end mt-3 mb-5">${state.order.bill.toFixed(2)}</b>

                    <button type="button" className="col-md-12 btn btn-dark" disabled={state.order.bill === 0} onClick={() => navigate('/orders/new/checkout')}>Order Now</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Cart;
