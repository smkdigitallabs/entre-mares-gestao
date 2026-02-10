'use client';

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  searchParam?: string;
}

export function SearchBar({ placeholder = "Buscar...", searchParam = "search" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get(searchParam) || "");

  useEffect(() => {
    const currentQuery = searchParams.get(searchParam) || "";
    setQuery(currentQuery);
  }, [searchParams, searchParam]);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set(searchParam, value.trim());
    } else {
      params.delete(searchParam);
    }
    
    router.push(`?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
      />
      {query && (
        <button
          type="button"
          onClick={() => handleSearch("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          ×
        </button>
      )}
    </form>
  );
}