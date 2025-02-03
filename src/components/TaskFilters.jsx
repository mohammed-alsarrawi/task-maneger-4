import {
    Filter,
    ListFilter,
    Calendar,
    ChevronsUpDown,
    Grid,
    List,
} from "lucide-react";

export default function TaskFilters({
    filterCategory,
    setFilterCategory,
    filterPriority,
    setFilterPriority,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode,
}) {
    return (
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl border border-gray-200 transition-all hover:shadow-2xl flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            {/* Filter by Category & Priority */}
            <div className="flex gap-4 items-center w-full md:w-auto">
                {/* Category Filter */}
                <div className="relative w-full">
                    <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                        <ListFilter className="w-4 h-4 text-purple-500" />
                        Category
                    </label>
                    <select
                        className="mt-1 w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 appearance-none cursor-pointer"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <div className="absolute right-3 top-10 pointer-events-none">
                        <ChevronsUpDown size={16} className="text-gray-400" />
                    </div>
                </div>

                {/* Priority Filter */}
                <div className="relative w-full">
                    <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                        <Filter className="w-4 h-4 text-purple-500" />
                        Priority
                    </label>
                    <select
                        className="mt-1 w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 appearance-none cursor-pointer"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="all">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <div className="absolute right-3 top-10 pointer-events-none">
                        <ChevronsUpDown size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Sorting and View Mode Toggle */}
            <div className="flex gap-4 items-center">
                {/* Sorting by Due Date */}
                <div className="relative w-full md:w-auto">
                    <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        Sort by Due Date
                    </label>
                    <select
                        className="mt-1 w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 appearance-none cursor-pointer"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <div className="absolute right-3 top-10 pointer-events-none">
                        <ChevronsUpDown size={16} className="text-gray-400" />
                    </div>
                </div>
                <div className="relative w-full md:w-auto">
    <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
        <Grid className="w-4 h-4 text-purple-500" />
        View Mode
    </label>
    <button
        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        className="mt-1 w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-300 focus:border-blue-500 cursor-pointer flex items-center 
                    justify-center gap-2 text-gray-700 bg-blue hover:bg-gray-100 transition"
    >
        {viewMode === "grid" ? (
            <List size={18} className="text-gray-600" />
        ) : (
            <Grid size={18} className="text-gray-600" />
        )}
        {viewMode === "grid" ? "List View" : "Grid View"}
    </button>
</div>
            </div>
        </div>
    );
}
