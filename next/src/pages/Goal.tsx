import type { NextPage } from 'next';
import { Flex, Button, Link as ChakraLink, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

const Goal: NextPage = () => {
    return (
        <>
            <Flex h='94vh' justifyContent='center' alignItems='center'>
                <Heading></Heading>
                <Button
                    size='lg'
                    color='#5386fe'
                >
                    <NextLink href='/'>
                        <ChakraLink
                            fontWeight='bold'
                            _hover={{ textDecoration: 'none' }}
                        >
                            You did an amazing job!
                            <br />
                            See ya!
                        </ChakraLink>
                    </NextLink>
                </Button>
            </Flex>
        </>
    );
};

export default Goal;
