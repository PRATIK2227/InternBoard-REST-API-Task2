import { Router } from 'express';
import { z } from 'zod';
import { createInternshipSchema, updateInternshipSchema } from '../models/internshipModel.js';
import { validate } from '../middleware/validate.js';

const idSchema = z.object({ id: z.string().trim().min(3, 'id must contain at least 3 characters').max(64, 'id must be 64 characters or fewer').regex(/^[A-Za-z0-9-]+$/, 'id may contain only letters, numbers and hyphens') });
export function createInternshipRouter(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.get('/:id', validate(idSchema, 'params'), controller.get);
  router.post('/', validate(createInternshipSchema), controller.create);
  router.put('/:id', validate(idSchema, 'params'), validate(createInternshipSchema), controller.update);
  router.patch('/:id', validate(idSchema, 'params'), validate(updateInternshipSchema), controller.update);
  router.delete('/:id', validate(idSchema, 'params'), controller.delete);
  return router;
}
