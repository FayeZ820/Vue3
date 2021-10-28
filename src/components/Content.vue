<script setup>
import { defineProps, computed, ref, defineEmits } from "vue";
import { useWindowSize, useInterval } from "@/utils/use";
import { debounce } from "lodash-es";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  dataSource: {
    type: Array,
    required: true,
  },
  nowTab: {
    tab: String,
    required: true,
  }
});

const { width } = useWindowSize();

const tabFavorite = "Favorite"

const layout = computed(() => {
  return width.value > 425 ? "table" : "card";
});

const theme = ref("red");

/*
function addFavorit(item, index, event){
  console.log(item);
  console.log("KKKKKKK");
  console.log(index);
  console.log(event);
  console.log("end");
}
*/

const emit = defineEmits([ "update:favorite" ]);

const addFavorit=debounce(function(item, index, event) {

  console.log(props.nowTab);

  if(props.nowTab === tabFavorite){
    let res = window.confirm('Are you sure to delete the item from your favorite?');
    if(res){
      emit("update:favorite", item, "del");
    }
  }else{
    let res = window.confirm('Are you sure to add the item to your favorite?');
    if(res){
      emit("update:favorite", item, "add");
    }
  }
  
}, 500)


useInterval(() => {
  theme.value = theme.value === "red" ? "green" : "red";
}, 1000);
</script>

<template>
  <div class="content">
    <h2 class="page-heading">Rates</h2>
    <el-skeleton :rows="5" :loading="loading" animated></el-skeleton>
    <div v-if="layout === 'card'" class="card" role="card">
      <div v-for="item in props.dataSource" :key="item.unit" class="card-item">
        <el-card shadow="always">
          <h3 class="card-name">{{ item.name }}</h3>
          <div class="card-body">
            <div class="rate-group">
              <span class="rate-label">Type:</span>
              <span class="rate-value">{{ item.type }}</span>
            </div>
            <div class="rate-group">
              <span class="rate-label">Coin:</span>
              <span class="rate-value">{{ item.coin }}</span>
            </div>
            <div class="rate-group">
              <span class="rate-label">Unit:</span>
              <span class="rate-value">{{ item.unit }}</span>
            </div>
            <div class="rate-group">
              <span class="rate-label">Value:</span>
              <span :class="`rate-value value-theme value-theme--${theme}`">{{
                item.value
              }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-if="layout === 'table'" class="table" role="table">
      <el-table
        v-show="!loading"
        :data="props.dataSource"
        border
        :show-header="false"
        highlight-current-row
        @row-dblclick="addFavorit"
      >
        <el-table-column label="Symbol">
          <template #default="scope">
            <div class="table-value__label">Symbol</div>
            <div class="table-value__val">
              {{ scope.row.s }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Price" align="right">
          <template #default="scope">
            <div class="table-value__label">Price</div>
            <div class="table-value__val">
              <span :class="`value-theme value-theme--${theme}`">
                {{ scope.row.c }}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style>
.content {
  padding: 0 16px 16px;
}
.page-heading {
  margin-top: 0;
  margin-bottom: 16px;
  color: #f5f5f5;
}

.card-item {
  width: 280px;
  margin: 0 auto 32px;
}
.card-name {
  margin: 12px 8px 32px;
  color: #ccc;
}
.card-body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
  margin: 0 auto;
}
.rate-group {
  width: 50%;
  flex: 0 0 auto;
  margin-bottom: 24px;
}
.rate-group:nth-child(2n) {
  text-align: right;
}
.rate-label {
  display: block;
  margin-bottom: 4px;
  color: #ccc;
}
.rate-value {
  display: block;
  font-size: 14px;
  color: #f5f5f5;
}

.table-value__label {
  margin-bottom: 4px;
  font-size: 12px;
}

.table-value__val {
  font-size: 18px;
}

.value-theme {
  transition: all 0.3s;
}
.value-theme--red {
  color: #ed8b8a;
}
.value-theme--green {
  color: #cdfd83;
}
</style>
