import { useState, useEffect } from "react";

export interface NoteProps {
    id: number;
    text: string;
    category: string;
    priority: string;
    dueDate: string;
}

const useNotes = () => {
    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        chrome.storage.sync.get(["notes"], (result) => {
            if (result.notes) {
                setNotes(result.notes);
                setFilteredNotes(result.notes);
            }
        });
    }, []);

    const addOrEditNote = (newNote: NoteProps) => {
        let updatedNotes;
        if (newNote.id && newNote.id !== 0) {
            updatedNotes = notes.map((note) => (note.id === newNote.id ? newNote : note));
        } else {
            const newNoteWithId = { ...newNote, id: Date.now() };
            updatedNotes = [...notes, newNoteWithId];
        }
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
        chrome.storage.sync.set({ notes: updatedNotes });
    };

    const deleteNote = (id: number) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
        chrome.storage.sync.set({ notes: updatedNotes });
    };

    const filterNotesByCategory = (category: string) => {
        setActiveCategory(category);
        setFilteredNotes(
            category === "All" ? notes : notes.filter((note) => note.category === category)
        );
    };

    const filterNotesBySearchQuery = (query: string) => {
        setSearchQuery(query);
        setFilteredNotes(
            notes.filter((note) => note.text.toLowerCase().includes(query.toLowerCase()))
        );
    };

    return {
        notes,
        filteredNotes,
        addOrEditNote,
        deleteNote,
        activeCategory,
        filterNotesByCategory,
        searchQuery,
        filterNotesBySearchQuery,
    };
};

export default useNotes;
