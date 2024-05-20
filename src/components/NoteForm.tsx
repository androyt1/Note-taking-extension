import { useState, useEffect } from "react";

const NoteForm = ({ categories, onSaveNote, editNote }: NoteFormProps) => {
    const [note, setNote] = useState<string>(editNote?.text ?? "");
    const [category, setCategory] = useState<string>(editNote?.category ?? "General");
    const [priority, setPriority] = useState<string>(editNote?.priority ?? "Medium");
    const [dueDate, setDueDate] = useState<string>(editNote?.dueDate ?? "");
    const [errors, setErrors] = useState<string[]>([]);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (editNote) {
            setNote(editNote.text);
            setCategory(editNote.category);
            setPriority(editNote.priority);
            setDueDate(editNote.dueDate);
        }
    }, [editNote]);

    const validateInputs = () => {
        const errors = [];
        if (!note.trim()) errors.push("Note text is required.");
        if (!categories.includes(category)) errors.push("Invalid category selected.");
        if (!["High", "Medium", "Low"].includes(priority))
            errors.push("Invalid priority selected.");
        if (!dueDate) errors.push("Due date is required.");
        else if (new Date(dueDate) < new Date()) errors.push("Due date cannot be in the past.");
        return errors;
    };

    const handleSubmit = () => {
        const validationErrors = validateInputs();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newNote: NoteProps = {
            id: editNote?.id ?? 0,
            text: note,
            category,
            priority,
            dueDate,
        };
        onSaveNote(newNote);
        setNote("");
        setCategory("General");
        setPriority("Medium");
        setDueDate("");
        setErrors([]);
    };

    return (
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
            <input
                type='text'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder='Type your note here...'
                className='border p-2 mb-2 w-full rounded'
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='border p-2 mb-2 w-full rounded'>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className='border p-2 mb-2 w-full rounded'>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
            </select>
            <input
                type='date'
                value={dueDate}
                min={today}
                onChange={(e) => setDueDate(e.target.value)}
                className='border p-2 mb-2 w-full rounded'
            />
            <button onClick={handleSubmit} className='bg-blue-500 text-white p-2 rounded w-full'>
                {editNote ? "Update Note" : "Add Note"}
            </button>
        </div>
    );
};

export default NoteForm;
