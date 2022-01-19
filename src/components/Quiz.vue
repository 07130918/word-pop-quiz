<template>
    <div>
        <div class="quiz__header">
            <h4>Question {{ $route.params.num }}</h4>
            <h1 class="font-weight-bold">{{ words[questionIndex].English }}</h1>
        </div>
        <div class="quiz__content">
            <div v-for="choice in choices" :key="choice.Japanese">
                <button class="choice btn btn-success btn-lg" @click=judge(choice) type="submit" :disabled="isAnswered">
                    {{ choice.Japanese }}
                </button>
            </div>
            <div class="mt-4">
                <div class="d-inline">
                    <button class="btn btn-primary btn-lg mr-4" @click=moveToNextQuiz() :disabled="!isAnswered">Next</button>
                </div>
                <div class="d-inline" v-if="words[questionIndex].url && isAnswered">
                    <a class="btn btn-outline-info btn-lg" role="button" :href="words[questionIndex].url" target="_blank" rel="noopener noreferrer">
                        See more
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin'

export default {
    // router機能: quiz/以下に大きな数字が直接入力された場合Startへ返す
    beforeRouteEnter(to, from, next) {
        // vmは勝手に使える
        next(vm => {
            if (Number(to.params.num) > vm.words.length) {
                next('/');
            }
        });
    },
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
            while (choices.length != uniqueChoices.size) {
                choices = this.makeChoices();
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

            // 画面に表示させる必要あり
            if (answer.Japanese === this.trueAnswer.Japanese) {
                console.log("collect");
            } else {
                console.log("not collect");
            }
        },
        moveToNextQuiz() {
            // 最終問題回答後
            if (this.$route.params.num == this.words.length) {
                this.$router.push('/goal');
                return;
            }

            this.$router.push(`/quiz/${Number(this.$route.params.num) + 1}`);
            this.questionIndex++;
        },
    }
}
</script>
