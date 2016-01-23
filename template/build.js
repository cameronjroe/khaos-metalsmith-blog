import path             from 'path'
import config           from './build.config'
import Metalsmith       from 'metalsmith'
import collections      from 'metalsmith-collections'
import metadata         from 'metalsmith-metadata'
import markdown         from 'metalsmith-markdown'
import layouts          from 'metalsmith-layouts'
import inPlace          from 'metalsmith-in-place'
import permalinks       from 'metalsmith-permalinks'
import pagination       from 'metalsmith-pagination'
import excerpts         from 'metalsmith-excerpts'
import paths            from 'metalsmith-paths'
import sass             from 'metalsmith-sass'
import moment           from 'moment'
import define           from 'metalsmith-define'
import jekyllDates      from 'metalsmith-jekyll-dates'
import autoprefixer     from 'metalsmith-autoprefixer'
import webpack          from 'metalsmith-webpack'
import ignore           from 'metalsmith-ignore'
// prod
import htmlMinifier     from 'metalsmith-html-minifier'
import fingerprint      from 'metalsmith-fingerprint'
import imagemin         from 'metalsmith-imagemin'
import sitemap          from 'metalsmith-sitemap'

const DEFAULT_OPTIONS = {
  title: 'Metalsmith Blog',
  description: 'Blog made with Metalsmith.',
  url: '',
  sitemapPath: 'sitemap.xml'
};

export default function (specifiedOptions = {}, callback) {

  const options = Object.assign({}, DEFAULT_OPTIONS, specifiedOptions);

  // Config
  // --------------------------------------------------------------------------
  const m = Metalsmith(path.resolve(__dirname, '.'));

  // Metalsmith Config
  // --------------------------------------------------------------------------
  m.clean(true);
  m.destination('dist');
  m.metadata(options);
  
  // File Metadata
  // --------------------------------------------------------------------------
  m.use(metadata(config.metadata));

  // Ignores
  // --------------------------------------------------------------------------
  m.use(ignore(config.ignore));

  // Definitions
  // --------------------------------------------------------------------------
  m.use(define({moment}));

  // Attach Collections
  // --------------------------------------------------------------------------
  m.use(collections(config.collections));

  // Date
  // --------------------------------------------------------------------------
  m.use(jekyllDates());

  // Markdown
  // --------------------------------------------------------------------------
  m.use(markdown(config.markdown))

  // Excerpts
  // --------------------------------------------------------------------------
  m.use(excerpts());

  // Permalinks
  // --------------------------------------------------------------------------  
  m.use(permalinks(config.permalinks));

  // Pagination
  // --------------------------------------------------------------------------
  m.use(pagination(config.pagination));

  // Templates
  // -------------------------------------------------------------------------- 
  m.use(layouts(config.layouts));
  m.use(inPlace(config.inPlace));

  // Styles
  // --------------------------------------------------------------------------  
  m.use(sass(config.sass));
  m.use(autoprefixer());
  
  // Js
  // --------------------------------------------------------------------------  
  if (options.production) {
    // let webpackProdConfig = Object.assign({}, config.webpack, {
    //   // overrides
    // });
    // m.use(webpack(webpackProdConfig));
  } else {
    m.use(webpack(config.webpack));
  }

  m.use(ignore([
    'assets/js/**/!(bundle).js'
  ]));
  
  // Production
  // --------------------------------------------------------------------------  
  if (options.production) {
    
    m.use(imagemin(config.imagemin));

    m.use(htmlMinifier(config.htmlMinifier));

  }

  // Build
  // --------------------------------------------------------------------------  
  m.build(callback);

}