import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCrown } from 'react-icons/fa'; // Import the crown icon

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [mode, setMode] = useState("normal");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLeaderboard();
    }, [mode]);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`https://ulugbek5800.pythonanywhere.com/api/leaderboard?mode=${mode}`);
            // Sort leaderboard by highest WPM in descending order
            const sortedLeaderboard = response.data.leaderboard.sort((a, b) => b.highest_wpm - a.highest_wpm);
            setLeaderboard(sortedLeaderboard);
        } catch (err) {
            setError("Failed to load leaderboard.");
            console.error(err);
        }
    };

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard - {mode === "normal" ? "Normal Mode" : "Hard Mode"}</h2>

            <div className="mode-buttons">
                <button onClick={() => setMode("normal")} className={mode === "normal" ? "active" : ""}>Normal Mode</button>
                <button onClick={() => setMode("hard")} className={mode === "hard" ? "active" : ""}>Hard Mode</button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="table-container">
                <div className="table-header">Username</div>
                <div className="table-header">Highest WPM</div>
                {leaderboard.map((user, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell table-user">
                            {index === 0 && <FaCrown style={{ color: 'gold', marginRight: '5px' }} />}
                            {index + 1} {user.username}
                        </div>
                        <div className="table-cell">{user.highest_wpm}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;
