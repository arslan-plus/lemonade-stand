import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, query } from './graphql';

export const checkOutAsync = createAsyncThunk('onlineStore/checkOut', async (_, { getState }) => {
    const state = getState();
    let order = state.onlineStore.order;
    const customer = order.customer;

    order = await (customer.type === 'new'
        ? mutation.addOrder({ email: customer.email, name: customer.name, phone: customer.phone }, order.items.map(x => ({ productId: x.productId, quantity: x.quantity })))
        : mutation.addOrderToCustomer(order.customerId, order.items.map(x => ({ productId: x.productId, quantity: x.quantity }))));

    if (!order.customer)
        order = await query.getOrdersAsync({ id: { eq: order.id } }).then(x => x[0]);

    return order;
});
export const loadCustomerAsync = createAsyncThunk('onlineStore/loadCustomer', async (_, { getState }) => {
    const state = getState();
    const order = state.onlineStore.order;
    const customer = order.customer;
    const customers = await query.getCustomersAsync({ or: [{ phone: { eq: customer.phone } }, { email: { eq: customer.email } }] });
    return customers.length > 0 ? customers[0] : null;
});
export const loadOrdersAsync = createAsyncThunk('onlineStore/loadOrders', ({ where, order }) => query.getOrdersAsync(where, order));
export const loadProductsAsync = createAsyncThunk('onlineStore/loadProducts', () => query.getProductsAsync());


const slice = createSlice({
    name: 'onlineStore',
    initialState: {
        orders: [],
        products: [],
        order: { id: 0, customer: { id: 0, type: 'new', email: '', name: '', phone: '' }, bill: 0, items: [] }
    },
    reducers: {
        setCustomer: (state, action) => {
            state.order.customerId = action.payload.id;
            state.order.customer = action.payload;
        },
        setItem: (state, action) => {
            const order = state.order;
            const item = order.items[action.payload.index] = action.payload.item;
            if (item.quantity > 99)
                item.quantity = 99;
            else if (item.quantity < 0)
                item.quantity = 0;

            order.bill = order.items.reduce(((r, i) => r + i.quantity * i.price), 0);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkOutAsync.fulfilled, (state, action) => {
                state.order = { id: 0, customer: { id: 0, type: 'new', email: '', name: '', phone: '' }, bill: 0, items: state.products.map(x => ({ productId: x.id, name: x.name, size: x.size, price: x.price, quantity: 0 })) };
                state.orders.unshift(action.payload);

                state.status = 'idle';
            })
            .addCase(checkOutAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(loadCustomerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCustomerAsync.fulfilled, (state, action) => {
                const customer = action.payload;
                if (!customer)
                    return;

                state.order.customerId = customer.id;
                state.order.customer = { ...customer, type: 'existing' };

                state.status = 'idle';
            })
            .addCase(loadCustomerAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(loadOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrdersAsync.fulfilled, (state, action) => {
                state.orders = action.payload;

                state.status = 'idle';
            })
            .addCase(loadOrdersAsync.rejected, (state, action) => {
                state.orders = action.payload;

                state.status = 'idle';
            })
            .addCase(loadProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload;
                state.order.items = state.products.map(x => ({ productId: x.id, name: x.name, size: x.size, price: x.price, quantity: 0 }));

                state.status = 'idle';
            })
            .addCase(loadProductsAsync.rejected, (state, action) => {
                state.products = [];
                state.order.items = []

                state.status = 'idle';
            });
    },
});

export const updateCustomer = (callback) => {
    return (dispatch, getState) => {
        const state = getState();
        const customer = state.onlineStore.order.customer;
        const patch = callback(customer);
        if (customer.type === 'existing' && (patch.email || patch.phone)) {
            patch.id = 0;
            patch.name = '';
        }

        dispatch(slice.actions.setCustomer({ ...customer, ...patch }));
    }
}

export const updateItem = (productId, callback) => {
    return (dispatch, getState) => {
        const state = getState();
        const items = state.onlineStore.order.items;
        const index = items.findIndex(x => x.productId === productId);
        const patch = callback(items[index]);
        dispatch(slice.actions.setItem({ index, item: { ...items[index], ...patch } }));
    }
}

export default slice;