import { z } from 'zod';

const text = (label, max = 120) => z.string().trim().min(1, `${label} is required`).max(max, `${label} must be ${max} characters or fewer`);
export const createInternshipSchema = z.object({
  title: text('Title', 120),
  company: text('Company', 120),
  domain: text('Domain', 80),
  mode: z.enum(['Remote', 'Hybrid', 'On-site'], { error: 'Mode must be Remote, Hybrid, or On-site' }),
  location: text('Location', 120),
  description: text('Description', 2000),
  skills: z.array(z.string().trim().min(1).max(40)).min(1).max(15),
  openings: z.number().int().min(1).max(1000),
  applyUrl: z.string().trim().url().optional().or(z.literal('')),
  status: z.enum(['Open', 'Closed']).default('Open')
});
export const updateInternshipSchema = createInternshipSchema.partial().refine((value) => Object.keys(value).length > 0, { message: 'At least one field is required for an update' });
