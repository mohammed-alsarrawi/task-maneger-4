import TaskCard from "./TaskCardDashboard";

export default function TaskColumn({ statusKey, label, color, tasks, onMoveTask, onDeleteTask }) {
    const filteredTasks = tasks.filter(task => task.status && String(task.status).toLowerCase() === statusKey);

    return (
        <div className={`mb-10 bg-gradient-to-b ${color} rounded-xl p-5 shadow-lg relative overflow-hidden transition-all hover:shadow-xl flex flex-col h-auto min-h-[200px]`}>
            <h2 className="font-bold text-gray-700 text-lg">{label}</h2>
            <div className="flex-1 flex flex-col gap-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onMoveTask={onMoveTask} 
                            onDeleteTask={onDeleteTask} 
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-sm mt-2">No tasks</p>
                )}
            </div>
        </div>
    );
}

