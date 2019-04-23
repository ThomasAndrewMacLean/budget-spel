<template>
    <div class="wrapper">
        <div class="page" v-if="currentPage === pages.landingpage && intro">
            <h2>{{intro.titel}}</h2>
            <p>{{intro.text}}</p>
            <button @click="currentPage = pages.intro"
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                Button
            </button>

        </div>

        <div class="overflow" v-if="currentPage === pages.intro">
            <p>{{intro.mama}}</p>
            <p>{{intro.papa}}</p>
            <p>{{intro.dochter}}</p>
            <p>{{intro.zoontje}}</p>
            <p>{{intro.zus}}</p>

            <button @click="currentPage = pages.cards"
                class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Start
            </button>

        </div>

        <div class="page" v-if="currentPage === pages.cards">
            <button id="basket" @click="showShoppingcart"
                class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">shopping_cart</i>
            </button>
            <chip :runningTotal="runningTotal" :totalBudget="totalBudget"></chip>
            <card v-if="cards.length" v-on:addToB="addToBasket" :data="cards[cardIndex]"></card>
        </div>

        <div class="page overflow" v-if="currentPage === pages.shoppingcart">
            <button id="basket" @click="showCards"
                class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">shopping_cart</i>
            </button>
            <chip :runningTotal="runningTotal" :totalBudget="totalBudget"></chip>

            <ul class="demo-list-control mdl-list">
                <li v-for="card in history" @click="toggleBasket({data: card})" v-bind:key="card.id"
                    class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        {{card.name}}</span>
                    <span class="mdl-list__item-secondary-action">
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-1">
                            <input type="checkbox" id="list-checkbox-1" class="mdl-checkbox__input"
                                :checked="basket.indexOf(card)>-1" />
                        </label>
                    </span>
                </li>
            </ul>
        </div>

        <div class="page" v-if="currentPage === pages.summary">
            <button @click="reload"
                class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">autorenew</i>
            </button>
        </div>
    </div>
</template>

<script>
    import {
        BUDGET,
        pages
    } from './constants';

    import card from './Card';
    import chip from './TotalAmountSpentChip';

    export default {
        name: 'App',
        data() {
            return {
                title: 'Budget Spel 💶',
                totalBudget: BUDGET,
                cards: [],
                history: [],
                intro: null,
                basket: [],
                pages,
                cardIndex: 0,
                currentPage: pages.landingpage,
            };
        },
        mounted() {
            // This can be swappet out later for api call to Database
            const cards = require('../data/cards.json').sort(() => Math.random() - 0.5);
            this.cards = cards;
            const intro = require('../data/intro.json');
            this.intro = intro;
        },
        computed: {
            runningTotal: function () {
                return this.basket.reduce((a, b) => (a += b.price), 0);
            },
            // handledCards: function () {
            //     const newCards = [...this.cards];
            //     return newCards.splice(0, this.cardIndex);
            // }
        },
        components: {
            card,
            chip,
        },
        methods: {
            showShoppingcart() {
                this.currentPage = this.pages.shoppingcart;
            },
            showCards() {
                this.currentPage = this.pages.cards;
            },
            reload() {
                this.currentpage = this.pages.landingpage;
                this.cardIndex = 0;
                this.basket = [];

                //hard reload, prob not needed here?
                //window.location.reload(true);
            },
            addToBasket(item) {
                this.history.push(item.data);
                if (!item.add) {
                    this.navigateCards(1);
                    return;
                }
                if (this.basket.find(basketItem => basketItem.id === item.data.id)) {
                    this.basket.splice(this.basket.indexOf(item.data), 1);
                } else {
                    this.basket.push(item.data);
                }

                this.navigateCards(1);
            },
            toggleBasket(item) {
                if (this.basket.find(basketItem => basketItem.id === item.data.id)) {
                    if (!item.data.obligatory) {
                        this.basket.splice(this.basket.indexOf(item.data), 1);
                    }
                } else {
                    this.basket.push(item.data);
                }
            },
            navigateCards(amount) {
                const newIndex = this.cardIndex + amount;
                if (newIndex >= 0 && newIndex < this.cards.length) {
                    this.cardIndex = newIndex;
                }
                if (newIndex === this.cards.length) {
                    this.currentPage = this.pages.summary;
                }
            },
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

    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
    }

    .overflow {
        overflow: auto;
    }

    .demo-list-control {
        width: 300px;
    }

    #basket {
        position: absolute;
        left: 2rem;
        top: 1rem;
    }
</style>
