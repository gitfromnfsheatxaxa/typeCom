import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: ${({theme}) => theme.background};
        color: ${({theme}) => theme.text};
        padding: 0;
        margin: 0;
        font-family: ${({theme}) => theme.fontFamily};
        transition: all 0.25s linear;
        text-shadow: ${({theme}) => theme.textShadow};
    }

    .canvas {
        align-items: center;
        display: grid;
        gap: 1rem;
        grid-auto-flow: row;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
        width: 100vw;
        z-index: 1;
        padding: 1rem;
        transition: padding-top .125s;
    }

    .fixed-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); /* Dark background with opacity */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999; /* Ensure the overlay is on top */
    }

    .modal-content {
        background: ${({theme}) => theme.background};
        padding: 40px; /* Increased padding */
        border-radius: 8px;
        position: relative; /* To position the close button */
        width: 80%; /* Increased width */
        max-width: 600px; /* Max width to keep it from getting too large */
        height: auto; /* Allow height to grow with content */
    }

    .close-button {
        color: ${({theme}) => theme.textTypeBox};
    }

    .modal-title {
        margin-bottom: 20px; /* Add space below title */
    }

    .modal-description {
        margin-bottom: 20px; /* Add space below description */
    }

    .modal-icons {
        margin-top: 20px; /* Add space above icons */
    }

    .dynamicBackground {
        height: 100%;
        width: 100%;
        z-index: -999;
        position: fixed;
        filter: grayscale(30%);
    }

    .header {
        position: relative;
        display: block;
        align-items: center;
        justify-content: center;
        padding-bottom: 2%;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        z-index: 999;
    }

    .bottom-info {
        color: ${({theme}) => theme.title};
        margin: 4px;
    }

    small {
        display: block;
    }

    button {
        display: block;
    }

    h1 {
        color: ${({theme}) => theme.title};
        opacity: 0.9;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    h3 {
        margin-right: 10px;
    }

    h4 {
        margin-right: 10px;
        opacity: 0.7;
    }

    .bottomBar {
        z-index: 999;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;

        .footer-bar {
            width: 80%;
            padding: 20px 0;
            display: flex;
            justify-content: start;
            margin: auto;
            gap: 0 15px;
            align-items: center;
            
        }
        @media screen and (max-width: 430px) {
            .footer-bar {
                gap: 0;
                width: 90%;
             
            }
        }
    }

    .stats-overlay {
        position: fixed;
        background: ${({theme}) => theme.background};
        inset: 0;
        z-index: 99;
        padding-inline: 1rem;
    }

    .stats-chart {
        position: absolute;
        background: transparent;
        top: 50%;
        width: 100%;
        max-width: 1000px;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        padding-inline: 1rem;
        flex-direction: column;
        gap: 20px;
    }

    .custom-tooltip {
        position: relative;
    }

    .custom-tooltip::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        background: ${({theme}) => theme.background};
        z-index: -1;
        border: 1px solid ${({theme}) => theme.textTypeBox};
        opacity: .9;
    }

    .stats-header {
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
    }

    .stats {
        display: block;
        width: 80%;
        margin-top: 50px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        color: ${({theme}) => theme.stats};
        bottom: 10%;
    }

    .stats-footer {
        display: flex;
        justify-content: space-between;
    }

    .wordscard-UI {
        display: block;
        max-width: 1000px;
        margin-top: 150px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        bottom: 10%;
    }

    .wordscard-UI-info {
        margin-top: 30px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        color: ${({theme}) => theme.textTypeBox};
        bottom: 10%;
    }

    .keyboard-stats {
        display: flex;
        max-width: 1000px;
        margin-top: 50px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        color: ${({theme}) => theme.stats};
        bottom: 10%;
        justify-content: center;
        text-align: center;
    }

    .sub-header {
        color: ${({theme}) => theme.textTypeBox};
        opacity: 0.5;
        border-right: 2px solid;
        animation: blinkingCursor 2s infinite;;
        @keyframes blinkingCursor {
            0% {
                border-right-color: ${({theme}) => theme.stats};
            }
            25% {
                border-right-color: transparent;
            }
            50% {
                border-right-color: ${({theme}) => theme.stats};
            }
            75% {
                border-right-color: transparent;
            }
            100% {
                border-right-color: ${({theme}) => theme.stats};
            }
        }
    }

    .type-box {
        display: block;
        width: 80%;
        height: 18vh;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: 10%;
        @media only screen
        and (min-device-width: 375px)
        and (max-device-width: 812px)
        and (-webkit-min-device-pixel-ratio: 3) {
            top: 200px;
            width: 60%;
        }
    }


    .words {
        color: ${({theme}) => theme.textTypeBox};
        font-size: 28px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-content: center;
        user-select: none;
    }

    .word {
        margin: 5px 5px;
        display: flex;
        padding-right: 2px;
        border-bottom: 1px solid transparent;
        border-top: 1px solid transparent;
        scroll-margin: 4px;
    }

    .active-word {
        animation: blinkingBackground 2s infinite;
        border-top: 1px solid transparent;
        border-bottom: 1px solid;
        @keyframes blinkingBackground {
            0% {
                border-bottom-color: ${({theme}) => theme.stats};
            }
            25% {
                border-bottom-color: ${({theme}) => theme.textTypeBox};
            }
            50% {
                border-bottom-color: ${({theme}) => theme.stats};
            }
            75% {
                border-bottom-color: ${({theme}) => theme.textTypeBox};
            }
            100% {
                border-bottom-color: ${({theme}) => theme.stats};
            }
        };
        scroll-margin: 4px;
    }

    .active-word-no-pulse {
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        scroll-margin: 4px;
    }

    .error-word {
        border-bottom: 1px solid red;
        scroll-margin: 4px;
    }

    .char {
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }

    .correct-char {
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        color: ${({theme}) => theme.text};

    }

    .error-char {
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        color: red;

    }

    .caret-char-left {
        border-left: 1px solid ${({theme}) => theme.stats};
        border-right: 1px solid transparent;

    }

    .caret-char-left-start {

        border-left: 1px solid;
        border-right: 1px solid transparent;
        animation: blinkingCaretLeft 2s infinite;
        animation-timing-function: ease;
        @keyframes blinkingCaretLeft {
            0% {
                border-left-color: ${({theme}) => theme.stats};
            }
            25% {
                border-left-color: ${({theme}) => theme.textTypeBox};
            }
            50% {
                border-left-color: ${({theme}) => theme.stats};
            }
            75% {
                border-left-color: ${({theme}) => theme.textTypeBox};
            }
            100% {
                border-left-color: ${({theme}) => theme.stats};
            }
        }
    }

    .caret-char-right {
        border-right: 1px solid ${({theme}) => theme.stats};
        border-left: 1px solid transparent;

    }

    .caret-char-right-correct {
        color: ${({theme}) => theme.text};
        border-right: 1px solid ${({theme}) => theme.stats};
        border-left: 1px solid transparent;

    }

    .caret-char-right-error {
        color: red;
        border-right: 1px solid ${({theme}) => theme.stats};
        border-left: 1px solid transparent;

    }

    .caret-extra-char-right-error {
        color: red;
        border-right: 1px solid ${({theme}) => theme.stats};
        border-left: 1px solid transparent;

    }

    .hidden-input {
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .select {
        color: ${({theme}) => theme.text};
        background: ${({theme}) => theme.background};
        border: none;
        min-width: 5%;
    }

    .restart-button {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1rem;
        width: 8em;
    }

    .restart-button button:hover {
        transform: scale(1.18);
        transition: 0.3s;
    }

    .alert {
        opacity: 0.3;
        background-image: ${({theme}) => theme.gradient};
    }

    .correct-char-stats {
        color: ${({theme}) => theme.text};
    }

    .incorrect-char-stats {
        color: red;
    }

    .missing-char-stats {
        color: ${({theme}) => theme.textTypeBox};
    }

    .speedbar {
        opacity: 0.3;
        color: ${({theme}) => theme.stats};
    }

    .active-button {
        color: ${({theme}) => theme.stats};
    }

    .inactive-button {
        color: ${({theme}) => theme.textTypeBox};
    }

    .zen-button {
        color: ${({theme}) => theme.stats};
    }

    .zen-button-deactive {
        color: ${({theme}) => theme.textTypeBox};
    }

    .support-me {
        color: #FF4081;
        animation: blinkingColor 10s infinite;
        @keyframes blinkingColor {
            0% {
                color: #F48FB1;
            }
            25% {
                color: #FF4081;
            }
            50% {
                color: #F48FB1;
            }
            75% {
                color: #FF4081;
            }
            100% {
                color: #F48FB1;
            }
        }
    }

    .support-me-image {
        height: 75%;
        width: 75%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 16px;
    }

    .menu-separater {
        color: ${({theme}) => theme.textTypeBox};
        background-color: none;
        font-size: 16px;
    }

    .dialog {
        background: ${({theme}) => theme.background};
    }

    .key-type {
        background: ${({theme}) => theme.textTypeBox};
        color: ${({theme}) => theme.stats};
        border-radius: 4px;
    }

    .key-note {
        color: ${({theme}) => theme.stats};
        background: transparent;
    }

    .novelty-container {
        width: 80%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        display: block;
    }

    .textarea {
        color: ${({theme}) => theme.textTypeBox};
        font-size: 28px;
        background: transparent;
        border: none;
        caret-color: ${({theme}) => theme.stats};
        font-family: ${({theme}) => theme.fontFamily};
        overflow: auto;
        resize: none;
        width: 100%;
        height: 70vh;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        outline: none;
        border-radius: 4px;
        @media only screen
        and (min-device-width: 375px)
        and (max-device-width: 812px)
        and (-webkit-min-device-pixel-ratio: 3) {
            top: 200px;
            width: 60%;
        }
    }

    .active-game-mode-button {
        color: ${({theme}) => theme.stats};
        font-size: 16px;
    }

    .inactive-game-mode-button {
        color: ${({theme}) => theme.textTypeBox};
        font-size: 16px;
    }

    .error-sentence-char {
        color: red;
    }

    .error-sentence-space-char {
        border-bottom: 1px solid red;
    }

    .wordcard-error-char-space-char {
        border-bottom: 1px solid red;
        white-space: pre;
        padding-right: 4px;
    }

    .wordcard-error-char {
        color: red;
        padding-right: 4px;
    }

    .wordcard-char {
        color: ${({theme}) => theme.textTypeBox};
        padding-right: 4px;
    }

    .correct-wordcard-char {
        color: ${({theme}) => theme.text};
        padding-right: 4px;
    }

    .sentence-char {
        color: ${({theme}) => theme.textTypeBox};
    }

    .correct-sentence-char {
        color: ${({theme}) => theme.text};
    }

    .sentence-input-field {
        color: ${({theme}) => theme.textTypeBox};
        font-size: 28px;
        background: transparent;
        border: none;
        caret-color: ${({theme}) => theme.stats};
        outline: none;
        padding: 0;
        font-family: ${({theme}) => theme.fontFamily};
    }

    .sentence-display-field {
        font-size: 28px;
    }

    .wordcard-word-display-field {
        font-size: 64px;
        margin: 40px;
    }

    .wordcard-meaning-display-field {
        font-size: 20px;
        margin-top: 40px;
        margin-bottom: 10px;
    }

    .next-sentence-display {
        font-family: ${({theme}) => theme.fontFamily};
        color: ${({theme}) => theme.textTypeBox};
        display: block;
        margin-top: 10px;
        font-size: 16px;
    }

    .type-box-sentence {
        display: block;
        width: 80%;
        height: 240px;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: 10%;
        @media only screen
        and (min-device-width: 375px)
        and (max-device-width: 812px)
        and (-webkit-min-device-pixel-ratio: 3) {
            top: 200px;
            width: 60%;
        }
    }

    .keyboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
    }

    .row {
        list-style: none;
        display: flex;
    }

    .row-1 {
        padding-left: 0em;
    }

    .row-2 {
        padding-left: 0.25em;
    }

    .row-3 {
        padding-left: 0.5em;
    }

    .row-4 {
        padding-left: 0em;
    }
    ul {
        display: block;
        list-style-type: disc;
        margin-block-start: 0.25em;
        margin-block-end: 0.25em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
    }

    .SPACEKEY {
        height: 3em;
        width: 21em;
        color: ${({theme}) => theme.text};
        font-family: ${({theme}) => theme.fontFamily};
        border-radius: 0.4em;
        line-height: 3em;
        letter-spacing: 1px;
        margin: 0.4em;
        transition: 0.3s;
        text-align: center;
        font-size: 1em;
        background-color: ${({theme}) => theme.background};
        border: 2px solid ${({theme}) => theme.textTypeBox};
        opacity: 0.8;
    }

    .UNITKEY {
        height: 3em;
        width: 3em;
        color: rgba(0, 0, 0, 0.7);
        border-radius: 0.4em;
        line-height: 3em;
        letter-spacing: 1px;
        margin: 0.4em;
        transition: 0.3s;
        text-align: center;
        font-size: 1em;
        font-family: ${({theme}) => theme.fontFamily};
        background-color: ${({theme}) => theme.background};
        border: 2px solid ${({theme}) => theme.textTypeBox};
        opacity: 1;
        color: ${({theme}) => theme.text};
        opacity: 0.8;
    }

    .VIBRATE {
        background-color: ${({theme}) => theme.textTypeBox};
        -webkit-animation: vibrate-1 0.8s linear infinite both;
        animation: vibrate-1 0.8s linear infinite both;
    }

    .VIBRATE-ERROR {
        background-color: red;
        -webkit-animation: vibrate-1 0.2s linear infinity both;
        animation: vibrate-1 0.2s linear infinity both;
    }

    .NOVIBRATE-CORRECT {
        background-color: ${({theme}) => theme.textTypeBox};
    }

    @keyframes vibrate-1 {
        0% {
            -webkit-transform: translate(0);
            transform: translate(0);
        }
        20% {
            -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
        }
        40% {
            -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
        }
        60% {
            -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
        }
        80% {
            -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
        }
        100% {
            -webkit-transform: translate(0);
            transform: translate(0);
        }
    }

    .CorrectKeyDowns {
        color: inherit;
    }

    .IncorrectKeyDowns {
        color: red;
    }

    .words-card-container {
        display: block;
        width: 100%;
        height: 100%;
    }

    .words-card-catalog {
        width: 10%;
        float: left;
        text-align: left;
        border-left: 2px groove ${({theme}) => theme.stats};
        border-top: 1px solid ${({theme}) => theme.stats};
        border-radius: 12px;
        padding-left: 20px;
    }

    .words-card-main {
        width: 80%;
        height: 90%;
        float: left;
        text-align: center;
    }

    .Catalog {
        list-style-type: none;
        padding: 10px;
        max-height: 300px;
        margin-bottom: 5px;
        overflow: hidden;
        overflow-y: scroll;
        text-align: left;
        margin-top: 10px;
    }

    .Catalog::-webkit-scrollbar {
        width: 5px;
    }

    .Catalog::-webkit-scrollbar-track {
        background: transparent;
    }

    .Catalog::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.stats};
        border-radius: 12px;
    }

    .Catalog-title {
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .Catalog-li {
        cursor: pointer;
        margin-bottom: 10px;
        color: ${({theme}) => theme.textTypeBox};
    }

    .Catalog-li-Activated {
        cursor: default;
        margin-bottom: 10px;
        color: ${({theme}) => theme.stats};
    }

    .Catalog-Button {
        background-color: ${({theme}) => theme.background};
        color: ${({theme}) => theme.textTypeBox};
    }

    .Catalog-Button-Activated {
        background-color: ${({theme}) => theme.background};
        color: ${({theme}) => theme.stats};
    }

    .Catalog-Selected {
        background-color: ${({theme}) => theme.background};
        color: ${({theme}) => theme.textTypeBox};
        margin-top: 20px;
    }

    .select-chapter-title {
        font-size: 16px;
    }

    .fade-element {
        opacity: 0;
        transition: opacity 500ms ease-in;
    }

    .fade-element:hover {
        opacity: 1;
        transition: opacity 500ms ease-in;
    }

    .primary-stats-title {
        color: ${({theme}) => theme.textTypeBox};
        margin-block: 0;
        margin-bottom: 6px;
        font-size: 20px;
    }

    .primary-stats-value {
        color: ${({theme}) => theme.text};
        margin-block: 0;
        font-size: 36px;
    }

    .stats-title {
        color: ${({theme}) => theme.textTypeBox};
        margin-block: 0;
        margin-bottom: 6px;
        font-weight: bold;
        font-size: 16px;
    }

    .stats-value {
        margin-block: 0;
    }

    .tooltip {
        font-size: 14px;
        line-height: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .box-cursor {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .nav-menu {
        width: 100vw;
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
    }

    .restart-center {
        width: 40px;
    }

    .restart-div {
        position: fixed;
        left: calc(50% - 20px);
    }
    .random-text {
        transition: 1s !important;
    }
`;
