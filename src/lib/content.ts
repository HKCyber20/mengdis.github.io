type EntryLike = {
  id: string;
  data: {
    title?: string;
    permalink?: string;
    date?: Date | string;
  };
};

const titleCollator = new Intl.Collator('en-US');

export function withBase(path: string, base: string) {
  if (/^https?:\/\//.test(path) || path.startsWith('mailto:')) {
    return path;
  }

  const cleanBase = base === '/' ? '' : base.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export function getEntrySlug(entry: EntryLike) {
  if (entry.data.permalink) {
    const parts = entry.data.permalink.replace(/\/$/, '').split('/').filter(Boolean);
    return parts.at(-1) ?? entry.id.replace(/\.(md|mdx)$/i, '');
  }

  return entry.id.replace(/\.(md|mdx)$/i, '').split('/').at(-1) ?? entry.id;
}

export function getPermalink(entry: EntryLike, fallbackRoot: string) {
  return entry.data.permalink ?? `/${fallbackRoot}/${getEntrySlug(entry)}/`;
}

export function sortByDateDesc<T extends EntryLike>(entries: T[]) {
  return [...entries].sort((a, b) => {
    const dateDiff = toTime(b.data.date) - toTime(a.data.date);
    if (dateDiff !== 0) return dateDiff;
    return titleCollator.compare(a.data.title ?? a.id, b.data.title ?? b.id);
  });
}

export function formatDate(value?: Date | string) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatFullDate(value?: Date | string) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function toTime(value?: Date | string) {
  if (!value) return 0;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}
