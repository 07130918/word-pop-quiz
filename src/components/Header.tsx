import {
    AlertDialog, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Button, HStack, useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const Header = () => {
    const router = useRouter();
    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const moveToTop = () => {
        router.push('/');
        onClose();
    };

    return (
        <>
            <HStack
                height='6vh'
                backgroundColor='rgba(255, 255, 255, .2)'
                justifyContent='right'
            >
                {router.pathname === '/quiz/[id]' &&
                    <Button
                        colorScheme='teal'
                        mr={4}
                        onClick={onOpen}
                    >
                        Quit
                    </Button>
                }
                <AlertDialog
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Are you sure you want to finish?
                        </AlertDialogHeader>
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
        </>
    );
};

export default Header
