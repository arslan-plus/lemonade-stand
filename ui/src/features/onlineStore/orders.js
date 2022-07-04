
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { loadOrdersAsync } from './onlineStoreSlice';

const Orders = () => {
    const state = useSelector(x => x.onlineStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadOrdersAsync({ order: { id: 'DESC' } }))
            .then(x => {
                if (!x.payload.length)
                    navigate('/orders/new');
            });
    }, [])

    return (<div className="row">
        <div className="mt-3 col-md-12">
            <div className='card'>
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-11">
                            <h3>Orders</h3>
                        </div>
                        <div className="col-1">
                            <Link to={'/orders/new'} className="btn btn-dark float-end">+</Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th rowSpan="2" className="align-top">Id</th>
                                        <th colSpan="4" className="text-center">Customer</th>
                                        <th rowSpan="2" className="align-top">Bill</th>
                                        <th rowSpan="2" className="align-top">Status</th>
                                        <th rowSpan="2" className="align-top">Created At</th>
                                        <th rowSpan="2" className="align-top">Updated At</th>
                                    </tr>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {state.orders.map(x => {
                                        let createdAt = new Date(x.createdAt);
                                        createdAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`

                                        let updatedAt = new Date(x.updatedAt);
                                        updatedAt = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`
                                        return (<tr key={x.id}>
                                            <td>{x.id}</td>
                                            <td>{x.customer.id}</td>
                                            <td>{x.customer.name}</td>
                                            <td>{x.customer.phone}</td>
                                            <td>{x.customer.email}</td>
                                            <td>${x.bill.toFixed(2)}</td>
                                            <td>{x.status}</td>
                                            <td>{createdAt}</td>
                                            <td>{updatedAt}</td>
                                        </tr>)
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Orders;
