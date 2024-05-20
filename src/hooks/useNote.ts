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
    const [newNote, setNewNote] = useState<string>("");
    const [editNoteId, setEditNoteId] = useState<number | null>(null);
    const [noteCategory, setNoteCategory] = useState<string>("General");
    const [notePriority, setNotePriority] = useState<string>("Medium");
    const [noteDueDate, setNoteDueDate] = useState<string>("");

    useEffect(() => {
        chrome.storage.sync.get(["notes"], (result) => {
            console.log("Fetched notes from storage:", result.notes);
            if (result.notes) {
                setNotes(result.notes);
            }
        });
    }, []);

    const addOrEditNote = () => {
        if (editNoteId !== null) {
            const updatedNotes = notes.map((note) =>
                note.id === editNoteId
                    ? {
                          ...note,
                          text: newNote,
                          category: noteCategory,
                          priority: notePriority,
                          dueDate: noteDueDate,
                      }
                    : note
            );
            setNotes(updatedNotes);
            setEditNoteId(null);
        } else {
            const newNoteObj = {
                id: Date.now(),
                text: newNote,
                category: noteCategory,
                priority: notePriority,
                dueDate: noteDueDate,
            };
            const updatedNotes = [...notes, newNoteObj];
            setNotes(updatedNotes);
        }
        setNewNote("");
        setNotePriority("Medium");
        setNoteDueDate("");
        chrome.storage.sync.set({ notes }, () => {
            console.log("Notes updated in storage:", notes);
        });
    };

    const deleteNote = (id: number) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        chrome.storage.sync.set({ notes: updatedNotes }, () => {
            console.log("Notes updated in storage after deletion:", updatedNotes);
        });
    };

    const startEditNote = (note: NoteProps) => {
        setNewNote(note.text);
        setEditNoteId(note.id);
        setNoteCategory(note.category);
        setNotePriority(note.priority);
        setNoteDueDate(note.dueDate);
    };

    return {
        notes,
        newNote,
        setNewNote,
        editNoteId,
        noteCategory,
        setNoteCategory,
        notePriority,
        setNotePriority,
        noteDueDate,
        setNoteDueDate,
        addOrEditNote,
        deleteNote,
        startEditNote,
    };
};

export default useNotes;
