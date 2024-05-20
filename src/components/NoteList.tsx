import NoteItem from "./NoteItem";

const NoteList = ({
    notes,
    onEdit,
    onDelete,
    onToggleExpand,
    expandedNoteId,
}: {
    notes: NoteProps[];
    onEdit: (note: NoteProps) => void;
    onDelete: (id: number) => void;
    onToggleExpand: (id: number) => void;
    expandedNoteId: number | null;
}) => {
    return (
        <ul>
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleExpand={onToggleExpand}
                    isExpanded={note.id === expandedNoteId}
                />
            ))}
        </ul>
    );
};

export default NoteList;
