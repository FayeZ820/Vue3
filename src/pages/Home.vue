<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { ElMessage } from "element-plus";
import Nav from "@/components/Nav.vue";
import Content from "@/components/Content.vue";
import Offline from "@/components/Offline.vue";
import { queryRateList } from "@/services/exchange";
import { uniq } from "@/utils/helpers";
import { useInterval } from "@/utils/use";

const tmpdata = {
"btc":{"name":"Bitcoin","unit":"BTC","value":1.0,"type":"crypto"},
"eth":{"name":"Ether","unit":"ETH","value":15.723,"type":"crypto"},
"ltc":{"name":"Litecoin","unit":"LTC","value":327.906,"type":"crypto"},
"bch":{"name":"Bitcoin Cash","unit":"BCH","value":98.361,"type":"crypto"},
"bnb":{"name":"Binance Coin","unit":"BNB","value":129.899,"type":"crypto"},
"eos":{"name":"EOS","unit":"EOS","value":13408.533,"type":"crypto"},
"xrp":{"name":"XRP","unit":"XRP","value":53868.481,"type":"crypto"},
"xlm":{"name":"Lumens","unit":"XLM","value":157658.431,"type":"crypto"},
"link":{"name":"Chainlink","unit":"LINK","value":2231.083,"type":"crypto"},
"dot":{"name":"Polkadot","unit":"DOT","value":1448.464,"type":"crypto"},
"yfi":{"name":"Yearn.finance","unit":"YFI","value":1.725,"type":"crypto"},
"usd":{"name":"US Dollar","unit":"$","value":61388.956,"type":"fiat"},
"aed":{"name":"United Arab Emirates Dirham","unit":"DH","value":225487.777,"type":"fiat"},
"ars":{"name":"Argentine Peso","unit":"$","value":6086644.894,"type":"fiat"},
"aud":{"name":"Australian Dollar","unit":"A$","value":82762.933,"type":"fiat"},
"bdt":{"name":"Bangladeshi Taka","unit":"৳","value":5254152.505,"type":"fiat"},
"bhd":{"name":"Bahraini Dinar","unit":"BD","value":23139.585,"type":"fiat"},
"bmd":{"name":"Bermudian Dollar","unit":"$","value":61388.956,"type":"fiat"},
"brl":{"name":"Brazil Real","unit":"R$","value":335165.287,"type":"fiat"},
"cad":{"name":"Canadian Dollar","unit":"CA$","value":75923.406,"type":"fiat"},
"chf":{"name":"Swiss Franc","unit":"Fr.","value":56656.911,"type":"fiat"},
"clp":{"name":"Chilean Peso","unit":"CLP$","value":50569153.125,"type":"fiat"},
"cny":{"name":"Chinese Yuan","unit":"¥","value":395087.047,"type":"fiat"},
"czk":{"name":"Czech Koruna","unit":"Kč","value":1343303.943,"type":"fiat"},
"dkk":{"name":"Danish Krone","unit":"kr.","value":393796.958,"type":"fiat"},
"eur":{"name":"Euro","unit":"€","value":52922.867,"type":"fiat"},
"gbp":{"name":"British Pound Sterling","unit":"£","value":44662.737,"type":"fiat"},
"hkd":{"name":"Hong Kong Dollar","unit":"HK$","value":477486.375,"type":"fiat"},
"huf":{"name":"Hungarian Forint","unit":"Ft","value":19054211.341,"type":"fiat"},
"idr":{"name":"Indonesian Rupiah","unit":"Rp","value":863401912.804,"type":"fiat"},
"ils":{"name":"Israeli New Shekel","unit":"₪","value":197740.582,"type":"fiat"},
"inr":{"name":"Indian Rupee","unit":"₹","value":4600380.988,"type":"fiat"},
"jpy":{"name":"Japanese Yen","unit":"¥","value":7021699.567,"type":"fiat"},
"krw":{"name":"South Korean Won","unit":"₩","value":72610244.157,"type":"fiat"},
"kwd":{"name":"Kuwaiti Dinar","unit":"KD","value":18525.959,"type":"fiat"},
"lkr":{"name":"Sri Lankan Rupee","unit":"Rs","value":12402332.232,"type":"fiat"},
"mmk":{"name":"Burmese Kyat","unit":"K","value":117576624.504,"type":"fiat"},
"mxn":{"name":"Mexican Peso","unit":"MX$","value":1248626.824,"type":"fiat"},
"myr":{"name":"Malaysian Ringgit","unit":"RM","value":255255.282,"type":"fiat"},
"ngn":{"name":"Nigerian Naira","unit":"₦","value":25222880.661,"type":"fiat"},
"nok":{"name":"Norwegian Krone","unit":"kr","value":517276.179,"type":"fiat"},
"nzd":{"name":"New Zealand Dollar","unit":"NZ$","value":86941.803,"type":"fiat"},
"php":{"name":"Philippine Peso","unit":"₱","value":3113033.751,"type":"fiat"},
"pkr":{"name":"Pakistani Rupee","unit":"₨","value":10509789.396,"type":"fiat"},
"pln":{"name":"Polish Zloty","unit":"zł","value":241808.031,"type":"fiat"},
"rub":{"name":"Russian Ruble","unit":"₽","value":4357738.067,"type":"fiat"},
"sar":{"name":"Saudi Riyal","unit":"SR","value":230246.28,"type":"fiat"},
"sek":{"name":"Swedish Krona","unit":"kr","value":529274.098,"type":"fiat"},
"sgd":{"name":"Singapore Dollar","unit":"S$","value":82775.334,"type":"fiat"},
"thb":{"name":"Thai Baht","unit":"฿","value":2059315.022,"type":"fiat"},
"try":{"name":"Turkish Lira","unit":"₺","value":569677.24,"type":"fiat"},
"twd":{"name":"New Taiwan Dollar","unit":"NT$","value":1716631.675,"type":"fiat"},
"uah":{"name":"Ukrainian hryvnia","unit":"₴","value":1619991.399,"type":"fiat"},
"vef":{"name":"Venezuelan bolívar fuerte","unit":"Bs.F","value":6146.876,"type":"fiat"},
"vnd":{"name":"Vietnamese đồng","unit":"₫","value":1398224681.932,"type":"fiat"},
"zar":{"name":"South African Rand","unit":"R","value":892290.082,"type":"fiat"},
"xdr":{"name":"IMF Special Drawing Rights","unit":"XDR","value":43477.439,"type":"fiat"},
"xag":{"name":"Silver - Troy Ounce","unit":"XAG","value":2632.912,"type":"commodity"},
"xau":{"name":"Gold - Troy Ounce","unit":"XAU","value":34.73,"type":"commodity"},
"bits":{"name":"Bits","unit":"μBTC","value":1000000.0,"type":"crypto"},
"sats":{"name":"Satoshi","unit":"sats","value":100000000.0,"type":"crypto"}
}

const dataList = ref([]);
const pageLoading = ref(false);
const typeList = computed(() => {
  //return uniq(dataList.value.map((item) => item.type));
  return ["Exchange rates"];
});
const activeType = ref("");
const rateList = computed(() => {
  //return dataList.value.filter((item) => item.type === activeType.value);
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

/*
  pageLoading.value = false;
  const data = Object.keys(tmpdata).map((item) => {
        const value = tmpdata[item];
        return Object.assign(value, {
          coin: item,
          value: parseFloat(value.value || "0").toFixed(3),
        });
      });

  dataList.value = data;
*/

  queryRateList()
    .then((response) => {
      pageLoading.value = false;

      dataList.value = response.response;
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
