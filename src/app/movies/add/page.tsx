'use client';

import React from 'react';
import MovieForm from '@/components/MovieForm/MovieForm';
import { addMovie } from '@/lib/api/movies.api';
import { useRouter } from 'next/navigation';
import { MovieFormData } from '@/components/MovieForm/MovieForm.types';

const AddMoviePage = () => {
  const router = useRouter();
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';

  const handleAddMovie = async (data: MovieFormData) => {
    const fileList = data.posterFile as FileList;
    const posterFile = fileList?.[0];

    const result = await addMovie({ ...data, posterFile }, userId, token);
    if (result.success) {
      alert('Movie added successfully');
      router.push('/movieList');
    } else {
      alert(result.error || 'Failed to add movie');
    }
  };

  return (
    <div className="movie-create-wrapper">
      <h1>Add New Movie</h1>
      <MovieForm
        mode="add"
        onSubmit={handleAddMovie}
      />
    </div>
  );
};

export default AddMoviePage;
