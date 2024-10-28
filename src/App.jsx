import React, {useState, useRef, useEffect} from "react";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./style/global.jsx";
import {Routes, Route} from "react-router-dom";
import {defaultTheme, themesOptions} from "./style/theme.jsx";
import TypeBox from "./components/features/TypeBox/TypeBox.jsx";
import SentenceBox from "./components/features/SentenceBox/SentenceBox.jsx";
import {
    GAME_MODE,
    GAME_MODE_DEFAULT,
    GAME_MODE_SENTENCE,
} from "./constants/Constants.jsx";
import useLocalPersistState from "./hooks/useLocalPersistState.jsx";
import DynamicBackground from "./components/common/DynamicBackground.jsx";
import FooterMenu from "./components/common/FooterMenu.jsx";
import Nav from "./components/common/Nav.jsx";
import DefaultKeyboard from "./components/features/Keyboard/DefaultKeyboard.jsx";
import FreeTypingBox from "./components/features/FreeTypingBox.jsx";
import RegisterCom from "./components/common/RegisterCom.jsx";

import Profile from "./components/common/profile.jsx";
import Register from "./components/features/Register/Register.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

function App() {
    const [theme, setTheme] = useState(() => {
        const stickyTheme = window.localStorage.getItem("theme");
        if (stickyTheme !== null) {
            const localTheme = JSON.parse(stickyTheme);
            // const upstreamTheme = themesOptions.find(
            //     (e) => e.label === localTheme.label
            //).value;
            // const isDeepEqual = localTheme === upstreamTheme;
            // return isDeepEqual ? localTheme : upstreamTheme;
        }
        return defaultTheme;
    });

    const [gameMode, setGameMode] = useLocalPersistState(
        GAME_MODE_DEFAULT,
        GAME_MODE
    );

    const handleGameModeChange = (currGameMode) => {
        setGameMode(currGameMode);
    };

    const [isFocusedMode, setIsFocusedMode] = useState(
        localStorage.getItem("focused-mode") === "true"
    );

    const [isUltraZenMode, setIsUltraZenMode] = useState(
        localStorage.getItem("ultra-zen-mode") === "true"
    );
    const [isCoffeeMode, setIsCoffeeMode] = useState(false);
    const [isTrainerMode, setIsTrainerMode] = useState(false);
    const [isWordsCardMode, setIsWordsCardMode] = useLocalPersistState(
        false,
        "IsInWordsCardMode"
    );

    const isWordGameMode =
        gameMode === GAME_MODE_DEFAULT &&
        !isCoffeeMode &&
        !isTrainerMode &&
        !isWordsCardMode;
    const isSentenceGameMode =
        gameMode === GAME_MODE_SENTENCE &&
        !isCoffeeMode &&
        !isTrainerMode &&
        !isWordsCardMode;

    const toggleUltraZenMode = () => {
        setIsUltraZenMode(!isUltraZenMode);
    };

    const toggleCoffeeMode = () => {
        setIsCoffeeMode(!isCoffeeMode);
        setIsTrainerMode(false);
        setIsWordsCardMode(false);
    };

    const toggleTrainerMode = () => {
        setIsTrainerMode(!isTrainerMode);
        setIsCoffeeMode(false);
        setIsWordsCardMode(false);
    };
    const toggleFocusedMode = () => {
        setIsFocusedMode(!isFocusedMode);
    };
    const toggleWordsCardMode = () => {
        setIsTrainerMode(false);
        setIsCoffeeMode(false);
        setIsWordsCardMode(!isWordsCardMode);
    };
    useEffect(() => {
        localStorage.setItem("focused-mode", isFocusedMode);
    }, [isFocusedMode]);

    useEffect(() => {
        localStorage.setItem("ultra-zen-mode", isUltraZenMode);
    }, [isUltraZenMode]);

    const textInputRef = useRef(null);
    const focusTextInput = () => {
        textInputRef.current && textInputRef.current.focus();
    };
    const handleThemeChange = (e) => {
        window.localStorage.setItem("theme", JSON.stringify(e.value));
        setTheme(e.value);
    };
    const sentenceInputRef = useRef(null);
    const focusSentenceInput = () => {
        sentenceInputRef.current && sentenceInputRef.current.focus();
    };

    useEffect(() => {
        if (isWordGameMode) {
            focusTextInput();
            return;
        }
        if (isSentenceGameMode) {
            focusSentenceInput();
            return;
        }
    }, [theme, isFocusedMode, isCoffeeMode, isWordGameMode, isSentenceGameMode]);

    return (
        <ThemeProvider theme={theme}>
            <DynamicBackground theme={theme}/>
            <div className="canvas">
                <GlobalStyles/>
                <Nav isFocusedMode={isFocusedMode}/>
                <Routes>
                    <Route path="/" element={
                        <>
                            {isWordGameMode && (
                                <TypeBox
                                    isUltraZenMode={isUltraZenMode}
                                    textInputRef={textInputRef}
                                    isFocusedMode={isFocusedMode}
                                    theme={theme}
                                />
                            )}
                            {isSentenceGameMode && (
                                <SentenceBox
                                    sentenceInputRef={sentenceInputRef}
                                    isFocusedMode={isFocusedMode}
                                />
                            )}
                            {isTrainerMode && !isCoffeeMode && !isWordsCardMode && <DefaultKeyboard/>}
                            {isCoffeeMode && !isTrainerMode && !isWordsCardMode && <FreeTypingBox/>}
                            <div className="bottomBar">
                                <FooterMenu

                                    isWordGameMode={isWordGameMode}
                                    themesOptions={themesOptions}
                                    theme={theme}
                                    toggleUltraZenMode={toggleUltraZenMode}
                                    handleThemeChange={handleThemeChange}
                                    toggleFocusedMode={toggleFocusedMode}
                                    toggleCoffeeMode={toggleCoffeeMode}
                                    isCoffeeMode={isCoffeeMode}
                                    isUltraZenMode={isUltraZenMode}
                                    isFocusedMode={isFocusedMode}
                                    gameMode={gameMode}
                                    handleGameModeChange={handleGameModeChange}
                                    isTrainerMode={isTrainerMode}
                                    toggleTrainerMode={toggleTrainerMode}
                                    isWordsCardMode={isWordsCardMode}
                                    toggleWordsCardMode={toggleWordsCardMode}
                                ></FooterMenu>
                            </div>
                        </>
                    }/>
                    <Route path="/register" element={<RegisterCom/>}/>
                    <Route path="/login" element={<Register/>}/>

                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/> </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
