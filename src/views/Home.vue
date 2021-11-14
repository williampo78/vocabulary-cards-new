<template>
  <div class="home">
    <Input :input="input" :cards="cards" />
    <div v-if="connectedToDB" class="card">
      <h1>單字列表</h1>
      <div class="cardsBox">
        <ol>
          <li v-for="(card, index) in cards" :key="index">
            <p v-if="editedCard !== index" class="word">
              {{ card.word }} <span class="pos">({{ card.partOfSpeech }})</span>
            </p>
            <p v-if="editedCard !== index" class="translate">
              {{ card.translation }}
            </p>
            <p v-if="editedCard !== index" class="example">
              e.g. {{ card.example }}
            </p>

            <!-- 更新 -->
            <i @click="startEdit(index)" class="beforeEdit fas fa-edit"></i>
            <i
              @click="deleteHandler(card.id)"
              class="beforeEdit fas fa-trash-alt"
            ></i>
            <!-- <div
              class="edit"
              v-if="editedCard === index && updateCancelHandler"
            >
              <p>
                <input
                  class="edit-input edit-word"
                  type="text"
                  v-model.trim="editInput.word"
                />
                <span>
                  (<input
                    class="edit-input edit-pos"
                    type="text"
                    v-model.trim="editInput.partOfSpeech"
                  />)
                </span>
              </p>

              <p>
                <input
                  class="edit-input edit-translate"
                  type="text"
                  v-model.trim="editInput.translation"
                />
              </p>

              <p>
                <input
                  class="edit-input edit-example"
                  type="text"
                  v-model.trim="editInput.example"
                  @keyup.enter="updateHandler(index)"
                />
              </p>

             
            <!-- </div> -->

            <form v-if="editedCard === index && updateCancelHandler" action="">
              <label for="">單字:</label>
              <input
                class="word"
                type="text"
                ref="word"
                v-model.trim="editInput.word"
              />
              <br />
              <label for="">詞性:</label>
              <input
                class="pos"
                type="text"
                v-model.trim="editInput.partOfSpeech"
              />
              <br />
              <label for="">中文:</label>
              <input
                class="translate"
                type="text"
                v-model.trim="editInput.translation"
              />
              <br />
              <label for="">例句:</label>
              <textarea
                class="example"
                type="text"
                v-model.trim="editInput.example"
                @keyup.enter="addWord"
              />
              <br />
              <button @click="updateHandler(index)">更新</button>
              <button @click="updateCancelHandler(index)">取消</button>
            </form>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
// import axios from "axios";
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
      edit: false,
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
      // this.edit = true;
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
      this.edit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  .card {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cardsBox {
      display: flex;
      justify-content: center;
      align-items: center;
      ol {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style-type: none;
        width: 100vw;
        li {
          display: none;
          position: relative;
          background: #fff;
          max-width: 350px;
          width: 90%;
          min-height: 180px;
          cursor: default;
          margin: 5px 0;
          padding: 0 5px;
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            // display: none;
            width: 90%;
            height: auto;
            margin: 10px 0;
            word-wrap: normal;
          }
          .word {
            font-size: 36px;
            color: rgb(30, 103, 185);
            .pos {
              font-size: 20px;
            }
          }
          .translate {
            font-size: 25px;
          }
          .example {
            font-size: 18px;
          }
          .beforeEdit {
            cursor: pointer;
            opacity: 1;
          }
          &:hover .beforeEdit {
            opacity: 1;
          }
          .fa-edit {
            position: absolute;
            top: 10px;
            right: 35px;
            transition: all 0.5s ease;
            color: rgb(39, 132, 238);
          }
          .fa-trash-alt {
            position: absolute;
            top: 10px;
            right: 10px;
            color: rgb(209, 39, 39);
            transition: all 0.5s ease;
          }
          .edit {
            width: 100%;
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .edit-input {
              width: 100%;
              text-align: center;
            }
            .edit-word {
              font-size: 36px;
              color: rgb(30, 103, 185);
            }
            .edit-pos {
              width: 50px;
            }
            .edit-translate {
              font-size: 25px;
            }
          }

          form {
            padding: 10px 0;
            max-width: 300px;
            min-width: 50vw;
            min-height: 200px;
            font-size: 20px;
            font-weight: bold;
            input {
              background: none;
              margin: 10px 0;
              width: 70%;
              // height: 22px;
              height: auto;
              outline: none;
              border: none;
              border-bottom: 1px solid black;
              font-size: 20px;
              padding-left: 3px;
              word-wrap: break-word;
            }
            textarea {
              border: none;
              outline: none;
              border-bottom: 1px solid black;
              resize: none;
              height: auto;
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
            }
            .btn-disabled {
              background: rgba(140, 171, 226, 0.61);
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
