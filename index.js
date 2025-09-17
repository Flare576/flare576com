const version = 'v_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const externalSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="external-icon" viewBox="0 0 24 24" fill="none">
    <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"/>
  </svg>`;

const timeTerms = [
  'Stardate', 'Chronocode', 'Timecode', 'Galactic Date', 'Log Entry',
  'Cycle', 'Pulse', 'Tick', 'Run', 'Riftmark', 'Starclock', 'Spacetime Mark',
  'Neurostamp', 'Orbital Time', 'Chronostamp', 'Fluxdate', 'Temporal Mark',
  'DimensioStamp', 'Aeonpoint', 'Epoch Index', 'WarpTime'
];

function getRandomTimeLabel() {
  return timeTerms[Math.floor(Math.random() * timeTerms.length)];
}

function isLocal() {
  return window.location.host.startsWith('127.0.0.1:');
}


function createLinkedElement (textContent, permalink) {
  const hoverTip = document.createElement('span');
  hoverTip.textContent = ' (Click for 🔗)';
  hoverTip.className = 'hover-tip';
  const link = document.createElement('a');
  link.id = btoa(permalink);
  link.textContent = textContent;
  link.classList.add('hover-main');
  setTimeout(() => {
    const theLink = document.getElementById(link.id);
    const hoverTip = theLink.children[0];
    theLink.addEventListener('click', event => {
      event.preventDefault();
      navigator.clipboard.writeText(permalink).then(() => {
        console.log(hoverTip.textContent);
        hoverTip.textContent = ' (🔗 Copied!)';
        setTimeout(() => {
          hoverTip.textContent = ' (Click for 🔗)';
        }, 2000);
      });
    });
  }, 100);
  link.append(hoverTip);
  return link;
}

function addDateLine(dateTime, section, subsection, entry) {
  const dateLabel = getRandomTimeLabel();
  const dateLine = `${dateLabel}: ${dateTime}`;
  const permalink = window.location.protocol +
    '//' +
    window.location.host +
    '/' +
    ['meta',section,subsection,entry].filter(Boolean).join('/') +
    '.html';
  const link = createLinkedElement(dateLine, permalink);
  link.classList.add('entry-timestamp');
  document.getElementById('content').prepend(link);
}

async function addBackLink (section, subsection) {
  let text = 'Home';
  let backLinkHref = '#';
  if (section) {
    const parentMeta = await readMetaFile(section, subsection);
    text = parentMeta.title;

    backLinkHref = subsection
      ? `#/${section}/${subsection}`
      : `#/${section}`;
  }

  const container  = document.createElement('div');
  container.className = 'back-link-container';
  const link = document.createElement('a');
  link.href = backLinkHref;
  link.textContent = `Back to ${text} ↑`;
  link.className = 'back-link';

  container.append(link);
  document.getElementById('content').append(container);
  setupBackLinkBehavior();
}

