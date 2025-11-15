using Microsoft.AspNetCore.Mvc;
using MenuAPI.DTOs;
using MenuAPI.Models;
using MenuAPI.Services;

namespace MenuAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;
    private readonly ILogger<MenuController> _logger;

    public MenuController(IMenuService menuService, ILogger<MenuController> logger)
    {
        _menuService = menuService;
        _logger = logger;
    }

    /// <summary>
    /// Busca todos os menus
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MenuDTO>>> GetAll()
    {
        var menus = await _menuService.GetAllAsync();
        var dtos = menus.Select(m => new MenuDTO
        {
            Id = m.Id,
            Nome = m.Nome,
            Ordem = m.Ordem,
            Icone = m.Icone
        });
        
        return Ok(dtos);
    }

    /// <summary>
    /// Busca menus por nome
    /// </summary>
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<MenuDTO>>> Search([FromQuery] string nome)
    {
        if (string.IsNullOrWhiteSpace(nome))
        {
            return await GetAll();
        }

        var menus = await _menuService.SearchByNameAsync(nome);
        var dtos = menus.Select(m => new MenuDTO
        {
            Id = m.Id,
            Nome = m.Nome,
            Ordem = m.Ordem,
            Icone = m.Icone
        });
        
        return Ok(dtos);
    }

    /// <summary>
    /// Busca um menu por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<MenuDTO>> GetById(int id)
    {
        var menu = await _menuService.GetByIdAsync(id);
        if (menu == null)
        {
            return NotFound(new { message = "Menu não encontrado" });
        }

        var dto = new MenuDTO
        {
            Id = menu.Id,
            Nome = menu.Nome,
            Ordem = menu.Ordem,
            Icone = menu.Icone
        };

        return Ok(dto);
    }

    /// <summary>
    /// Cria um novo menu
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<MenuDTO>> Create([FromBody] MenuDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Verificar se já existe menu com o mesmo nome
        var exists = await _menuService.ExistsByNameAsync(dto.Nome);
        if (exists)
        {
            return Conflict(new { message = "Este menu já existe!" });
        }

        var menu = new Menu
        {
            Nome = dto.Nome,
            Ordem = dto.Ordem,
            Icone = dto.Icone
        };

        var createdMenu = await _menuService.CreateAsync(menu);
        
        var responseDto = new MenuDTO
        {
            Id = createdMenu.Id,
            Nome = createdMenu.Nome,
            Ordem = createdMenu.Ordem,
            Icone = createdMenu.Icone
        };

        return CreatedAtAction(nameof(GetById), new { id = createdMenu.Id }, responseDto);
    }

    /// <summary>
    /// Atualiza um menu existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<MenuDTO>> Update(int id, [FromBody] MenuDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingMenu = await _menuService.GetByIdAsync(id);
        if (existingMenu == null)
        {
            return NotFound(new { message = "Menu não encontrado" });
        }

        // Verificar se já existe outro menu com o mesmo nome
        var exists = await _menuService.ExistsByNameAsync(dto.Nome, id);
        if (exists)
        {
            return Conflict(new { message = "Este menu já existe!" });
        }

        var menu = new Menu
        {
            Nome = dto.Nome,
            Ordem = dto.Ordem,
            Icone = dto.Icone
        };

        var updatedMenu = await _menuService.UpdateAsync(id, menu);
        if (updatedMenu == null)
        {
            return NotFound(new { message = "Menu não encontrado" });
        }

        var responseDto = new MenuDTO
        {
            Id = updatedMenu.Id,
            Nome = updatedMenu.Nome,
            Ordem = updatedMenu.Ordem,
            Icone = updatedMenu.Icone
        };

        return Ok(responseDto);
    }

    /// <summary>
    /// Exclui um menu
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _menuService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = "Menu não encontrado" });
        }

        return Ok(new { message = "Menu excluído com sucesso!" });
    }
}

