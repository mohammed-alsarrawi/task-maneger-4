export function Input({ value, onChange, placeholder, className = "" }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`p-2 border border-gray-300 rounded-lg w-full ${className}`}
        />
    );
}