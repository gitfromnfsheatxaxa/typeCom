// LeaderboardPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [mode, setMode] = useState("normal"); // Set default mode to 'normal'
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLeaderboard();
    }, [mode]);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`https://ulugbek5800.pythonanywhere.com/api/leaderboard?mode=${mode}`);
            setLeaderboard(response.data.leaderboard);
        } catch (err) {
            setError("Failed to load leaderboard.");
            console.error(err);
        }
    };
    console.log(leaderboard)
    return (
        <div>
            <h2>Leaderboard - {mode === "normal" ? "Normal Mode" : "Hard Mode"}</h2>

            <div>
                <button onClick={() => setMode("normal")}>Normal Mode</button>
                <button onClick={() => setMode("hard")}>Hard Mode</button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Highest WPM</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.highest_wpm}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardPage;