function maybeScrollToAnchor() {
  const hash = window.location.hash;
  const [_, query] = hash.split('?');
  if (!query) {
    return;
  }

  const params = new URLSearchParams(query);
  const scrollToId = params.get('scrollTo');

  if (scrollToId) {
    const el = document.getElementById(scrollToId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function setupBackLinkBehavior() {
  const container = document.querySelector('.back-link-container');
  if (!container) {
    return;
  }

  window.addEventListener('scroll', () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    container.classList.toggle('centered', nearBottom);
  });
}

function addHoverToNerds() {
  addHoverHelper('.code-label[data-lang^="nerd-goal"]',     'nerd-goal-tooltip');
  addHoverHelper('.nerd-goal',                              'nerd-goal-tooltip');

  addHoverHelper('.code-label[data-lang^="nerd-solution"]', 'nerd-solution-tooltip');
  addHoverHelper('.nerd-solution',                          'nerd-solution-tooltip');
}

function addHoverHelper(findClass, addId) {
  document.querySelectorAll(findClass).forEach(label => {
    const tooltip = document.getElementById(addId);

    label.addEventListener('mouseenter', () => {
      const bColor = getComputedStyle(label).color;
      const rect = label.getBoundingClientRect();

      tooltip.style.top = `${window.scrollY + rect.bottom + 4}px`;
      tooltip.style.left = `${window.scrollX + rect.left}px`;
      tooltip.style.borderColor = bColor;
      tooltip.classList.add('tooltip-active');
      tooltip.hidden = false;
    });

    label.addEventListener('mouseleave', () => {
      tooltip.classList.remove('tooltip-active');
      tooltip.hidden = true;
    });
    label.addEventListener('click', () => {
      window.open('#/steamdeck/steam-deck-tips-nerd-levels', '_blank');
    });
  });
}

function addCodeBlockLabels() {
  document.querySelectorAll('pre > code[class^="language-"]').forEach(code => {
    const langMatch = code.className.match(/language-([a-z0-9-]+)/i);
    if (!langMatch) {
      return;
    }

    const lang = langMatch[1];
    const pre = code.parentElement;

    // Create label
    const label = document.createElement('div');
    const displayable = lang.replaceAll('-', ' ');
    label.className = 'code-label';
    label.textContent = displayable.charAt(0).toUpperCase() + displayable.slice(1);
    label.dataset.lang = lang.toLowerCase();

    // Create copy button
    if (!lang.startsWith('nerd')) {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';

      button.addEventListener('click', () => {
        navigator.clipboard.writeText(code.textContent).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => button.textContent = 'Copy', 2000);
        }).catch(err => {
          console.error('Copy failed:', err);
          button.textContent = 'Error';
        });
      });
      pre.appendChild(button);
    }

    pre.insertBefore(label, code);
  });
}

async function safeFetch(url) {
  // A new `version` means there's been a deployment since last load - clear cache
  if (sessionStorage.getItem('version') !== version || isLocal()) {
    sessionStorage.clear();
  }
  sessionStorage.setItem('version', version);

  try {
    const cached = JSON.parse(sessionStorage.getItem(url));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.raw;
    }
  } catch (e) {
    // Just a cache miss
  }

  const finalUrl = url + (url.includes('?') ? '&v=' : '?v=') + version;
  const res = await fetch(finalUrl);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }
  const raw = await res.text();
  sessionStorage.setItem(url, JSON.stringify({ timestamp: Date.now(), raw }));
  return raw;
}

async function readMetaFile (section, subsection) {
  const metaPath = ['content',section,subsection,'meta.json'].filter(Boolean).join('/');
  const raw = await safeFetch(metaPath);
  const info = JSON.parse(raw);
  return info;
}

async function readEntry (section, subsection, entry) {
  let entryPath;
  if (!section) {
    entryPath=`${entry}.md`;
  } else {
    entryPath = `content/${section}/`;
    if (subsection) {
      entryPath += `${subsection}/entries/${entry}.md`;
    } else {
      entryPath += `/entries/${entry}.md`;
    }
  }

  const raw = await safeFetch(entryPath);
  const parsed = parseFrontMatter(raw);
  if (isLocal() || parsed.metadata?.published) {
    return parsed;
  }
  return {};
}

