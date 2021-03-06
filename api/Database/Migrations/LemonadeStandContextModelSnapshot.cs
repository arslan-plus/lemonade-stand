// <auto-generated />
using System;

using LemonadeStand.Database;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LemonadeStand.Database.Migrations
{
    [DbContext(typeof(LemonadeStandContext))]
    partial class LemonadeStandContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("LemonadeStand.Database.Models.Customer", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                b.Property<string>("Email")
                    .HasMaxLength(200)
                    .HasColumnType("nvarchar(200)");

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnType("nvarchar(100)");

                b.Property<string>("Phone")
                    .HasMaxLength(12)
                    .HasColumnType("nvarchar(12)");

                b.HasKey("Id");

                b.ToTable("Customers");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.Order", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                b.Property<decimal>("Bill")
                    .HasColumnType("money");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("datetime2");

                b.Property<int>("CustomerId")
                    .HasColumnType("int");

                b.Property<int>("Status")
                    .HasColumnType("int");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("datetime2");

                b.HasKey("Id");

                b.HasIndex("CustomerId");

                b.ToTable("Orders");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.OrderItem", b =>
            {
                b.Property<int>("OrderId")
                    .HasColumnType("int");

                b.Property<int>("ProductId")
                    .HasColumnType("int");

                b.Property<decimal>("ProductPrice")
                    .HasColumnType("money");

                b.Property<int>("Quantity")
                    .HasColumnType("int");

                b.HasKey("OrderId", "ProductId");

                b.HasIndex("ProductId");

                b.ToTable("OrderItems");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.Product", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnType("varchar(100)");

                b.Property<decimal>("Price")
                    .HasColumnType("money");

                b.Property<int>("Size")
                    .HasColumnType("int");

                b.HasKey("Id");

                b.ToTable("Products");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.Order", b =>
            {
                b.HasOne("LemonadeStand.Database.Models.Customer", "Customer")
                    .WithMany("Orders")
                    .HasForeignKey("CustomerId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Customer");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.OrderItem", b =>
            {
                b.HasOne("LemonadeStand.Database.Models.Order", "Order")
                    .WithMany("Items")
                    .HasForeignKey("OrderId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("LemonadeStand.Database.Models.Product", "Product")
                    .WithMany()
                    .HasForeignKey("ProductId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Order");

                b.Navigation("Product");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.Customer", b =>
            {
                b.Navigation("Orders");
            });

            modelBuilder.Entity("LemonadeStand.Database.Models.Order", b =>
            {
                b.Navigation("Items");
            });
#pragma warning restore 612, 618
        }
    }
}
