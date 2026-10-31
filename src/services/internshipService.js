export class InternshipService {
  constructor(repository) { this.repository = repository; }
  list(query) { return this.repository.list(query); }
  get(id) { return this.repository.findById(id); }
  create(data) { return this.repository.create(data); }
  update(id, data) { return this.repository.update(id, data); }
  remove(id) { return this.repository.delete(id); }
}
