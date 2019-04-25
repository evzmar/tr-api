function ErrorHandler(e) {
  if (e instanceof Error) return { hasError: { message: e.message } };
  return { hasError: e };
}

function ResultHandler(fn, res) {
  return fn.hasError ? res.status(400).send(fn) : res.status(201).send(fn);
}

module.exports = {
  ErrorHandler,
  ResultHandler
};
