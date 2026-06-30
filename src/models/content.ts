import { z } from 'zod';
import type { StarlightIcon } from '@astrojs/starlight/types';

/**
 * Central content models.
 *
 * Each concept is declared once as a Zod schema and its TypeScript type is
 * inferred from that schema (`z.infer`), so runtime validation and the static
 * type can never drift apart. See `specs/content-models.spec.md`.
 */

/** A short, non-empty label used to categorise content. */
export const tagSchema = z.string().min(1);

/** Showcase project rendered by the projects grid and home thumbnails. */
export const projectSchema = z.object({
	title: z.string().min(1),
	description: z.string(),
	imageUrl: z.string(),
	link: z.string(),
	tags: z.array(tagSchema).default([]),
});
export type Project = z.infer<typeof projectSchema>;

/** Blog article summary shown in the "Latest Articles" list. */
export const articleSchema = z.object({
	title: z.string().min(1),
	url: z.string(),
	tags: z.array(tagSchema).optional(),
	createdDate: z.date().optional(),
	/** Estimated reading time in minutes. */
	duration: z.number().int().nonnegative(),
});
export type Article = z.infer<typeof articleSchema>;

/** Navigation card linking to a documentation section. */
export const navCardSchema = z.object({
	title: z.string().min(1),
	icon: z.custom<StarlightIcon>((value) => typeof value === 'string'),
	iconColor: z.string(),
	url: z.string(),
});
export type NavCard = z.infer<typeof navCardSchema>;

/** Table-of-contents entry derived from a docs collection page. */
export const tocEntrySchema = z.object({
	/** Grouping key; an empty string represents the section root. */
	subFolderName: z.string(),
	slug: z.string(),
	title: z.string(),
});
export type TocEntry = z.infer<typeof tocEntrySchema>;

/** Validate an array of projects, throwing on malformed data at build time. */
export const parseProjects = (data: unknown): Project[] => z.array(projectSchema).parse(data);

/** Validate an array of navigation cards, throwing on malformed data. */
export const parseNavCards = (data: unknown): NavCard[] => z.array(navCardSchema).parse(data);
