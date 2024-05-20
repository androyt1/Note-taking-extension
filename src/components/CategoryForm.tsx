const CategoryForm = ({
    newCategory,
    showCategoryEdit,
    addCategory,
    setNewCategory,
    setShowCategoryEdit,
}: CategoryFormProps) => {
    return (
        <div className='mb-4 grid grid-cols-6 gap-2'>
            <input
                type='text'
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder='Add new category...'
                className='border p-2 w-full rounded mr-2 col-span-3'
            />
            <button
                onClick={addCategory}
                className='bg-green-500 text-white p-2 rounded col-span-1'>
                Add
            </button>
            <button
                onClick={() => setShowCategoryEdit(!showCategoryEdit)}
                className='bg-blue-500 text-white p-2 rounded ml-2 col-span-2'>
                {showCategoryEdit ? "Hide Edit" : "Edit Categories"}
            </button>
        </div>
    );
};

export default CategoryForm;
