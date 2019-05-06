using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
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
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Abstractions.Repositories;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Domain.Logic.Services;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Attributes;
using StartupCreativeAgency.Web.ReactRedux.Infrastructure;

namespace StartupCreativeAgency.Web.ReactRedux
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

            // Отмена редиректа на AccessDenied и Login страницы, за который отвечает Identity. O_o
            services.ConfigureApplicationCookie(options =>
            {
                options.Events = new CookieAuthenticationEvents
                {
                    // 403: Я вас узнал, но у вас нет прав доступа к ресурсу.
                    OnRedirectToAccessDenied = redirectContext =>
                    {
                        redirectContext.Response.StatusCode = 403;
                        return Task.CompletedTask;
                    },
                    // 401: Вы кто такой? Я вас не знаю, предъявите auth-информацию, ваша отсутствует или просрочена.
                    OnRedirectToLogin = redirectContext =>
                    {
                        redirectContext.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    }
                };
            });

            // Настройка JWT.
            services.AddAuthentication(options => options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => options.TokenValidationParameters = JwtHelper.GetValidationParameters());

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

            // Политики авторизации.
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Administrator"));
            });

            // Сжатие ответов сервера.
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

            services.AddMvc(options => options.Filters.Add(new CustomExceptionFilterAttribute()))
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
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
                app.UseHsts();
                app.UseResponseCompression();
                app.UseHttpsRedirection();
            }

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
