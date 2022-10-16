import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
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
