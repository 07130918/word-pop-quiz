'use client';
import { QuizzesContext } from '@/hooks/quizzes';
import type { WordQuizObject } from '@/types/wordObject';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Progress } from '@chakra-ui/react';
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
        <>
            <Flex w='90vw' m='auto' mt={10}>
                <Box>
                    <Box w='90vw'>
                        <Heading color='whiteAlpha.900'>Question {currentQuizNum}</Heading>
                        <Progress
                            value={(currentQuizNum / quizzes.length) * 100}
                            size='xs'
                            colorScheme='pink'
                        />
                    </Box>
                    <Box mt={10}>
                        <Heading color='whiteAlpha.900'>{currentQuiz?.definition}</Heading>
                        <Flex flexDirection='column' mt={10}>
                            {currentQuiz?.choices.map((choice) => (
                                <Box key={choice} mt={4}>
                                    <Button
                                        size='lg'
                                        name={choice}
                                        colorScheme={
                                            currentQuiz.english === choice && answered
                                                ? 'red'
                                                : 'teal'
                                        }
                                        isDisabled={answered}
                                        onClick={() => {
                                            setClickedAnswer(choice);
                                            setAnswered(true);
                                        }}
                                    >
                                        {clickedAnswer === choice &&
                                            <CheckIcon />
                                        }
                                        {choice}
                                    </Button>
                                </Box>
                            ))}
                        </Flex>
                        <Box mt={4}>
                            <Button
                                size='lg'
                                marginRight={4}
                                isDisabled={!answered}
                                onClick={() => router.push(`/quiz/${currentQuizNum + 1}`)}
                            >
                                Move to next
                            </Button>
                            {currentQuiz?.url &&
                                <Button
                                    size='lg'
                                    colorScheme={
                                        currentQuiz.english !== clickedAnswer && answered
                                            ? 'red'
                                            : 'gray'
                                    }
                                    isDisabled={!answered}
                                    onClick={() => window.open(currentQuiz.url)}
                                >
                                    Go to definition
                                </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};
