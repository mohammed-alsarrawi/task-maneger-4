import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Send, MessageCircle } from "lucide-react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export function TaskComments({ taskId, comments, newComment, setNewComment, setComments }) {
  const [error, setError] = useState("");
  const { user } = useAuth(); // Use "user" from your AuthContext

  // Compute the user's display name similar to your Navbar
  const userName = user 
    ? (user.displayName || `${user.firstName || ""} ${user.lastName || ""}`.trim()) 
    : "Anonymous";

    const handleAddComment = async () => {
      if (!newComment.trim()) {
          setError("Comment cannot be empty.");
          return;
      }
  
      if (!taskId) {
          setError("Task ID is missing.");
          return;
      }
  
      console.log("✅ Adding comment to Task ID:", taskId);
  
      const commentData = {
          name: userName || "Anonymous",
          text: newComment,
          date: new Date().toLocaleString(),
      };
  
      try {
          const commentsRef = ref(db, `tasks/${taskId}/comments`);
          await push(commentsRef, commentData);
  
          // ✅ Remove `setComments([...comments, commentData]);` 
          // Because the real-time listener in `TaskDetails.jsx` will update comments automatically
  
          setNewComment(""); // Reset input field
          setError("");
  
          console.log(`✅ Comment added to task ${taskId}`);
      } catch (error) {
          console.error("❌ Error adding comment to Firebase:", error);
          setError("Failed to add comment.");
      }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <MessageCircle size={20} /> Comments
      </h3>

      {/* Input to Add Comment */}
      <div className="flex flex-col gap-2 mt-3">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="border rounded-lg p-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-1 w-fit"
        >
          <Send size={16} /> Post
        </Button>
      </div>

      {/* Display Comments */}
      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg my-2 shadow-sm">
              <p className="font-semibold text-gray-800">{comment.name}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
