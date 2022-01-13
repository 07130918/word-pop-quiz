<template>
    <div>
        <button @click=moveToQuiz()>Start</button>
    </div>
</template>

<script>
export default {
    methods: {
        moveToQuiz() {
            this.$router.push('quiz');
        }
    }
}
</script>
