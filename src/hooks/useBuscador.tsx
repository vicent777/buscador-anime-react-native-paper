import { useState } from "react";
import { Anime } from "../types/Anime";

export default function useBuscador() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Anime[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const types = ["TV", "Movie", "OVA"]; 
  // OVA já inclui SPECIAL automaticamente

  async function searchAnime(query: string) {
    if (!query.trim()) return;

    setLoading(true);
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&limit=20`
    );
    const json = await res.json();

    // Junta OVA + Special
    const mapped: Anime[] = json.data.map((anime: any) => ({
      mal_id: anime.mal_id,
      title: anime.title,
      type: anime.type === "Special" ? "OVA" : anime.type,
      images: anime.images,
    }));

    setResults(mapped);
    setLoading(false);
  }

  function toggleFilter(type: string) {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter((t) => t !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  }

  const filteredResults =
    activeFilters.length === 0
      ? results
      : results.filter((anime) => activeFilters.includes(anime.type));

  return {
    loading,
    results,
    activeFilters,
    types,
    toggleFilter,
    searchAnime,
    filteredResults,
  };
}
