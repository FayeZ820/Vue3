<script setup>
import Home from "@/pages/Home.vue";
</script>

<template>
  <Home />
</template>

<style>
/**
 * Global styles
 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  background: url("./img/banner-img-bk.jpeg") no-repeat center top fixed;
  background-size: cover;
}

:root {
  --el-border-color-light: #2b2b9b;
}
.el-table {
  --el-table-background-color: rgba(0, 0, 0, 0.5);
  --el-table-header-background-color: rgba(0, 0, 0, 0.5);
  --el-table-border-color: #313459;
  --el-table-row-hover-background-color: #313459;
  --el-table-font-color: #ccc;
}
.el-table tr {
  --el-table-tr-background-color: var(--el-table-background-color);
}
.el-skeleton {
  --el-skeleton-color: #2b2b9b;
  --el-skeleton-to-color: rgba(0, 0, 0, 0.5);
}
.el-tabs__item {
  color: #409eff;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #409eff;
}
.el-card {
  --el-card-background-color: rgba(0, 0, 0, 0.5);
}
</style>
