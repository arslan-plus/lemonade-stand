using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LemonadeStand.Database.Models
{
    [Table("OrderItems")]
    public class OrderItem
    {
        [Key]
        public int ProductId { get; set; }
        public decimal ProductPrice { get; set; }
        [Key]
        public int OrderId { get; set; }
        public int Quantity { get; set; }


        [ForeignKey(nameof(ProductId))]
        public virtual Product? Product { get; set; }

        [ForeignKey(nameof(OrderId))]
        public virtual Order? Order { get; set; }

    }
}
