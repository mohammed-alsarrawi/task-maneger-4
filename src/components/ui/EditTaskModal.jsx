import { useEffect, useState } from "react";
import { ref, update, get } from "firebase/database"; // ✅ Firebase functions
import { db } from "../../firebase"; // ✅ Firebase instance
import { Button } from "./Button";
import { Input } from "./Input";
import { X, ChevronDown, User } from "lucide-react";
import { getUsersByDepartment } from "../../services/userService"; // ✅ Fetch department users

export default function EditTaskModal({ task, onSave, onClose }) {
    const [updatedTask, setUpdatedTask] = useState({
        ...task,
        assignedTo: Array.isArray(task.assignedTo) ? task.assignedTo : [],
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]); // ✅ Store users from the department

    // ✅ Fetch users assigned to the same department as the task
    useEffect(() => {
        if (task.departments) {
            console.log("🔍 Fetching users for department:", task.departments);
            getUsersByDepartment(task.departments)
                .then((users) => {
                    console.log("✅ Users fetched:", users);
                    setAvailableUsers(users);
                })
                .catch((err) => console.error("❌ Failed to fetch users:", err));
        }
    }, [task]);

    // ✅ Ensure assignedTo is properly structured
    useEffect(() => {
        setUpdatedTask({
            ...task,
            assignedTo: Array.isArray(task.assignedTo) ? task.assignedTo : [],
        });
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // ✅ Update task in Firebase
            const taskRef = ref(db, `tasks/${updatedTask.id}`);
            await update(taskRef, { assignedTo: updatedTask.assignedTo });

            console.log(`✅ Task ${updatedTask.id} updated successfully with assigned users`, updatedTask.assignedTo);

            onSave(updatedTask);
            onClose(); // ✅ Close modal after saving
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    // ✅ Toggle user selection
    const toggleUserSelection = (selectedUser) => {
        setUpdatedTask((prevTask) => {
            const isUserSelected = prevTask.assignedTo.some((user) => user.id === selectedUser.id);
            const updatedAssignedTo = isUserSelected
                ? prevTask.assignedTo.filter((user) => user.id !== selectedUser.id) // Remove user
                : [...prevTask.assignedTo, selectedUser]; // Add user

            console.log("📌 Updated assignedTo:", updatedAssignedTo);
            return { ...prevTask, assignedTo: updatedAssignedTo };
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-md z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
                {/* 🔥 Header Section */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                        <X size={22} />
                    </button>
                </div>

                {/* 📝 Form Section */}
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Task Title */}
                    <Input
                        value={updatedTask.title}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                        placeholder="Task Title"
                        required
                        className="border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 rounded-xl"
                    />

                    {/* Deadline Picker */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-500" />
                            Deadline
                        </label>
                        <Input
                            type="date"
                            value={updatedTask.deadline}
                            onChange={(e) => setUpdatedTask({ ...updatedTask, deadline: e.target.value })}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white"
                        />
                    </div>

                    {/* Priority Dropdown */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <User className="w-4 h-4 text-red-500" />
                            Priority
                        </label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 appearance-none cursor-pointer"
                            value={updatedTask.priority}
                            onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
                        >
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>
                    </div>

                    {/* Assigned To (Multi-Select Dropdown) */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <User className="w-4 h-4 text-green-500" />
                            Assign To
                        </label>
                        <div
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 cursor-pointer flex items-center justify-between bg-white"
                        >
                            {updatedTask.assignedTo.length > 0 ? (
                                <span>{updatedTask.assignedTo.map(user => user.name).join(", ")}</span>
                            ) : (
                                <span className="text-gray-400">Select team members</span>
                            )}
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>

                        {/* Dropdown Menu */}
                        {dropdownOpen && availableUsers.length > 0 ? (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10">
                                <ul className="max-h-40 overflow-y-auto p-2">
                                    {availableUsers.map(user => (
                                        <li
                                            key={user.id}
                                            onClick={() => toggleUserSelection(user)}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={updatedTask.assignedTo.some(u => u.id === user.id)}
                                                className="w-4 h-4"
                                                readOnly
                                            />
                                            {user.firstName} {user.lastName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm p-2">No users available</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-4 text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
}
