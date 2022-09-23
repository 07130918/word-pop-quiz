import { Box, Button } from '@chakra-ui/react';

const Header = () => {
    return (
        <>
            <Box
                height='8vh'
                backgroundColor='rgba(255, 255, 255, .2)'
                display='flex'
                justifyContent='right'
                alignItems='center'
            >
                <Button
                    marginRight={10}
                    colorScheme='teal'
                >Quit</Button>
            </Box>
        </>
    );
};

export default Header
