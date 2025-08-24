import React, { useEffect, useMemo, useState } from "react";
import { IBookTable, getBooks } from "./api/books";
import SearchBar from "./components/searchBar";
import BookTable from "./components/bookTable";
import Pagination from "./components/pagination";

export default function App() {
  const [allBooks, setAllBooks] = useState<IBookTable>({ items: [], page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;


  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setAllBooks(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    load();
  }, []);


  // Client-side search over title, author, isbn
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allBooks?.items;
    return allBooks?.items.filter((b) =>
      [b.title].some((f) => (f || "").toLowerCase().includes(q))
    );
  }, [search, allBooks]);


  // Client-side pagination
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered?.slice(start, start + pageSize);
  }, [filtered, page]);


  useEffect(() => {
    // Reset to first page when search changes
    setPage(1);
  }, [search]);


  return (
    <div className="library-container">
      <h1 className="library-title">Library</h1>
      <SearchBar value={search} onChange={setSearch} />


      {loading && <div className="p-4">Loading…</div>}
      {error && <div className="p-4 text-red-600">{error}</div>}


      {!loading && !error && (
        <>
          <BookTable books={paged} onUpdated={load} />
          <Pagination page={page} pageSize={pageSize} totalItems={filtered.length} onChange={setPage} />
        </>
      )}
    </div>
  );
}