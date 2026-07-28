type SortDropdownProps = {
    value: string;
    onChange: (value: string) => void;
};

function SortDropdown({
    value,
    onChange,
}: SortDropdownProps) {

    return (

        <div className="mb-8">

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded-lg border border-gray-300 p-3"
            >

                <option value="default">
                    Default
                </option>

                <option value="price-asc">
                    Price: Low → High
                </option>

                <option value="price-desc">
                    Price: High → Low
                </option>

                <option value="name-asc">
                    Name: A → Z
                </option>

                <option value="name-desc">
                    Name: Z → A
                </option>

            </select>

        </div>

    );

}

export default SortDropdown;