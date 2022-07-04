using HotChocolate;
using HotChocolate.Types;

using LemonadeStand.Database;
using LemonadeStand.Database.Models;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace LemonadeStand.GraphQL.API.Schema
{
    public class CustomerInput
    {
        [Required]
        [MaxLength(100)]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "Name is required to be between 5 and 100 characters")]
        public string Name { get; set; }
        [MaxLength(200)]
        public string? Email { get; set; }
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Phone is required to be 12 characters")]
        public string? Phone { get; set; }
    }

    public class OrderItemInput
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }


    public class MutationType
    {
        public async Task<Order> AddOrder([Service] LemonadeStandContext db, CustomerInput customer, List<OrderItemInput> items)
        {
            if (items.Count == 0 || items.All(x => x.Quantity <= 0))
                throw new Exception("Input 'items' collection should contain at least one product.");

            var productIds = items.Select(x => x.ProductId).ToList();
            var products = await db.Products.Where(x => productIds.Contains(x.Id)).ToDictionaryAsync(x => x.Id, x => x.Price);

            if (products.Count != productIds.Count)
                throw new Exception("Input 'items' collection contains invalid or duplicated 'ProductId'.");

            var timeStamp = DateTime.UtcNow;
            var order = new Order {
                Customer = new Customer { Name = customer.Name, Email = customer.Email, Phone = customer.Phone },
                Bill = items.Sum(x => products[x.ProductId] * x.Quantity),
                Status = OrderStatus.Pending,
                CreatedAt = timeStamp,
                UpdatedAt = timeStamp
            };

            db.Orders.Add(order);
            await db.SaveChangesAsync();
            return order;
        }

        public async Task<Order> AddOrderToCustomer([Service] LemonadeStandContext db, int customerId, List<OrderItemInput> items)
        {
            if (customerId <= 0)
                throw new Exception("Invalid 'customerId' provided.");

            if (items.Count == 0 || items.All(x => x.Quantity <= 0))
                throw new Exception("Input 'items' collection should contain at least one product.");

            var productIds = items.Select(x => x.ProductId).ToList();
            var products = await db.Products.Where(x => productIds.Contains(x.Id)).ToDictionaryAsync(x => x.Id, x => x.Price);

            if (products.Count != productIds.Count)
                throw new Exception("Input 'items' collection contains invalid or duplicated 'ProductId'.");

            var timeStamp = DateTime.UtcNow;
            var order = new Order {
                CustomerId = customerId,
                Items = items.Select(x => new OrderItem { ProductId = x.ProductId, ProductPrice = products[x.ProductId], Quantity = x.Quantity}).ToList(),
                Bill = items.Sum(x => products[x.ProductId] * x.Quantity),
                Status= OrderStatus.Pending,
                CreatedAt = timeStamp,
                UpdatedAt = timeStamp
            };

            db.Orders.Add(order);
            await db.SaveChangesAsync();
            return order;
        }

        public async Task<Order> AddOrderToCustomer([Service] LemonadeStandContext db, int orderId, OrderStatus status)
        {
            if (orderId <= 0)
                throw new Exception("Invalid 'orderId' provided.");

            var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == orderId);
            if (order == null)
                throw new Exception("Invalid 'orderId' provided.");

            order.Status = status;
            await db.SaveChangesAsync();
            return order;
        }
    }
}
