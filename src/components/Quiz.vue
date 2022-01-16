<template>
    <div>
        <h3>Question {{ $route.params.num }}</h3>
        <h3>{{ words[questionIndex] }}</h3>
        <button>{{ words[questionIndex]["Japanese"] }}</button>
        <!-- <button>{{ makeChoicesAry[0]["Japanese"] }}</button>
        <button>{{ makeChoicesAry[1]["Japanese"] }}</button>
        <button>{{ makeChoicesAry[2]["Japanese"] }}</button> -->
        <button @click=moveToNextQuiz()>Next</button>
    </div>
</template>

<script>
export default {
    props: ["words"],
    data() {
        return {
            questionIndex: this.$route.params.num - 1,
        }
    },
    methods: {
        moveToNextQuiz() {
            this.$router.push(`/quiz/${Number(this.$route.params.num) + 1}`);
            this.questionIndex++;
            this.makeChoicesAry()
        },
        makeChoicesAry() {
            let choices = []
            choices.push(this.makeDummyAnswer())
            choices.push(this.makeDummyAnswer())
            choices.push(this.words[this.questionIndex])
            console.log(choices[Math.floor(Math.random() * 3)])
            // return choices[Math.floor(Math.random() * 3)]
        },
        makeDummyAnswer() {
            return this.words[Math.floor(Math.random() * this.words.length)]
        },
    }
}
</script>
