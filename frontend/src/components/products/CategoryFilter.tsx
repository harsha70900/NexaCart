type CategoryFilterProps = {
    categories: string[];
    selectedCategory: string;
    onSelect: (category: string) => void;
};

function CategoryFilter({
    categories,
    selectedCategory,
    onSelect,
}: CategoryFilterProps) {

    return (

        <div className="mb-8 flex flex-wrap gap-3">

            {categories.map(category => (

                <button

                    key={category}

                    onClick={() => onSelect(category)}

                    className={`rounded-full px-5 py-2 transition ${
                        selectedCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}

                >

                    {category}

                </button>

            ))}

        </div>

    );

}

export default CategoryFilter;