import type { WordObject, WordObjects, WordQuizObject, WordQuizObjects } from "../types/wordObject";
import fisherYatesShuffle from './shuffle';

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

const configureUniqueChoices = (choices: string[]): string[] => {
    // かぶりがない選択肢を生成する。
    while (true) {
        const answers = configureChoices(choices);
        if (answers.length === new Set(answers).size) {
            return answers;
        }
    };
}

const generateQuizResource = (orderlyWordObjects: WordObjects): WordQuizObjects => {
    const allChoices = orderlyWordObjects.map(
        (wordObject: WordObject) => wordObject.Japanese);

    return orderlyWordObjects.map((wordObject: WordObject) => {
        const correctChoice = wordObject.Japanese;
        const dummyChoices = configureUniqueChoices(
            [...allChoices, correctChoice].filter((value, _, self) => (
                // 選択肢に正解が含まれている場合は、その正解を除いた配列を返す。
                self.indexOf(value) === self.lastIndexOf(value)
            )));
        const choices = fisherYatesShuffle<string>(
            [...dummyChoices, correctChoice]
        );

        const quizResource: WordQuizObject = {
            English: wordObject.English,
            Japanese: wordObject.Japanese,
            url: wordObject.url,
            choices,
        }
        return quizResource;
    });
};

export default generateQuizResource;
