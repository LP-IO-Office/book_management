import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { useState } from "react";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const reload = () => {
    setSelectedBook(null);
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-purple-700 text-white py-4 shadow">
        <h1 className="text-center text-2xl font-semibold">
          Book Library
        </h1>
      </header>
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <BookForm selectedBook={selectedBook} onSaved={reload} />
        <BookList key={refresh} onEdit={setSelectedBook} />
      </main>
    </div>
  );
}

export default App;
