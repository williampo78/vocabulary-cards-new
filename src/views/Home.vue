<template>
  <div class="home">
    <Input :input="input" :cards="cards" />
    <div v-if="connectedToDB" class="card">
      <h1>單字列表</h1>
      <ol>
        <li v-for="(card, index) in cards" :key="index">
          {{ card.word }} ({{ card.partOfSpeech }}) {{ card.translation }}
          <!-- <br /> -->
          e.g. {{ card.example }}
          <button class="beforeEdit" @click="startEdit(index)">修改</button>
          <button class="beforeEdit" @click="deleteHandler(card.id)">
            刪除
          </button>
          <div v-if="editedCard === index && updateCancelHandler">
            單字:
            <input type="text" v-model.trim="editInput.word" />
            詞性:
            <input type="text" v-model.trim="editInput.partOfSpeech" />

            中文:
            <input type="text" v-model.trim="editInput.translation" /> 例句:
            <input
              type="text"
              v-model.trim="editInput.example"
              @keyup.enter="updateHandler(index)"
            />
            <button @click="updateHandler(index)">更新</button>
            <button @click="updateCancelHandler(index)">取消</button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
// import axios from "axios";
// import { getFirestore, addDoc } from "firebase/firestore";
import { db, colRef, getDocs, deleteDoc, doc, onSnapshot } from "../firebase";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Input,
  },
  data() {
    return {
      editedCard: null,
      connectedToDB: false,
      // cards: [{ word: "", partOfSpeech: "", translation: "", example: "" }],
      cards: [],
      input: {
        word: "",
        partOfSpeech: "",
        translation: "",
        example: "",
      },
      editInput: {
        word: "",
        partOfSpeech: "",
        translation: "",
        example: "",
      },
    };
  },
  mounted() {
    // axios.get("http://localhost:3000/cards").then((res) => {
    //   // console.log(res.data);
    //   this.cards = res.data;
    //   this.connectedToDB = true;
    // });
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // this.cards = [];
          this.cards.push({ ...doc.data(), id: doc.id });
        });
        console.log(this.cards);
        this.connectedToDB = true;
      })
      .catch((err) => {
        console.log(err);
      });

    // const q = query(colRef);

    onSnapshot(colRef, (snapshot) => {
      this.cards = [];
      snapshot.docs.forEach((doc) => {
        this.cards.push({ ...doc.data(), id: doc.id });
      });
      console.log("cards:", this.cards);
    });
  },
  methods: {
    startEdit(index) {
      this.editInput.word = this.cards[index].word;
      this.editInput.partOfSpeech = this.cards[index].partOfSpeech;
      this.editInput.translation = this.cards[index].translation;
      this.editInput.example = this.cards[index].example;
      this.editedCard = index;
      console.log(this.editedCard, index);
    },
    deleteHandler(index) {
      // let target = this.cards[index];
      // axios.delete(`http://localhost:3000/cards/${target.id}`).then((res) => {
      //   this.cards.splice(index, 1);
      //   console.log(res);
      // });
      const docRef = doc(db, "cards", index);
      deleteDoc(docRef).then(() => {
        console.log("deleted");
      });
    },
    updateHandler(index) {
      let target = this.cards[index];
      axios
        .patch(`http://localhost:3000/cards/${target.id}`, {
          word: this.editInput.word,
          partOfSpeech: this.editInput.partOfSpeech,
          translation: this.editInput.translation,
          example: this.editInput.example,
        })
        .then((res) => {
          this.editInput.word = "";
          this.editInput.partOfSpeech = "";
          this.editInput.translation = "";
          this.editInput.example = "";
          this.cards.splice(index, 1, res.data);
          this.editedCard = null;
        });
    },
    updateCancelHandler(index) {
      this.editedCard = null;
    },
  },
};
</script>

<style lang="scss" scoped>
ol {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  li {
    // margin-left: 50px;
    // display: flex;
    cursor: default;
    .beforeEdit {
      display: none;
    }
    &:hover .beforeEdit {
      display: inline-block;
    }
  }
}
</style>
