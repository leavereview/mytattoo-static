/**
 * Internal Linking Utility for MyTattoo.Software
 * Automatically adds internal links to content based on keyword mappings
 */

// Pillar page and calculator keyword mappings
const PILLAR_KEYWORDS: Record<string, string> = {
  // Calculator (highest priority)
  'tattoo revenue calculator': '/tattoo-studio-calculator/',
  'tattoo studio calculator': '/tattoo-studio-calculator/',
  'tattoo income calculator': '/tattoo-studio-calculator/',
  'revenue calculator': '/tattoo-studio-calculator/',
  'studio revenue': '/tattoo-studio-calculator/',
  'calculate tattoo income': '/tattoo-studio-calculator/',
  'tattoo profit calculator': '/tattoo-studio-calculator/',

  // Primary pillar pages
  'tattoo studio software': '/tattoo-studio-software/',
  'tattoo studio management': '/tattoo-studio-software/',
  'tattoo management software': '/tattoo-studio-software/',
  'studio management software': '/tattoo-studio-software/',

  'tattoo booking software': '/tattoo-booking-software/',
  'tattoo booking system': '/tattoo-booking-software/',
  'booking software': '/tattoo-booking-software/',
  'online booking': '/tattoo-booking-software/',

  'tattoo scheduling software': '/tattoo-scheduling-software/',
  'tattoo scheduling': '/tattoo-scheduling-software/',
  'appointment scheduling': '/tattoo-scheduling-software/',
  'scheduling software': '/tattoo-scheduling-software/',

  'tattoo booking app': '/tattoo-booking-app/',
  'mobile booking app': '/tattoo-booking-app/',
  'booking app': '/tattoo-booking-app/',

  'tattoo artist software': '/tattoo-artist-software/',
  'artist management software': '/tattoo-artist-software/',
  'artist software': '/tattoo-artist-software/',

  // Tier 1 blog posts
  'how much do tattoo artists make': '/blog/how-much-do-tattoo-artists-make/',
  'tattoo artist earnings': '/blog/how-much-do-tattoo-artists-make/',
  'tattoo artist salary': '/blog/how-much-do-tattoo-artists-make/',
  'tattoo artist income': '/blog/how-much-do-tattoo-artists-make/',

  'tattoo booking guide': '/blog/tattoo-booking-guide/',
  'how to book tattoos': '/blog/tattoo-booking-guide/',
  'booking process': '/blog/tattoo-booking-guide/',

  'tattoo prices': '/blog/tattoo-prices-guide/',
  'how much do tattoos cost': '/blog/tattoo-prices-guide/',
  'tattoo pricing': '/blog/tattoo-prices-guide/',
  'tattoo cost': '/blog/tattoo-prices-guide/',

  'tattoo deposits': '/blog/tattoo-deposit-guide/',
  'booking deposits': '/blog/tattoo-deposit-guide/',
  'deposit policy': '/blog/tattoo-deposit-guide/',

  'no-shows': '/blog/reduce-no-shows-tattoo-studio/',
  'reduce no-shows': '/blog/reduce-no-shows-tattoo-studio/',
  'missed appointments': '/blog/reduce-no-shows-tattoo-studio/',

  'tattoo appointments': '/blog/tattoo-appointments-guide/',
  'appointment management': '/blog/tattoo-appointments-guide/',

  'tattoo consent forms': '/blog/tattoo-consent-form-guide/',
  'consent forms': '/blog/tattoo-consent-form-guide/',

  'become a tattoo artist': '/blog/how-to-become-a-tattoo-artist/',
  'tattoo artist training': '/blog/how-to-become-a-tattoo-artist/',

  'tattoo apprenticeship': '/blog/how-does-tattoo-apprenticeship-work/',
  'apprenticeship': '/blog/how-does-tattoo-apprenticeship-work/',

  // General site links
  'pricing': '/pricing/',
  'contact us': '/contact/',
  'about us': '/about/',
};

// Track which keywords have been linked (per content piece)
let linkedKeywords: Set<string> = new Set();

/**
 * Add internal links to content string
 * Only links first occurrence of each keyword
 */
export function addInternalLinks(
  content: string,
  currentPath: string = '',
  maxLinks: number = 5
): string {
  linkedKeywords = new Set();
  let linkCount = 0;
  let result = content;

  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = Object.keys(PILLAR_KEYWORDS).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    if (linkCount >= maxLinks) break;

    const targetPath = PILLAR_KEYWORDS[keyword];

    // Don't link to the current page
    if (targetPath === currentPath) continue;

    // Skip if we've already linked a similar keyword
    const baseKeyword = keyword.split(' ').slice(0, 2).join(' ');
    if (linkedKeywords.has(baseKeyword)) continue;

    // Create case-insensitive regex for first occurrence only
    // Avoid matching inside existing links or HTML tags
    const regex = new RegExp(
      `(?<!<[^>]*)(?<![\\w-])${escapeRegex(keyword)}(?![\\w-])(?![^<]*>)`,
      'i'
    );

    const match = result.match(regex);
    if (match) {
      const linkedText = `<a href="${targetPath}" class="text-brand-red hover:underline">${match[0]}</a>`;
      result = result.replace(regex, linkedText);
      linkedKeywords.add(baseKeyword);
      linkCount++;
    }
  }

  return result;
}

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get related pages based on content keywords
 */
export function getRelatedPages(content: string, currentPath: string, limit: number = 3): Array<{title: string, href: string}> {
  const related: Array<{title: string, href: string, score: number}> = [];
  const contentLower = content.toLowerCase();

  const pageData: Record<string, string> = {
    '/tattoo-studio-calculator/': 'Tattoo Studio Revenue Calculator',
    '/tattoo-studio-software/': 'Tattoo Studio Software',
    '/tattoo-booking-software/': 'Tattoo Booking Software',
    '/tattoo-scheduling-software/': 'Tattoo Scheduling Software',
    '/tattoo-booking-app/': 'Tattoo Booking App',
    '/tattoo-artist-software/': 'Tattoo Artist Software',
    '/pricing/': 'Pricing',
    '/about/': 'About Us',
  };

  for (const [href, title] of Object.entries(pageData)) {
    if (href === currentPath) continue;

    // Score based on keyword presence
    let score = 0;
    const keywords = title.toLowerCase().split(' ');
    for (const keyword of keywords) {
      if (contentLower.includes(keyword)) {
        score += 1;
      }
    }

    if (score > 0) {
      related.push({ title, href, score });
    }
  }

  // Sort by score and return top results
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ title, href }) => ({ title, href }));
}

export default {
  addInternalLinks,
  getRelatedPages,
  PILLAR_KEYWORDS
};
