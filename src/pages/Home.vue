<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { ElMessage } from "element-plus";
import Nav from "@/components/Nav.vue";
import Content from "@/components/Content.vue";
import Offline from "@/components/Offline.vue";
import { queryRateList } from "@/services/exchange";
import { uniq } from "@/utils/helpers";
import { useInterval } from "@/utils/use";

const dataList = ref([]);
const pageLoading = ref(false);
const typeList = computed(() => {
  return uniq(dataList.value.map((item) => item.type));
});
const activeType = ref("");
const rateList = computed(() => {
  return dataList.value.filter((item) => item.type === activeType.value);
});

// Reset active when data list chagnes.
watchEffect(() => {
  const invalid = typeList.value.indexOf(activeType.value) === -1;

  if (invalid) {
    activeType.value = typeList.value[0] || "";
  }
});

// Refresh data list.
const refreshRateList = () => {
  if (!dataList.value.length) {
    pageLoading.value = true;
  }

  queryRateList()
    .then((response) => {
      pageLoading.value = false;

      const data = Object.keys(response.rates).map((item) => {
        const value = response.rates[item];

        return Object.assign(value, {
          coin: item,
          value: parseFloat(value.value || "0").toFixed(3),
        });
      });

      dataList.value = data;
    })
    .catch((err) => {
      pageLoading.value = false;

      if (err.message) {
        ElMessage.error(err.message, {
          showClose: true,
        });
      }
    });
};

onMounted(() => {
  refreshRateList();
  useInterval(refreshRateList, 5000);
});
</script>

<template>
  <div class="container">
    <Nav v-model="activeType" :items="typeList" />
    <Offline />
    <Content :loading="pageLoading" :data-source="rateList" />
  </div>
</template>

<style>
.container {
  width: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  .container {
    width: 720px;
    margin: 24px auto;
  }
}

@media (min-width: 992px) {
  .container {
    width: 960px;
    margin: 32px auto;
  }
}

@media (min-width: 1400px) {
  .container {
    width: 1280px;
    margin: 48px auto;
  }
}
</style>
