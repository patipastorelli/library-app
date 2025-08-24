import config from "../config";

export interface Book {
  id: number;
  title: string;
  author: string;
  owner: string;
  availability: boolean;
  isbn: string;
  publishedDate: string; // ISO yyyy-mm-dd
}
export interface IBookTable {
  items: Book[];
  total: number;
  page: number;
  pageSize: 10;
}

const API_BASE = config.apiBase;

export async function getBooks(): Promise<IBookTable> {
  const resp = await fetch(`${API_BASE}/book`);
  if (!resp.ok) throw new Error("Failed to fetch books");
  return resp.json();
}

export async function addBook(book: Omit<Book, "id">): Promise<Book> {
  const resp = await fetch(`${API_BASE}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!resp.ok) throw new Error("Failed to add book");
  return resp.json();
}

export async function deleteBook(id: number): Promise<void> {
  const resp = await fetch(`${API_BASE}/book/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error("Failed to delete book");
}

export async function updateBook(book: Book): Promise<Book> {
  const updatedBook = { ...book, availability: !book.availability };

  const resp = await fetch(`${API_BASE}/book/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook),
  });

  if (!resp.ok) throw new Error("Failed to update book");
  return resp.json();
}
