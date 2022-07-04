import config from '../../environments/config';

const executeAsync = async (query, variables) => {
    let res = await fetch(config.services.graphql.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables }) })
    res = await res.json();
    return res.data;
}

const getCustomersAsync = (where, order) => {
    const query = 'query($where: CustomerFilterInput, $order: [CustomerSortInput!]) { customers(where:$where, order: $order) { nodes {id name email phone } } }';
    return executeAsync(query, {where, order}).then(x => x.customers.nodes);
};

const getOrdersAsync = (where, order) => {
    const query = 'query($where: OrderFilterInput, $order: [OrderSortInput!]) { orders(where:$where, order: $order) { nodes { id customerId customer { id name email phone } bill status createdAt updatedAt } } }';
    return executeAsync(query, {where, order}).then(x => x.orders.nodes);
};

const getProductsAsync = (where, order) => {    
    const query = 'query($where: ProductFilterInput, $order: [ProductSortInput!]) { products(where:$where, order: $order) { nodes { id name size price } } }';
    return executeAsync(query, {where, order}).then(x => x.products.nodes);
};

const addOrder = (customer, items) => {
    const variables = { customer, items };
    const query = 'mutation($customer : CustomerInput!, $items: [OrderItemInput!]!){ addOrder(customer: $customer, items: $items) { id customerId customer { id name email phone } bill status createdAt updatedAt } }';
    return executeAsync(query, variables).then(x=>x.addOrder);
}

const addOrderToCustomer = (customerId, items) => {
    const variables = { customerId, items };
    const query = 'mutation($customerId : Int!, $items: [OrderItemInput!]!){ addOrderToCustomer(customerId: $customerId, items: $items) { id customerId customer { id name email phone } bill status createdAt updatedAt } }';
    return executeAsync(query, variables).then(x=>x.addOrderToCustomer);
}

export const query = { getCustomersAsync, getOrdersAsync, getProductsAsync };
export const mutation = { addOrder, addOrderToCustomer };

const defaults = { mutation, query };
export default defaults;