import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
    const getWords = async () => {
        const res = await axios.get('/api/words');
        console.log(res.data);
        setWords(res.data);
    }
    const [words, setWords] = useState([]);
    return (
        <>
            <Box>テスト</Box>
            <Button onClick={getWords}>単語を取得</Button>
            {words.map((word: any) => (
                <Box key={word.id}>
                    {word.English}/
                    {word.Japanese}/
                    <Box>
                        選択肢＝＞
                        {word.choices[0]}/
                        {word.choices[1]}/
                        {word.choices[2]}/
                        {word.choices[3]}/
                    </Box>
                </Box>
            ))}
        </>
    );
};

export default Home
