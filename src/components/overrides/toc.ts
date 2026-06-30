// Create some WeakMaps to store the distances to the top and
// bottom of each link
const linkStarts = new WeakMap<Element, number>();
const linkEnds = new WeakMap<Element, number>();
const sectionsMap = new Map<Element, { ids: string[]; intersectionRatio: number }>();

// TODO: astro:page-load
addIntersectionObserver();
addResizeObserver();

const headingTags = ['h2', 'h3', 'h4', 'h5'];

function findPreviousSibling(el: Element): Element[] {
  const result: Element[] = [];
  let current: Element | null = el;
  do {
    if (headingTags.includes(current.tagName.toLowerCase())) result.push(current);
    if (current.previousElementSibling === null) break;
    current = current.previousElementSibling;
    if (result.length > 0 && !headingTags.includes(current.tagName.toLowerCase())) break;
  } while (current);
  return result;
}

function addIntersectionObserver(): void {
  const observer = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
      const ids =
        sectionsMap.get(section.target)?.ids ??
        findPreviousSibling(section.target).map((h) => h.getAttribute('id') ?? '');
      sectionsMap.set(section.target, {
        ids,
        intersectionRatio: section.intersectionRatio,
      });
    });

    const idMap: Record<string, number> = {};
    for (const { ids, intersectionRatio } of sectionsMap.values()) {
      for (const id of ids) {
        idMap[id] = (idMap[id] ?? 0) + intersectionRatio;
      }
    }

    for (const [id, intersectionRatio] of Object.entries(idMap)) {
      const link = document.querySelector(`nav.toc-new li a[href="#${id}"]`);
      if (!link) continue;
      const addRemove = intersectionRatio > 0 ? 'add' : 'remove';
      link.classList[addRemove]('active');
    }

    updatePath();
  });

  document
    .querySelectorAll('.sl-markdown-content > :not(h2, h3, h4, h5)')
    .forEach((section) => {
      observer.observe(section);
    });
}

function addResizeObserver(): void {
  if (!document.querySelector('nav.toc-new')) return;
  const observer = new ResizeObserver(() => {
    drawPath();
    updatePath();
  });
  const nav = document.querySelector('nav.toc-new');
  if (nav) observer.observe(nav);
}

function drawPath(): void {
  const path = document.querySelector<SVGPathElement>('path.toc-marker');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav.toc-new a'));
  if (!links.length || !path) return;

  const pathData: (string | number)[] = [];
  let left = 0;

  links.forEach((link, i) => {
    const x = link.offsetLeft;
    const y = link.offsetTop;
    const height = link.offsetHeight;
    if (i === 0) {
      linkStarts.set(link, 0);
      pathData.push('M', x, y, 'L', x, y + height);
    } else {
      if (left !== x) pathData.push('L', left, y);
      pathData.push('L', x, y);
      path.setAttribute('d', pathData.join(' '));
      linkStarts.set(link, path.getTotalLength());
      pathData.push('L', x, y + height);
    }
    left = x;
    path.setAttribute('d', pathData.join(' '));
    linkEnds.set(link, path.getTotalLength());
  });
}

function updatePath(): void {
  const path = document.querySelector<SVGPathElement>('path.toc-marker');
  const pathLength = path?.getTotalLength();
  const activeLinks = document.querySelectorAll('nav.toc-new a.active');
  if (!activeLinks.length || !path || pathLength === undefined) return;

  let linkStart = pathLength;
  let linkEnd = 0;
  activeLinks.forEach((link) => {
    linkStart = Math.min(linkStart, linkStarts.get(link) ?? pathLength);
    linkEnd = Math.max(linkEnd, linkEnds.get(link) ?? 0);
  });
  path.style.display = activeLinks.length ? 'inline' : 'none';
  path.setAttribute(
    'stroke-dasharray',
    `1 ${linkStart} ${linkEnd - linkStart} ${pathLength}`,
  );
}
