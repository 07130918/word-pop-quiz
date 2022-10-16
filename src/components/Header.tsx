import { Box, Button, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from "next/link";

const Header = () => {
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
                >
                    <NextLink href='/'>
                        <ChakraLink
                            fontWeight='bold'
                            _hover={{ textDecoration: 'none' }}
                        >Quit
                        </ChakraLink>
                    </NextLink>
                </Button>
            </Box>
        </>
    );
};

export default Header
