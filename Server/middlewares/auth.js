function authMiddleware(req, res, next) {
  console.log(req.cookies);
  if (
    req.cookies.sessionID &&
    sessions[req.cookies.sessionID] === req.cookies.username
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
