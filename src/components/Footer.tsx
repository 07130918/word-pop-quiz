import { Box, Image, Link, Stack } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box
            position='fixed'
            bottom='0'
            width='full'
            h='8vh'
            borderTopWidth='1px'
            bg='rgba(255, 255, 255, .2)'
        >
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justifyContent='flex-start'
                alignItems='center'
                py={4}
                pl={4}
            >
                <Link
                    href='https://hi-there-this-is-kota.vercel.app'
                    isExternal
                    color='#FFF'
                    fontSize='sm'
                    _hover={{ color: '#00c8ff' }}
                >
                    Developer&apos;s Website
                </Link>
                <Link href='https://www.buymeacoffee.com/hi.im.kota' isExternal>
                    <Image
                        src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'
                        alt='Buy Me A Coffee'
                        h='30px'
                        w='108px'
                    />
                </Link>
                <Link href='https://www.paypal.com/paypalme/kotawebdev' isExternal>
                    <Image src='/paypal.png' alt='Paypal' h='45px' w='90px' />
                </Link>
            </Stack>
        </Box>
    );
};

export default Footer;
