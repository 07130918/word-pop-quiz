'use client';
import { QuizzesContext } from '@/hooks/quizzes';
import fisherYatesShuffle from '@/lib/shuffle';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
    const { quizzes, setQuizzes, isLoading, error } = useContext(QuizzesContext);
    const [range, setRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 0,
    });

    useEffect(() => {
        setRange({ min: 1, max: quizzes.length });
    }, [quizzes]);

    const router = useRouter();
    const moveToQuiz = () => {
        const shuffledQuizzes = fisherYatesShuffle(quizzes.slice(range.min - 1, range.max));
        setQuizzes(shuffledQuizzes);
        router.push('/quiz/1');
    };

    return (
        <>
            {error && (
                <Alert status='error' variant='left-accent'>
                    <AlertIcon />
                    <AlertTitle>エラーが発生しました</AlertTitle>
                </Alert>
            )}
            <VStack minH='84vh' justifyContent='center'>
                <HStack>
                    <Text color='#FE53BB' fontSize='2xl'>
                        No.
                    </Text>
                    <NumberInput
                        bg='white'
                        w='80px'
                        borderRadius='md'
                        value={range.min}
                        min={1}
                        max={quizzes.length - 5}
                        onChange={(_, value) =>
                            setRange((prev) => ({
                                ...prev,
                                min: isNaN(value) ? 1 : value,
                            }))
                        }
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Text color='#FE53BB' fontSize='2xl'>
                        &#8211;
                    </Text>
                    <NumberInput
                        bg='white'
                        w='80px'
                        borderRadius='md'
                        value={range.max}
                        min={5}
                        max={quizzes.length}
                        onChange={(_, value) =>
                            setRange((prev) => ({
                                ...prev,
                                max: isNaN(value) ? quizzes.length : value,
                            }))
                        }
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
                <Button
                    size='lg'
                    color='#FE53BB'
                    isLoading={isLoading}
                    isDisabled={error}
                    loadingText="Let's get started!!!"
                    onClick={() => moveToQuiz()}
                >
                    Let&apos;s get started !!!
                </Button>
            </VStack>
        </>
    );
}
