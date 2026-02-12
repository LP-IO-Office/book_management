import { useEffect, useState } from "react";
import { createBook, updateBook } from "../api/booksApi";
const BookForm = ({ selectedBook, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    des: "",
    rating: 1
  });

  useEffect(() => {
    if (selectedBook) {
      setForm({
        title: selectedBook.title,
        author: selectedBook.author,
        des: selectedBook.description ||"",
        rating: selectedBook.rating
      });
    }
  }, [selectedBook]);

  const handleChange = (e) =>
    setForm({ ...form,[e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedBook
      ? await updateBook(selectedBook.id, form)
      : await createBook(form);

    setForm({ title: "", author: "", des: "", rating: 1 });
    onSaved();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        {selectedBook ? "Edit Book" : "Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required />

        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          required />

        <textarea
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          name="des"
          placeholder="Description"
          rows="3"
          value={form.des}
          onChange={handleChange}
        />

        <select
          className="w-full border rounded-lg px-3 py-2"
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          {[1,2,3,4,5].map(r => (
            <option key={r} value={r}>{r} ⭐</option>
          ))}
        </select>

        <button className="w-full bg-purple-700 hover:bg-purple-900 text-white py-2 rounded-lg font-medium transition" >
          {selectedBook ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
