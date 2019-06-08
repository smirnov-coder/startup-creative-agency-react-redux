using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using StartupCreativeAgency.Infrastructure;

namespace StartupCreativeAgency.Web.ReactRedux.Infrastructure
{
    /// <summary>
    /// Вспомогательный класс для работы с JSON Web Token (JWT).
    /// </summary>
    public static class JwtHelper
    {
        /// <summary>
        /// Асинхронно создаёт JWT для пользователя.
        /// </summary>
        /// <param name="user">Идентичность пользователя доменной модели.</param>
        /// <param name="userManager">Хранилище идентичностей пользователей доменной модели в виде объекта
        /// класса <see cref="UserManager{UserIdentity}"/>.</param>
        /// <returns>JWT, закодированный в компактном сериализованном формате.</returns>
        public static async Task<string> GetEncodedJwtAsync(UserIdentity user, UserManager<UserIdentity> userManager)
        {
            var roles = await userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, role));
            }
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

            var today = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: JwtOptions.ISSUER,
                audience: JwtOptions.AUDIENCE,
                notBefore: today,
                claims: claims,
                expires: today.Add(TimeSpan.FromDays(JwtOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(JwtOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        /// <summary>
        /// Проверяет валидность JSON Web Token (JWT).
        /// </summary>
        /// <param name="encodedJwt">JWT, закодированный в компактном сериализованном формате.</param>
        /// <returns>true, если JWT является валидным; иначе false.</returns>
        public static bool IsValid(string encodedJwt)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            jwtHandler.ValidateToken(encodedJwt, GetValidationParameters(), out SecurityToken token);
            return token != null;
        }

        /// <summary>
        /// Возвращает параметры проверки валидации JSON Web Token (JWT).
        /// </summary>
        public static TokenValidationParameters GetValidationParameters() =>
            new TokenValidationParameters
            {
                // Укзывает, будет ли валидироваться издатель при валидации токена.
                ValidateIssuer = true,
                // Строка, представляющая издателя.
                ValidIssuer = JwtOptions.ISSUER,
                // Будет ли валидироваться потребитель токена.
                ValidateAudience = true,
                // Установка потребителя токена.
                ValidAudience = JwtOptions.AUDIENCE,
                // Будет ли валидироваться время существования.
                ValidateLifetime = true,
                // Установка ключа безопасности.
                IssuerSigningKey = JwtOptions.GetSymmetricSecurityKey(),
                // Валидация ключа безопасности.
                ValidateIssuerSigningKey = true
            };
    }
}
