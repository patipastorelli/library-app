import React, { useState } from "react";
import { Book, deleteBook, updateBook } from "../api/books";
import AddBookModal from "./addBookModal";

interface Props {
    books: Book[];
    onUpdated: () => void;
}

export default function BookTable({ books, onUpdated }: Props) {
    const [open, setOpen] = useState(false);

    async function handleDelete(id: number) {
        if (!window.confirm("Delete this book?")) return;
        await deleteBook(id);
        onUpdated();
    }
    async function handleToggle(book: Book) {
        await updateBook(book);
        onUpdated();
    }


    return (<>
        <div className="modal-actions">
            <button className="add-book-btn" onClick={() => setOpen(true)}>
                + Add Book
            </button>
        </div>

        <table className="library-table">
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Owner</th>
                    <th>Availability</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((b) => (
                    <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.owner}</td>
                        <td>{b.availability ? "Available" : "Unavailable"}</td>
                        <td>
                            <button className={`availability-toggle ${b.availability ? "available" : "unavailable"}`}
                                onClick={() => handleToggle(b)}>
                                {b.availability ? "Borrow" : "Return"}
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(b.id)}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


        {open && (
            <AddBookModal
                onClose={() => setOpen(false)}
                onSuccess={() => {
                    setOpen(false);
                    onUpdated();
                }}
            />
        )}
    </>
    );
}