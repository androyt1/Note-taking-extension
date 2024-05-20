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

type CategoryFormProps = {
    newCategory: string;
    showCategoryEdit: boolean;
    addCategory: () => void;
    setNewCategory: (value: React.SetStateAction<string>) => void;
    setShowCategoryEdit: (value: React.SetStateAction<boolean>) => void;
};

type EditCategoryProp = {
    categories: string[];
    editCategoryIndex: number | null;
    editedCategory: string;
    setEditedCategory: (value: React.SetStateAction<string>) => void;
    updateCategory: (index: number) => void;
    setEditCategoryIndex: (value: React.SetStateAction<number | null>) => void;
    deleteCategory: (index: number) => void;
};
