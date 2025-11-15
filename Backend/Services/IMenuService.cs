using MenuAPI.Models;

namespace MenuAPI.Services;

public interface IMenuService
{
    Task<IEnumerable<Menu>> GetAllAsync();
    Task<IEnumerable<Menu>> SearchByNameAsync(string nome);
    Task<Menu?> GetByIdAsync(int id);
    Task<Menu> CreateAsync(Menu menu);
    Task<Menu?> UpdateAsync(int id, Menu menu);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsByNameAsync(string nome, int? excludeId = null);
}

