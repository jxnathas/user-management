'use client';

import { useState } from 'react';
import { useProfiles } from '@/hooks/useProfiles';
import { Profile } from '@/lib/api';

export function ProfilesComponent() {
  const { profiles, loading, error: profilesError, createProfile, updateProfile, deleteProfile } = useProfiles();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProfile(editingId, formData);
      } else {
        await createProfile(formData);
      }
      setFormData({ name: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (profile: Profile) => {
    setFormData({ name: profile.name });
    setEditingId(profile.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este perfil?')) {
      try {
        await deleteProfile(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-4">Carregando perfis...</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Gerenciamento de Perfis</h2>

      {profilesError && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{profilesError}</div>}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ name: '' });
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showForm ? 'Cancelar' : 'Adicionar Novo Perfil'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nome do Perfil"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {editingId ? 'Atualizar Perfil' : 'Criar Perfil'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <div key={profile.id} className="p-4 border border-gray-300 rounded shadow">
            <h3 className="mb-3 text-lg font-semibold">{profile.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(profile)}
                className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {profiles.length === 0 && !loading && (
        <div className="mt-4 p-4 text-center text-gray-500">Nenhum perfil encontrado</div>
      )}
    </div>
  );
}
