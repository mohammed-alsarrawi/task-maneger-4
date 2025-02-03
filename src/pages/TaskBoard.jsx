import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasksFromFirebase, updateTaskStatusInFirebase } from "../services/taskService";
import CreateTaskForm from "../components/CreateTaskForm";
import EditTaskModal from "../components/ui/EditTaskModal";
import TaskColumn from "../components/TaskColumn";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import moveTask from "../utils/MoveTask";
import { PlusCircle, X } from "lucide-react"; // ✅ Import icons

const statusConfig = {
    todo: { label: "To Do", color: "from-blue-50 to-blue-100" },
    "in-progress": { label: "In Progress", color: "from-yellow-50 to-yellow-100" },
    done: { label: "Done", color: "from-green-50 to-green-100" }
};

export default function TaskBoard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [notification, setNotification] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Modal state

    // ✅ Define filters
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");

    // ✅ Fetch tasks from Firebase
    useEffect(() => {
        if (user && user.departments) {
            fetchUserTasks();
        }
    }, [user]);

    const fetchUserTasks = async () => {
        try {
            const allTasks = await getTasksFromFirebase();
            const departmentTasks = allTasks
                .filter(task => task.departments === user.departments)
                .map(task => ({
                    ...task,
                    status: typeof task.status === "string" ? task.status.toLowerCase() : "todo",
                }));

            setTasks(departmentTasks);
            console.log("✅ Tasks for department loaded:", departmentTasks);
        } catch (error) {
            console.error("❌ Error loading tasks:", error);
        }
    };

    const handleMoveTask = (taskId, direction) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    const statusKeys = Object.keys(statusConfig);
                    const currentIndex = statusKeys.indexOf(task.status);
                    const newIndex = currentIndex + direction;

                    if (newIndex >= 0 && newIndex < statusKeys.length) {
                        const newStatus = statusKeys[newIndex];

                        if (typeof newStatus === "string") {
                            updateTaskStatusInFirebase(taskId, newStatus);
                            showNotification(`Task moved to ${newStatus.replace("-", " ")}`);
                        }

                        return { ...task, status: newStatus };
                    }
                }
                return task;
            })
        );
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        showNotification("Task deleted!");
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 2000);
    };

    // ✅ Filter & Sort Logic
    const filteredTasks = tasks
        .filter(task => filterCategory === "all" || task.status === filterCategory)
        .filter(task => filterPriority === "all" || task.priority === filterPriority)
        .sort((a, b) => sortOrder === "asc" ?
            new Date(a.deadline) - new Date(b.deadline) :
            new Date(b.deadline) - new Date(a.deadline)
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* ✅ Notification Pop-up */}
            {notification && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-800 text-white rounded-full shadow-lg animate-fade-in flex items-center gap-2">
                    <span className="animate-bounce">🎯</span>
                    {notification}
                </div>
            )}

            {/* ✅ Edit Task Modal */}
            {editTask && (
                <EditTaskModal
                    task={editTask}
                    users={[]}
                    onSave={(updatedTask) => {
                        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
                        setEditTask(null);
                    }}
                    onClose={() => setEditTask(null)}
                />
            )}


            {/* ✅ "Create Task" Button (Opens Modal) */}
            <div className="flex justify-end mb-6">
                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircle size={18} />
                    Create Task
                </button>
            </div>

            {/* ✅ Create Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-lg flex items-center justify-center z-50">

                    {/* Close Button */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
                    >
                        <X size={24} className="text-gray-300 hover:text-white transition-all" />
                    </button>

                    {/* ✅ Insert the Create Task Form Here */}
                    <CreateTaskForm
                        onAddTask={(task) => {
                            setTasks([...tasks, { id: Date.now().toString(), ...task, status: "todo" }]);
                            setIsModalOpen(false);
                        }}
                        users={[user.email]}
                    />

                </div>
            )}


            {/* ✅ Filters */}
            <TaskFilters
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* ✅ Task Grid / List View */}
            {viewMode === "grid" ? (
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start grid-auto-rows-min">
                    {Object.entries(statusConfig).map(([statusKey, { label, color }]) => (
                        <TaskColumn
                            key={statusKey}
                            statusKey={statusKey}
                            label={label}
                            color={color}
                            tasks={filteredTasks.filter(task =>
                                typeof task.status === "string" && task.status.toLowerCase() === statusKey
                            )}
                            setTasks={setTasks}
                            setEditTask={setEditTask}
                            onMoveTask={handleMoveTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            ) : (
                <div className="max-w-6xl mx-auto mt-6 space-y-4">
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            setEditTask={setEditTask}
                            onMoveTask={handleMoveTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
