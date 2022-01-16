<template>
    <div>
        <h3>Question {{ $route.params.num }}</h3>
        <h2>{{ words[questionIndex].English }}</h2>
        <div>
            <button @click=judge(choices[0].Japanese) type="submit">
                {{ choices[0].Japanese }}
            </button>
            <button @click=judge(choices[1].Japanese) type="submit">
                {{ choices[1].Japanese }}
            </button>
            <button @click=judge(choices[2].Japanese) type="submit">
                {{ choices[2].Japanese }}
            </button>
        </div>
        <button @click=moveToNextQuiz()>Next</button>
    </div>
</template>

<script>
import mixin from '../mixin'

export default {
    props: ["words"],
    mixins: [mixin],
    data() {
        return {
            questionIndex: this.$route.params.num - 1,
            choices: [],
        }
    },
    created() {
        this.getChoices();
    },
    watch: {
        // URL変更を監視(SPAはページ遷移している様に見せているだけ)
        $route() {
            this.getChoices();
        }
    },
    methods: {
        getChoices() {
            if (this.choices.length) this.choices = [];

            this.makeShuffledChoices().forEach(choice => {
                this.choices.push(choice);
            });
        },
        makeShuffledChoices() {
            let choices = [];
            choices.push(this.getDummyAnswer());
            choices.push(this.getDummyAnswer());
            choices.push(this.words[this.questionIndex]);
            return this.fisherYatesShuffle(choices);
        },
        getDummyAnswer() {
            return this.words[Math.floor(Math.random() * this.words.length)]
        },
        judge(answer) {
            if (answer === this.words[this.questionIndex].Japanese) {
                console.log("collect");
            } else {
                console.log("not collect");
            }
        },
        moveToNextQuiz() {
            this.$router.push(`/quiz/${Number(this.$route.params.num) + 1}`);
            this.questionIndex++;
        },
    }
}
</script>
