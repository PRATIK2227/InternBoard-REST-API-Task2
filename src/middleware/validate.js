export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) return next(Object.assign(new Error('Request validation failed'), { status: 400, details: result.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) }));
    req[source] = result.data;
    next();
  };
}
