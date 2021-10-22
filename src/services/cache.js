const state = {};

export function save(key, data) {
  state[key] = data;
}

export function restore(key) {
  return state[key];
}
