using System.ComponentModel.DataAnnotations;

namespace MenuAPI.DTOs;

public class MenuDTO
{
    public int? Id { get; set; }
    
    [Required(ErrorMessage = "O nome do menu é obrigatório")]
    [StringLength(100, ErrorMessage = "O nome do menu não pode exceder 100 caracteres")]
    public string Nome { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "A ordem é obrigatória")]
    [Range(1, int.MaxValue, ErrorMessage = "A ordem deve ser um número positivo")]
    public int Ordem { get; set; }
    
    [Required(ErrorMessage = "O ícone é obrigatório")]
    [StringLength(50, ErrorMessage = "O ícone não pode exceder 50 caracteres")]
    public string Icone { get; set; } = string.Empty;
}

