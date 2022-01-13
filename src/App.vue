<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
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
        console.log(this.$route);
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
    }
}
</script>

<style scoped>
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
</style>
