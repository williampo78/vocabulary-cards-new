<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div v-for="(card, index) in cards" :key="index" class="card">
      {{ card.word }}
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
      this.cards.push(this.cards.push(res.data));
    });
  },
};
</script>
