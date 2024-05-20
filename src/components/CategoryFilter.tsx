const CategoryFilter = ({
    categories,
    activeCategory,
    onFilter,
}: {
    categories: string[];
    activeCategory: string;
    onFilter: (category: string) => void;
}) => {
    return (
        <div className='mb-4 overflow-x-auto'>
            <div className='flex space-x-2'>
                <button
                    onClick={() => onFilter("All")}
                    className={`p-2 rounded ${
                        activeCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}>
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onFilter(category)}
                        className={`p-2 rounded ${
                            activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}>
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
