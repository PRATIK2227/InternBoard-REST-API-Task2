const parseListQuery = (query) => ({
  q: query.q?.trim() || '', domain: query.domain || '', mode: query.mode || '', status: query.status || '',
  page: Number(query.page || 1), limit: Number(query.limit || 10), sort: query.sort === 'oldest' ? 'oldest' : 'newest'
});
export class InternshipController {
  constructor(service) { this.service = service; }
  list = (req, res, next) => {
    try {
      const query = parseListQuery(req.query);
      if (!Number.isInteger(query.page) || query.page < 1 || !Number.isInteger(query.limit) || query.limit < 1 || query.limit > 100) return res.status(400).json({ success: false, error: { code: 'INVALID_QUERY', message: 'page must be >= 1 and limit must be between 1 and 100' }, meta: { requestId: req.id } });
      const result = this.service.list(query); const totalPages = Math.ceil(result.total / query.limit);
      res.json({ success: true, data: result.items, meta: { page: query.page, limit: query.limit, total: result.total, totalPages, hasNextPage: query.page < totalPages, hasPreviousPage: query.page > 1, requestId: req.id } });
    } catch (error) { next(error); }
  };
  get = (req, res, next) => { try { const item = this.service.get(req.params.id); if (!item) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Internship record not found' }, meta: { requestId: req.id } }); res.json({ success: true, data: item, meta: { requestId: req.id } }); } catch (error) { next(error); } };
  create = (req, res, next) => { try { const item = this.service.create(req.body); res.status(201).json({ success: true, data: item, meta: { requestId: req.id } }); } catch (error) { next(error); } };
  update = (req, res, next) => { try { const item = this.service.update(req.params.id, req.body); if (!item) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Internship record not found' }, meta: { requestId: req.id } }); res.json({ success: true, data: item, meta: { requestId: req.id } }); } catch (error) { next(error); } };
  delete = (req, res, next) => { try { const removed = this.service.remove(req.params.id); if (!removed) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Internship record not found' }, meta: { requestId: req.id } }); res.status(200).json({ success: true, data: { id: req.params.id, deleted: true }, meta: { requestId: req.id } }); } catch (error) { next(error); } };
}
