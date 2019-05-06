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
    public static class JwtHelper
    {
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

        public static bool IsValid(string encodedJwt)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            jwtHandler.ValidateToken(encodedJwt, GetValidationParameters(), out SecurityToken token);
            return token != null ? true : false;
        }

        public static TokenValidationParameters GetValidationParameters() =>
            new TokenValidationParameters
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
    }
}
