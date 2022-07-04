using LemonadeStand.Database;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using HotChocolate.AspNetCore;
using HotChocolate;
using LemonadeStand.GraphQL.API.Schema;
using HotChocolate.Data;
using Microsoft.Extensions.Hosting;

namespace LemonadeStand.GraphQL.API;

public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    public IConfiguration Configuration { get; }

    public IWebHostEnvironment Environment { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        var connectionSTring = Configuration.GetConnectionString("LemonadeStandContext");
        services.AddDbContextFactory<LemonadeStandContext>(options => options.UseSqlServer(connectionSTring, x => x.MigrationsAssembly("Database")));

        services
            .AddGraphQLServer()
            .RegisterDbContext<LemonadeStandContext>(DbContextKind.Synchronized)
            .AddQueryType<QueryType>()
            .AddMutationType<MutationType>()
            .AddProjections()
            .AddFiltering()
            .AddSorting();

        services.AddCors();

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<LemonadeStandContext>();
            db.Database.Migrate();
        }

        app.UseRouting();

        app.UseCors(x => x.SetIsOriginAllowed(x=>true).AllowAnyMethod().AllowAnyHeader());

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGraphQL();
        });
    }
}