async function renderAllEntries() {
  document.querySelectorAll('.entries').forEach(async (entryDiv) => {
    // Get the section/subsection
    const [section, subsection] = entryDiv.id.split('_')[0].split('.');
    const { entries, sticky } = await readMetaFile(section, subsection);

    async function getDetails(batch = [], sticky = false) {
      const store = [];
      for (const entry of batch) {
        const { metadata } = await readEntry(section, subsection, entry);
        if (!metadata) { // either not there, or not published, just skip
          continue;
        }
        store.push({ entry, metadata: {...metadata, sticky } });
      }
      return store;
    }

    const sorty = document.querySelector('input[name="sort-select"]:checked');
    const [sortBy, direction] = sorty.value.split('-');
    const nerdLimit = document.getElementById('nerdLimit').value;

    const stickyDetails = await getDetails(sticky, true);
    const entryDetails = (await getDetails(entries))
      .filter(({metadata}) => {
        const goal = metadata.goal >= 0 ? metadata.goal : 0;
        const solution = metadata.solution >= 0 ? metadata.solution : 0;
        return Math.max(goal, solution) <= nerdLimit;
      })
      .sort((a,b) => {
        let aVal = a.metadata.goal >= 0 && a.metadata.solution >= 0
          ? Math.max(a.metadata.goal, a.metadata.solution)
          : 0;
        let bVal = b.metadata.goal >= 0 && b.metadata.solution >= 0
          ? Math.max(b.metadata.goal, b.metadata.solution)
          : 0;
        if (aVal === bVal || sortBy === 'date') {
          aVal = new Date(a.metadata.date).getTime();
          bVal = new Date(b.metadata.date).getTime();
        }
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      });

    entryDiv.innerHTML = [...stickyDetails, ...entryDetails].reduce((html, { entry, metadata }) => {
      return html += buildEntryHtml(section, subsection, entry, metadata);
    }, '');
    addHoverToNerds();
  });
}

function buildEntryHtml (section, subsection, entry, metadata) {
  const entryPath = '#' + [section, subsection, entry].filter(Boolean).join('/');
  const classesA = ['entry-card'];
  let title = '';
  if (metadata.sticky) {
    classesA.push('sticky');
    title = 'title="Sticky"';
  }
  const classes = classesA.join(' ');
  const levels = metadata.goal >= 0 && metadata.solution >= 0
    ? `<div class="nerd-guide">
        <div
          class="nerd-goal nerd-level-${metadata.goal}"
          >${metadata.goal}</div><div
          class="nerd-solution nerd-level-${metadata.solution}"
          >${metadata.solution}</div>
      </div>`
    : '';

  return `
    <a href="${entryPath}" class="${classes}" ${title}>
      <h3>${metadata.title}</h3>
      <p>${metadata.description || ''}</p>
      ${levels}
    </a>`;
}

async function buildSection(section) {
  const { title, description, subsections, entries } = await readMetaFile(section);

  let html = '<section class="section">';
  html += `<h2 class="section-title"><a href="#${section}">${title}</a></h2>`;
  if (description) {
    html += `<p class="section-description">${description}</p>`;
  }

  if (subsections && subsections.length > 0) {
    html += '<div class="subsections">';
    for (const subsection of subsections) {
      const { title, description, external } = await readMetaFile(section, subsection);
      if (external) {
        html += `
    <a href="${external}" target="_blank" class="subsection-card external">
      <div class="card-content">
        <span class="subsection-title">${title}</span>
        <p class="subsection-description">${description || ''}</p>
      </div>
      ${externalSvg}
    </a>
  `;
      } else {
        html += `
    <a href="#/${section}/${subsection}" class="subsection-card">
      <div class="card-content">
        <span class="subsection-title">${title}</span>
        <p class="subsection-description">${description || ''}</p>
      </div>
    </a>
  `;
      }
    }
    html += '</div>';
  }

  if (entries && entries.length > 0) {
    html += `<div id="${section}_entries" class="entries">
      <img class="loading_entries" src="favicon.svg" />
    </div>`;
  }

  html += '</section>';
  return html;
}

function updateMetaTags(metadata) {
  // Set <title>
  if (metadata.title) {
    document.title = `Flare576 | ${metadata.title}`;
  }

  // Set or update <meta name="description">
  const descContent = metadata.description || `Read about: ${metadata.title}`;
  let desc = document.querySelector('meta[name="description"]');
  if (!desc) {
    desc = document.createElement('meta');
    desc.name = 'description';
    document.head.appendChild(desc);
  }
  desc.content = descContent;

  // Set or update <meta name="keywords">
  if (metadata.tags && Array.isArray(metadata.tags)) {
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = metadata.tags.join(', ');
  }
}

