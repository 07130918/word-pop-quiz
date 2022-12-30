import {
    Alert,
    AlertIcon,
    AlertTitle, Button, Flex
} from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { WordQuizObjects } from '../types/wordObject';

const Home: NextPage = () => {
    const [quizzes, setQuizzes] = useState<WordQuizObjects>([]);
    const [loading, setLoading] = useState(true);
    const [errorState, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get<WordQuizObjects>('/api/quizzes');
                setQuizzes(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        })();
    }, []);

    const router = useRouter();
    return (
        <>
            {errorState &&
                <Alert status='error' variant='left-accent'>
                    <AlertIcon />
                    <AlertTitle>エラーが発生しました</AlertTitle>
                </Alert>
            }
            <Flex h='94vh' justifyContent='center' alignItems='center'>
                <Button
                    size='lg'
                    color='#FE53BB'
                    isLoading={loading}
                    loadingText='Let&apos;s get started!!!'
                    isDisabled={errorState}
                    onClick={() => router.push({
                        pathname: '/quiz/1',
                        query: {
                            questionNum: 1,
                            quizzes: JSON.stringify(quizzes)
                        }
                    },
                        '/quiz/1'
                    )}

                >
                    Let&apos;s get started !!!
                </Button>
            </Flex>
        </>
    );
};

export default Home
