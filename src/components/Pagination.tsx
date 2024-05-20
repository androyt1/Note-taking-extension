const Pagination = ({
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
}: PaginationProps) => {
    return (
        <div className='flex justify-between items-center'>
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'>
                Previous
            </button>
            <span className='text-gray-700'>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'>
                Next
            </button>
        </div>
    );
};

export default Pagination;
