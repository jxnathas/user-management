'use client';

import { useState, useCallback, useEffect } from 'react';
import { profilesApi, Profile, CreateProfileDto, UpdateProfileDto } from '@/lib/api';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profilesApi.getAll();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProfile = useCallback(async (data: CreateProfileDto) => {
    try {
      setError(null);
      const newProfile = await profilesApi.create(data);
      setProfiles((prev) => [...prev, newProfile]);
      return newProfile;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error creating profile';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const updateProfile = useCallback(async (id: string, data: UpdateProfileDto) => {
    try {
      setError(null);
      const updatedProfile = await profilesApi.update(id, data);
      setProfiles((prev) =>
        prev.map((profile) => (profile.id === id ? updatedProfile : profile))
      );
      return updatedProfile;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error updating profile';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const deleteProfile = useCallback(async (id: string) => {
    try {
      setError(null);
      await profilesApi.delete(id);
      setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error deleting profile';
      setError(errorMsg);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
  };
}
