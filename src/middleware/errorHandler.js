export function errorHandler(error, req, res, _next) {
  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, error: { code: status === 400 ? 'VALIDATION_ERROR' : status === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR', message: status >= 500 ? 'An unexpected server error occurred' : error.message, ...(error.details ? { details: error.details } : {}) }, meta: { requestId: req.id || null } });
}
