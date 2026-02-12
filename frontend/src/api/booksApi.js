import axios from "axios";

const API_URL = "http://localhost:5000/books";

export const getBooks = (page = 1) =>
  axios.get(`${API_URL}?page=${page}`);


export const getBookById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createBook = (book) => 
  axios.post(API_URL, book);

export const updateBook = (id, book) =>
  axios.put(`${API_URL}/${id}`, book);

export const deleteBook = (id) =>
  axios.delete(`${API_URL}/${id}`);
    