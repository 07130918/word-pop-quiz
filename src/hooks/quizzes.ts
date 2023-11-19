import type { WordQuizObject } from '@/types/wordObject';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';

export const QuizzesContext = createContext(
    {} as {
        quizzes: WordQuizObject[];
        setQuizzes: Dispatch<SetStateAction<WordQuizObject[]>>;
        isLoading: boolean;
        error: any;
    },
);

const fetcher = async (url: string): Promise<WordQuizObject[]> => {
    const response = await axios.get<WordQuizObject[]>(url);
    return response.data;
};

export const useQuizzes = () => {
    const [quizzes, setQuizzes] = useState<WordQuizObject[]>([]);
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
