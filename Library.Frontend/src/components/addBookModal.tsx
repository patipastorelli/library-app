import React, { useState } from "react";
import { addBook, Book } from "../api/books";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBookModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    owner: "",
    availability: true,
    isbn: "",
    publishedDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(form);
    onSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <input
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            placeholder="ISBN"
          />
          <input
            type="date"
            name="publishedDate"
            value={form.publishedDate}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
