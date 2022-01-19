<template>
    <div>
        <div class="wrapper">
            <header>
                <div class="header-quit">
                    <button class="quit-btn btn btn-danger btn-lg" @click=moveToGoal()>Quit</button>
                </div>
            </header>
            <div class="quiz__header">
                <h3>Question {{ $route.params.num }}</h3>
                <h1 class="font-weight-bold">{{ words[questionIndex].English }}</h1>
            </div>
            <div class="quiz__content">
                <div class="choice__wrapper" v-for="choice in choices" :key="choice.English">
                    <button class="choice__btn btn btn-success btn-lg" @click=judge(choice) type="submit" :disabled="isAnswered">
                        {{ choice.Japanese }}
                    </button>
                </div>
                <div class="mt-5">
                    <div class="d-inline">
                        <button class="btn btn-primary btn-lg mr-4" @click=moveToNextQuiz() :disabled="!isAnswered">Next</button>
                    </div>
                    <div class="d-inline" v-if="words[questionIndex].url && isAnswered">
                        <a class="btn btn-info btn-lg" role="button" :href="words[questionIndex].url" target="_blank" rel="noopener noreferrer">
                            See more
                        </a>
                    </div>
                </div>
            </div>
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
    // router機能: quiz/以下に大きな数字が直接入力された場合Startへ返す
    beforeRouteEnter(to, from, next) {
        // vmは勝手に使える
        next(vm => {
            if (Number(to.params.num) > vm.words.length) {
                next('/');
            }
        });
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
            return this.words[Math.floor(Math.random() * this.words.length)];
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
        moveToGoal() {
            this.$router.push('/goal');
        },
        moveToNextQuiz() {
            // 最終問題回答後
            if (this.$route.params.num == this.words.length) {
                this.moveToGoal();
                return;
            }

            this.$router.push(`/quiz/${Number(this.$route.params.num) + 1}`);
            this.questionIndex++;
        },
    }
}
</script>
