<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="card">
      <ol>
        <li v-for="(card, index) in cards" :key="index">
          {{ card.word }} ({{ card.partOfSpeech }}) {{ card.translation }}
          <br />
          e.g. {{ card.example }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import axios from "axios";
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      cards: [{ word: "", partOfSpeech: "", translation: "", example: "" }],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/cards").then((res) => {
      console.log(res.data);
      this.cards = res.data;
    });
  },
};
</script>
