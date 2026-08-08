type SortDropdownProps = {
    value: string;
    onChange: (value: string) => void;
};

function SortDropdown({
    value,
    onChange,
}: SortDropdownProps) {

    return (
        <div className="relative w-full">

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            >

                <option value="default">
                    Sort by: Default
                </option>

                <option value="price-asc">
                    Price: Low to High
                </option>

                <option value="price-desc">
                    Price: High to Low
                </option>

                <option value="name-asc">
                    Name: A to Z
                </option>

                <option value="name-desc">
                    Name: Z to A
                </option>

            </select>

            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
            </div>

        </div>
    );
}

export default SortDropdown;