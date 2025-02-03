import { ref, get } from "firebase/database";
import { db } from "../firebase"; // ✅ Import Firebase Realtime Database

/**
 * Fetch users from Firebase filtered by department.
 * @param {string} department - The department name to filter users.
 * @returns {Promise<Array>} - A list of users from the same department.
 */
export const getUsersByDepartment = async (department) => {
    try {
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);

        if (!snapshot.exists()) return [];

        const usersData = snapshot.val();
        const users = Object.entries(usersData).map(([id, userData]) => ({
            id,
            fullName: userData.fullName || `${userData.firstName || ""} ${userData.lastName || ""}`.trim(), // ✅ Ensure fullName exists
            ...userData,
        }));

        const filteredUsers = users.filter(user => user.departments === department);

        console.log(`✅ Found ${filteredUsers.length} users in department: ${department}, filteredUsers`);
        return filteredUsers;
    } catch (error) {
        console.error("❌ Error fetching department users:", error);
        return [];
    }
};