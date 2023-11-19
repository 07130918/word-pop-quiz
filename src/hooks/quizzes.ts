import type { WordObject } from '@/types/wordObject';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';

export const QuizzesContext = createContext(
    {} as {
        quizzes: WordObject[];
        setQuizzes: Dispatch<SetStateAction<WordObject[]>>;
        isLoading: boolean;
        error: any;
    },
);

const fetcher = async (url: string): Promise<WordObject[]> => {
    const response = await axios.get<WordObject[]>(url);
    return response.data;
};

export const useQuizzes = () => {
    const [quizzes, setQuizzes] = useState<WordObject[]>([]);
    const {
        data,
        isLoading,
        error,
    } = useSWR('/api/quizzes', fetcher);

    useEffect(() => {
        if (data) {
            setQuizzes(data);
        }
    }, [data]);

    return { quizzes, setQuizzes, isLoading, error };
}
