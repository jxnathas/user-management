const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Profile {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
}

export interface UserWithProfile extends User {
  profile: Profile;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  profileId: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileId?: string;
}

export interface CreateProfileDto {
  name: string;
}

export interface UpdateProfileDto {
  name?: string;
}

export const usersApi = {
  getAll: async (): Promise<UserWithProfile[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  getAllSimple: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users/raw`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  getById: async (id: string): Promise<UserWithProfile> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  getByProfileId: async (profileId: string): Promise<UserWithProfile[]> => {
    const response = await fetch(
      `${API_BASE_URL}/users?profileId=${profileId}`
    );
    if (!response.ok) throw new Error('Failed to fetch users by profile');
    return response.json();
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },

  activate: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/activate`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to activate user');
    return response.json();
  },

  deactivate: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/deactivate`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to deactivate user');
    return response.json();
  },
};

export const profilesApi = {
  getAll: async (): Promise<Profile[]> => {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    if (!response.ok) throw new Error('Failed to fetch profiles');
    return response.json();
  },

  getById: async (id: string): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  create: async (data: CreateProfileDto): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create profile');
    return response.json();
  },

  update: async (id: string, data: UpdateProfileDto): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete profile');
  },
};

