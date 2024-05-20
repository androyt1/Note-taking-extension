// /hooks/useCategories.tsx
import { useState, useEffect } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState<string[]>(["General", "Work", "Personal"]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [editCategoryIndex, setEditCategoryIndex] = useState<number | null>(null);
    const [editedCategory, setEditedCategory] = useState<string>("");

    useEffect(() => {
        chrome.storage.sync.get(["categories"], (result) => {
            if (result.categories) {
                setCategories(result.categories);
            }
        });
    }, []);

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            chrome.storage.sync.set({ categories: updatedCategories });
            setNewCategory("");
        }
    };

    const updateCategory = (index: number) => {
        if (editedCategory && !categories.includes(editedCategory)) {
            const updatedCategories = [...categories];
            updatedCategories[index] = editedCategory;
            setCategories(updatedCategories);
            chrome.storage.sync.set({ categories: updatedCategories });
            setEditCategoryIndex(null);
            setEditedCategory("");
        }
    };

    const deleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        chrome.storage.sync.set({ categories: updatedCategories });
    };

    return {
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
    };
};

export default useCategories;
