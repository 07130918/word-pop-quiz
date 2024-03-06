'use client';
import { QuizzesContext } from '@/hooks/quizzes';
import type { WordQuizObject } from '@/types/wordObject';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Progress, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Quiz({ params }: { params: { id: string } }) {
    const { quizzes } = useContext(QuizzesContext);
    // クイズが今何問目か
    const currentQuizNum = Number(params.id);
    // 今のクイズの情報を管理する
    const [currentQuiz, setCurrentQuiz] = useState<WordQuizObject>();
    // 回答したかどうかを管理する
    const [answered, setAnswered] = useState(false);
    // 回答した選択肢を管理する
    const [clickedAnswer, setClickedAnswer] = useState('');

    const router = useRouter();
    useEffect(() => {
        if (currentQuizNum > quizzes.length) {
            router.push('/goal');
        } else {
            setCurrentQuiz(quizzes[currentQuizNum - 1]);
            setAnswered(false);
            setClickedAnswer('');
        }
    }, [currentQuizNum, quizzes, router]);

    return (
        <Stack w='90vw' m='auto' maxH='80vh' overflowY='scroll'>
            <Heading color='cyan.200'>Question {currentQuizNum}</Heading>
            <Progress
                value={(currentQuizNum / quizzes.length) * 100}
                size='xs'
                colorScheme='pink'
            />
            <Stack pt={{ base: 0, md: 4 }}>
                <Heading color='cyan.200'>{currentQuiz?.definition}</Heading>
                <Stack>
                    {currentQuiz?.choices.map((choice) => {
                        const isCorrect = currentQuiz.english === choice && answered;
                        return (
                            <Box key={choice} mt={4}>
                                <Button
                                    size='lg'
                                    name={choice}
                                    colorScheme={isCorrect ? 'red' : 'blackAlpha'}
                                    isDisabled={answered}
                                    onClick={() => {
                                        setClickedAnswer(choice);
                                        setAnswered(true);
                                    }}
                                >
                                    {clickedAnswer === choice && <CheckIcon />}
                                    {choice}
                                </Button>
                            </Box>
                        );
                    })}
                </Stack>
                <Box mt={4}>
                    <Button
                        mr={4}
                        size='lg'
                        colorScheme='gray'
                        isDisabled={!answered}
                        onClick={() => router.push(`/quiz/${currentQuizNum + 1}`)}
                    >
                        Move to next
                    </Button>
                    {currentQuiz?.url && (
                        <Button
                            size='lg'
                            colorScheme={
                                currentQuiz.english !== clickedAnswer && answered
                                    ? 'red'
                                    : 'blackAlpha'
                            }
                            isDisabled={!answered}
                            onClick={() => window.open(currentQuiz.url)}
                        >
                            Go to definition
                        </Button>
                    )}
                </Box>
            </Stack>
        </Stack>
    );
}
