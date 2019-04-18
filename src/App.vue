<template>
  <div>
    <h1>{{title}}</h1>
    {{runningTotal}}/{{totalBudget}}
    <div @click="addToBasket(card)" v-for="card in cards" v-bind:key="card.id">{{ card.name }}</div>
  </div>
</template>

<script>
import { BUDGET } from './constants';
const cards = require('../data/cards.json');
export default {
  name: 'App',
  data() {
    return {
      title: 'Budget Spel 💶',
      totalBudget: BUDGET,
      cards,
      basket: [],
    };
  },
  mounted() {
    // fetch('https://z0l80enr3f.execute-api.eu-west-1.amazonaws.com/latest/funds')
    //   .then(x => x.json())
    //   .then(funds => (this.funds = funds));
  },
  computed: {
    runningTotal: function() {
      return this.basket.reduce((a, b) => (a += b.price), 0);
    },
  },
  methods: {
    addToBasket(item) {
      this.basket.push(item);
    },
  },
};
</script>

<style>
</style>
