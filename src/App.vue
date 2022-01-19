<template>
    <div>
        <template v-if="loading">
            <div class="loader"></div>
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
            console.log(`We got ${response.data.length} words.`);
            this.words = this.fisherYatesShuffle(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            this.loading = false;
        });
    },
}
</script>

<style scoped>
    /* transitionタグname属性に対応する特別なclass */
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
</style>
