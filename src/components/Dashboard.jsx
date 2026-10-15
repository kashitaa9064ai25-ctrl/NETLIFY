import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");

    return (
        <div>
            <h2>My application Dashboard</h2>
            {currentUser ? photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" />
            ) : (
                <p>No profile picture available</p>
            ) : (
                <p>Loading user information...</p>
            )}
            <div>
                {currentUser?.email?.[0].toUpperCase()}
            </div>
            <h2>{currentUser?.displayName || "Authenticated User"}</h2>
            <p>{currentUser?.email || "No email available"}</p>
            <div>
                <p>
                    <span>UID:{currentUser?.uid}</span>
                </p>
                <p>
                    <span>Provider: {currentUser?.providerData?.[0]?.providerData}</span>
                </p>
                <button onClick={logout}>LogOut</button>
            </div>

        </div>
    )
}