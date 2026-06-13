/**
 * @i18n/en.ts
 * English translation file
 */

export const en = {
  // Add English translations here
  'lang.en': 'English',
  'lang.label': 'Language',
  'lang.list': 'Select language',

  // Site wide
  'site.title': 'snsn-wiki',
  'site.description': 'Astro-powered personal wiki',

  // OGP
  'og.locale': 'en_US',

  // Header
  'header.navigation': 'Navigation',
  'nav.home': 'Home',
  'nav.category': 'Category',
  'nav.graph': 'Graph',
  'nav.tags': 'Tags',
  'theme.toggle': 'Toggle theme',
  
  // Search
  'search.title':       'Search',
  'search.description': 'Search wiki pages by title and content',
  'search.placeholder': 'Search pages…',
  'search.noResults':   'No results found',
  'search.loading':     'Loading…',
  'search.hint':        'Move with Tab, Enter to open, Esc to close',
  'search.countlabel':  'results',
  
  // Sidebar
  'sidebar.toggle': 'Toggle sidebar',
  'sidebar.navigation': 'Navigation',
  'sidebar.quickLinks': 'Quick Links',
  'sidebar.home': 'Home',
  'sidebar.graph': 'Graph',
  'sidebar.search': 'Search',
  'sidebar.category': 'Category',
  'sidebar.tags': 'Tags',
  'sidebar.recent': 'Recent Updates',
  'sidebar.pages': 'Pages',
  'sidebar.sampleAuto': 'Sample (Auto)',

  // Category
  'category.title': 'Category List',
  'category.sample': 'Sample',
  'category.count': 'categories',
  'category.count.page': 'pages',
  'category.more': 'See more',
  'category.description': 'Category list',
  'category.subcategories': 'Subcategories',
  'category.pages': 'Pages',

  // Tags
  'tag.title': 'Tag List',
  'tag.count': 'tags',
  'tag.count.page': 'pages',
  'tag.more': 'See more',
  'tag.description': 'Tag list',
  'tag.empty': 'No tags',

  // Recent
  'recent.title': 'Recent Updates',
  'recent.description': 'Recently updated pages',

  // Home
  'home.title': 'Home',
  'home.description': 'SNSN Wiki Home',
  'home.counter.pages': 'pages',
  'home.counter.tags': 'tags',
  'home.counter.categories': 'categories',
  'home.recentUpdates': 'Recent Updates',
  'home.tagCloud': 'Tag Cloud',
  'home.allTags': 'All Tags',
  'home.graph': 'Visualize knowledge connections with Graph View',
  'home.graphDescription': 'Interactively explore the link structure between pages',
  'home.graphLink': 'Open Graph →',
  
  // Fallback
  'fallback.warning': 'This page does not have a current translation.',
  
  // Meta
  'meta.created': 'Created',
  'meta.updated': 'Updated',
  
  // Footer
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  
  // Table of Contents
  'toc.title': 'Contents',
  'toc.open': 'Open Table of Contents',

  // Graph
  'graph.title':       'Link Graph',
  'graph.connections': 'Connections',
  'graph.noLinks':     'This page has no links yet',
  'graph.loading':     'Loading graph…',
  'graph.openFull':    'Open full graph',
  'graph.zoomIn':      'Zoom in',
  'graph.zoomOut':     'Zoom out',
  'graph.zoomFit':     'Fit view',
  'graph.toggleColor': 'Toggle tag colors',
  'graph.legendPage':  'Page',
  'graph.legendCurrent': 'Current page',
  'graph.legendMissing': 'Missing page',

  // Graph Page
  'graph.page.title':       'Graph View',
  'graph.page.description': 'Visualizing the link structure between pages. Click a node to visit the page, drag to move, and scroll to zoom.',
  'graph.error.d3':         'Failed to load D3.js',
  'graph.error.fetch':      'Failed to fetch graph data: ',
  'graph.error.noNodes':    'No pages to display yet',

  // Mini Graph
  'graph.mini.title':   'Connections',
  'graph.mini.loading': 'Loading',
  'graph.mini.noLinks': 'This page has no links yet',

  // Pages
  'pages.title': 'Pages',
  'pages.description': 'List of created pages',
  'pages.filterByTag': 'Filter by tag',
  'pages.clearFilter': 'Clear filter',
  'pages.noResults': 'No pages match the selected tags',

  // 404
  '404.title':       '404 — Page Not Found',
  '404.heading':     'Page Not Found',
  '404.message':     'The URL might be incorrect, or the page may have been deleted or moved.',
  '404.backHome':    'Back to Home',
  '404.search':      'Search',
  '404.wikiLinkHint': 'If you came from a WikiLink, the page has not been created yet. Please create a Markdown file with the same name.',


} as const;

