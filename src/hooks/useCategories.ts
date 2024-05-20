import { useState, useEffect } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState<string[]>(["General", "Work", "Personal"]);
    const [newCategory, setNewCategory] = useState<string>("");

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

    return {
        categories,
        newCategory,
        setNewCategory,
        addCategory,
    };
};

export default useCategories;
