<template>
  <div class="learn">
    <!-- <h1>This is an about page</h1> -->
    <div v-if="connectedToDB" class="card">
      <button @click="changeIndex(-1)"><=</button>
      <ul>
        <li @click="showAns">
          <span v-if="!answer"
            >{{ currentCard.word }} ({{ currentCard.partOfSpeech }})</span
          >
          <span v-if="answer">{{ currentCard.translation }}</span>
        </li>
      </ul>
      <button @click="changeIndex(1)">=></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cards: [{ word: "", partOfSpeech: "", translation: "", example: "" }],
      connectedToDB: false,
      answer: false,
      index: 0,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/cards").then((res) => {
      // console.log(res.data);
      this.cards = res.data;
      this.connectedToDB = true;
    });
  },
  methods: {
    showAns() {
      this.answer = !this.answer;
    },
    changeIndex(change) {
      let length = this.cards.length;
      this.index = (this.index + change + length) % length;
      this.answer = false;
    },
  },
  computed: {
    currentCard() {
      return this.cards[this.index];
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      width: 250px;
      height: 150px;
      margin: 20px 0;
      font-size: 30px;
      cursor: pointer;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  button {
    width: 30px;
    height: 30px;
  }
}
</style>
