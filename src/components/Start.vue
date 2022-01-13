<template>
    <div>
        <!-- API通信中はローディング画面入れたい(コンポーネントで) -->
        <button @click=toQuiz>Start</button>
        <router-link to="/quiz" class="link" active-class="link--active" exact>
            Start
        </router-link>
    </div>
</template>

<script>
export default {
    methods: {
        toQuiz() {
            this.$router.push('quiz');
        }
    }
}
</script>
