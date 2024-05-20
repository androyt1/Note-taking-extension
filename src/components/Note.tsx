import { useState } from "react";
import useNotes from "../hooks/useNote";
import useCategories from "../hooks/useCategories";
import NoteForm from "./NoteForm";
import CategoryFilter from "./CategoryFilter";
import NoteList from "./NoteList";
import Pagination from "./Pagination";

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
    const {
        categories,
        newCategory,
        setNewCategory,
        addCategory,
        editCategoryIndex,
        setEditCategoryIndex,
        editedCategory,
        setEditedCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();
    const [editNote, setEditNote] = useState<NoteProps | null>(null);
    const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
    const [showCategoryEdit, setShowCategoryEdit] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 3;

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
            <div className='mb-4 grid grid-cols-6 gap-2'>
                <input
                    type='text'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='Add new category...'
                    className='border p-2 w-full rounded mr-2 col-span-3'
                />
                <button
                    onClick={addCategory}
                    className='bg-green-500 text-white p-2 rounded col-span-1'>
                    Add
                </button>
                <button
                    onClick={() => setShowCategoryEdit(!showCategoryEdit)}
                    className='bg-blue-500 text-white p-2 rounded ml-2 col-span-2'>
                    {showCategoryEdit ? "Hide Edit" : "Edit Categories"}
                </button>
            </div>
            {showCategoryEdit && (
                <div className='mb-4 '>
                    {categories.map((category, index) => (
                        <div key={index} className='grid grid-cols-3 mb-2'>
                            {editCategoryIndex === index ? (
                                <>
                                    <input
                                        type='text'
                                        value={editedCategory}
                                        onChange={(e) => setEditedCategory(e.target.value)}
                                        className='border p-2 rounded mr-2 w-full'
                                    />
                                    <button
                                        onClick={() => updateCategory(index)}
                                        className='bg-green-500 text-white p-2 rounded mr-2'>
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setEditCategoryIndex(null)}
                                        className='bg-gray-500 text-white p-2 rounded'>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className='mr-2'>{category}</span>
                                    <button
                                        onClick={() => setEditCategoryIndex(index)}
                                        className='bg-blue-500 text-white p-2 rounded mr-2'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(index)}
                                        className='bg-red-500 text-white p-2 rounded'>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
};

export default NoteApp;
