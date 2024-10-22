import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, themesOptions } from "./style/theme.jsx";
import { GlobalStyles } from "./style/global.jsx";
import TypeBox from "./components/features/TypeBox/TypeBox.jsx";
import SentenceBox from "./components/features/SentenceBox/SentenceBox.jsx";

import {
  GAME_MODE,
  GAME_MODE_DEFAULT,
  GAME_MODE_SENTENCE,
} from "./constants/Constants.jsx";
import useLocalPersistState from "./hooks/useLocalPersistState.jsx";

import DynamicBackground from "./components/common/DynamicBackground.jsx";

function App() {
  // Theme persistence logic
  const [theme, setTheme] = useState(() => {
    const stickyTheme = window.localStorage.getItem("theme");
    if (stickyTheme !== null) {
      const localTheme = JSON.parse(stickyTheme);
      const upstreamTheme = themesOptions.find(
          (e) => e.label === localTheme.label
      ).value;
      const isDeepEqual = localTheme === upstreamTheme;
      return isDeepEqual ? localTheme : upstreamTheme;
    }
    return defaultTheme;
  });

  // Game mode persistence
  const [gameMode, setGameMode] = useLocalPersistState(
      GAME_MODE_DEFAULT,
      GAME_MODE
  );

  const handleGameModeChange = (currGameMode) => {
    setGameMode(currGameMode);
  };

  // Focused mode persistence
  const [isFocusedMode, setIsFocusedMode] = useState(
      localStorage.getItem("focused-mode") === "true"
  );

  // Additional mode settings
  const [isMusicMode, setIsMusicMode] = useState(false);
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




  // Local storage effect hooks
  useEffect(() => {
    localStorage.setItem("focused-mode", isFocusedMode);
  }, [isFocusedMode]);

  useEffect(() => {
    localStorage.setItem("ultra-zen-mode", isUltraZenMode);
  }, [isUltraZenMode]);

  // Focus input elements based on the mode
  const textInputRef = useRef(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
  };

  const textAreaRef = useRef(null);
  const focusTextArea = () => {
    textAreaRef.current && textAreaRef.current.focus();
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
    if (isCoffeeMode) {
      focusTextArea();
      return;
    }
  }, [
    theme,
    isFocusedMode,
    isMusicMode,
    isCoffeeMode,
    isWordGameMode,
    isSentenceGameMode,
  ]);

  return (
      <ThemeProvider theme={theme}>
        <>
          <DynamicBackground theme={theme}></DynamicBackground>
          <div className="canvas">

            <GlobalStyles />

            {isWordGameMode && (
                <TypeBox
                    isUltraZenMode={isUltraZenMode}
                    textInputRef={textInputRef}
                    isFocusedMode={isFocusedMode}
                    theme={theme}
                    key="type-box"
                    handleInputFocus={() => focusTextInput()}
                ></TypeBox>
            )}
            {isSentenceGameMode && (
                <SentenceBox
                    sentenceInputRef={sentenceInputRef}
                    isFocusedMode={isFocusedMode}
                    key="sentence-box"
                    handleInputFocus={() => focusSentenceInput()}
                ></SentenceBox>
            )}


          </div>
        </>
      </ThemeProvider>
  );
}

export default App;