function parseFrontMatter (raw) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = raw.match(frontMatterRegex);

  const metadata = {};
  let body = raw;

  if (match) {
    const rawMeta = match[1];
    body = body.slice(match[0].length);

    rawMeta.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      // Handle array values
      if (value.startsWith('[') && value.endsWith(']')) {
        const arr = value
          .slice(1, -1)
          .split(',')
          .map(v => v.trim().replace(/^"|"$/g, ''))
          .filter(Boolean);
        metadata[key.trim()] = arr;
      } else if (value === 'true' || value === 'false') {
      // Handle boolean
        metadata[key.trim()] = value === 'true';
      } else if (!isNaN(value)) {
      // Handle number
        metadata[key.trim()] = Number(value);
      } else {
      // String fallback
        metadata[key.trim()] = value.replace(/^"|"$/g, '');
      }
    });
  }
  return { metadata, body };
}

async function renderMarkdown(section, subsection, entry) {
  const { metadata, body } = await readEntry(section, subsection, entry);
  if (!metadata) {
    // It was there (or we'd have thrown an error), but it's not published yet. Sneaky
    renderError(403);
    return;
  }
  updateMetaTags(metadata);

  document.getElementById('content').innerHTML = marked.parse(body);

  await addBackLink(section, entry && subsection);
  addDateLine(metadata.date, section, subsection, entry);
  addCodeBlockLabels();
  Prism.highlightAll();
  maybeScrollToAnchor();
  addHoverToNerds();
}

function renderError(code) {
  let message;

  switch (code) {
  case 404:
    message = 'Huh. That doesn’t seem to exist. Perhaps lost in a wormhole?';
    break;
  case 500:
    message = 'Something broke — and it wasn’t your fault. Probably.';
    break;
  case 403:
    message = 'You don’t have access to that. Or maybe it doesn’t have access to you.';
    break;
  case 418:
    message = 'Error 418: I’m a teapot. No further explanation needed.';
    break;
  default:
    message = 'An unknown anomaly occurred. Try refreshing your warp core.';
  }

  document.getElementById('content').innerHTML = `
    <div class="error-message">
      <h2>Error ${code}</h2>
      <p>${message}</p>
    </div>
  `;
}

async function renderHomepage(section) {
  document.title = 'Flare576';
  if (!section) {
    document.getElementById('about-me').style.display = 'block';
  }
  let html = '';
  const { sections } = await readMetaFile();
  for (const build of sections) {
    if (!section || section === build) {
      html += await buildSection(build);
      document.getElementById('content').innerHTML = html;
    }
  }
  document.getElementById('content').innerHTML = html;
  if (section) {
    addBackLink();
  }
}

async function renderSubsection(section, subsection) {
  const { title, description, entries } = await readMetaFile(section, subsection);
  document.title = `Flare576 | ${title}`;

  let html = '<section class="section">';
  html += `<h2 class="section-title">${title}</h2>`;
  if (description) {
    html += `<p class="section-description">${description}</p>`;
  }

  if (entries && entries.length > 0) {
    html += `<div id="${section}.${subsection}_entries" class="entries">
      <img class="loading_entries" src="favicon.svg" />
    </div>`;
  }

  html += '</section>';
  document.getElementById('content').innerHTML = html;

  if (section !== 'steamdeck') {
    const sorty = document.querySelector('input[name="sort-select"]:checked');
    const [sortBy] = sorty.value.split('-');
    if (sortBy === 'nerd') {
      document.querySelector('input[value="date-desc"]').click();
    }
  }
  const nerdy = section === 'steamdeck' ? 'block' : 'none';
  document.getElementById('nerdFilter').style.display = nerdy;
  document
    .querySelectorAll('label[for^="sort-nerd-"]')
    .forEach(label => {
      label.style.display = nerdy;
    });

  document.getElementById('filterSortControls').style.display = 'flex';
  addBackLink(section);
}

