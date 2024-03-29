'use client';
import { QuizzesContext, useQuizzes } from '@/hooks/quizzes';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }: { children: React.ReactNode }) {
    const { quizzes, setQuizzes, isLoading, error } = useQuizzes();

    return (
        <CacheProvider>
            <QuizzesContext.Provider value={{ quizzes, setQuizzes, isLoading, error }}>
                <ChakraProvider>{children}</ChakraProvider>
            </QuizzesContext.Provider>
        </CacheProvider>
    );
}
