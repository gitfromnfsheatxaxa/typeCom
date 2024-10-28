import React from "react";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import {Grid, AppBar} from "@mui/material";
import {Box} from "@mui/system";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import Select from "../utils/Select.jsx";
import {
    FOCUS_MODE,
    FREE_MODE,
    WORD_MODE_LABEL,
    SENTENCE_MODE_LABEL,
    GAME_MODE_DEFAULT,
    GAME_MODE_SENTENCE,
    TRAINER_MODE,
    WORDS_CARD_MODE,
    ULTRA_ZEN_MODE,
} from "../../constants/Constants.jsx";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import SchoolIcon from "@mui/icons-material/School";

const FooterMenu = ({
                        themesOptions,
                        theme,
                        handleThemeChange,
                        toggleFocusedMode,
                        toggleUltraZenMode,
                        isUltraZenMode,
                        toggleCoffeeMode,
                        isFocusedMode,
                        isCoffeeMode,
                        gameMode,
                        handleGameModeChange,
                        isTrainerMode,
                        toggleTrainerMode,
                        isWordsCardMode,
                        isWordGameMode,
                        toggleWordsCardMode,
                    }) => {
    const isTypeTestEnabled = !isCoffeeMode && !isTrainerMode && !isWordsCardMode;

    const getModeButtonClassName = (mode) => (mode ? "zen-button" : "zen-button-deactive");

    const getGameModeButtonClassName = (currMode, buttonMode) => (currMode === buttonMode ? "active-game-mode-button" : "inactive-game-mode-button");

    return (
        <AppBar position="static" color="transparent" className={`bottomBar ${isFocusedMode && "fade-element"}`}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Box className="footer-bar" display="flex" flexDirection="row">
                    <Select
                        classNamePrefix="Select"
                        value={themesOptions.find((e) => e.value.label === theme.label)}
                        options={themesOptions}
                        isSearchable={false}
                        isSelected={false}
                        onChange={handleThemeChange}
                        menuPlacement="top"
                    ></Select>
                    <IconButton onClick={toggleFocusedMode}>
                        <Tooltip title={FOCUS_MODE}>
                            <span className={getModeButtonClassName(isFocusedMode)}>
                                <SelfImprovementIcon fontSize="medium"/>
                            </span>
                        </Tooltip>
                    </IconButton>
                    {/*<IconButton onClick={toggleWordsCardMode}>*/}
                    {/*    <Tooltip title={<span style={{ whiteSpace: "pre-line" }}>{WORDS_CARD_MODE}</span>}>*/}
                    {/*        <span className={getModeButtonClassName(isWordsCardMode)}>*/}
                    {/*            <SchoolIcon fontSize="medium" />*/}
                    {/*        </span>*/}
                    {/*    </Tooltip>*/}
                    {/*</IconButton>*/}
                    <IconButton onClick={toggleCoffeeMode}>
                        <Tooltip title={<span style={{whiteSpace: "pre-line"}}>{FREE_MODE}</span>}>
                            <span className={getModeButtonClassName(isCoffeeMode)}>
                                <EmojiFoodBeverageIcon fontSize="medium"/>
                            </span>
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={toggleTrainerMode}>
                        <Tooltip title={TRAINER_MODE}>
                            <span className={getModeButtonClassName(isTrainerMode)}>
                                <KeyboardAltOutlinedIcon fontSize="medium"/>
                            </span>
                        </Tooltip>
                    </IconButton>
                    {isTypeTestEnabled && (
                        <>
                            <IconButton onClick={() => handleGameModeChange(GAME_MODE_DEFAULT)}>
                                <span className={getGameModeButtonClassName(gameMode, GAME_MODE_DEFAULT)}>
                                    {WORD_MODE_LABEL}
                                </span>
                            </IconButton>
                            {isWordGameMode && (
                                <IconButton onClick={toggleUltraZenMode}>
                                    <Tooltip title={ULTRA_ZEN_MODE}>
                                        <span className={getModeButtonClassName(isUltraZenMode)}>
                                            <ZoomInMapIcon fontSize="small"/>
                                        </span>
                                    </Tooltip>
                                </IconButton>
                            )}
                            <IconButton onClick={() => handleGameModeChange(GAME_MODE_SENTENCE)}>
                                <span className={getGameModeButtonClassName(gameMode, GAME_MODE_SENTENCE)}>
                                    {SENTENCE_MODE_LABEL}
                                </span>
                            </IconButton>
                        </>
                    )}
                </Box>
            </Grid>
        </AppBar>
    );
};

export default FooterMenu;