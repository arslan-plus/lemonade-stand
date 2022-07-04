using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LemonadeStand.Database.Models
{
    public enum OrderStatus
    {
        [Display(Name = "Pending")]
        Pending = 0,
        [Display(Name = "Ready")]
        Ready = 1,
        [Display(Name = "Delivered")]
        Delivered = 2
    }


    [Table("Orders")]
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public decimal Bill { get; set; }
        public OrderStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


        [ForeignKey(nameof(CustomerId))]
        public Customer? Customer { get; set; }

        [InverseProperty("Order")]
        public List<OrderItem> Items { get; set; }

    }
}
