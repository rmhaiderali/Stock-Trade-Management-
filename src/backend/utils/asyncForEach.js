export default function asyncForEach(array, callback) {
  return Promise.allSettled(array.map(callback));
}
