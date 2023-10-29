import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import generateQuizResource from '../../libs/generateQuizResource';
import fisherYatesShuffle from '../../libs/shuffle';
import type { WordObject } from '../../types/wordObject';

const API_URL = process.env.API_URL!;

const quizzes = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get<WordObject[]>(API_URL);
        const quizzes = generateQuizResource(response.data);
        const shuffledQuizzes = fisherYatesShuffle(quizzes);
        res.status(200).json(shuffledQuizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json('通信エラーが発生しました。');
    }
};

export default quizzes;
