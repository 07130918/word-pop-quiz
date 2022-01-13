<template>
    <div>
        <!-- API通信中はローディング画面入れたい(コンポーネントで) -->
        <button @click=moveToQuiz()>Start</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            words: [],
        }
    },
    created() {
        axios.get()
        .then(response => {
            console.log(response);
            this.words = this.fisherYatesShuffle(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        fisherYatesShuffle(arr) {
            for(let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
            return arr;
        },
        moveToQuiz() {
            this.$router.push('quiz');
        },
    }
}
</script>
