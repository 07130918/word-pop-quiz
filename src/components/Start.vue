<template>
    <div>
        <div class="content__wrapper">
            <div>
                <h2 class="description">Let's start<br/>the word pop quiz</h2>
                <button class="btn btn-primary btn-lg" @click=moveToQuiz()>Start</button>
            </div>
        </div>
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
