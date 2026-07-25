function HeroSection() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

        <h1 className="text-5xl font-bold leading-tight">
          Discover the Future of Technology
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Shop premium electronics, laptops, smartphones and
          accessories with secure payments and lightning-fast delivery.
        </p>

        <div className="mt-10 flex gap-4">

          <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
            Shop Now
          </button>

          <button className="rounded-lg border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-slate-900">
            Explore Deals
          </button>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;