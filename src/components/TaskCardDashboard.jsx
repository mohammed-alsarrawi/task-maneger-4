import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { ArrowLeftCircle, ArrowRightCircle, Eye, User } from "lucide-react";  // ✅ Removed "Edit"

export default function TaskCard({ task, onMoveTask }) {  // ✅ Removed "setEditTask"
    const statusColors = {
        todo: "bg-blue-200 border-blue-500",
        "in-progress": "bg-yellow-100 border-yellow-500",
        done: "bg-green-300 text-green-100",
    };

    return (
        <Card
            className={`relative hover:shadow-xl transition-all duration-300 
                  hover:-translate-y-1 rounded-xl p-6 shadow-lg rotate-1 hover:rotate-0 
                  ${statusColors[task.status] || "bg-gray-200 border-gray-300"}`}
            style={{ maxWidth: "280px", minHeight: "250px" }}
        >
            <CardContent className="space-y-5">
                {/* 📌 Pin Decoration */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 w-4 h-4 rounded-full shadow-md"></div>

                {/* 📝 Task Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
                    <span
                        className={`text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide 
                            ${task.priority === "High" ? "bg-red-300 text-red-900" :
                            task.priority === "Medium" ? "bg-yellow-300 text-yellow-900" :
                            "bg-green-300 text-green-900"}`}
                    >
                        {task.priority}
                    </span>
                </div>

                {/* 📆 Task Meta Info */}
                <div className="flex justify-between items-center text-gray-900 text-xs">
                    {/* Assigned Members */}
                    <div className="flex items-center gap-2">
                        <strong className="text-gray-900">Assigned to:</strong>
                        <div className="flex flex-wrap gap-1">
                            {task.assignedTo.length > 0 ? (
                                task.assignedTo.map((user) => (
                                    <span key={user.id} className="bg-white text-blue-900 text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                        <User size={12} /> {user.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-600">Not assigned</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🔄 Move Task Buttons */}
                <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-4">
                        <button
                            onClick={() => onMoveTask(task.id, -1)}
                            disabled={task.status === "todo"}
                            className={`flex items-center justify-center p-2 rounded-full border-2 transition-all 
                                ${task.status === "todo" ? "border-gray-400 text-gray-400 cursor-not-allowed opacity-50"
                                    : "border-blue-400 text-blue-400 hover:bg-blue-300 hover:text-white hover:scale-110"}`}
                        >
                            <ArrowLeftCircle size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => onMoveTask(task.id, 1)}
                        disabled={task.status === "done"}
                        className={`flex items-center justify-center p-2 rounded-full border-2 transition-all 
                            ${task.status === "done" ? "border-gray-400 text-gray-400 cursor-not-allowed opacity-50"
                                : "border-purple-500 text-purple-500 hover:bg-purple-400 hover:text-white hover:scale-110"}`}
                    >
                        <ArrowRightCircle size={20} />
                    </button>
                </div>

                {/* 🔎 View Details Button */}
                <div className="mt-4">
                    <Link to={`/tasks/${task.id}`} className="block">
                        <Button
                            className="cursor-pointer w-full text-sm px-5 py-3 rounded-xl font-semibold 
                                bg-gradient-to-r from-blue-500 to-purple-600 
                                text-white flex items-center justify-center gap-2 
                                shadow-md transition-all duration-300 
                                hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
                        >
                            <Eye size={18} className="animate-pulse" />
                            View Details
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
