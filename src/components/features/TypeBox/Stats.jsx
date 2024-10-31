import React, {useEffect, useState} from "react";
import {Tooltip} from "@mui/material";
import {CHAR_TOOLTIP_TITLE} from "../../../constants/Constants.jsx";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as TooltipChart,
    ResponsiveContainer,
    Bar,
    ComposedChart,
} from "recharts";
import {red} from "@mui/material/colors";
import axios from 'axios';

const Stats = ({
                   status,
                   wpm,
                   countDown,
                   countDownConstant,
                   statsCharCount,
                   language,
                   renderResetButton,
                   rawKeyStrokes,
                   theme,
                   setIncorrectCharsCount,
                   incorrectCharsCount,
               }) => {
    const [roundedRawWpm, setRoundedRawWpm] = useState(0);
    const [highestWPM, setHighestWPM] = useState(0);
    const [error, setError] = useState(null);
    const roundedWpm = Math.round(wpm);

    const fetchHighestWPM = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Make sure this key matches what you used for saving
            const response = await axios.get('https://ulugbek5800.pythonanywhere.com/api/leaderboard', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token
                },
            });

            setHighestWPM(response.data.highest_wpm);
        } catch (err) {
            console.error('Error fetching highest WPM:', err);
            setError('Failed to fetch highest WPM.');
        }
    };

    useEffect(() => {
        const worker = new Worker(
            new URL("../../../worker/calculateRawWpmWorker", import.meta.url)
        );

        worker.postMessage({rawKeyStrokes, countDownConstant, countDown});

        worker.onmessage = function (e) {
            setRoundedRawWpm(e.data);
            worker.terminate();
        };

        return () => worker.terminate();
    }, [rawKeyStrokes, countDownConstant, countDown]);

    const initialTypingTestHistory = [
        {
            wpm: 0,
            rawWpm: 0,
            time: 0,
            error: 0,
        },
    ];

    const [typingTestHistory, setTypingTestHistory] = useState(initialTypingTestHistory);
    const accuracy = Math.round(statsCharCount[0]);

    const data = typingTestHistory.map((history) => ({
        wpm: history.wpm,
        rawWpm: history.rawWpm,
        time: history.time,
        error: history.error,
    }));

    useEffect(() => {
        if (status === "started") {
            setTypingTestHistory(initialTypingTestHistory);
        }
    }, [status]);

    useEffect(() => {
        if (status === "started" && countDown < countDownConstant) {
            const worker = new Worker(
                new URL("../../../worker/trackHistoryWorker", import.meta.url)
            );

            worker.postMessage({
                countDown,
                countDownConstant,
                typingTestHistory,
                roundedWpm,
                roundedRawWpm,
                incorrectCharsCount,
            });

            worker.onmessage = function (e) {
                const {newEntry, resetErrors} = e.data;
                setTypingTestHistory((prevTypingTestHistory) => [
                    ...prevTypingTestHistory,
                    newEntry,
                ]);

                if (resetErrors) {
                    setIncorrectCharsCount(0);
                }
            };

            return () => worker.terminate();
        }
    }, [countDown]);

    const getFormattedLanguageLanguageName = (value) => {
        switch (value) {
            case "ENGLISH_MODE":
                return "english";
            default:
                return "english";
        }
    };


    const renderCharStats = () => (
        <Tooltip
            title={<span style={{whiteSpace: "pre-line"}}>{CHAR_TOOLTIP_TITLE}</span>}
        >
            <div>
                <p className="stats-title">Characters</p>
                <h2 className="stats-value">
                    <span className="correct-char-stats">{statsCharCount[1]}</span>/
                    <span className="incorrect-char-stats">{statsCharCount[2]}</span>/
                    <span className="missing-char-stats">{statsCharCount[3]}</span>/
                    <span className="correct-char-stats">{statsCharCount[4]}</span>/
                    <span className="incorrect-char-stats">{statsCharCount[5]}</span>
                </h2>
            </div>
        </Tooltip>
    );

    const renderIndicator = (color) => (
        <span style={{backgroundColor: color, height: "12px", width: "24px"}}></span>
    );

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            const payloadData = payload[0].payload;
            return (
                <div className="custom-tooltip" style={{paddingInline: "8px", paddingBlock: "2px"}}>
                    <p className="label" style={{fontSize: "12px", fontWeight: "bold"}}>
                        {`Time: ${label} s`}
                    </p>
                    <p className="desc tooltip">
                        {renderIndicator(red[400])}
                        {`Errors: ${payloadData.error}`}
                    </p>
                    <p className="desc tooltip">
                        {renderIndicator(theme.textTypeBox)}
                        {`Raw WPM: ${payloadData.rawWpm}`}
                    </p>
                    <p className="desc tooltip">
                        {renderIndicator(theme.text)}
                        {`WPM: ${payloadData.wpm}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderAccuracy = () => (
        <div style={{marginTop: "16px"}}>
            <h2 className="primary-stats-title">ACC</h2>
            <h1 className="primary-stats-value">{accuracy}%</h1>
        </div>
    );

    const renderRawKpm = () => (
        <div>
            <p className="stats-title">KPM</p>
            <h2 className="stats-value">
                {Math.round((rawKeyStrokes / Math.max(countDownConstant, 1)) * 60.0)}
            </h2>
        </div>
    );

    const renderLanguage = () => (
        <div>
            <p className="stats-title">Test Mode</p>
            <h2 className="stats-value">
                {getFormattedLanguageLanguageName(language)}
            </h2>
        </div>
    );

    const renderTime = () => (
        <div>
            <p className="stats-title">Time</p>
            <h2 className="stats-value">{countDownConstant} s</h2>
        </div>
    );

    const renderWpm = () => {
        const totalWpm = data.map((e) => e.wpm).reduce((a, b) => a + b, 0);
        const averageWpm = data.length > 1 ? totalWpm / (data.length - 1) : 0;
        return (
            <div>
                <h2 className="primary-stats-title">WPM</h2>
                <h1 className="primary-stats-value">{Math.round(averageWpm)}</h1>
            </div>
        );
    };

    const Chart = () => (
        <ResponsiveContainer width="100%" minHeight={200} maxHeight={200} height="100%">
            <ComposedChart
                width="100%"
                height="100%"
                data={data.filter((d) => d.time !== 0)}
                margin={{
                    top: 12,
                    right: 12,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} horizontal={false} stroke={theme.text} opacity={0.15}/>
                <XAxis dataKey="time" stroke={theme.text} tickMargin={10} opacity={0.25}/>
                <YAxis stroke={theme.text} tickMargin={10} opacity={0.25}/>
                <TooltipChart cursor content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="rawWpm" stroke={theme.textTypeBox} dot={false} activeDot={false}/>
                <Line type="monotone" dataKey="wpm" stroke={theme.text} dot={false} activeDot={false}/>
                <Bar dataKey="error" barSize={12} fill={`${red[400]}`}/>
            </ComposedChart>
        </ResponsiveContainer>
    );

    const submitHighestWPM = async (wpm) => {
        const token = localStorage.getItem('access_token');
        const url = 'https://ulugbek5800.pythonanywhere.com/api/submit-score';

        const storedDifficulty = localStorage.getItem('difficulty');
        console.log(storedDifficulty)
        const mode = (storedDifficulty == "hard" || storedDifficulty == "normal") ? storedDifficulty : 'normal';
        // const mode = "normal"
        const data = {
            wpm,
            mode,
        };

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
        };

        try {
            const response = await axios.post(url, data, {headers});
            console.log('Score submitted successfully:', response.data);
        } catch (err) {
            console.error('Error submitting score:', err);
        }
    };
    useEffect(() => {
        if (status === "finished") {
            submitHighestWPM(roundedWpm); // Call the function with the rounded WPM
        }
    }, [status, roundedWpm]); // Depend on status and roundedWpm
    useEffect(() => {
        if (status === "finished") {
            const storedDifficulty = localStorage.getItem('difficulty');
            const mode = (storedDifficulty == "hard" || storedDifficulty == "normal") ? storedDifficulty : 'normal';
            submitHighestWPM(roundedWpm, mode);
        }
    }, [status, roundedWpm]);


    return (
        <div>
            {status !== "finished" && (
                <>
                    <h3>{countDown} s</h3>
                    {/*<h3>WPM: {roundedWpm}</h3>*/}
                </>
            )}
            {status === "finished" && (
                <div className="stats-overlay">
                    <section className="stats-chart">
                        <section className="stats-header">
                            <div>
                                {renderWpm()}
                                {renderAccuracy()}
                            </div>
                            {Chart()}
                        </section>
                        <section className="stats-footer">
                            {renderLanguage()}
                            {renderRawKpm()}
                            Press TAB to reset
                            {renderCharStats()}
                            {renderTime()}
                        </section>
                        {/*<section>{renderResetButton()}</section>*/}

                    </section>
                </div>
            )}
        </div>
    );
};

export default Stats;