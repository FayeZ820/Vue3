<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:model-value"]);

const handleChange = (value) => {
  emit("update:model-value", value);
};
</script>

<template>
  <el-affix :offset="0">
    <div class="navbar">
      <div class="header">
        <img class="header__logo" src="../img/main-logo.png" />
      </div>
      <div class="tab">
        <el-tabs
          type="card"
          :model-value="props.modelValue"
          @update:model-value="handleChange"
        >
          <el-tab-pane
            v-for="item in props.items"
            :key="item"
            :label="item"
            :name="item"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-affix>
</template>

<style>
.navbar {
  background-color: rgba(0, 0, 0, 1);
}
.header {
  padding: 32px 16px;
}
.header__logo {
  width: 180px;
}
</style>
