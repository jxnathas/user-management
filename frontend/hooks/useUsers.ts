'use client';

import { useState, useCallback, useEffect } from 'react';
import { usersApi, UserWithProfile, CreateUserDto, UpdateUserDto } from '@/lib/api';

export function useUsers() {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByProfileId = useCallback(async (profileId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersApi.getByProfileId(profileId);
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: CreateUserDto) => {
    try {
      setError(null);
      const newUser = await usersApi.create(data);
      await fetchUsers();
      return newUser;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error creating user';
      setError(errorMsg);
      throw err;
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (id: string, data: UpdateUserDto) => {
    try {
      setError(null);
      const updatedUser = await usersApi.update(id, data);
      await fetchUsers();
      return updatedUser;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error updating user';
      setError(errorMsg);
      throw err;
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setError(null);
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error deleting user';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const activateUser = useCallback(async (id: string) => {
    try {
      setError(null);
      const updatedUser = await usersApi.activate(id);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, isActive: true } : user))
      );
      return updatedUser;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error activating user';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const deactivateUser = useCallback(async (id: string) => {
    try {
      setError(null);
      const updatedUser = await usersApi.deactivate(id);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, isActive: false } : user))
      );
      return updatedUser;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error deactivating user';
      setError(errorMsg);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchByProfileId,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser,
  };
}
