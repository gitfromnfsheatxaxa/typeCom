import React, { useState, useMemo, useEffect } from "react";
import { sentencesGenerator } from "../../../scripts/sentencesGenerator.jsx";
import { Stack, Grid, Box, Tooltip, Dialog, DialogTitle } from "@mui/material";
import IconButton from "../../utils/IconButton.jsx";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UndoIcon from "@mui/icons-material/Undo";
import {
    DEFAULT_SENTENCES_COUNT,
    TEN_SENTENCES_COUNT,
    FIFTEEN_SENTENCES_COUNT,
    RESTART_BUTTON_TOOLTIP_TITLE,
    REDO_BUTTON_TOOLTIP_TITLE,
    ENGLISH_MODE,
    ENGLISH_SENTENCE_MODE_TOOLTIP_TITLE,
} from "../../../constants/Constants.jsx";
import useLocalPersistState from "../../../hooks/useLocalPersistState.jsx";
import SentenceBoxStats from "./SentenceBoxStats.jsx";

const SentenceBox = ({
                         sentenceInputRef,
                         handleInputFocus,
                         isFocusedMode,
                     }) => {
    const [sentenceCount, setSentenceCount] = useLocalPersistState(
        DEFAULT_SENTENCES_COUNT,
        "sentences-constant"
    );
    const [lang, setLang] = useLocalPersistState(ENGLISH_MODE, "sentences-lang");

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState("waiting");
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else if (!isRunning) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const [sentencesDict, setSentencesDict] = useState(() => {
        return sentencesGenerator(sentenceCount, lang);
    });

    const sentences = useMemo(() => {
        return sentencesDict.map((e) => e.val);
    }, [sentencesDict]);

    const [currentIdx, setCurrentIdx] = useState(0);
    const currentSentence = sentences[currentIdx];
    const [inputVal, setInputVal] = useState("");
    const [rawKeys, setRawKeys] = useState(0);
    const wpm = time < 1 ? 0 : ((rawKeys / time) * 60) / 5;

    const reset = (newCount, newLang, isRedo) => {
        setStatus("waiting");
        setSentenceCount(newCount);
        setLang(newLang);
        if (!isRedo) {
            setSentencesDict(sentencesGenerator(newCount, newLang));
        }
        setIsRunning(false);
        setTime(0);
        setCurrentIdx(0);
        setInputVal("");
        sentenceInputRef.current.focus();
        sentenceInputRef.current.value = "";
        setRawKeys(0);
        setStats({
            correct: 0,
            incorrect: 0,
            extra: 0,
        });
    };

    const start = () => {
        if (status === "finished") {
            reset(sentenceCount, lang, false);
        }
        if (status !== "started") {
            setStatus("started");
            setIsRunning(true);
        }
    };

    const [stats, setStats] = useState({
        correct: 0,
        incorrect: 0,
        extra: 0,
    });

    const handleKeyDown = (e) => {
        const keyCode = e.keyCode;
        if (keyCode === 9) {
            e.preventDefault();
            setIsOpen(true);
            return;
        }
        if (status === "finished") {
            e.preventDefault();
            return;
        }
        if (status !== "started" && status !== "finished") {
            start();
            return;
        }
        setRawKeys(rawKeys + 1);

        if (keyCode === 13) {
            if (inputVal.length >= sentences[currentIdx].length) {
                if (currentIdx + 1 === sentenceCount) {
                    setStatus("finished");
                    setIsRunning(false);
                    return;
                }
                setCurrentIdx(currentIdx + 1);
                setInputVal("");
                sentenceInputRef.current.value = "";
            }
        }
    };

    const getCharClassName = (idx, char) => {
        if (idx < inputVal.length) {
            if (inputVal[idx] === char) {
                return "correct-sentence-char";
            }
            if (char === " ") {
                return "error-sentence-space-char";
            }
            return "error-sentence-char";
        }
        return "sentence-char";
    };

    const handleChange = (e) => {
        const {
            currentTarget: { value },
        } = e;
        if (e.currentTarget instanceof HTMLInputElement) {
            setInputVal(value);
        }
    };

    return (
        <div onClick={handleInputFocus}>
            <div className="type-box-sentence">
                <Stack spacing={2}>
                    <div className="sentence-display-field">
                        {currentSentence.split("").map((char, idx) => (
                            <span key={"word" + idx} className={getCharClassName(idx, char)}>
                {char}
              </span>
                        ))}
                    </div>
                    <input
                        key="hidden-sentence-input"
                        ref={sentenceInputRef}
                        type="text"
                        spellCheck="false"
                        className="sentence-input-field"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={handleChange}
                    />
                    {status !== "finished" && (
                        <span className="next-sentence-display">
              {"->"} {sentences[currentIdx + 1] ?? "Press ↵ to finish."}
            </span>
                    )}
                </Stack>
            </div>
            <div className="stats">
                <SentenceBoxStats
                    countDown={time}
                    wpm={wpm}
                    status={status}
                    stats={stats}
                    rawKeyStrokes={rawKeys}
                ></SentenceBoxStats>

                <div className="restart-button" key="restart-button">
                    <Grid container justifyContent="center" alignItems="center">
                        <Box display="flex" flexDirection="row">
                            <IconButton
                                aria-label="redo"
                                color="secondary"
                                size="medium"
                                onClick={() => {
                                    reset(sentenceCount, lang, true);
                                }}
                            >
                                <Tooltip title={REDO_BUTTON_TOOLTIP_TITLE}>
                                    <UndoIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                aria-label="restart"
                                color="secondary"
                                size="medium"
                                onClick={() => {
                                    reset(sentenceCount, lang, false);
                                }}
                            >
                                <Tooltip title={RESTART_BUTTON_TOOLTIP_TITLE}>
                                    <RestartAltIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    reset(DEFAULT_SENTENCES_COUNT, lang, false);
                                }}
                            >
                                <span className="button-count">{DEFAULT_SENTENCES_COUNT}</span>
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    reset(TEN_SENTENCES_COUNT, lang, false);
                                }}
                            >
                                <span className="button-count">{TEN_SENTENCES_COUNT}</span>
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    reset(FIFTEEN_SENTENCES_COUNT, lang, false);
                                }}
                            >
                                <span className="button-count">{FIFTEEN_SENTENCES_COUNT}</span>
                            </IconButton>
                            <IconButton>
                                {" "}
                                <span className="menu-separator"> | </span>{" "}
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    reset(sentenceCount, ENGLISH_MODE, false);
                                }}
                            >
                                <Tooltip title={ENGLISH_SENTENCE_MODE_TOOLTIP_TITLE}>
                                    <span className="button-lang">eng</span>
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Grid>
                </div>
            </div>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
                open={isOpen}
            >
                <DialogTitle>
                    <div>
                        <span className="key-note"> press </span>
                        <span className="key-type">Space</span>{" "}
                        <span className="key-note">to redo</span>
                    </div>
                    <div>
                        <span className="key-note"> press </span>
                        <span className="key-type">Tab</span>{" "}
                        <span className="key-note">/</span>{" "}
                        <span className="key-type">Enter</span>{" "}
                        <span className="key-note">to restart</span>
                    </div>
                    <span className="key-note"> press </span>
                    <span className="key-type">any key </span>{" "}
                    <span className="key-note">to exit</span>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default SentenceBox;
