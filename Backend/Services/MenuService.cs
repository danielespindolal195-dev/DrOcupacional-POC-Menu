using MenuAPI.Models;

namespace MenuAPI.Services;

public class MenuService : IMenuService
{
    private readonly List<Menu> _menus;
    private int _nextId = 1;

    public MenuService()
    {
        // Dados mockados iniciais
        _menus = new List<Menu>
        {
            new Menu { Id = _nextId++, Nome = "Dashboard", Ordem = 1, Icone = "fa fa-dashboard" },
            new Menu { Id = _nextId++, Nome = "Usuários", Ordem = 2, Icone = "fa fa-users" },
            new Menu { Id = _nextId++, Nome = "Relatórios", Ordem = 3, Icone = "fa fa-file-text" },
            new Menu { Id = _nextId++, Nome = "Configurações", Ordem = 4, Icone = "fa fa-cog" }
        };
    }

    public Task<IEnumerable<Menu>> GetAllAsync()
    {
        return Task.FromResult<IEnumerable<Menu>>(_menus.OrderBy(m => m.Ordem).ThenBy(m => m.Nome));
    }

    public Task<IEnumerable<Menu>> SearchByNameAsync(string nome)
    {
        var result = _menus
            .Where(m => m.Nome.Contains(nome, StringComparison.OrdinalIgnoreCase))
            .OrderBy(m => m.Ordem)
            .ThenBy(m => m.Nome);
        
        return Task.FromResult<IEnumerable<Menu>>(result);
    }

    public Task<Menu?> GetByIdAsync(int id)
    {
        var menu = _menus.FirstOrDefault(m => m.Id == id);
        return Task.FromResult(menu);
    }

    public Task<Menu> CreateAsync(Menu menu)
    {
        menu.Id = _nextId++;
        _menus.Add(menu);
        return Task.FromResult(menu);
    }

    public Task<Menu?> UpdateAsync(int id, Menu menu)
    {
        var existingMenu = _menus.FirstOrDefault(m => m.Id == id);
        if (existingMenu == null)
            return Task.FromResult<Menu?>(null);

        existingMenu.Nome = menu.Nome;
        existingMenu.Ordem = menu.Ordem;
        existingMenu.Icone = menu.Icone;

        return Task.FromResult<Menu?>(existingMenu);
    }

    public Task<bool> DeleteAsync(int id)
    {
        var menu = _menus.FirstOrDefault(m => m.Id == id);
        if (menu == null)
            return Task.FromResult(false);

        _menus.Remove(menu);
        return Task.FromResult(true);
    }

    public Task<bool> ExistsByNameAsync(string nome, int? excludeId = null)
    {
        var exists = _menus.Any(m => 
            m.Nome.Equals(nome, StringComparison.OrdinalIgnoreCase) &&
            (excludeId == null || m.Id != excludeId));
        
        return Task.FromResult(exists);
    }
}

