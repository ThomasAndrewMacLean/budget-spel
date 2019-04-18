<template>
    <div>

        <!-- <h1>{{data.name}}</h1>
        <button @click="$emit('addToB', data)"
            class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">shopping_cart</i>
        </button> -->

        <!-- Square card -->

        <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">{{data.name}}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                {{data.priceString}}
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a @click="$emit('addToB', data)"
                    class="float-right mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                    Kopen <i class="material-icons">shopping_cart</i> </a>
                <a :disabled="data.obligatory" @click="!data.obligatory && $emit('addToB')"
                    class="float-right mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    Overslaan
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style scoped>
    .demo-card-square.mdl-card {
        width: 320px;
        height: 320px;
    }

    .demo-card-square>.mdl-card__title {
        color: #fff;
        background:
            #46B6AC;
    }

    .float-right {
        float: right;
    }
</style>