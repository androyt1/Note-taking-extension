const useValidation = () => {
    const validateInputs = (
        note: string,
        category: string,
        priority: string,
        dueDate: string,
        categories: string[]
    ) => {
        const errors = [];
        if (!note.trim()) errors.push("Note text is required.");
        if (!categories.includes(category)) errors.push("Invalid category selected.");
        if (!["High", "Medium", "Low"].includes(priority))
            errors.push("Invalid priority selected.");
        if (!dueDate) errors.push("Due date is required.");
        else if (new Date(dueDate) < new Date()) errors.push("Due date cannot be in the past.");
        return errors;
    };

    return { validateInputs };
};

export default useValidation;
