import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/booksApi";
const BookList = ({ onEdit }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBooks(page).then(res => setBooks(res.data));
  }, [page]);

  return (
    <div className="md:col-span-2 space-y-4">
      <h2 className="text-lg font-semibold">Books</h2>

      {books.map(book => (
        <div key={book.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">
              {book.author} • ⭐ {book.rating}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(book)}
              className="px-3 py-1 text-white text-sm bg-orange-400 hover:bg-orange-500 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBook(book.id)}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300  rounded disabled:opacity-50">
          Prev
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={books.length < 10}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
