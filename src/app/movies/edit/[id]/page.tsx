'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MovieForm from '@/components/MovieForm/MovieForm';
import { getMovieById, updateMovie } from '@/lib/api/movies.api';
import { MovieFormData } from '@/components/MovieForm/MovieForm.types';

const EditMoviePage = () => {
  const router = useRouter();
  const params = useParams();
  const movieId = Number(params.movieId);
  const token = localStorage.getItem('token') || '';
  const userId = localStorage.getItem('userId') || '';
  const [initialValues, setInitialValues] = useState<MovieFormData | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const result = await getMovieById(movieId, token);
      if (result.success && result.data) {
        setInitialValues({
          title: result.data.title,
          publishYear: result.data.publishYear,
          posterUrl: result.data.posterUrl,
          posterFile: null,
        });
      } else {
        alert(result.error || 'Failed to fetch movie');
      }
    };

    if (movieId && token) fetchMovie();
  }, [movieId, token]);

  const handleUpdate = async (formData: MovieFormData) => {
    const fileList = formData.posterFile as FileList;
    const posterFile = fileList?.[0] || null;

    const result = await updateMovie(
      movieId,
      {
        title: formData.title,
        publishYear: formData.publishYear,
        posterFile,
      },
      userId,
      token
    );

    if (result.success) {
      alert('Movie updated successfully');
      router.push('/movieList');
    } else {
      alert(result.error || 'Failed to update movie');
    }
  };

  return (
    <div className="movie-edit-wrapper">
      <h1>Edit Movie</h1>
      {initialValues ? (
        <MovieForm
          mode="edit"
          initialValues={initialValues}
          onSubmit={handleUpdate}
        />
      ) : (
        <p>Loading movie...</p>
      )}
    </div>
  );
};

export default EditMoviePage;
