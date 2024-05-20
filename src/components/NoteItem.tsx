const NoteItem = ({
    note,
    onEdit,
    onDelete,
    onToggleExpand,
    isExpanded,
}: {
    note: NoteProps;
    onEdit: (note: NoteProps) => void;
    onDelete: (id: number) => void;
    onToggleExpand: (id: number) => void;
    isExpanded: boolean;
}) => {
    return (
        <li className='border-b p-2 flex justify-between items-center'>
            <button className='w-full text-left' onClick={() => onToggleExpand(note.id)}>
                <div>
                    <span className='block'>
                        {isExpanded ? note.text : `${note.text.substring(0, 20)}...`} (
                        {note.category})
                    </span>
                    <span className='block text-sm text-gray-500'>Priority: {note.priority}</span>
                    <span className='block text-sm text-gray-500'>Due: {note.dueDate}</span>
                </div>
            </button>
            <div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note);
                    }}
                    className='ml-2 text-blue-500'>
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note.id);
                    }}
                    className='ml-2 text-red-500'>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default NoteItem;
