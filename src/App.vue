<template>
    <div>{{ words }}</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            words: []
        }
    },
    created() {
        axios.get()
        .then(response => {
            console.log(response);
            this.words = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>
