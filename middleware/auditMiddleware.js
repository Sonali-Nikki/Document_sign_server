import AuditLog from "../models/AuditLogs.js";

const auditMiddleware = (action) => {
  return async (req, res, next) => {
    try {
      const ip =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      req.auditData = {
        action,
        ip,
      };

      next();
    } catch (error) {
      next();
    }
  };
};

export default auditMiddleware;
