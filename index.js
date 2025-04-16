const externalSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" class="external-icon" viewBox="0 0 24 24" fill="none">
    <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"/>
  </svg>
`;

async function readMetaFile (section, subsection) {
  const metaPath = ['content',section,subsection,'meta.json'].filter(Boolean).join('/');
  console.log(metaPath);
  const res = await fetch(metaPath);
  return await res.json();
}

async function readEntry (section, subsection, entry) {
  let entryPath;
  if (!subsection) {
    entryPath=`${section}.md`;
  } else {
    entryPath = `content/${section}/`;
    if (entry) {
      entryPath += `${subsection}/entries/${entry}.md`;
    } else {
      entryPath += `/entries/${subsection}.md`;
    }
  }

  const res = await fetch(entryPath);
  const raw = await res.text();
  return parseFrontMatter(raw);
}

async function buildSection(section) {
  const { title, description, subsections, entries } = await readMetaFile(section);

  let html = '<section class="section">';
  html += `<h2 class="section-title">${title}</h2>`;

  if (subsections && subsections.length > 0) {
    html += '<div class="subsections">';
    for (const subsection of subsections) {
      const { title, description, subsections, external } = await readMetaFile(section, subsection);
      if (external) {
        html += `
          <a href="${external}" target="_blank" class="subsection-card external">
            <span class="external-title">${title}</span>
            ${externalSvg}
          </a>
        `;
      } else {
        html += `<a href="#/${section}/${subsection}" class="subsection-card">${title}</a>`;
      }
    }
    html += '</div>';
  }

  if (entries && entries.length > 0) {
    html += '<div class="entries">';
    for (const entry of entries) {
      html += buildEntry(section, entry);
    }
    html += '</div>';
  }

  html += '</section>';
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
  updateMetaTags(metadata);

  const renderer = {
    image ({href, title, text}) {
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${title}"`;
      }
      if (href.includes('/thumbnail/')) {
        out += ' class="thumbnail"';
      }
      out += ' />';
      return out;
    },
  };
  marked.use({ renderer });

  const html = marked.parse(body);
  document.getElementById('content').innerHTML = html;
}

function renderError(num) {
  document.getElementById('content').innerHTML = 'Something witty about not being able to find what you\'re looking for';
}

async function renderHomepage() {
  document.getElementById('about-me').style.display = 'block';
  let html = '';
  const { sections } = await readMetaFile();
  for (const section of sections) {
    html += await buildSection(section);
  }
  document.getElementById('content').innerHTML = html;
}

async function renderSubsection(section, subsection) {
  const { title, description, subsections, entries } = await readMetaFile(section, subsection);
  // For now, re-use the section styling when you load a subsection
  let html = '<section class="section">';
  html += `<h2 class="section-title">${title}</h2>`;

  if (entries && entries.length > 0) {
    html += '<div class="entries">';
    for (const entry of entries) {
      html += await buildEntry(section, subsection, entry);
    }
    html += '</div>';
  }

  html += '</section>';
  document.getElementById('content').innerHTML = html;
}

async function renderPage() {
  document.getElementById('about-me').style.display = 'none';
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
