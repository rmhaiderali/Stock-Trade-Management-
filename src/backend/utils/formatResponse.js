export default function ([success, message, data]) {
  return Object.assign({ success }, message && { message }, data && { data });
}
