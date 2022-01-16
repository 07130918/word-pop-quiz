<template>
    <div>
        <h3>Question {{ $route.params.num }}</h3>
        <h2>{{ words[questionIndex].English }}</h2>
        <div>
            <div v-for="choice in choices" :key="choice.Japanese">
                <button @click=judge(choice) type="submit" :disabled="isAnswered">
                    {{ choice.Japanese }}
                </button>
            </div>
        </div>
        <div>
            <a :href="words[questionIndex].url" target="_blank" rel="noopener noreferrer">
                詳しく見る
            </a>
        </div>
        <div>
            <button @click=moveToNextQuiz() :disabled="!isAnswered">Next</button>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin'

export default {
    props: ["words"],
    mixins: [mixin],
    data() {
        return {
            choices: [],
            isAnswered: false,
            questionIndex: this.$route.params.num - 1,
        }
    },
    created() {
        this.getChoices();
    },
    watch: {
        // URL変更を監視(SPAはページ遷移している様に見せているだけ)
        $route() {
            this.isAnswered = false;
            this.getChoices();
        }
    },
    computed: {
        trueAnswer() {
            return this.words[this.questionIndex];
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
            let choices = this.makeChoices();
            // 選択肢が重複しないようにする
            let uniqueChoices = new Set(choices);
            while (uniqueChoices.size != choices.length) {
                choices = this.makeChoices();
                this.makeChoices(choices);
                uniqueChoices = new Set(choices);
            }
            return this.fisherYatesShuffle(choices);
        },
        makeChoices() {
            let choices = [];
            choices.push(this.getDummyAnswer());
            choices.push(this.getDummyAnswer());
            choices.push(this.trueAnswer);
            return choices;
        },
        getDummyAnswer() {
            return this.words[Math.floor(Math.random() * this.words.length)]
        },
        judge(answer) {
            this.isAnswered = true;

            if (answer.Japanese === this.trueAnswer.Japanese) {
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
