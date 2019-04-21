<template>
    <span class="chip mdl-chip mdl-chip--contact">
        <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">€</span>
        <span class="mdl-chip__text">{{runningTotal}}/{{totalBudget}}</span>
    </span>
</template>

<script>
    export default {
        props: {
            runningTotal: {
                type: Number,
                required: true,
            },
            totalBudget: {
                type: Number,
                required: true,
            }
        }
    };
</script>

<style>

</style>