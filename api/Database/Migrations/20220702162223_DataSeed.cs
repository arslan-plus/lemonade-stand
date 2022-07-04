using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LemonadeStand.Database.Migrations
{
    public partial class DataSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder
               .Sql(@"SET IDENTITY_INSERT [Products] ON;
                    INSERT INTO [Products]([Id], [Name], [Size], [Price])
                    VALUES
	                    (1,'Lemonade', 0, 1),
	                    (2,'Pink Lemonade', 0, 1),
	                    (3,'Lemonade', 1, 1.5),
	                    (4,'Pink Lemonade', 1, 1.5);
                    SET IDENTITY_INSERT [Products] OFF;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder
             .Sql(@"DELETE FROM [Products] WHERE [Id] <= 4;");
        }
    }
}
