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

    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 2;

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSaveNote = (note: NoteProps) => {
        addOrEditNote(note);
        setEditNote(null);
        setCurrentPage(1);
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
                notes={currentNotes}
                onEdit={setEditNote}
                onDelete={deleteNote}
                onToggleExpand={setExpandedNoteId}
                expandedNoteId={expandedNoteId}
            />
            <div className='flex justify-between items-center'>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className='bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'>
                    Previous
                </button>
                <span className='text-gray-700'>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default NoteApp;
