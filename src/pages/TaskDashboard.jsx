import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { getTasksFromFirebase, updateTaskStatusInFirebase } from "../services/taskService"; 
import TaskColumn from "../components/TaskColumnDashboard";
import TaskFilters from "../components/TaskFilters";  
import TaskCardDashboard from "../components/TaskCardDashboard";
import { useNavigate } from "react-router-dom"; // ✅ Import for redirection
import { Briefcase } from "lucide-react"; // ✅ Manager Icon

const statusConfig = {
    todo: { label: "To Do", color: "from-blue-50 to-blue-100" },
    "in-progress": { label: "In Progress", color: "from-yellow-50 to-yellow-100" },
    done: { label: "Done", color: "from-green-50 to-green-100" }
};

export default function TaskDashboard() {
    const { user } = useAuth(); 
    const [tasks, setTasks] = useState([]);
    const [notification, setNotification] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const navigate = useNavigate(); // ✅ For navigating to TaskBoard

    // ✅ Define filters
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");

    // ✅ Fetch only tasks assigned to the logged-in user
    useEffect(() => {
        if (user) {
            fetchUserTasks();
        }
    }, [user]);

    const fetchUserTasks = async () => {
        try {
            const allTasks = await getTasksFromFirebase();
            const userTasks = allTasks
                .filter(task => 
                    Array.isArray(task.assignedTo) && 
                    task.assignedTo.some(assignee => assignee.id === user.uid)
                )
                .map(task => ({
                    ...task,
                    status: typeof task.status === "string" ? task.status.toLowerCase() : "todo",
                }));
    
            setTasks(userTasks);
            console.log("✅ Tasks assigned to user loaded:", userTasks);
        } catch (error) {
            console.error("❌ Error loading user tasks:", error);
        }
    };

    // ✅ Handle moving task to another column
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

    // ✅ Handle task deletion
    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        showNotification("Task deleted!");
    };

    // ✅ Show notifications
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
            {notification && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-800 text-white rounded-full shadow-lg animate-fade-in flex items-center gap-2">
                    <span className="animate-bounce">🎯</span>
                    {notification}
                </div>
            )}

            {/* ✅ Show "Manage Tasks" button only if user is a manager */}
            {user?.role === "manager" && (
                <div className="max-w-6xl mx-auto mb-6 flex justify-end">
                    <button
                        onClick={() => navigate("/tasks")}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md hover:scale-105 transition-all"
                    >
                        <Briefcase size={18} />
                        Manage Tasks
                    </button>
                </div>
            )}

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
                            onMoveTask={handleMoveTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            ) : (
                <div className="max-w-6xl mx-auto mt-6 space-y-4">
                    {filteredTasks.map(task => (
                        <TaskCardDashboard 
                            key={task.id}
                            task={task}
                            onMoveTask={handleMoveTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
