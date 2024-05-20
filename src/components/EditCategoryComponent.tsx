const EditCategoryComponent = ({
    categories,
    editedCategory,
    editCategoryIndex,
    setEditCategoryIndex,
    setEditedCategory,
    updateCategory,
    deleteCategory,
}: EditCategoryProp) => {
    return (
        <div className='mb-4 '>
            {categories.map((category, index) => (
                <div key={index} className='grid grid-cols-3 mb-2'>
                    {editCategoryIndex === index ? (
                        <>
                            <input
                                type='text'
                                value={editedCategory}
                                onChange={(e) => setEditedCategory(e.target.value)}
                                className='border p-2 rounded mr-2 w-full'
                            />
                            <button
                                onClick={() => updateCategory(index)}
                                className='bg-green-500 text-white p-2 rounded mr-2'>
                                Update
                            </button>
                            <button
                                onClick={() => setEditCategoryIndex(null)}
                                className='bg-gray-500 text-white p-2 rounded'>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <span className='mr-2'>{category}</span>
                            <button
                                onClick={() => setEditCategoryIndex(index)}
                                className='bg-blue-500 text-white p-2 rounded mr-2'>
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCategory(index)}
                                className='bg-red-500 text-white p-2 rounded'>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EditCategoryComponent;
