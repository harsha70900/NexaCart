const categories = [
    {
        id: 1,
        name: "Phones",
        emoji: "📱",
    },
    {
        id: 2,
        name: "Laptops",
        emoji: "💻",
    },
    {
        id: 3,
        name: "Gaming",
        emoji: "🎮",
    },
    {
        id: 4,
        name: "Audio",
        emoji: "🎧",
    },
    {
        id: 5,
        name: "Smart Watches",
        emoji: "⌚",
    },
    {
        id: 6,
        name: "Cameras",
        emoji: "📷",
    },
];

function CategorySection() {
    return (
        <section className="bg-white">

            <div className="mx-auto max-w-7xl px-6 py-16">

                {/* Section Heading */}

                <div className="mb-10 text-center">

                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Explore Collection
                    </p>

                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                        Shop by Category
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Explore products across our most popular categories.
                    </p>

                </div>

                {/* Categories */}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

                    {categories.map((category) => (

                        <button
                            key={category.id}
                            className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-blue-600 hover:shadow-xl"
                        >

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm transition-all duration-300 group-hover:bg-blue-500">

                                {category.emoji}

                            </div>

                            <p className="mt-4 font-semibold text-slate-800 transition-colors duration-300 group-hover:text-white">

                                {category.name}

                            </p>

                        </button>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CategorySection;