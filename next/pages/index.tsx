import type { NextPage } from 'next'
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios';

const Home: NextPage = () => {
    const getWords = async () => {
        const res = await axios.get('/api/words');
        console.log(res.data);
    }
    return (
        <>
            <Box>テスト</Box>
            <Button onClick={getWords}>単語を取得</Button>
        </>
    );
};

export default Home
