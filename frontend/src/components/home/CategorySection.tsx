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
    <section className="bg-white py-16">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-10 text-center text-4xl font-bold">
          Shop by Category
        </h2>

        <div className="flex flex-wrap justify-center gap-6">

          {categories.map((category) => (
            <button
              key={category.id}
              className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-medium transition hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <span className="mr-2 text-2xl">
                {category.emoji}
              </span>

              {category.name}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}

export default CategorySection;