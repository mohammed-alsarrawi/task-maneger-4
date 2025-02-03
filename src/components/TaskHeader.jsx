export function TaskHeader({ title, description }) {
    return (
        <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-12">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg opacity-90 mt-2">{description}</p>
        </div>
    );
}
