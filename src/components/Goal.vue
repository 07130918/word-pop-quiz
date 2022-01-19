<template>
    <div class="content">
        <h2 class="description">You've answered all questions</h2>
        <button class="btn btn-primary btn-lg" @click=moveToStart()>Retry</button>
    </div>
</template>

<script>
export default {
    methods: {
        moveToStart() {
            this.$router.push('/');
        },
    }
}
</script>
