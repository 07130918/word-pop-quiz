<template>
    <div>
        <h2>You've answered all the questions</h2>
        <button @click=moveToStart()>Retry</button>
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
