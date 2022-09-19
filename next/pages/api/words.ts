import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = process.env.API_URL!;

const getWords = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const _res = await axios.get(API_URL);
        res.status(200).json(_res.data);
    } catch (error) {
        console.error(error);
        res.status(500).json('通信エラーが発生しました。');
    }
};


export default getWords;
