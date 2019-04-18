<template>
    <div class="wrapper">
        <span class="chip mdl-chip mdl-chip--contact">
            <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">€</span>
            <span class="mdl-chip__text">{{runningTotal}}/{{totalBudget}}</span>
        </span>

        <card v-if="!finish" v-on:addToB="addToBasket" :data="cards[cardIndex]"></card>
        <div v-if="finish">
            <button @click="reload" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">autorenew</i>
            </button>
        </div>
    </div>
</template>

<script>
    import {
        BUDGET
    } from './constants';
    const cards = require('../data/cards.json').sort(() => Math.random() - 0.5);;
    import card from './Card';
    export default {
        name: 'App',
        data() {
            return {
                title: 'Budget Spel 💶',
                totalBudget: BUDGET,
                cards,
                basket: [],
                cardIndex: 0,
                finish: false,
            };
        },
        mounted() {
            // fetch('https://z0l80enr3f.execute-api.eu-west-1.amazonaws.com/latest/funds')
            //   .then(x => x.json())
            //   .then(funds => (this.funds = funds));
        },
        computed: {
            runningTotal: function () {
                return this.basket.reduce((a, b) => (a += b.price), 0);
            },
        },
        components: {
            card
        },
        methods: {
            reload() {
                window.location.reload(true);
            },
            addToBasket(item) {
                if (!item) {
                    this.navigateCards(1);
                    return;
                }
                if (this.basket.find(basketItem => basketItem.id === item.id)) {
                    item.bought = false;
                    this.basket.splice(this.basket.indexOf(item), 1);
                } else {
                    item.bought = true;
                    this.basket.push(item);
                }
                this.navigateCards(1);
            },
            navigateCards(amount) {
                const newIndex = this.cardIndex + amount;
                if (newIndex >= 0 && newIndex < this.cards.length) {
                    this.cardIndex = newIndex;
                }
                if (newIndex === this.cards.length) {
                    this.finish = true;
                }
            }
        },
    };
</script>

<style lang="less" scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bought {
        text-decoration: line-through;
    }

    .chip {
        margin: 4rem;
    }
</style>