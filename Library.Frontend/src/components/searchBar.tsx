import React from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <input
            placeholder="Search a Book…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-bar"
        />
    );
}
