import type { WordObject } from '@/types/wordObject';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const API_URL = process.env.API_URL!;
        const res = await axios.get<WordObject[]>(API_URL);
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('通信エラーが発生しました。', { status: 500 });
    }
}
