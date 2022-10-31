import { Box } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        document.title = 'Word pop quiz';
    });

    return (
        <>
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
