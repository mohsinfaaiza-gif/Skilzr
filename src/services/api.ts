// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

// Auth
export const login = async (email: string, password: string) => {
  const response = await api.get(`/users?email=${email}&password=${password}`);
  if (response.data.length === 0) throw new Error('Invalid credentials');
  const user = response.data[0];
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Skills
export const getSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

// Connections
export const sendConnection = async (studentId: number, instructorId: number, skillId: number, message: string) => {
  const response = await api.post('/connections', {
    studentId,
    instructorId,
    skillId,
    status: 'pending',
    message,
    timestamp: new Date().toISOString()
  });
  return response.data;
};

// Messages
export const getMessages = async (chatId: string) => {
  const response = await api.get(`/messages?chatId=${chatId}`);
  return response.data;
};

export const sendMessage = async (chatId: string, senderId: number, message: string) => {
  const response = await api.post('/messages', {
    chatId,
    senderId,
    message,
    timestamp: new Date().toISOString()
  });
  return response.data;
};