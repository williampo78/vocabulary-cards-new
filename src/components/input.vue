<template>
  <div class="input">
    單字: <input type="text" v-model.trim="input.word" /> 詞性:
    <input type="text" v-model.trim="input.partOfSpeech" /> 中文:
    <input type="text" v-model.trim="input.translation" /> 例句:
    <input type="text" v-model.trim="input.example" @keyup.enter="addWord" />

    <button
      v-if="
        input.example &&
        input.example &&
        input.translation &&
        input.partOfSpeech
      "
      @click="addWord"
    >
      加入
    </button>
    <h2>This is input</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Input",
  props: {
    input: Object,
    cards: Array,
  },
  methods: {
    addWord() {
      let input = this.input;
      if (!input) {
        return false;
      }
      axios
        .post("http://localhost:3000/cards", {
          word: input.word.toLowerCase(),
          partOfSpeech: input.partOfSpeech.toLowerCase(),
          translation: input.translation,
          example:
            input.example.charAt(0).toUpperCase() + input.example.slice(1),
        })
        .then((res) => {
          input.word = "";
          input.partOfSpeech = "";
          input.translation = "";
          input.example = "";
          this.cards.push(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
