import {generate} from "random-words";
import {
    COMMON_WORDS
} from "../constants/WordsMostCommon.jsx";
import {
    DEFAULT_DIFFICULTY,
    ENGLISH_MODE,
    DEFAULT_WORDS_COUNT,
} from "../constants/Constants.jsx";
import {randomIntFromRange} from "./randomUtils.jsx";
import {
    generateRandomNumChras,
    generateRandomSymbolChras,
} from "./randomCharsGenerator.jsx";


const wordsGenerator = (
    wordsCount,
    difficulty,
    languageMode,
    numberAddOn,
    symbolAddOn
) => {
    if (languageMode === ENGLISH_MODE) {
        if (difficulty === DEFAULT_DIFFICULTY) {
            const EnglishWordList = [];
            for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
                const rand = randomIntFromRange(0, 550);
                let wordCandidate = COMMON_WORDS[rand].val;
                if (numberAddOn) {
                    wordCandidate = wordCandidate + generateRandomNumChras(1, 2);
                }
                if (symbolAddOn) {
                    wordCandidate = wordCandidate + generateRandomSymbolChras(1, 1);
                }
                EnglishWordList.push({key: wordCandidate, val: wordCandidate});
            }
            return EnglishWordList;
        }

        // hard
        const randomWordsGenerated = generate({
            exactly: wordsCount,
            maxLength: 7,
        });
        const words = [];
        for (let i = 0; i < wordsCount; i++) {
            let wordCandidate = randomWordsGenerated[i];
            if (numberAddOn) {
                wordCandidate = wordCandidate + generateRandomNumChras(1, 2);
            }
            if (symbolAddOn) {
                wordCandidate = wordCandidate + generateRandomSymbolChras(1, 1);
            }
            words.push({key: wordCandidate, val: wordCandidate});
        }
        return words;
    }
    return ["something", "went", "wrong"];
};



export {wordsGenerator, };
