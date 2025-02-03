export default function moveTask(tasks, setTasks, taskId, direction, statusConfig) {
    const statusKeys = Object.keys(statusConfig);

    setTasks(tasks.map(task => {
        if (task.id === taskId) {
            const currentIndex = statusKeys.indexOf(String(task.status)); // ✅ Ensure it's a string
            const newIndex = currentIndex + direction;

            if (newIndex >= 0 && newIndex < statusKeys.length) {
                return { ...task, status: String(statusKeys[newIndex]) }; // ✅ Always store as a string
            }
        }
        return task;
    }));
}

