export function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
	return items.reduce<Record<string, T[]>>((result, item) => {
		const groupKey = String(item[key] ?? '');
		result[groupKey] ??= [];
		result[groupKey].push(item);
		return result;
	}, {});
}

export function getDocsEntryHref(entryId: string, basePath = '/youtube'): string {
	const normalizedId = entryId.replace(/\.(md|mdx)$/u, '').replace(/\/index$/u, '');
	if (normalizedId.length === 0 || normalizedId === 'index') {
		return `${basePath}/`;
	}

	return `${basePath}/${normalizedId}/`;
}

type ColorPair = {
	backgroundColor: string;
	color: string;
};

const projectColorPairs: ColorPair[] = [
	{ backgroundColor: '#D8F1E4', color: '#1F5C46' },
	{ backgroundColor: '#FBE2D0', color: '#8A4724' },
	{ backgroundColor: '#D9E8FB', color: '#1F4E86' },
	{ backgroundColor: '#F5E1F3', color: '#7A346D' },
	{ backgroundColor: '#F6E8C9', color: '#7A5A10' },
	{ backgroundColor: '#DDEEF0', color: '#235C62' },
];

function hashSeed(seed: string): number {
	let hash = 0;
	for (const character of seed) {
		hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
	}
	return hash;
}

export function getStableColorPair(seed: string): ColorPair {
	return projectColorPairs[hashSeed(seed) % projectColorPairs.length];
}

export function getStableColorStyle(seed: string): string {
	const { backgroundColor, color } = getStableColorPair(seed);
	return `background-color:${backgroundColor}; color:${color}`;
}