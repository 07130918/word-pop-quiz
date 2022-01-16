<template>
    <div>
        <button @click=moveToQuiz()>Start</button>
    </div>
</template>

<script>
export default {
    methods: {
        moveToQuiz() {
            // :numが1になる
            this.$router.push('/quiz/1');
        },
    }
}
</script>
