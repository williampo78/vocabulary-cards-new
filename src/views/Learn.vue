<template>
  <div class="learn">
    <div v-if="connectedToDB" class="card">
      <i @click="changeIndex(-1)" class="fas fa-chevron-left"></i>

      <ul>
        <li @click="showAns">
          <span v-if="!answer"
            >{{ currentCard.word }} ({{ currentCard.partOfSpeech }})</span
          >
          <span v-if="answer">{{ currentCard.translation }}</span>
        </li>
      </ul>
      <i @click="changeIndex(1)" class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
import { db, colRef, getDocs } from "../firebase";

export default {
  data() {
    return {
      cards: [],
      connectedToDB: false,
      answer: false,
      index: 0,
    };
  },
  mounted() {
    getDocs(colRef).then((snapshot) => {
      this.connectedToDB = true;
      snapshot.docs.forEach((doc) => {
        this.cards.push({ ...doc.data(), id: doc.id });
      });
      console.log("cards:", this.cards);
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
  background: #fff;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 32%);
  border-radius: 20px;
  padding: 0 5px;
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
      outline: none;
    }
  }
  .fas {
    font-size: 30px;
  }
}
</style>
