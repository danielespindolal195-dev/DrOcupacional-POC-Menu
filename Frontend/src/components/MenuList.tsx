import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService } from '../services/api';
import { Menu } from '../types/Menu';

function MenuList() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuService.getAll();
      setMenus(data);
    } catch (err: any) {
      setError('Erro ao carregar menus. Verifique se a API está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      if (searchTerm.trim()) {
        const data = await menuService.search(searchTerm);
        setMenus(data);
      } else {
        await loadMenus();
      }
    } catch (err: any) {
      setError('Erro ao buscar menus.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja realmente excluir este menu?')) {
      return;
    }

    try {
      await menuService.delete(id);
      await loadMenus();
    } catch (err: any) {
      setError('Erro ao excluir menu.');
      console.error(err);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/editar/${id}`);
  };

  return (
    <div>
      <div className="title-bar">
        <h2 className="title">
          <i className="fa fa-wrench"></i> Cadastro Menu
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/cadastro')}
        >
          <i className="fa fa-plus"></i> Adicionar Novo
        </button>
      </div>

      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="search-form"
        >
          <div className="form-group">
            <label>Nome do Menu:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Informe o Nome do Menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-search"></i> Busca
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            <i className="fa fa-spinner fa-spin"></i>
            <p>Carregando...</p>
          </div>
        ) : menus.length === 0 ? (
          <div className="empty-state">
            <i className="fa fa-inbox"></i>
            <p>Nenhum menu encontrado</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Menu</th>
                <th>Ordem</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td>{menu.nome}</td>
                  <td>{menu.ordem}</td>
                  <td>
                    <div className="table-actions">
                      <a
                        onClick={() => handleEdit(menu.id!)}
                        title="Editar"
                      >
                        <i className="fa fa-pencil-square"></i>
                      </a>
                      <a
                        className="delete"
                        onClick={() => handleDelete(menu.id!)}
                        title="Excluir"
                      >
                        <i className="fa fa-trash"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MenuList;

