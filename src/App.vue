<template>
    <div>
        <template v-if="loading">
            <div class="loader absolute inset-0 m-auto"></div>
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
import mixin from './mixin'

export default {
    mixins: [mixin],
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
