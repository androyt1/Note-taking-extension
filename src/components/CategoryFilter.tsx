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
        <div className='flex flex-wrap space-x-2 mb-4'>
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
    );
};

export default CategoryFilter;
