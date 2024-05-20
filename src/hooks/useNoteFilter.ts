import { useState, useEffect } from "react";

const useNoteFilter = (notes: NoteProps[]) => {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>(notes);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    const filterNotesByCategory = (category: string) => {
        setActiveCategory(category);
        if (category === "All") {
            setFilteredNotes(notes);
        } else {
            const updatedNotes = notes.filter((note) => note.category === category);
            setFilteredNotes(updatedNotes);
        }
        console.log("Filtered notes by category:", category, filteredNotes);
    };

    const filterNotesBySearchQuery = (query: string) => {
        setSearchQuery(query);
        const updatedNotes = notes.filter((note) =>
            note.text.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredNotes(updatedNotes);
        console.log("Filtered notes by search query:", query, filteredNotes);
    };

    return {
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        filteredNotes,
        filterNotesByCategory,
        filterNotesBySearchQuery,
    };
};

export default useNoteFilter;
