<script setup>
import { defineProps, defineEmits } from "vue";
import { ref, watch } from "vue"
import { debounce } from "lodash-es";


let keywords=ref("");

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

const emit = defineEmits(["update:model-value", "update:getKyewords" ]);

const handleChange = (value) => {
  emit("update:model-value", value);
};

const searchInfo=debounce(function() {
  console.log(keywords.value);
  emit("update:getKyewords", keywords.value);
}, 1000)

watch(keywords, (newValue, oldValue)=>{
  console.log('new', newValue);
  searchInfo();
})

</script>

<template>
  <el-affix :offset="0">
    <div class="navbar">
      <div class="header">
        <img class="header__logo" src="../img/main-logo.png" />
      </div>
      <!--div style="color: red">
        <br>
        <input v-model="keywords">{{keywords}}
      </div-->
      <!--div style="color: white; text-align:right;">Search: <input type="text" class="form-control" v-model="keywords"/>
        <div class="search-button-box" @click="searchInfo()"><a class="search-button"><img
                    src="../img/search.png"></a>
        </div>
      </div-->
      <div class="search-input"><input type="text" v-model="keywords" id="search-input-box" autocomplete="off"/>
        <!--div class="search-button-box" @click="searchInfo()"><a class="search-button"><img
                    src="../img/search.png"></a>
        </div-->
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

.search-input{
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.search-button img {
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-top: 7px;
    margin-left: 7px;
    margin-right: 7px;
}

</style>
