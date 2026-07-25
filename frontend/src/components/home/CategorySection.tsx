const categories = [
  "Phones",
  "Laptops",
  "Gaming",
  "Accessories",
  "Audio",
];

function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">

      <h2 className="mb-6 text-3xl font-bold">
        Shop by Category
      </h2>

      <div className="flex flex-wrap gap-4">

        {categories.map((category) => (
          <button
            key={category}
            className="rounded-full bg-blue-100 px-6 py-3 text-blue-700 transition hover:bg-blue-600 hover:text-white"
          >
            {category}
          </button>
        ))}

      </div>

    </section>
  );
}

export default CategorySection;