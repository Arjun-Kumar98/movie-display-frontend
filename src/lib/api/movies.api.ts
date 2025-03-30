export interface AddMoviePayload {
    title: string;
    publishYear: number;
    posterFile: File;
  }
  
  export const addMovie = async (
    data: AddMoviePayload,
    userId: string,
    token: string
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishYear', String(data.publishYear));
      formData.append('userId', userId);
      formData.append('image', data.posterFile); // key must match backend
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
  
      const result = await response.json();
  
      return {
        success: response.ok,
        ...result,
      };
    } catch (error) {
      console.error('Add movie error:', error);
      return {
        success: false,
        error: 'Failed to add movie.',
      };
    }
  };
  
  export const getMovieById = async (
    movieId: number,
    token: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${movieId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const result = await response.json();
  
      return {
        success: response.ok,
        data: result.movie || null,
      };
    } catch (error) {
      console.error('Fetch movie by ID error:', error);
      return {
        success: false,
        data: null,
        error: 'Failed to fetch movie details.',
      };
    }
  };
  




export interface UpdateMoviePayload {
    title: string;
    publishYear: number;
    posterFile: File | null;
  }
  
  export const updateMovie = async (
    movieId: number,
    data: UpdateMoviePayload,
    userId: string,
    token: string
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishYear', String(data.publishYear));
      formData.append('userId', userId);
      formData.append('movieId', String(movieId));
  
      if (data.posterFile) {
        formData.append('image', data.posterFile);
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
      return { success: response.ok, ...result };
    } catch (error) {
      console.error('Update movie error:', error);
      return { success: false, error: 'Failed to update movie.' };
    }
  };
  