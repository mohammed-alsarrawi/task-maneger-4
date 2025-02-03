import { Button } from "../components/ui/Button";

export function DeleteConfirmationModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
                <h2 className="text-lg font-semibold text-gray-900">Are you sure?</h2>
                <p className="text-gray-600 mt-2">This action cannot be undone.</p>
                <div className="flex gap-4 mt-6 justify-center">
                    <Button onClick={onConfirm} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">Delete</Button>
                    <Button onClick={onCancel} className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600">Cancel</Button>
                </div>
            </div>
        </div>
    );
}
