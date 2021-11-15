<template>
  <div class="input">
    <form action="">
      <label for="">單字:</label>
      <input class="word" type="text" ref="word" v-model.trim="input.word" />
      <br />
      <label for="">詞性:</label>
      <input class="pos" type="text" v-model.trim="input.partOfSpeech" />
      <br />
      <label for="">中文:</label>
      <input class="translate" type="text" v-model.trim="input.translation" />
      <br />
      <label for="">例句:</label>
      <input
        class="example"
        type="text"
        v-model.trim="input.example"
        @keyup.enter="addWord"
      />
      <br />
      <button
        class="btn btn-disabled"
        v-if="
          !(
            input.example &&
            input.word &&
            input.translation &&
            input.partOfSpeech
          )
        "
        disabled
      >
        加入
      </button>
      <button class="btn" v-else @click.prevent="addWord">加入</button>
    </form>
  </div>
</template>

<script>
import { colRef, addDoc, serverTimestamp } from "../firebase";

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
      //   axios
      //     .post("http://localhost:3000/cards", {
      //       word: input.word.toLowerCase(),
      //       partOfSpeech: input.partOfSpeech.toLowerCase(),
      //       translation: input.translation,
      //       example:
      //         input.example.charAt(0).toUpperCase() + input.example.slice(1),
      //     })
      //     .then((res) => {
      //       input.word = "";
      //       input.partOfSpeech = "";
      //       input.translation = "";
      //       input.example = "";
      //       this.cards.push(res.data);
      //       // console.log(res);
      //     })
      //     .catch((err) => {
      //       console.log(err.response);
      //     });
      // },
      // this.cards.push(this.input);
      addDoc(colRef, {
        word: input.word.toLowerCase(),
        partOfSpeech: input.partOfSpeech.toLowerCase(),
        translation: input.translation,
        example: input.example.charAt(0).toUpperCase() + input.example.slice(1),
        time: serverTimestamp(),
      }).then((res) => {
        console.log(res);
      });
      input.word = "";
      input.partOfSpeech = "";
      input.translation = "";
      input.example = "";
    },
  },
  mounted() {
    this.$refs.word.focus();
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    padding: 10px 0;
    max-width: 300x;
    min-width: 20vw;
    min-height: 200px;
    font-size: 23px;
    font-weight: bold;
    input {
      background: none;
      margin: 10px 0;
      width: 70%;
      height: 22px;
      outline: none;
      border: none;
      border-bottom: 1px solid black;
      font-size: 20px;
      padding-left: 3px;
      word-wrap: break-word;
    }
    .btn {
      margin-top: 15px;
      width: 100px;
      height: 45px;
      background: rgba(17, 48, 100, 0.61);
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-disabled {
      background: rgba(140, 171, 226, 0.61);
      color: #fff;
      cursor: default;
    }
  }
}
</style>
