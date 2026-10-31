export function notFound(req, _res, next) { next(Object.assign(new Error(`Route not found: ${req.method} ${req.originalUrl}`), { status: 404 })); }
