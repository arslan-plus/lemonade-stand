using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LemonadeStand.Database.Models
{
    [Table("Customers")]
    public class Customer
    {   
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        [StringLength(100, MinimumLength = 5, ErrorMessage ="Name is required to be between 5 and 100 characters")]
        public string Name { get; set; }
        [MaxLength(200)]
        public string? Email { get; set; }
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Phone is required to be 12 characters")]
        public string? Phone { get; set; }

        [InverseProperty("Customer")]
        public List<Order>? Orders { get; set; }

    }
}
