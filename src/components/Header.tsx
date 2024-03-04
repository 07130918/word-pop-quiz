'use client';
import {
    AlertDialog,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Link as ChakraLink,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SPREAD_SHEET_LINK =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQznRmPGPj_4QHBBi1Rnej-sOGTc3D6OlMPwH6TUEVWrFzxzLMKnyejLhKT5jxwpk7DNlzaKW4FQcYc/pubhtml?gid=0&single=true';

const Header = () => {
    const router = useRouter();
    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const moveToTop = () => {
        router.push('/');
        onClose();
    };

    return (
        <HStack h='8vh' backgroundColor='rgba(255, 255, 255, .2)' justifyContent='right'>
            <Box pr={2}>
                <NextLink href={SPREAD_SHEET_LINK} passHref legacyBehavior>
                    <ChakraLink isExternal color='#FE53BB' fontWeight='bold'>
                        See the source
                    </ChakraLink>
                </NextLink>
            </Box>
            <Button colorScheme='blackAlpha' mr={4} onClick={onOpen}>
                Quit
            </Button>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Are you sure you want to finish?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={moveToTop}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </HStack>
    );
};

export default Header;
