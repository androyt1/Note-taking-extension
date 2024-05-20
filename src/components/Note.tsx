import { useState, useEffect } from "react";

interface NoteProps {
    id: number;
    text: string;
    category: string;
    priority: string;
    dueDate: string;
}

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
    const [errors, setErrors] = useState<string[]>([]);
    const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);

    useEffect(() => {
        chrome.storage.sync.get(["notes"], (result) => {
            console.log("Fetched notes from storage:", result.notes);
            if (result.notes) {
                setNotes(result.notes);
                setFilteredNotes(result.notes);
            }
        });
        chrome.storage.sync.get(["categories"], (result) => {
            console.log("Fetched categories from storage:", result.categories);
            if (result.categories) {
                setCategories(result.categories);
            }
        });
    }, []);

    const validateInputs = () => {
        const errors = [];
        if (!newNote.trim()) {
            errors.push("Note text is required.");
        }
        if (!categories.includes(noteCategory)) {
            errors.push("Invalid category selected.");
        }
        if (!["High", "Medium", "Low"].includes(notePriority)) {
            errors.push("Invalid priority selected.");
        }
        if (!noteDueDate) {
            errors.push("Due date is required.");
        } else if (new Date(noteDueDate) < new Date()) {
            errors.push("Due date cannot be in the past.");
        }
        return errors;
    };

    const addOrEditNote = () => {
        const validationErrors = validateInputs();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors([]);

        let updatedNotes: NoteProps[];

        if (editNoteId !== null) {
            updatedNotes = notes.map((note) =>
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
            console.log("Updated notes:", updatedNotes);
        } else {
            const newNoteObj = {
                id: Date.now(),
                text: newNote,
                category: noteCategory,
                priority: notePriority,
                dueDate: noteDueDate,
            };
            console.log("New Note", newNoteObj);
            updatedNotes = [...notes, newNoteObj];
            console.log("Updated Notes", updatedNotes);
            setNotes(updatedNotes);
            setFilteredNotes(updatedNotes);
            console.log("New note added:", newNoteObj);
            console.log("Updated notes:", updatedNotes);
        }

        setNewNote("");
        setNotePriority("Medium");
        setNoteDueDate("");

        chrome.storage.sync.set({ notes: updatedNotes }, () => {
            console.log("Notes saved to storage:", updatedNotes);
        });
    };

    const deleteNote = (id: number) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
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
            chrome.storage.sync.set({ categories: updatedCategories }, () => {
                console.log("Categories saved to storage:", updatedCategories);
            });
            setNewCategory("");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    const truncateText = (text: string, length: number) => {
        if (text.length <= length) return text;
        return text.slice(0, length) + "...";
    };

    const toggleExpandNote = (id: number) => {
        setExpandedNoteId(expandedNoteId === id ? null : id);
    };

    return (
        <div className='p-5 w-[450px] mx-auto bg-white rounded-xl shadow-md space-y-4'>
            <h1 className='text-2xl font-bold mb-4'>Note Taking Extension</h1>
            <div className='mb-4'>
                {errors.length > 0 && (
                    <div className='mb-4 p-2 bg-red-200 text-red-800 rounded'>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={`${index}-${error}`}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <label htmlFor='note' className='block mb-1'>
                    Note Text
                </label>
                <input
                    type='text'
                    id='note'
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className='border p-2 mb-2 w-full'
                    placeholder='Type your note here...'
                />
                <label htmlFor='category' className='block mb-1'>
                    Category
                </label>
                <select
                    value={noteCategory}
                    id='category'
                    onChange={(e) => setNoteCategory(e.target.value)}
                    className='border p-2 mb-2 w-full'>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <label htmlFor='priority' className='block mb-1'>
                    Priority
                </label>
                <select
                    value={notePriority}
                    id='priority'
                    onChange={(e) => setNotePriority(e.target.value)}
                    className='border p-2 mb-2 w-full'>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
                <label htmlFor='date' className='block mb-1'>
                    Due Date
                </label>
                <input
                    type='date'
                    id='date'
                    value={noteDueDate}
                    min={today}
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
                <label htmlFor='newCategory' className='block mb-1'>
                    New Category
                </label>
                <input
                    type='text'
                    id='newCategory'
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
                <label htmlFor='search' className='block mb-1'>
                    Search Notes
                </label>
                <input
                    type='text'
                    id='search'
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
                        <button
                            className='w-full text-left'
                            onClick={() => toggleExpandNote(note.id)}>
                            <div>
                                <span className='block'>
                                    {expandedNoteId === note.id
                                        ? note.text
                                        : truncateText(note.text, 20)}{" "}
                                    ({note.category})
                                </span>
                                <span className='block text-sm text-gray-500'>
                                    Priority: {note.priority}
                                </span>
                                <span className='block text-sm text-gray-500'>
                                    Due: {note.dueDate}
                                </span>
                            </div>
                        </button>
                        <div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startEditNote(note);
                                }}
                                className='ml-2 text-blue-500'>
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                }}
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
