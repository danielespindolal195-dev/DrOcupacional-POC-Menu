import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { menuService } from '../services/api';
import { Menu } from '../types/Menu';

function MenuForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Omit<Menu, 'id'>>({
    nome: '',
    ordem: 1,
    icone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      loadMenu(parseInt(id));
    }
  }, [id, isEdit]);

  const loadMenu = async (menuId: number) => {
    try {
      setLoading(true);
      const menu = await menuService.getById(menuId);
      setFormData({
        nome: menu.nome,
        ordem: menu.ordem,
        icone: menu.icone,
      });
    } catch (err: any) {
      setError('Erro ao carregar menu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações
    if (!formData.nome.trim()) {
      setError('É necessário informar o nome do menu!');
      return;
    }

    if (!formData.ordem || formData.ordem < 1) {
      setError('É necessário informar a ordem do menu!');
      return;
    }

    if (!formData.icone.trim()) {
      setError('É necessário informar o ícone do menu!');
      return;
    }

    try {
      setLoading(true);
      if (isEdit && id) {
        await menuService.update(parseInt(id), formData);
        setSuccess('Menu alterado com sucesso!');
      } else {
        await menuService.create(formData);
        setSuccess('Menu incluído com sucesso!');
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(isEdit ? 'Erro ao alterar menu.' : 'Erro ao criar menu.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="title">
        <i className="fa fa-wrench"></i> Cadastro Menu
      </h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <div className="form-group">
            <label>Nome do Menu:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Informe o Nome do Menu..."
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Ordem:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Informe a Ordem Menu..."
              value={formData.ordem}
              onChange={(e) =>
                setFormData({ ...formData, ordem: parseInt(e.target.value) || 1 })
              }
              min="1"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Ícone:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Informe o Ícone do Menu (ex: fa fa-dashboard)..."
              value={formData.icone}
              onChange={(e) =>
                setFormData({ ...formData, icone: e.target.value })
              }
              disabled={loading}
            />
            <small style={{ color: '#6c757d', marginTop: '5px', display: 'block' }}>
              Exemplo: fa fa-dashboard, fa fa-users, fa fa-cog
            </small>
          </div>

          <hr style={{ margin: '20px 0' }} />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MenuForm;

