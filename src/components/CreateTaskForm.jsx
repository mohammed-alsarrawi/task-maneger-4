import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { addTaskToFirebase } from "../services/taskService"; 
import { useAuth } from "../context/AuthContext"; 
import { getUsersByDepartment } from "../services/userService"; 

import { Calendar, User, Flag, Rocket, ChevronDown } from "lucide-react";

export default function CreateTaskForm({ onAddTask }) {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: "Medium",
        assignedTo: [], // ✅ Store as [{ id: "userId", name: "User Name" }]
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useAuth(); 
    const [filteredUsers, setFilteredUsers] = useState([]);

    // ✅ Fetch users based on the current user's department
    useEffect(() => {
        if (user?.departments) {
            console.log("🔍 Fetching users for department:", user.departments);
            getUsersByDepartment(user.departments)
                .then((users) => setFilteredUsers(users))
                .catch(() => setError("❌ Failed to load department users."));
        }
    }, [user]);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newTask.title || !newTask.description || !newTask.deadline || newTask.assignedTo.length === 0) {
            setError("Please fill in all fields.");
            return;
        }

        if (!user) {
            setError("You must be logged in to create a task.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const taskData = {
                ...newTask,
                createdBy: user.uid,
                departments: user.departments,
                assignedTo: newTask.assignedTo.map((user) => ({
                    id: user.id, 
                    name: user.name 
                })), // ✅ Ensure correct structure
            };

            console.log("📌 Task being sent to Firebase:", taskData);
            const taskId = await addTaskToFirebase(taskData);
            onAddTask({ id: taskId, ...taskData });

            // ✅ Reset form
            setNewTask({ title: "", description: "", deadline: "", priority: "Medium", assignedTo: [] });
        } catch (err) {
            setError("Failed to save task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Toggle user selection
    const toggleUserSelection = (selectedUser) => {
        setNewTask((prevTask) => {
            const isUserSelected = prevTask.assignedTo.some((user) => user.id === selectedUser.id);
            const updatedAssignedTo = isUserSelected
                ? prevTask.assignedTo.filter((user) => user.id !== selectedUser.id)
                : [...prevTask.assignedTo, selectedUser];

            console.log("📌 Updated assignedTo:", updatedAssignedTo);
            return { ...prevTask, assignedTo: updatedAssignedTo };
        });
    };

    return (
        <div className="max-w-2xl mx-auto mb-8 p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border">
            {/* Title Section */}
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    Create New Task
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Title */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-blue-500" />
                        Task Title
                    </label>
                    <Input
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Enter task title..."
                        required
                        className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 rounded-xl"
                    />
                </div>

                {/* Task Description */}
                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        📝 Description
                    </label>
                    <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Enter task description..."
                        rows="4"
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    ></textarea>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        Deadline
                    </label>
                    <input
                        type="date"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                    />
                </div>

                {/* Priority */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Flag className="w-4 h-4 text-red-500" />
                        Priority
                    </label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>

                {/* Assign To */}
                <div className="space-y-1 relative">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <User className="w-4 h-4 text-green-500" />
                        Assign To
                    </label>
                    <div className="relative">
                        <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer border p-2 rounded-md">
                            {newTask.assignedTo.length > 0 ? newTask.assignedTo.map((user) => user.name).join(", ") : "Select team members"}
                            <ChevronDown className="inline-block ml-2" />
                        </div>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 z-10">
                                <ul className="max-h-40 overflow-y-auto p-2">
                                    {filteredUsers.map((teamMember) => (
                                        <li key={teamMember.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={newTask.assignedTo.some((user) => user.id === teamMember.id)}
                                                onChange={() => toggleUserSelection({ id: teamMember.id, name: teamMember.fullName })}
                                            />
                                            {teamMember.fullName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}

                {/* Submit Button */}
                <div className="md:col-span-2 mt-6">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Create Task"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
