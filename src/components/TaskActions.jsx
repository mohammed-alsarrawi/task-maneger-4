import { Button } from "../components/ui/Button";
import { Edit, Save, XCircle, Trash2 } from "lucide-react";

export function TaskActions({ isEditing, onEditToggle, onSave, onDelete }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
            <div className="flex gap-2">
                {!isEditing ? (
                    <>
                        <Button onClick={onEditToggle} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center gap-1">
                            <Edit size={16} />
                        </Button>
                        <Button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center gap-1">
                            <Trash2 size={16} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={onSave} className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 flex items-center gap-1">
                            <Save size={16} />
                        </Button>
                        <Button onClick={onEditToggle} className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 flex items-center gap-1">
                            <XCircle size={16} />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}