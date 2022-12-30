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
                minH={'100vh'}
                bgImage="url('/backgroundImage.jpeg')"
                bgPosition='center'
                bgRepeat='no-repeat'
            >
                <Header />
                {children}
            </Box>
        </>
    );
};

export default Layout;
