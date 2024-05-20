import { useState } from "react";
import useNotes from "../hooks/useNote";
import useCategories from "../hooks/useCategories";
import NoteForm from "./NoteForm";
import CategoryFilter from "./CategoryFilter";
import NoteList from "./NoteList";
import Pagination from "./Pagination";
import CategoryForm from "./CategoryForm";
import EditCategoryComponent from "./EditCategoryComponent";

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

            <CategoryForm
                newCategory={newCategory}
                showCategoryEdit={showCategoryEdit}
                addCategory={addCategory}
                setNewCategory={setNewCategory}
                setShowCategoryEdit={setShowCategoryEdit}
            />
            {showCategoryEdit && (
                <EditCategoryComponent
                    categories={categories}
                    editedCategory={editedCategory}
                    editCategoryIndex={editCategoryIndex}
                    setEditedCategory={setEditedCategory}
                    updateCategory={updateCategory}
                    setEditCategoryIndex={setEditCategoryIndex}
                    deleteCategory={deleteCategory}
                />
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
