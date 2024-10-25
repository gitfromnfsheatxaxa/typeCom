import React, {useState, useRef, useEffect} from "react";
import {ThemeProvider} from "styled-components";
import {defaultTheme, themesOptions} from "./style/theme.jsx";
import {GlobalStyles} from "./style/global.jsx";
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
            <>
                <DynamicBackground theme={theme}></DynamicBackground>
                <div className="canvas">
                    <GlobalStyles/>
                    <Nav isFocusedMode={isFocusedMode}/>

                    {isWordGameMode && (
                        <TypeBox
                            isUltraZenMode={isUltraZenMode}
                            textInputRef={textInputRef}
                            isFocusedMode={isFocusedMode}
                            theme={theme}
                            key="type-box"
                        />
                    )}
                    {isSentenceGameMode && (
                        <SentenceBox
                            sentenceInputRef={sentenceInputRef}
                            isFocusedMode={isFocusedMode}
                            key="sentence-box"
                        />
                    )}
                    {isTrainerMode && !isCoffeeMode && !isWordsCardMode && (
                        <DefaultKeyboard

                        ></DefaultKeyboard>
                    )}
                    {isCoffeeMode && !isTrainerMode && !isWordsCardMode && (
                        <FreeTypingBox

                        />
                    )}

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
                </div>
            </>
        </ThemeProvider>
    );
}

export default App;
