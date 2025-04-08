'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MovieForm from '@/components/MovieForm/MovieForm';
import { getMovieById, updateMovie } from '@/lib/api/movies.api';
import { MovieFormData } from '@/components/MovieForm/MovieForm.types';
import { useAuth } from '@/hooks/useAuth';
import { t } from '../../../../i18n';

const EditMoviePage = () => {
  const router = useRouter();
  const params = useParams();
  const { token, loaded } = useAuth();
  const [initialValues, setInitialValues] = useState<MovieFormData | null>(null);
 
  const movieId = loaded ? Number(params.id) : null;
  
  useEffect(() => {
    if (!loaded || !token || !movieId) return;

    const fetchMovie = async () => {
      const result = await getMovieById(movieId, token);
      if (result.success && result.data) {
        setInitialValues({
          title: result.data.title,
          publishYear: result.data.publishingYear,
          posterUrl: result.data.posterUrl,
          posterFile: null,
        });
      } else {
        alert(result.error || t('api.movieFetchFailed'));
      }
    };

    fetchMovie();
  }, [loaded, token, movieId]);

  const handleUpdate = async (formData: MovieFormData) => {
    const fileList = formData.posterFile as FileList;
    const posterFile = fileList?.[0] || null;

    const result = await updateMovie(
      movieId!,
      {
        title: formData.title,
        publishingYear: formData.publishYear,
        posterFile,
      },
      token!
    );

    if (result.success) {
      alert(t('api.movieUpdateSuccess'));
      router.push('/movies');
    } else {
      alert(result.error || t('api.movieUpdateFailed'));
    }
  };

  if (!loaded) return null;

  return (
    <div className="movie-wrapper">
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
