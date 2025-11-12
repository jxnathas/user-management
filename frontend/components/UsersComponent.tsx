'use client';

import { useState, useMemo } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useProfiles } from '@/hooks/useProfiles';
import { UserWithProfile, usersApi } from '@/lib/api';

export function UsersComponent() {
  const {
    users,
    loading,
    error: usersError,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser,
  } = useUsers();

  const { profiles } = useProfiles();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileId: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfileFilter, setSelectedProfileFilter] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, formData);
      } else {
        await createUser(formData);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        profileId: '',
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user: UserWithProfile) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileId: user.profileId,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await activateUser(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateUser(id);
    } catch (err) {
      console.error(err);
    }
  };

  const getProfileName = (user: UserWithProfile) => {
    if (user.profile) {
      return user.profile.name;
    }
    return profiles.find((p) => p.id === user.profileId)?.name || 'Unknown';
  };

  const filteredUsers = useMemo(() => {
    let result = users;

    if (selectedProfileFilter) {
      result = result.filter((user) => user.profileId === selectedProfileFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
      );
    }

    return result;
  }, [users, searchQuery, selectedProfileFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedProfileFilter('');
    setFilterError(null);
  };

  if (loading) return <div className="p-4">Carregando usuários...</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Gerenciamento de Usuários</h2>

      {usersError && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{usersError}</div>}
      {filterError && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{filterError}</div>}

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Usuários</label>
            <input
              type="text"
              placeholder="Buscar por nome, email ou ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Perfil</label>
            <select
              value={selectedProfileFilter}
              onChange={(e) => setSelectedProfileFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos os Perfis</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {(searchQuery || selectedProfileFilter) && (
          <div className="mt-3 text-sm text-gray-600">
            Encontrado(s) <span className="font-semibold">{filteredUsers.length}</span> usuário(s)
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            profileId: '',
          });
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showForm ? 'Cancelar' : 'Adicionar Novo Usuário'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="firstName"
              placeholder="Primeiro Nome"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Último Nome"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <select
              name="profileId"
              value={formData.profileId}
              onChange={handleInputChange}
              required
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Selecionar Perfil</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingId ? 'Atualizar Usuário' : 'Criar Usuário'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Perfil</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs text-gray-500">
                  {user.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                    {getProfileName(user)}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      user.isActive ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {user.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="mr-2 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  {user.isActive ? (
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="mr-2 px-2 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
                    >
                      Desativar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user.id)}
                      className="mr-2 px-2 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
                    >
                      Ativar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && !loading && (
        <div className="mt-4 p-4 text-center text-gray-500">Nenhum usuário encontrado</div>
      )}

      {filteredUsers.length === 0 && users.length > 0 && (searchQuery || selectedProfileFilter) && (
        <div className="mt-4 p-4 text-center text-gray-500">Nenhum usuário corresponde aos seus filtros</div>
      )}
    </div>
  );
}
