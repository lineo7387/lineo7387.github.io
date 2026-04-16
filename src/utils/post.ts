import { getCollection } from 'astro:content';

/**
 * Get the display name for a skill/category.
 */
export const SKILL_DISPLAY_NAMES: Record<string, string> = {
  vue: 'Vue',
  react: 'React',
  python: 'Python',
  java: 'Java',
  springboot: 'Spring Boot',
  electron: 'Electron',
  astro: 'Astro',
  'react-native': 'React Native',
};

export function getSkillDisplayName(category: string): string {
  return SKILL_DISPLAY_NAMES[category.toLowerCase()] || category;
}

/**
 * Sort posts by planOrder from the skill plan file.
 * Posts with planId are sorted by their index in planOrder (ascending).
 * Posts without planId are placed at the end (stable relative order).
 */
export function sortByPlanOrder<T extends { data: { planId?: string } }>(
  posts: T[],
  planOrder: string[],
): T[] {
  return [...posts].sort((a, b) => {
    const aIdx = planOrder.indexOf(a.data.planId ?? '');
    const bIdx = planOrder.indexOf(b.data.planId ?? '');
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });
}

/**
 * Get the 1-based index of a post within its category.
 * Uses planOrder from the skill plan file if available, otherwise falls back to allPosts order.
 */
export async function getCategoryIndex(
  postId: string,
  planId: string | undefined,
  category: string,
  allPosts?: any[],
): Promise<number> {
  const planEntries = await getCollection('plans');
  const plan = planEntries.find((p) => p.data.skill?.toLowerCase() === category.toLowerCase());
  if (plan?.data.planOrder && planId) {
    const idx = plan.data.planOrder.indexOf(planId);
    if (idx !== -1) return idx + 1;
  }
  if (allPosts) {
    return (
      allPosts.filter((p) => p.data.category?.toLowerCase() === category.toLowerCase()).findIndex((p) => p.id === postId) + 1
    );
  }
  return 1;
}
