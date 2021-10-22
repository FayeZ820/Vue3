import request from "./request";

export function queryRateList() {
  return request.get("/exchange_rates");
}
