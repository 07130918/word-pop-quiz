import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WordObjects } from '../../types/wordObject';
import generateQuizResource from '../../libs/generateQuizResource';
import fisherYatesShuffle from '../../libs/shuffle';

const API_URL = process.env.API_URL!;

const quizzes = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const _res = await axios.get(API_URL);
        const orderlyWordObjects: WordObjects = _res.data;
        const wordQuizObject = generateQuizResource(orderlyWordObjects);
        res.status(200).json(fisherYatesShuffle(wordQuizObject));
    } catch (error) {
        console.error(error);
        res.status(500).json('通信エラーが発生しました。');
    }
};

export default quizzes;
