import { stripHtml } from "string-strip-html";

export default function sanitizationMiddleware(req, res, next) {
  if (req.body && Object.keys(req.body)) {
    const keys = Object.keys(req.body);

    for (let i = 0; i < keys.length; i++) {
      if (Number.isNaN(keys[i])) {
        req.body[keys[i]] = stripHtml(req.body[keys[i]]).result;
      }
    }
  }

  if (req.headers.authorization) {
    const { authorization } = req.headers;
    req.headers.authorization = stripHtml(authorization).result;
  }

  next();
}
