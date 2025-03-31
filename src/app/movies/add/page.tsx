'use client';

import React from 'react';
import MovieForm from '@/components/MovieForm/MovieForm';
import { addMovie } from '@/lib/api/movies.api';
import { useRouter } from 'next/navigation';
import { MovieFormData } from '@/components/MovieForm/MovieForm.types';
import {t} from '../../../i18n'

const AddMoviePage = () => {
  const router = useRouter();
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';

  const handleAddMovie = async (data: MovieFormData) => {
    console.log("the add movie is called ");
    const fileList = data.posterFile as FileList;
    const posterFile = fileList?.[0];

    const result = await addMovie({ ...data, posterFile }, userId, token);
    if (result.success) {
      alert(t('api.movieAddSuccess'));
      router.push('/movies');
    } else {
      alert(result.error || t('api.movieAddFailed'));
    }
  };

  return (
    <div className="movie-wrapper">
      <h1>Add New Movie</h1>
      <MovieForm
        mode="add"
        onSubmit={handleAddMovie}
      />
    </div>
  );
};

export default AddMoviePage;
