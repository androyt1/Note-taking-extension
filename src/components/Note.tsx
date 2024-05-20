import { useState } from "react";
import useNotes from "../hooks/useNote";
import useCategories from "../hooks/useCategories";
import NoteForm from "./NoteForm";
import CategoryFilter from "./CategoryFilter";
import NoteList from "./NoteList";

const NoteApp = () => {
    const {
        filteredNotes,
        addOrEditNote,
        deleteNote,
        activeCategory,
        filterNotesByCategory,
        searchQuery,
        filterNotesBySearchQuery,
    } = useNotes();
    const { categories, newCategory, setNewCategory, addCategory } = useCategories();
    const [editNote, setEditNote] = useState<NoteProps | null>(null);
    const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);

    const handleSaveNote = (note: NoteProps) => {
        addOrEditNote(note);
        setEditNote(null); // Reset editNote state after saving
    };

    return (
        <div className='p-5 w-[450px] mx-auto bg-white rounded-xl shadow-md space-y-4'>
            <h1 className='text-2xl font-bold mb-4'>Note Taking Extension</h1>
            <NoteForm categories={categories} onSaveNote={handleSaveNote} editNote={editNote} />
            <div className='mb-4 flex'>
                <input
                    type='text'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='Add new category...'
                    className='border p-2 w-full rounded mr-2'
                />
                <button onClick={addCategory} className='bg-green-500 text-white p-2 rounded'>
                    Add
                </button>
            </div>
            <div className='mb-4'>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => filterNotesBySearchQuery(e.target.value)}
                    placeholder='Search notes...'
                    className='border p-2 w-full rounded'
                />
            </div>
            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onFilter={filterNotesByCategory}
            />
            <NoteList
                notes={filteredNotes}
                onEdit={setEditNote}
                onDelete={deleteNote}
                onToggleExpand={setExpandedNoteId}
                expandedNoteId={expandedNoteId}
            />
        </div>
    );
};

export default NoteApp;
