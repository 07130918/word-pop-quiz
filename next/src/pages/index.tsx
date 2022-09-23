import {
    Alert,
    AlertIcon,
    AlertTitle, Button, Flex, Link as ChakraLink
} from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import NextLink from "next/link";
import { useEffect, useState } from 'react';
import type { WordQuizObjects } from '../types/wordObject';

const Home: NextPage = () => {
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/quizzes');
                setQuizzes(res.data);
                console.log('done!!!');
            } catch (error) {
                console.error(error);
                setError(true);
            }
        })();
    }, []);

    const [quizzes, setQuizzes] = useState<WordQuizObjects>([]);
    const [errorState, setError] = useState<boolean>(false);

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
                    isDisabled={errorState}
                >
                    <NextLink href={{
                        pathname: '/quiz/1',
                        query: { quizzes: JSON.stringify(quizzes) }
                    }}
                        as='/quiz/1'
                    >
                        <ChakraLink
                            fontWeight='bold'
                            _hover={{ textDecoration: 'none' }}
                        >
                            Let&apos;s get started !!!
                        </ChakraLink>
                    </NextLink>
                </Button>
            </Flex>
        </>
    );
};

export default Home
