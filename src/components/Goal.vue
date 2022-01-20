<template>
    <div class="content__wrapper">
        <div>
            <h2 class="description">{{ message }}</h2>
            <button class="btn btn-primary btn-lg" @click=moveToRoot()>Retry</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["words"],
    data() {
        return {
            message: '',
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (Number(from.params.num) === vm.words.length) {
                vm.message = "You've answered all questions";
            } else {
                vm.message = "See ya !";
            }
        });
    },
    methods: {
        moveToRoot() {
            this.$router.push('/');
        },
    }
}
</script>
