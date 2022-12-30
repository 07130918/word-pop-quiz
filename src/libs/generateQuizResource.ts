import type { WordObjects, WordQuizObjects } from "../types/wordObject";
import fisherYatesShuffle from './shuffle';

const generateQuizResource = (orderlyWordObjects: WordObjects): WordQuizObjects => {
    const allChoices = orderlyWordObjects.map((wordObject) => wordObject.Japanese);

    return orderlyWordObjects.map((wordObject) => {
        const correctChoice = wordObject.Japanese;
        const dummyChoices = configureUniqueChoices(
            [...allChoices, correctChoice].filter((value, _, self) => (
                // 選択肢に正解が含まれている場合は、その正解を除いた配列を返す。
                self.indexOf(value) === self.lastIndexOf(value)
            ))
        );
        const choices = fisherYatesShuffle<string>(
            [...dummyChoices, correctChoice]
        );

        return {
            English: wordObject.English,
            Japanese: wordObject.Japanese,
            url: wordObject.url,
            choices,
        };
    });
};

const configureUniqueChoices = (choices: string[]): string[] => {
    // かぶりがない選択肢を生成する。
    while (true) {
        const answers = configureChoices(choices);
        if (answers.length === new Set(answers).size) return answers;
    };
}

const configureChoices = (choices: string[]): string[] => {
    // 選択肢をランダムに3つ作る。
    const dummyChoices = [];
    for (let i = 0; i < 3; i++) {
        dummyChoices.push(
            choices[Math.floor(Math.random() * choices.length)]
        );
    }
    return dummyChoices;
}

export default generateQuizResource;
