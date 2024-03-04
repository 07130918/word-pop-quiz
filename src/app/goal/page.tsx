'use client';
import { Button, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Goal: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <Flex minH='84vh' justifyContent='center' alignItems='center'>
                <Button size='lg' colorScheme='blackAlpha' onClick={() => router.push('/')}>
                    See ya!
                </Button>
            </Flex>
        </>
    );
};

export default Goal;
