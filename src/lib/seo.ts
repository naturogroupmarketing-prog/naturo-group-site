/**
 * Title helpers.
 *
 * Google truncates the SERP title around 60 characters, and Layout.astro adds
 * " | Naturo Group" (15 chars) to every one of them. Templated titles are the
 * usual way that budget gets blown: a suffix that reads well on "Deep Clean"
 * pushes "Veterans (DVA) Cleaning" past the cut, and the keyword that made the
 * page worth writing ends up in the part nobody sees.
 *
 * fitTitle takes the qualifiers in preference order and keeps the richest one
 * that still fits, rather than applying the same suffix to every page and
 * hoping. Pass the fullest phrasing first and a terser fallback after it.
 */

import { site } from '../data/site';

/** " | Naturo Group" — what Layout.astro appends to every title. */
export const BRAND_TAIL = ` | ${site.name}`;

/** Google truncates around here. */
export const TITLE_LIMIT = 60;

/** What a page title may use before the brand is appended. */
export const TITLE_BUDGET = TITLE_LIMIT - BRAND_TAIL.length;

/**
 * Build the longest title that still fits the budget.
 *
 * @param core       The part that must always survive — usually the primary keyword.
 * @param qualifiers Optional extras, richest first. The first one that fits wins.
 * @param separator  Joins core and qualifier.
 *
 * If `core` alone exceeds the budget it is returned untouched: silently
 * truncating a keyword would be worse than a long title.
 */
export function fitTitle(core: string, qualifiers: string[] = [], separator = ' — '): string {
  const base = core.trim();
  for (const q of qualifiers) {
    const candidate = `${base}${separator}${q.trim()}`;
    if (candidate.length <= TITLE_BUDGET) return candidate;
  }
  return base;
}
