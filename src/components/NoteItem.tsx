import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { formatDate } from "../utils";

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
        <li className='border-b p-2 flex justify-between items-center odd:bg-gray-100'>
            <button className='w-full text-left' onClick={() => onToggleExpand(note.id)}>
                <div>
                    <span className='block text-base font-semibold'>
                        {isExpanded ? note.text : `${note.text.substring(0, 20)}...`} (
                        {note.category})
                    </span>
                    <span className='block text-xs text-gray-500'>
                        <span className='font-semibold'>Priority</span>: {note.priority}
                    </span>
                    <span className='block text-xs text-gray-500'>
                        <span className='font-semibold'>Due</span>: {formatDate(note.dueDate)}
                    </span>
                </div>
            </button>
            <div className='flex items-center justify-end space-x-4'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note);
                    }}
                    className='ml-2 text-blue-500'>
                    <FiEdit size={18} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note.id);
                    }}
                    className='ml-2 text-red-500'>
                    <AiFillDelete size={18} />
                </button>
            </div>
        </li>
    );
};

export default NoteItem;
