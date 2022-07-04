using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;

using LemonadeStand.Database;
using LemonadeStand.Database.Models;

using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace LemonadeStand.GraphQL.API.Schema
{
    public class QueryType
    {
        [UseDbContext(typeof(LemonadeStandContext))]
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Product> GetProducts([ScopedService] LemonadeStandContext db) => db.Products;


        [UseDbContext(typeof(LemonadeStandContext))]
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Customer> GetCustomers([ScopedService] LemonadeStandContext db) => db.Customers;


        [UseDbContext(typeof(LemonadeStandContext))]
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Order> GetOrders([ScopedService] LemonadeStandContext db) => db.Orders;
    }
}