import { CheckIcon } from '@chakra-ui/icons';
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
            const questionNum = Number(router.query.questionNum);
            if (questionNum > quizzes.length) router.push('/Goal');

            setQuizzes(quizzes);
            setQuestionNum(questionNum);
            setProgress(questionNum / quizzes.length * 100);
            // questionNumは,配列のインデックスではないので,1を引く
            setQuiz(quizzes[questionNum - 1]);
            setAnswered(false);
            setClickedAnswer('');
        } else {
            // /quiz/[id]にアクセスしたときに,クエリがない場合は,トップページに戻す
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    const [questionNum, setQuestionNum] = useState(1);           // クイズが今何問目かを管理する
    const [progress, setProgress] = useState(1);                 // プログレスバーの値を管理する
    const [quiz, setQuiz] = useState<WordQuizObject>();          // クイズの情報を管理する
    const [quizzes, setQuizzes] = useState<WordQuizObjects>([]); // 全てのクイズの情報を管理する
    const [answered, setAnswered] = useState(false);             // 回答したかどうかを管理する
    const [clickedAnswer, setClickedAnswer] = useState('');      // 回答した選択肢を管理する

    const checkTheAnswer = (e: any) => {
        setClickedAnswer(e.target.textContent);
        setAnswered(true);
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
                                    <Box key={choice} marginTop={4}>
                                        <Button
                                            colorScheme={
                                                quiz?.Japanese === choice && answered
                                                    ? 'red'
                                                    : 'teal'
                                            }
                                            size='lg'
                                            onClick={(e) => checkTheAnswer(e)}
                                            disabled={answered}
                                        >
                                            {clickedAnswer === choice &&
                                                <CheckIcon />
                                            }

                                            {choice}
                                        </Button>
                                    </Box>
                                )
                            })}
                        </Flex>
                        <Box marginTop={4}>
                            <Button
                                size='lg'
                                marginRight={4}
                                disabled={!answered}
                            >
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
                                <Button
                                    size='lg'
                                    disabled={!answered}
                                    colorScheme={
                                        quiz?.Japanese !== clickedAnswer && answered
                                            ? 'red'
                                            : 'gray'
                                    }
                                >
                                    <ChakraLink
                                        href={quiz?.url}
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
