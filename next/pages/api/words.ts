import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import fisherYatesShuffle from '../../libs/shuffle';
import type { WordObject, WordObjects, WordQuizObject } from '../../types/wordObject';

const API_URL = process.env.API_URL!;

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
    let answers = configureChoices(choices);
    let uniqueAnswers = new Set(answers);
    while (answers.length != uniqueAnswers.size) {
        answers = configureChoices(choices);
        uniqueAnswers = new Set(answers);
    }
    return answers;
}

const getWords = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const _res = await axios.get(API_URL);
        const orderlyWordObjects: WordObjects = _res.data;
        const allChoices = orderlyWordObjects.map(
            (wordObject: WordObject) => wordObject.Japanese);
        const wordQuizObject = orderlyWordObjects.map(
            (wordObject: WordObject) => {
                const correctChoice = wordObject.Japanese;
                const dummyChoices = configureUniqueChoices(
                    [...allChoices, correctChoice].filter((value, i, self) => (
                        // 選択肢に正解が含まれている場合は、その正解を除いた配列を返す。
                        self.indexOf(value) === self.lastIndexOf(value)
                    )));
                const choices = fisherYatesShuffle<string>([...dummyChoices, correctChoice]);

                const _wordQuizObject: WordQuizObject = {
                    id: uuidv4(),
                    English: wordObject.English,
                    Japanese: wordObject.Japanese,
                    url: wordObject.url,
                    choices,
                }
                return _wordQuizObject;
            });
        res.status(200).json(fisherYatesShuffle(wordQuizObject));
    } catch (error) {
        console.error(error);
        res.status(500).json('通信エラーが発生しました。');
    }
};


export default getWords;
