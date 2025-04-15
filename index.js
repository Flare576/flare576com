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

async function loadMarkdown(section, subsection, post) {
  let postPath = `content/${section}/`;
  if (post) postPath += `${subsection}/entries/${post}.md`
  else postPath += `/entries/${subsection}.md`

  const res = await fetch(postPath);
  const raw = await res.text();
  const { metadata, body } = parseFrontMatter(raw);
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

async function readMetaFile (section, subsection) {
  const metaPath = ["content",section,subsection,"meta.json"].filter(Boolean).join("/");
  console.log(metaPath);
  const res = await fetch(metaPath);
  return await res.json();
}

async function buildSection(section, subsection) {
  const {title, description, subsections, entries } = await readMetaFile(section, subsection);
  let html = `<div>${title}</div>`;
  if (subsections) {
    for (const subsection of subsections) {
      html += await buildSection(section, subsection);
    }
  }
  return html;
}


async function loadHomepage() {
  // todo: render the personal section
  let html = "this is you";
  const { sections } = await readMetaFile();
  for (const section of sections) {
    html += await buildSection(section);
  }
  document.getElementById('content').innerHTML = html;
}

async function loadSection(section, subsection) {
  document.getElementById('content').innerHTML = buildSection(section, subsection);;
}

async function loadPage() {
  const theHash = window.location.hash.replace(/^[^\w]+/, '');
  const pathParts = theHash.split('/').filter(Boolean);
  const [section, subsection, post] = pathParts;
  try {
    if (post) {
      await loadMarkdown(section, subsection, post);
    } else if (!subsection) {
      if (!section) {
        // The root, the root, the root is on fire
        await loadHomepage();
      } else {
        await loadSection(section);
      }
    } else {
      try {
        await loadSection(section, subsection);
      } catch (err) {
        // Huh. Well, maybe this actually a post without a subsection
        await loadMarkdown(section, subsection);
      }
    }
  } catch (err) {
    console.log(err);
    renderError(404);
  }
}

loadPage();
