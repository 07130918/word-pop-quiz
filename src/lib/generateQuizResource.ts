import type { WordObject, WordQuizObject } from "@/types/wordObject";
import fisherYatesShuffle from '@/lib/shuffle';

/**
 * @description 単語オブジェクトの配列からクイズオブジェクトの配列を生成する。
 * @param { WordObject[] } orderlyWordObjects - 単語オブジェクトの配列
 * @returns { WordQuizObject[] } - クイズオブジェクトの配列
 */
export const generateQuizResource = (orderlyWordObjects: WordObject[]): WordQuizObject[] => {
    const allChoices = orderlyWordObjects.map((wordObject) => wordObject.english);

    return orderlyWordObjects.map((wordObject) => {
        const correctChoice = wordObject.english;
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
            english: wordObject.english,
            definition: wordObject.definition,
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
