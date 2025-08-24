import React from "react";


interface Props {
    page: number;
    pageSize: number;
    totalItems: number;
    onChange: (page: number) => void;
}
export default function Pagination({ page, pageSize, totalItems, onChange }: Props) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));


    return (
        <div className="pagination">
            <button
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
            >
                Prev
            </button>
            <span>
                Page {page} of {totalPages}
            </span>
            <button
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}