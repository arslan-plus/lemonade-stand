using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LemonadeStand.Database.Models
{
    public enum ProductSize
    {
        [Display(Name ="Regular")]
        Regular=0,
        [Display(Name = "Large")]
        Large =1
    }

    [Table("Products")]
    public class Product
    {  
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public ProductSize Size { get; set; }
        public decimal Price { get; set; }

    }
}
