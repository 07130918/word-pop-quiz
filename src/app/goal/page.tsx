'use client';
import { Button, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Goal: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <Flex h='94vh' justifyContent='center' alignItems='center'>
                <Button
                    size='lg'
                    color='#5386fe'
                    onClick={() => router.push('/')}
                >
                    See ya!
                </Button>
            </Flex>
        </>
    );
};

export default Goal;
