import axios from 'axios';
import { Menu } from '../types/Menu';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuService = {
  getAll: async (): Promise<Menu[]> => {
    const response = await api.get<Menu[]>('/menu');
    return response.data;
  },

  search: async (nome: string): Promise<Menu[]> => {
    const response = await api.get<Menu[]>('/menu/search', {
      params: { nome },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Menu> => {
    const response = await api.get<Menu>(`/menu/${id}`);
    return response.data;
  },

  create: async (menu: Omit<Menu, 'id'>): Promise<Menu> => {
    const response = await api.post<Menu>('/menu', menu);
    return response.data;
  },

  update: async (id: number, menu: Omit<Menu, 'id'>): Promise<Menu> => {
    const response = await api.put<Menu>(`/menu/${id}`, menu);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/menu/${id}`);
  },
};

export default api;

