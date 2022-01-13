<template>
    <div>
        <template v-if="loading">
            <div class="loader">Now loading...</div>
        </template>
        <template v-else>
            <transition name="fade" mode="out-in">
                <router-view :words="words"></router-view>
            </transition>
        </template>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loading: true,
            words: [],
        }
    },
    created() {
        axios.get()
        .then(response => {
            console.log(response);
            this.words = this.fisherYatesShuffle(response.data);
            this.loading = false;
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
