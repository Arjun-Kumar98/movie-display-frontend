'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllMovies, Movie } from '@/lib/api/movies.api';
import MovieCard from '@/components/MovieCard/MovieCard';
import styles from './Movielist.module.css';
import { t } from '../../i18n';

const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : '';

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getAllMovies(Number(userId), page);
      if (result.success) {
        setMovies(result.data);
        setTotalPages(result.totalPages);
      } else {
        alert(result.error || t('api.movieFetchFailed'));
      }
    };

    if (userId && token) {
      fetchMovies();
    } else {
      router.push('/');
    }
  }, [page]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>My Movies</h1>
        <div className={styles.actions}>
          <button onClick={() => router.push('/movies/add')} className={styles.addButton}>
            Add New Movie
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className={styles.empty}>Your movie list is empty</div>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => router.push(`/movies/edit/${movie.id}`)}
            />
          ))}
        </div>
      )}

      {movies.length > 0 && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieListPage;
