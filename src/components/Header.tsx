import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();

    return (
        <>
            <Box
                height='6vh'
                backgroundColor='rgba(255, 255, 255, .2)'
                display='flex'
                justifyContent='right'
                alignItems='center'
            >
                <Button
                    marginRight={4}
                    colorScheme='teal'
                    onClick={() => router.push('/')}
                >
                    Quit
                </Button>
            </Box>
        </>
    );
};

export default Header
