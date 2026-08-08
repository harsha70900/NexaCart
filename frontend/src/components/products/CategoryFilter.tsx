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

        <div className="flex flex-wrap items-center gap-2">

            {categories.map((category) => (

                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >

                    {category}

                </button>

            ))}

        </div>

    );
}

export default CategoryFilter;