async function nerdLocation() {
  const theHash = window.location.hash.replace(/^[^\w]+/, '');
  const [ section, subsection, entry ] = theHash.split('?')[0].split('/').filter(Boolean);
  if (!entry && subsection) {
    try {
      await readMetaFile(section, subsection); // If this doesn't  work, 'subsection' is actually an 'entry'
    } catch (e) {
      return { section, subsection: undefined, entry: subsection };
    }
  }
  return { section, subsection, entry };
}

async function renderPage() {
  document.getElementById('content').innerHTML = '';
  document.getElementById('about-me').style.display = 'none';
  document.getElementById('filterSortControls').style.display = 'none';
  const {section, subsection, entry} = await nerdLocation();
  try {
    if (entry) {
      await renderMarkdown(section, subsection, entry);
    } else if (!subsection) {
      await renderHomepage(section);
    } else {
      await renderSubsection(section, subsection);
    }
  } catch (err) {
    console.log(err);
    renderError(404);
  }
  renderAllEntries();
}

function enhanceMarked() {
  const renderer = {
    image ({href, title, text}) {
      const classes = ['thumbnail'];
      let printTitle;
      if (title === 'huge') {
        classes.push('dangerous');
      } else if (title === 'med') {
        classes.push('medium');
      } else {
        printTitle = title;
      }
      let out = `<img class="${classes.join(' ')}" src="${href}" alt="${text}"`;
      if (printTitle) {
        out += ` title="${printTitle}"`;
      }
      out += ' />';
      return `<a href="${href}">${out}</a>`;
    },
    link ({href, title, text}) {
      const isExternal = /^https?:\/\//i.test(href);
      const svgIcon = isExternal ? externalSvg.replace('external-icon','external-icon-inline') : '';
      const titleFull = title ? `title="${title}"` : '';
      return `<a
      ${titleFull}
      href="${href}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}
      >${text}${svgIcon}</a>`;
    },
    heading ({text, depth}) {
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  // Remove non-word characters
        .trim()
        .replace(/\s+/g, '-');     // Replace spaces with dashes

      // Create permalink
      const permalink = `${window.location.href.split('?')[0]}?scrollTo=${slug}`;
      const link = createLinkedElement(text, permalink);
      const heading = document.createElement(`h${depth}`);
      heading.id = slug;
      heading.className = 'entry-heading';
      heading.append(link);
      return heading.outerHTML;
    },
    code ({text, lang}) {
      if (lang === 'flare' || lang === 'assistant') {
        const innerHTML = marked.parse(text.trim());
        return `
          <div class="dialog-block ${lang}">
            ${innerHTML}
          </div>
        `;
      }

      // fallback to Prism style blocks
      return `<pre><code class="language-${lang}">${text}</code></pre>`;
    },
  };
  marked.use({ renderer });
}

// DOM listeners
document.addEventListener('DOMContentLoaded', function() {
  enhanceMarked();

  // set to last values
  const sortKey = localStorage.getItem('sortKey');
  const filterLevel = localStorage.getItem('filterLevel');
  if (sortKey) {
    document.getElementById(sortKey).click();
  }
  if (filterLevel) {
    document.getElementById('nerdLevelDisplay').textContent = filterLevel;
    document.getElementById('nerdLimit').value = filterLevel;
  }

  document.querySelectorAll('input[name="sort-select"]').forEach(input =>
    input.addEventListener('change', function() {
      localStorage.setItem('sortKey',input.id);
      renderAllEntries();
    })
  );
  document.getElementById('nerdLimit').addEventListener('input', () => {
    const newVal = document.getElementById('nerdLimit').value;
    document.getElementById('nerdLevelDisplay').textContent = newVal;
    localStorage.setItem('filterLevel', newVal);
    renderAllEntries();
  });

  window.addEventListener('hashchange', () => {
    window.scrollTo(0, 0);
    renderPage();
  });

  // Initial page render
  renderPage();
});
