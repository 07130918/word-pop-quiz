import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Progress } from '@chakra-ui/react';
import type { NextPage } from 'next';
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
            <Flex w='90vw' m='auto' mt={10}>
                <Box>
                    <Box w='90vw'>
                        <Heading>Question {questionNum}</Heading>
                        <Progress
                            value={progress}
                            size='xs'
                            colorScheme='pink'
                        />
                    </Box>
                    <Box mt={10}>
                        <Heading>{quiz?.English}</Heading>
                        <Flex flexDirection='column' mt={10}>
                            {quiz?.choices.map((choice) => (
                                <Box key={choice} mt={4}>
                                    <Button
                                        size='lg'
                                        colorScheme={
                                            quiz?.Japanese === choice && answered
                                                ? 'red'
                                                : 'teal'
                                        }
                                        disabled={answered}
                                        onClick={(e) => checkTheAnswer(e)}
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
                                disabled={!answered}
                                onClick={() => {
                                    router.push({
                                        pathname: `/quiz/${questionNum + 1}`,
                                        query: {
                                            questionNum: questionNum + 1,
                                            quizzes: JSON.stringify(quizzes),
                                        }
                                    },
                                        `/quiz/${questionNum + 1}`
                                    );
                                }}
                            >
                                Move to next
                            </Button>
                            {quiz?.url &&
                                <Button
                                    size='lg'
                                    colorScheme={
                                        quiz?.Japanese !== clickedAnswer && answered
                                            ? 'red'
                                            : 'gray'
                                    }
                                    disabled={!answered}
                                    onClick={() => window.open(quiz.url)}
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

export default Quiz;
