import * as api from './api';

// const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';
const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

export const login = (requestConfig) => api.post(loginURL, requestConfig);

export const register = (requestConfig) => api.post(registerURL, requestConfig);

export const getMovies = (requestConfig) => api.get(host, requestConfig);
export const getMovie = (requestConfig) => api.get(host, requestConfig);
export const postNewMovie = (requestConfig) => api.post(host, requestConfig);
export const updateMovie = (requestConfig) => api.patch(host, requestConfig);
export const deleteMovie = (requestConfig) => api.del(host, requestConfig);
export const updateMovieLikes = (requestConfig) => api.patch(host, requestConfig);
export const getPosition = (requestConfig) => api.get(host, requestConfig);
export const getColectionCount = (requestConfig) => api.get(host, requestConfig);