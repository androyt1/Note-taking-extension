import { useState, useEffect } from "react";

type NoteProps = {
    id: number;
    text: string;
    category: string;
    priority: string;
    dueDate: string;
};

const Note = () => {
    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [newNote, setNewNote] = useState<string>("");
    const [editNoteId, setEditNoteId] = useState<number | null>(null);
    const [noteCategory, setNoteCategory] = useState<string>("General");
    const [notePriority, setNotePriority] = useState<string>("Medium");
    const [noteDueDate, setNoteDueDate] = useState<string>("");
    const [categories, setCategories] = useState<string[]>(["General", "Work", "Personal"]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]);

    useEffect(() => {
        chrome.storage.sync.get(["notes"], (result) => {
            if (result.notes) {
                setNotes(result.notes);
                setFilteredNotes(result.notes);
            }
        });
        chrome.storage.sync.get(["categories"], (result) => {
            if (result.categories) {
                setCategories(result.categories);
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
            setFilteredNotes(updatedNotes);
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
            setFilteredNotes(updatedNotes);
        }
        setNewNote("");
        setNotePriority("Medium");
        setNoteDueDate("");
        chrome.storage.sync.set({ notes });
    };

    const deleteNote = (id: number) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
        chrome.storage.sync.set({ notes: updatedNotes });
    };

    const startEditNote = (note: NoteProps) => {
        setNewNote(note.text);
        setEditNoteId(note.id);
        setNoteCategory(note.category);
        setNotePriority(note.priority);
        setNoteDueDate(note.dueDate);
    };

    const filterNotesByCategory = (category: string) => {
        setActiveCategory(category);
        if (category === "All") {
            setFilteredNotes(notes);
        } else {
            const updatedNotes = notes.filter((note) => note.category === category);
            setFilteredNotes(updatedNotes);
        }
    };

    const filterNotesBySearchQuery = (query: string) => {
        setSearchQuery(query);
        const updatedNotes = notes.filter((note) =>
            note.text.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredNotes(updatedNotes);
    };

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            chrome.storage.sync.set({ categories: updatedCategories });
            setNewCategory("");
        }
    };

    return (
        <div className='p-5 w-[450px] mx-auto bg-white rounded-xl shadow-md space-y-4'>
            <h1 className='text-2xl font-bold mb-4'>Note Taking Extension</h1>
            <div className='mb-4'>
                <input
                    type='text'
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className='border p-2 mb-2 w-full'
                    placeholder='Type your note here...'
                />
                <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value)}
                    className='border p-2 mb-2 w-full'>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    value={notePriority}
                    onChange={(e) => setNotePriority(e.target.value)}
                    className='border p-2 mb-2 w-full'>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
                <input
                    type='date'
                    value={noteDueDate}
                    onChange={(e) => setNoteDueDate(e.target.value)}
                    className='border p-2 mb-2 w-full'
                />
                <button
                    onClick={addOrEditNote}
                    className='bg-blue-500 text-white p-2 rounded w-full'>
                    {editNoteId !== null ? "Update Note" : "Add Note"}
                </button>
            </div>
            <div className='mb-4 flex'>
                <input
                    type='text'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className='border p-2 mr-2 w-full'
                    placeholder='Add new category...'
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
                    className='border p-2 mb-2 w-full'
                    placeholder='Search notes...'
                />
                <div className='flex flex-wrap space-x-2'>
                    <button
                        onClick={() => filterNotesByCategory("All")}
                        className={`p-2 rounded ${
                            activeCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}>
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => filterNotesByCategory(category)}
                            className={`p-2 rounded ${
                                activeCategory === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}>
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <ul>
                {filteredNotes.map((note) => (
                    <li key={note.id} className='border-b p-2 flex justify-between items-center'>
                        <div>
                            <span className='block'>
                                {note.text} ({note.category})
                            </span>
                            <span className='block text-sm text-gray-500'>
                                Priority: {note.priority}
                            </span>
                            <span className='block text-sm text-gray-500'>Due: {note.dueDate}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => startEditNote(note)}
                                className='ml-2 text-blue-500'>
                                Edit
                            </button>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className='ml-2 text-red-500'>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Note;
