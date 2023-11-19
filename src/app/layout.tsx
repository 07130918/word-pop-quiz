import Header from '@/components/Header';
import Providers from '@/components/providers';
import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'WORD POP QUIZ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ja'>
            <body>
                <Providers>
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
                </Providers>
            </body>
        </html>
    );
};
