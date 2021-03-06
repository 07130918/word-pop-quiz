<template>
    <div>
        <header>
            <button class="btn btn-danger btn-lg" @click=moveToGoal()>Quit</button>
        </header>
        <div class="quiz__wrapper">
            <div :class="{ 'correct-icon': isCorrectAnswer }">
                <span></span>
            </div>
            <div :class="{ 'incorrect-icon': isIncorrectAnswer }"></div>
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
                <div class="quiz__next">
                    <div class="d-inline">
                        <button class="btn btn-primary btn-lg mr-4" @click=moveToNextQuiz() :disabled="!isAnswered">Next</button>
                    </div>
                    <div class="d-inline" v-if="words[questionIndex].url && isAnswered">
                        <a class="btn btn-info btn-lg" role="button" :href="words[questionIndex].url" target="_blank" rel="noopener noreferrer">
                            View details
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
            isCorrectAnswer: false,
            isIncorrectAnswer: false,
            questionIndex: this.$route.params.num - 1,
        }
    },
    // router機能: quiz/以下に大きな数字が直接入力された場合Startへ返す
    beforeRouteEnter(to, from, next) {
        // vmは勝手に使える
        next(vm => {
            if (Number(to.params.num) > vm.words.length) {
                console.log('Invalid URL');
                next('/');
            }
        });
    },
    created() {
        this.getChoices();
    },
    watch: {
        // quiz/以下のURL変更を監視(SPAはページ遷移している様に見せているだけ)
        $route() {
            this.isAnswered = false;
            this.isCorrectAnswer = false;
            this.isIncorrectAnswer = false;
            this.getChoices();
            this.btnsStyleChangeTo('init');
        }
    },
    computed: {
        trueAnswer() {
            return this.words[this.questionIndex];
        },
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
            for (let i = 0; i < 3; i++) {
                choices.push(this.getDummyAnswer());
            }
            choices.push(this.trueAnswer);
            return choices;
        },
        getDummyAnswer() {
            return this.words[Math.floor(Math.random() * this.words.length)];
        },
        judge(answer) {
            this.isAnswered = true;
            this.btnsStyleChangeTo('result');
            if (answer.Japanese === this.trueAnswer.Japanese) {
                this.isCorrectAnswer = true;
                setTimeout(() => {
                    this.isCorrectAnswer = false;
                }, 1000)
            } else {
                this.isIncorrectAnswer = true;
                setTimeout(() => {
                    this.isIncorrectAnswer = false;
                }, 1000)
            }
        },
        // ボタンの見た目変更に関わる関数群
        btnsStyleChangeTo(flg) {
            document.querySelectorAll(".choice__btn").forEach(btn => {
                flg === 'init' ? this.toInitStyle(btn) : this.toResultStyle(btn);
            });
        },
        toInitStyle(btn) {
            if(btn.className.split(' ').includes('btn-danger')) {
                btn.classList.replace('btn-danger', 'btn-success');
            } else {
                btn.classList.replace('btn-outline-secondary', 'btn-success');
            }
        },
        toResultStyle(btn) {
            if (btn.innerText === this.trueAnswer.Japanese) {
                btn.classList.replace('btn-success','btn-danger');
            } else {
                btn.classList.replace('btn-success','btn-outline-secondary');
            }
        },
        // ページ遷移関数群
        moveToGoal() {
            this.$router.push('/goal');
        },
        moveToNextQuiz() {
            // 最終問題回答後
            if (Number(this.$route.params.num) === this.words.length) {
                this.moveToGoal();
                return;
            }

            this.$router.push(`/quiz/${Number(this.$route.params.num) + 1}`);
            this.questionIndex++;
        },
    }
}
</script>
