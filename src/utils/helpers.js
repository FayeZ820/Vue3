/**
 * Creates a duplicate-free version of an array.
 */
export function uniq(values) {
  const results = [];
  const state = {};

  values.forEach((item) => {
    if (!state[item]) {
      state[item] = true;
      results.push(item);
    }
  });

  return results;
}
