using LemonadeStand.Database.Models;

using Microsoft.EntityFrameworkCore;


namespace LemonadeStand.Database
{
    public partial class LemonadeStandContext : DbContext
    {
        public LemonadeStandContext()
        {
        }

        public LemonadeStandContext(DbContextOptions<LemonadeStandContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=lemonade-stand-db;Initial Catalog=master;User Id=SA;Password=yourStrong(!)Password;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Product>(entity => {
                    entity
                        .Property(e => e.Name).HasMaxLength(100).IsUnicode(false);

                    entity.Property(e => e.Price).HasColumnType("money");
                });

            modelBuilder
                .Entity<Order>(entity =>{
                    entity.Property(e => e.Bill).HasColumnType("money");
                });

            modelBuilder
                .Entity<OrderItem>(entity => {
                    entity.Property(e => e.ProductPrice).HasColumnType("money");
                });

            modelBuilder
                .Entity<OrderItem>()
                .HasKey(nameof(OrderItem.OrderId), nameof(OrderItem.ProductId));

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
