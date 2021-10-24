import request from "./request";


export function queryRateList() {
  return request.get("https://fcsapi.com/api-v3/forex/latest?symbol=all_forex&access_key=GM6Lj3PgORwFovAX00aBfi2OI");
  //https://api.coingecko.com/api/v3/exchange_rates
}
