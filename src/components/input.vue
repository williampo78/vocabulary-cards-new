<template>
  <div class="input">
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
