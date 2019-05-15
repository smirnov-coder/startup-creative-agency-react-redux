using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    /// <summary>
    /// Абстрактный базовый класс API-контроллера. Предоставляет реализацию логики, общей для других API-контроллеров.
    /// </summary>
    /// <typeparam name="TEntity">Тип данных сущности, обслуживаемой контроллером.</typeparam>
    /// <typeparam name="TKey">Тип данных идентификатора сушности.</typeparam>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public abstract class ApiControllerBase<TModel, TEntity, TKey> : ControllerBase 
        where TModel : class, new()
        where TEntity : BaseEntity<TKey>
    {
        private readonly IUserService _userService;

        public ApiControllerBase(IUserService userService) => _userService = userService;

        //
        // GET api/[controller]
        //
        [AllowAnonymous]
        public virtual async Task<IEnumerable<TEntity>> ListAsync()
        {
            return (await PerformGetManyAsync()).Select(entity => PrepareEntityForReturn(entity));
        }

        protected abstract Task<IEnumerable<TEntity>> PerformGetManyAsync();

        //
        // GET api/[controller]/5
        //
        [HttpGet("{id}")]
        [AllowAnonymous]
        public virtual async Task<ActionResult<TEntity>> GetAsync(TKey id)
        {
            var entity = await PerformGetAsync(id);
            if (entity == null)
            {
                return NotFound(OperationDetails.Error($"The entity of type '{typeof(TEntity)}' with key value '{id}' " +
                    $"for '{nameof(BaseEntity<TKey>.Id)}' not found."));
            }
            return PrepareEntityForReturn(entity);
        }

        /// <summary>
        /// Выполняет операцию извлечения экземпляра сущности типа <typeparamref name="TEntity"/> по заданному значению 
        /// идентификатора типа <typeparamref name="TKey"/>. Абстрактный метод. Должен быть переопределён в каждом производном классе.
        /// </summary>
        /// <param name="id">Значение идентификатора типа <typeparamref name="TKey"/> сущности типа <typeparamref name="TEntity"/>.
        /// </param>
        /// <returns>Объект сущности типа <typeparamref name="TEntity"/>.</returns>
        protected abstract Task<TEntity> PerformGetAsync(TKey id);

        /// <summary>
        /// Выполняет дополнительную обработку сущности типа <typeparamref name="TEntity"/> перед возвратом вызывающей стороне. 
        /// Виртуальный метод. Может быть переопределён в производном классе. Базовая реализация не делает ничего.
        /// </summary>
        /// <param name="entity">Объект сущности типа <typeparamref name="TEntity"/>.</param>
        protected virtual TEntity PrepareEntityForReturn(TEntity entity) => entity;

        //
        // POST api/[controller]
        //
        [HttpPost]
        public virtual async Task<IActionResult> AddAsync([FromForm]TModel model)
        {
            var user = await _userService.GetUserAsync(User?.Identity?.Name);
            var entity = await CreateEntityFromModelAsync(model, user);
            var result = await PerformAddAsync(entity);
            return Ok(OperationDetails.Success($"The entity of type '{typeof(TEntity)}' with key value '{result.Id}' for " +
                $"'{nameof(BaseEntity<TKey>.Id)}' saved successfully."));
        }

        /// <summary>
        /// Асинхронно создаёт новый экземпляр сущности типа <typeparamref name="TEntity"/> на основании данных модели представления 
        /// типа <typeparamref name="TModel"/>. Абстрактный метод. Должен быть переопределён в каждом производном классе.
        /// </summary>
        /// <param name="model">Данные модели представления типа <typeparamref name="TModel"/>.</param>
        /// <param name="creator">Пользователь доменной модели, создающий новую сущность типа <typeparamref name="TEntity"/>.</param>
        /// <returns>Объект созданной сущности типа <typeparamref name="TEntity"/>.</returns>
        protected abstract Task<TEntity> CreateEntityFromModelAsync(TModel model, DomainUser creator);

        /// <summary>
        /// Асинхронно выполняет операцию добавления сущности в коллекцию сущностей типа <typeparamref name="TEntity"/> 
        /// доменной модели. Абстрактный метод. Должен быть переопределён в каждом производном классе.
        /// </summary>
        /// <param name="entity">Добавляемая в коллекцию сущность типа <typeparamref name="TEntity"/>.</param>
        /// <returns>Объект добавленной сущности типа <typeparamref name="TEntity"/>.</returns>
        protected abstract Task<TEntity> PerformAddAsync(TEntity entity);

        //
        // PUT api/[controller]/5
        //
        [HttpPut("{id?}")]
        public virtual async Task<IActionResult> UpdateAsync([FromForm]TModel model)
        {
            var user = await _userService.GetUserAsync(User?.Identity?.Name);
            var entity = await CreateEntityFromModelAsync(model, user);
            await PerformUpdateAsync(entity);
            return Ok(OperationDetails.Success($"The entity of type '{typeof(TEntity)}' with key value '{entity.Id}' for " +
                $"'{nameof(BaseEntity<TKey>.Id)}' updated successfully."));
        }

        /// <summary>
        /// Асинхронно выполняет операцию обновления данных сущности в коллекции сущностей типа <typeparamref name="TEntity"/> 
        /// доменной модели. Абстрактный метод. Должен быть переопределён в каждом производном классе.
        /// </summary>
        /// <param name="entity">Обновлённые данные сущности типа <typeparamref name="TEntity"/>.</param>
        protected abstract Task PerformUpdateAsync(TEntity entity);

        //
        // DELETE api/[controller]/5
        //
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteAsync([FromRoute]TKey id)
        {
            await PerformDeleteAsync(id);
            return Ok(OperationDetails.Success($"The entity of type '{typeof(TEntity)}' with key value '{id}' for " +
                $"'{nameof(BaseEntity<TKey>.Id)}' deleted successfully."));
        }

        /// <summary>
        /// Асинхронно выполняет удаление сущности с заданным значением идентификатора типа <typeparamref name="TKey"/> 
        /// из коллекции сущностей типа <typeparamref name="TEntity"/> доменной модели.
        /// </summary>
        /// <param name="entityId">Значение идентификатора типа <typeparamref name="TKey"/> сущности типа 
        /// <typeparamref name="TEntity"/>.</param>
        protected abstract Task PerformDeleteAsync(TKey entityId);
    }
}
