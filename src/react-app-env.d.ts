/// <reference types="react-scripts" />

type NoteProps = {
    id: number;
    text: string;
    category: string;
    priority: string;
    dueDate: string;
};

type NoteFormProps = {
    categories: string[];
    onSaveNote: (note: NoteProps) => void;
    editNote?: NoteProps | null;
};

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
};
