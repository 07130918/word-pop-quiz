<template>
    <div>
        <h3>Question {{ $route.params.num }}</h3>
        <h3>{{ words[$route.params.num] }}</h3>
        <button @click=moveToNextQuiz()>Next</button>
    </div>
</template>

<script>
export default {
    props: ["words"],
    methods: {
        moveToNextQuiz() {
            this.$router.push(`/quiz/${Number(this.$route.params.num) + 1}`);
        },
    }
}
</script>
