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
//const tabSearch = "Search";
const tabFavorite = "Favorite"
let tabList = ["Exchange rates"];
let key = "";
let favoriteList = [];
const pageLoading = ref(false);
const typeList = computed(() => {
  //return uniq(dataList.value.map((item) => item.type));
  return tabList;
});
const activeType = ref("");
const rateList = computed(() => {
  if(activeType.value === tabFavorite)
  {
    return favoriteList;
  }

  if(key !== "")
  {
    let tmp = dataList.value[dataList.value.length - 1].s;
    return dataList.value.filter((item) =>{
      let searchReg = new RegExp(key, "gi");
      if(searchReg.test(item.s) || searchReg.test(item.c)){
        if(tmp === item.s)
        {
          pageLoading.value = false;
        }
        return true;
      }else{
        if(tmp === item.s)
        {
          pageLoading.value = false;
        }
        return false;        
      }
    });
  }
  return dataList.value; 
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

      //dataList.value = response.response;
      //console.log(dataList.value[0]);

      const data = response.response.map((item) => {
        const value = item;
        return Object.assign(value, {
          c: parseFloat(value.c || "0").toFixed(2),
        });
      });
      dataList.value = data;
      console.log(dataList.value[0]);
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

function addFavorite(item, operate){

  console.log("addFavorit");

  if(operate === "del"){
    let index = favoriteList.indexOf(item);
    if(index !== -1)
    {
      favoriteList.splice(index, 1);
    }
    
  }else{
    if(tabList.indexOf(tabFavorite) === -1){
      tabList.push(tabFavorite);
    }
    activeType.value = tabFavorite;

    if(favoriteList.indexOf(item) === -1)
    {
      favoriteList.push(item);
    }
  }

}

function searchKeywords(keys) {
  pageLoading.value = true;
  /*
  if(tabList.indexOf(tabSearch) === -1){
    tabList.push(tabSearch);
  }
  activeType.value = tabSearch;
  */
  key = keys;
}

</script>

<template>
  <div class="container">
    <Nav v-model="activeType" :items="typeList" @update:getKyewords="searchKeywords" @update:addFavorit="addFavorite"/>
    <Offline />
    <Content :loading="pageLoading" :data-source="rateList" :nowTab="activeType" @update:favorite="addFavorite"/>
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
