async function readMetaFile (section, subsection) {
  const metaPath = ["content",section,subsection,"meta.json"].filter(Boolean).join("/");
  console.log(metaPath);
  const res = await fetch(metaPath);
  return await res.json();
}

async function readEntry (section, subsection, entry) {
  let entryPath = `content/${section}/`;
  if (entry) entryPath += `${subsection}/entries/${entry}.md`
  else entryPath += `/entries/${subsection}.md`

  const res = await fetch(entryPath);
  const raw = await res.text();
  return parseFrontMatter(raw);
  return metadata;
}

async function buildSection(section) {
  const { title, description, subsections, entries } = await readMetaFile(section);

  let html = `<section class="section">`;
  html += `<h2 class="section-title">${title}</h2>`;

  if (subsections && subsections.length > 0) {
    html += `<div class="subsections">`;
    for (const subsection of subsections) {
      const { title, description, subsections, entries } = await readMetaFile(section, subsection);
      html += `<a href="#/${section}/${subsection}" class="subsection-card">${title}</a>`;
    }
    html += `</div>`;
  }

  if (entries && entries.length > 0) {
    html += `<div class="entries">`;
    for (const entry of entries) {
      html += buildEntry(section, entry);
    }
    html += `</div>`;
  }

  html += `</section>`;
  return html;
}

async function buildEntry(section, subsection, entry) {
  const { metadata } = await readEntry(section, subsection, entry);

  const entryPath = subsection
    ? `#/${section}/${subsection}/${entry}`
    : `#/${section}/${entry}`;

  return `
    <a href="${entryPath}" class="entry-card">
      <h3>${metadata.title}</h3>
      <p>${metadata.description || ''}</p>
    </a>`;
}

function updateMetaTags(metadata) {
  // Set <title>
  if (metadata.title) {
    document.title = `${document.title} | ${metadata.title}`;
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

  let metadata = {};
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
      }
      // Handle boolean
      else if (value === 'true' || value === 'false') {
        metadata[key.trim()] = value === 'true';
      }
      // Handle number
      else if (!isNaN(value)) {
        metadata[key.trim()] = Number(value);
      }
      // String fallback
      else {
        metadata[key.trim()] = value.replace(/^"|"$/g, '');
      }
    });
  }
  return { metadata, body };
}

async function renderMarkdown(section, subsection, entry) {
  const { metadata, body } = await readEntry(section, subsection, entry);
  updateMetaTags(metadata);

  const renderer = {
    image ({href, title, text}) {
      let out = `<img src="${href}" alt="${text}"`
      if (title) {
        out += ` title="${title}"`;
      }
      if (href.includes("/thumbnail/")) {
        out += ` class="thumbnail"`;
      }
      out += ' />';
      return out;
    },
  };
  marked.use({ renderer })

  const html = marked.parse(body);
  document.getElementById('content').innerHTML = html;
}

function renderError(num) {
    document.getElementById('content').innerHTML = "Something witty about not being able to find what you're looking for";
}

function buildAboutMe() {
  return `
  <section class="section about-me">
    <div class="about-container">
      <img
        src="https://www.gravatar.com/avatar/e48bcf18380a4aa636d620c535b02d03?s=120"
        alt="Jeremy"
        class="about-avatar"
      />
      <div class="about-text">
        <h2 class="section-title">About Me</h2>
        <p>Hey, I'm Jeremy — I write about programming, Steam Deck hacks, interesting convos with my family, and cool stuff I list on eBay.</p>
        <div class="social-links">
          <a href="https://bsky.app/profile/YOUR_HANDLE.bsky.social" target="_blank" aria-label="BlueSky">
            <img src="/images/bluesky.svg" alt="BlueSky" />
          </a>
          <a href="https://github.com/flare576" target="_blank" aria-label="GitHub">
            <img src="/images/github.svg" alt="GitHub" />
          </a>
          <a href="https://www.ebay.com/usr/flare576" target="_blank" aria-label="eBay">
            <img src="/images/ebay.svg" alt="eBay" />
          </a>
          <a href="https://www.linkedin.com/in/jeremy-scherer-4268b232" target="_blank" aria-label="LinkedIn">
            <img src="/images/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  </section>
`;
}

async function renderHomepage() {
  // todo: render the personal section
  let html = buildAboutMe();;
  const { sections } = await readMetaFile();
  for (const section of sections) {
    html += await buildSection(section);
  }
  document.getElementById('content').innerHTML = html;
}

async function renderSubsection(section, subsection) {
  const { title, description, subsections, entries } = await readMetaFile(section, subsection);
  // For now, re-use the section styling when you load a subsection
  let html = `<section class="section">`;
  html += `<h2 class="section-title">${title}</h2>`;

  if (entries && entries.length > 0) {
    html += `<div class="entries">`;
    for (const entry of entries) {
      html += await buildEntry(section, subsection, entry);
    }
    html += `</div>`;
  }

  html += `</section>`;
  document.getElementById('content').innerHTML = html;
}

async function renderPage() {
  const theHash = window.location.hash.replace(/^[^\w]+/, '');
  const pathParts = theHash.split('/').filter(Boolean);
  const [section, subsection, entry] = pathParts;
  try {
    if (entry) {
      await renderMarkdown(section, subsection, entry);
    } else if (!subsection) {
      await renderHomepage();
    } else {
      try {
        await renderSubsection(section, subsection);
      } catch (err) {
        console.log(err);
        // Huh. Well, maybe this actually a entry without a subsection
        await renderMarkdown(section, subsection);
      }
    }
  } catch (err) {
    console.log(err);
    renderError(404);
  }
}

window.addEventListener('hashchange', () => {
  window.scrollTo(0, 0);
  renderPage();
});
renderPage();
