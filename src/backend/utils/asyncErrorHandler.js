export default function asyncErrorHandler(requestHandler) {
  return (req, res, next) =>
    Promise.resolve(requestHandler(req, res, next)).catch(next);
}
