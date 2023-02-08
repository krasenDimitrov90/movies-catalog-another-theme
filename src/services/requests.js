import * as api from './api';

// const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';
const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

export const login = (requestConfig) => api.post(loginURL, requestConfig);

export const register = (requestConfig) => api.post(registerURL, requestConfig);