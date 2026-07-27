type ProductSearchProps = {

    value: string;

    onChange: (value: string) => void;

};

function ProductSearch({

    value,

    onChange,

}: ProductSearchProps) {

    return (

        <input

            type="text"

            placeholder="Search products..."

            value={value}

            onChange={(e) => onChange(e.target.value)}

            className="mb-8 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"

        />

    );

}

export default ProductSearch;