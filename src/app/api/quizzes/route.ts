import generateQuizResource from '@/libs/generateQuizResource';
import fisherYatesShuffle from '@/libs/shuffle';
import type { WordObject } from '@/types/wordObject';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const API_URL = process.env.API_URL!;
        const response = await axios.get<WordObject[]>(API_URL);
        const quizzes = generateQuizResource(response.data);
        const shuffledQuizzes = fisherYatesShuffle(quizzes);
        return NextResponse.json(shuffledQuizzes, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('通信エラーが発生しました。', { status: 500 });
    }
}
