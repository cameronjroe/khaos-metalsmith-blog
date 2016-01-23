import path from 'path'
import fs from 'fs'
import webpack from 'webpack'

var config = {

  ignore: [
    '_data/**',
    '_drafts/*.md',
    'templates/**',
    'lib/**',
    'feed.xml'
  ],

  /**
   * Metadata
   */
  metadata: {
    site: '_data/_config.yaml'
  },

  /**
   * Markdown
   */
  markdown: {
    gfm: true,
    tables: true
  },

  /**
   * Collections
   */
  collections: {
    pages: {
      pattern: 'pages/*.md'
    },
    posts: {
      pattern: 'posts/!(index).md',
      sortBy: 'date',
      reverse: true
    }
  },

  /**
   * Permalinks
   */
  permalinks: {
    relative: false,
    linksets: [
      {
        match: { collection: 'pages' },
        pattern: ':title'
      },
      {
        match: { collection: 'posts' },
        pattern: ':date/:title'
      }
    ]
  },

  /**
   * Pagination
   */
  pagination: {
    'collections.posts': {
      perPage: 10,
      first: 'blog/index.html',
      path: 'blog/:num/index.html',
      pageMetadata: {
        title: 'Blog'
      },
      pageContents: fs.readFileSync('src/posts/index.md'),
      layout: 'blog.liquid'
    }
  },
  
  /**
   * Imagemin
   */
  imagemin: {
    optimizationLevel: 4,
    progressive: true
  },

  /**
   * HtmlMinifier
   */
  htmlMinifier: {
    removeComments: false,
    removeEmptyAttributes: false
  },

  /**
   * Layouts
   */
  layouts: {
    engine: 'liquid',
    directory: 'templates/_layouts',
    includeDir: 'templates/_includes'
  },

  /**
   * InPlace
   */
  inPlace: {
    engine: 'liquid',
    pattern: '**/*.liquid',
    includeDir: 'templates/_includes'
  },
  
  /**
   * Webpack
   */
  webpack: {
    entry: path.resolve(__dirname, '../src/assets/js/index.js'),
    output: {
      path: path.resolve(__dirname, '../dist/assets/js'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
      ]
    },
    externals: {
      'jquery': 'jQuery',
    }
  },
  
  /**
   * Sass
   */
  sass: {
    outputDir: 'assets/css'
  }

};

export default config;