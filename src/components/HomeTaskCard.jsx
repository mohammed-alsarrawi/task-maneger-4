import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import { Clock, User, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const { user } = useAuth();
  const [cardList, setCardList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const dbRef = ref(db, "tasks");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data)
            .map((key) => ({
              id: key,
              assignedTo: data[key].assignedTo || [],
              priority: data[key].priority,
              title: data[key].title,
              description: data[key].description,
              createdBy: data[key].createdBy,
              deadline: data[key].deadline,
            }))
            .filter((task) =>
              Array.isArray(task.assignedTo)
                ? task.assignedTo.some((assignee) => assignee.id === user.uid)
                : false
            );

          setCardList(formattedData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const showMore = () => setVisibleCount((prevCount) => prevCount + 3);
  const showLess = () => setVisibleCount((prevCount) => Math.max(prevCount - 3, 3));

  if (!user) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10 mb-10">
        Please log in to view your tasks.
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Your Tasks 📋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {cardList.slice(0, visibleCount).map((task) => (
          <div
            key={task.id}
            className="relative bg-white/30 border border-gray-200 shadow-2xl rounded-3xl p-6 hover:shadow-3xl transition-all duration-300 backdrop-blur-xl hover:scale-105"
          >
            {/* - - - - - - - Header  - - - - - - - */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <span
                className={`px-3 py-1 text-xs font-semibold uppercase rounded-full text-white ${
                  task.priority === "High"
                    ? "bg-red-500"
                    : task.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {task.priority}
              </span>
            </div>

            {/* - - - - - - - Task Meta Info - - - - - - - */}
            <p className="text-sm text-gray-700 mb-2 flex items-center gap-1">
              <User size={16} className="text-blue-500" />
              <span className="font-medium">Created By:</span>
              <span className="text-gray-800">{task.createdBy}</span>
            </p>

            <p className="text-sm text-gray-700 mb-2 flex items-center gap-1">
              <Clock size={16} className="text-purple-500" />
              <span className="font-medium">Deadline:</span>
              <span className="text-gray-800">
                {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}
              </span>
            </p>

            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {task.description.length > 120
                ? `${task.description.substring(0, 120)}...`
                : task.description}
            </p>

            {/* - - - - - - - Bottom Actions - - - - - - - */}
            <div className="flex justify-between items-center">
              <button
                className="text-white font-semibold px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => navigate("/dashboard")}
              >
                View Details
              </button>

              <Star size={22} className="text-yellow-500 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* - - - - - - - Show more / less buttons - - - - - - - */}
      <div className="flex justify-center mt-8 gap-4">
        {visibleCount < cardList.length && (
          <button
            onClick={showMore}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
          >
            Show more
          </button>
        )}

        {visibleCount > 3 && (
          <button
            onClick={showLess}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-all hover:scale-105"
          >
            Show less
          </button>
        )}
      </div>
    </>
  );
};

export default Cards;
