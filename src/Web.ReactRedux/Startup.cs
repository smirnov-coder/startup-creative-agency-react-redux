using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Abstractions.Repositories;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Domain.Logic.Services;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Infrastructure;

namespace WebApplication1
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            connectionString = connectionString.Replace("{DataDirectory}",
                Path.Combine(Environment.ContentRootPath, "Data"));

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseLazyLoadingProxies().UseSqlite(connectionString,
                    sqliteOptions => sqliteOptions.MigrationsAssembly("Infrastructure"));
            });

            services.AddIdentity<UserIdentity, IdentityRole>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
            }).AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAuthentication(options => options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    //options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // укзывает, будет ли валидироваться издатель при валидации токена
                        ValidateIssuer = true,
                        // строка, представляющая издателя
                        ValidIssuer = JwtOptions.ISSUER,
                        // будет ли валидироваться потребитель токена
                        ValidateAudience = true,
                        // установка потребителя токена
                        ValidAudience = JwtOptions.AUDIENCE,
                        // будет ли валидироваться время существования
                        ValidateLifetime = true,

                        // установка ключа безопасности
                        IssuerSigningKey = JwtOptions.GetSymmetricSecurityKey(),
                        // валидация ключа безопасности
                        ValidateIssuerSigningKey = true
                    };
                });

            services.AddScoped<IRepository<ServiceInfo, int>, Repository<ApplicationDbContext, ServiceInfo, int>>();
            services.AddScoped<IRepository<WorkExample, int>, Repository<ApplicationDbContext, WorkExample, int>>();
            services.AddScoped<IRepository<BlogPost, int>, Repository<ApplicationDbContext, BlogPost, int>>();
            services.AddScoped<IRepository<Brand, int>, Repository<ApplicationDbContext, Brand, int>>();
            services.AddScoped<IRepository<Testimonial, int>, Repository<ApplicationDbContext, Testimonial, int>>();
            services.AddScoped<IRepository<Message, int>, Repository<ApplicationDbContext, Message, int>>();
            services.AddScoped<IRepository<DomainUser, int>, Repository<ApplicationDbContext, DomainUser, int>>();
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IServiceInfoService, ServiceInfoService>();
            services.AddScoped<IWorkExampleService, WorkExampleService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<IBrandService, BrandService>();
            services.AddScoped<ITestimonialService, TestimonialService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IContactsService, ContactsService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IUserService, UserService>();

            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Administrator"));
            });

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                // Оптимизация шрифтов
                // https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                {
                    "application/x-font-ttf", // TTF
                    "application/vnd.ms-fontobject", // EOT
                    "application/font-woff", // WOFF
                });
            });

            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.MaxDepth = 10;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    ConfigFile = "webpack.development.config.js",
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
                app.UseResponseCompression();
            }

            app.UseHttpsRedirection();
            app.UseStatusCodePagesWithReExecute("/{0}");

            // Для обслуживания favicon.
            FileExtensionContentTypeProvider provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".webmanifest"] = "application/manifest+json";
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
            });

            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
