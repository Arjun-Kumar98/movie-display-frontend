'use client';

import React from 'react';
import styles from './MovieCard.module.css';
import { Movie } from '@/lib/api/movies.api';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className={styles.poster}
      />
      <h3 className={styles.title}>{movie.title}</h3>
      <p className={styles.year}>{movie.publishingYear}</p>
    </div>
  );
};

export default MovieCard;
