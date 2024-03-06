import Providers from '@/app/providers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Stack } from '@chakra-ui/react';
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
                    <Stack
                        minH='100vh'
                        w='100vw'
                        overflow='scroll'
                        bgImage="url('/uyu_mint_item001.jpeg')"
                        bgPosition='center'
                        bgRepeat='no-repeat'
                        bgSize='cover'
                    >
                        <Header />
                        <Stack>{children}</Stack>
                        <Footer />
                    </Stack>
                </Providers>
            </body>
        </html>
    );
}
