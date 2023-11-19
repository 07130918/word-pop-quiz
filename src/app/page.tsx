'use client';
import { QuizzesContext } from '@/hooks/quizzes';
import {
    Alert,
    AlertIcon,
    AlertTitle, Button, Flex
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { isLoading, error } = useContext(QuizzesContext);
    const router = useRouter();
    return (
        <>
            {error && (
                <Alert status='error' variant='left-accent'>
                    <AlertIcon />
                    <AlertTitle>エラーが発生しました</AlertTitle>
                </Alert>)
            }
            <Flex h='94vh' justifyContent='center' alignItems='center'>
                <Button
                    size='lg'
                    color='#FE53BB'
                    isLoading={isLoading}
                    isDisabled={error}
                    loadingText='Let&apos;s get started!!!'
                    onClick={() => router.push('/quiz/1')}
                >
                    Let&apos;s get started !!!
                </Button>
            </Flex>
        </>
    );
};
