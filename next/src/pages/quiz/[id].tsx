import { Box, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { WordQuizObject } from '../../types/wordObject';

export const Quiz: NextPage = () => {
    const router = useRouter();
    useEffect(() => {
        if (!router.query.quizzes) router.push('/');

        const quizzes = JSON.parse(router.query.quizzes as string);
        setQuiz(quizzes[0]);
    }, [router]);

    const [quiz, setQuiz] = useState<WordQuizObject>();

    return (
        <>
            <Box>
                {quiz?.English}
                {quiz?.Japanese}
                {quiz?.url}
                {quiz?.choices.map((choice) => {
                    return (
                        <Button key={choice}>
                            {choice}
                        </Button>
                    )
                })}
            </Box>
        </>
    );
};

export default Quiz;
