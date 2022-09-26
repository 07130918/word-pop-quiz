import { Box, Button, Flex, Heading, Link as ChakraLink, Progress } from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { WordQuizObject, WordQuizObjects } from '../../types/wordObject';

export const Quiz: NextPage = () => {
    const router = useRouter();
    useEffect(() => {
        if (router.query.quizzes) {
            const quizzes = JSON.parse(router.query.quizzes as string);
            setQuizzes(quizzes);
            setQuestionNum(Number(router.query.questionNum));
            setProgress(questionNum / quizzes.length * 100);
            // questionNumは,配列のインデックスではないので,1を引く
            setQuiz(quizzes[questionNum - 1]);
        } else {
            router.push('/');
        }
    }, [router]);

    const [questionNum, setQuestionNum] = useState(1);
    const [progress, setProgress] = useState(1);
    const [quiz, setQuiz] = useState<WordQuizObject>();
    const [quizzes, setQuizzes] = useState<WordQuizObjects>([]);

    const checkTheAnswer = (choice: string) => {
        if (choice === quiz?.Japanese) {
            console.log('正解');
        } else {
            console.log('不正解');
        }
    }

    return (
        <>
            <Flex w='90vw' m='auto' marginTop={10}>
                <Box>
                    <Box w='90vw'>
                        <Heading>Question {questionNum}</Heading>
                        <Progress
                            value={progress}
                            size='xs'
                            colorScheme='pink'
                        />
                    </Box>
                    <Box marginTop={10}>
                        <Heading>{quiz?.English}</Heading>
                        <Flex flexDirection='column' marginTop={10}>
                            {quiz?.choices.map((choice) => {
                                return (
                                    <>
                                        <Box marginTop={4} key={choice}>
                                            <Button
                                                colorScheme='teal'
                                                size='lg'
                                                onClick={() => checkTheAnswer(choice)}
                                            >
                                                {choice}
                                            </Button>
                                        </Box>
                                    </>
                                )
                            })}
                        </Flex>
                        <Box marginTop={4}>
                            <Button size='lg' marginRight={4}>
                                {/* <NextLink href={`/quiz/${questionNum + 1}`}> */}
                                <NextLink href={{
                                    pathname: `/quiz/${questionNum + 1}`,
                                    query: {
                                        questionNum: questionNum + 1,
                                        quizzes: JSON.stringify(quizzes)
                                    }
                                }}
                                    as={`/quiz/${questionNum + 1}`}
                                >
                                    <ChakraLink
                                        _hover={{ 'textDecoration': 'none' }}
                                    >
                                        Move to next
                                    </ChakraLink>
                                </NextLink>
                            </Button>
                            {quiz?.url &&
                                <Button>
                                    <ChakraLink
                                        href={`${quiz?.url}`}
                                        target='_blank'
                                        _hover={{ 'textDecoration': 'none' }}
                                    >
                                        Go to definition
                                    </ChakraLink>
                                </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Quiz;
