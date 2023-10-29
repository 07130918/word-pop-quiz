import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Head>
                <title>Word pop quiz</title>
            </Head>
            <Box
                h='100vh'
                w='100vw'
                bgImage="url('/backgroundImage.jpeg')"
                bgPosition='center'
                bgRepeat='no-repeat'
                bgSize='cover'
            >
                <Header />
                {children}
            </Box>
        </>
    );
};

export default Layout;
