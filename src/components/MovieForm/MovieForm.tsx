'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation'; 
import { MovieFormProps, MovieFormData } from './MovieForm.types';
import { movieFormSchema } from './MovieForm.validation';
import InputField from '../common/InputField';
import Button from '../common/Button';
import styles from './MovieForm.module.css';

const MovieForm: React.FC<MovieFormProps> = ({ mode, initialValues, onSubmit }) => {
  const router = useRouter(); 
  const [isPosterRemoved, setIsPosterRemoved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: initialValues,
    resolver: yupResolver(movieFormSchema),
    context: { isEditMode: mode === 'edit' },
  });

  const posterFile = watch('posterFile');
  const hasUploadedPoster = posterFile && posterFile.length > 0;

  const posterPreviewSrc =
    hasUploadedPoster
      ? URL.createObjectURL(posterFile[0])
      : (!isPosterRemoved && initialValues?.posterUrl) || '';

  const submitHandler = (data: MovieFormData) => {
    onSubmit(data);
  };

  const handleRemovePoster = () => {
    setIsPosterRemoved(true);
    reset({ ...initialValues, posterFile: null });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles['movie-form']}>
      <div className={styles['movie-form-container']}>

        {/* Poster Upload or Preview */}
        <div className={styles['poster-upload']}>
          {posterPreviewSrc ? (
            <div className={styles['poster-preview-wrapper']}>
              <img src={posterPreviewSrc} alt="Poster Preview" className={styles['poster-preview']} />
              <button
                type="button"
                className={styles['remove-poster-btn']}
                onClick={handleRemovePoster}
              >
                ❌ Remove Poster
              </button>
            </div>
          ) : (
            <>
              <label>Upload Poster</label>
              <input type="file" accept="image/*" {...register('posterFile')} />
              {errors.posterFile?.message && (
                <p className="input-error-text">{String(errors.posterFile.message)}</p>
              )}
            </>
          )}
        </div>

        {/* Form Inputs */}
        <div className={styles['form-inputs']}>
          <InputField
            type="text"
            name="title"
            placeholder="Title"
            register={register}
            hasError={!!errors.title}
            errorMessage={errors.title?.message ?? ''}
          />

          <InputField
            type="number"
            name="publishYear"
            placeholder="Publishing Year"
            register={register}
            hasError={!!errors.publishYear}
            errorMessage={errors.publishYear?.message ?? ''}
          />

          {/* Buttons */}
          <div className={styles['form-actions']}>
            <Button
              type="submit"
              label={mode === 'edit' ? 'Update Movie' : 'Add Movie'}
            />
            <Button
              type="reset"
              label="Cancel"
              onClick={() => {
                if (mode === 'edit') router.push('/movieList');
                else {
                  reset();
                  setIsPosterRemoved(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
