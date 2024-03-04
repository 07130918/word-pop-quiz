import Providers from '@/app/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'WORD POP QUIZ',
    description: 'A pop quiz app for English vocabulary',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    <Box
                        h='100vh'
                        w='100vw'
                        bgImage="url('/uyu_mint_item001.jpeg')"
                        bgPosition='center'
                        bgRepeat='no-repeat'
                        bgSize='cover'
                    >
                        <Header />
                        {children}
                        <Footer />
                    </Box>
                </Providers>
            </body>
        </html>
    );
}
