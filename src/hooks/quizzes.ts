import type { WordObject, WordQuizObject } from '@/types/wordObject';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';

export const QuizzesContext = createContext(
    {} as {
        quizzesOrigin: WordObject[];
        setQuizzesOrigin: Dispatch<SetStateAction<WordObject[]>>;
        quizzes: WordQuizObject[];
        setQuizzes: Dispatch<SetStateAction<WordQuizObject[]>>;
        isLoading: boolean;
        error: any;
    },
);

const fetcher = async (url: string): Promise<WordObject[]> => {
    const response = await axios.get<WordObject[]>(url);
    return response.data;
};

export const useQuizzes = () => {
    const [quizzesOrigin, setQuizzesOrigin] = useState<WordObject[]>([]);
    const [quizzes, setQuizzes] = useState<WordQuizObject[]>([]);
    const {
        data,
        isLoading,
        error,
    } = useSWR('/api/quizzes', fetcher);

    useEffect(() => {
        if (data) {
            setQuizzesOrigin(data);
        }
    }, [data]);

    return { quizzesOrigin, quizzes, setQuizzes, isLoading, error };
}
