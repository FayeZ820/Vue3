<script setup>
import { watch, ref } from "vue";
import { useOnline } from "@/utils/use";

const state = ref("");
const isOnline = useOnline();

watch(isOnline, (value, prevValue) => {
  if (!prevValue && value) {
    state.value = "online";

    setTimeout(() => {
      state.value = "";
    }, 1000);
  } else if (prevValue && !value) {
    state.value = "offline";
  }
});
</script>

<template>
  <div class="offline">
    <el-alert
      v-show="state === 'online'"
      title="You are online now."
      type="success"
      effect="dark"
      :closable="false"
    />
    <el-alert
      v-show="state === 'offline'"
      title="You are offline now."
      type="error"
      effect="dark"
      :closable="false"
    />
  </div>
</template>

<style>
.offline {
  padding: 0 16px 16px;
}
</style>
