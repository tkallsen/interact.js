/* global process, __dirname */
const path = require('path')

const PROD_EXT = '.prod'

function babelPluginInteractjsProd () {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('[@interactjs/dev-tools] You\'re using the production plugin in the development environment. You might lose out on some helpful hints!')
  }

  const fixImportSource = ({ node: { source } }, { filename }) => {
    if (shouldIgnoreImport(source)) {
      return
    }

    let resolvedShort = ''

    try {
      const paths = [
        path.dirname(filename),
        __dirname,
        process.cwd(),
      ]

      const resolved = require.resolve(source.value, { paths })
      resolvedShort = '@interactjs/' + resolved.replace(/.*\/@interactjs\//, '')
    } catch (e) {
      return
    }

    source.value = resolvedShort.replace(/(\.js)?$/, PROD_EXT)
  }

  return {
    visitor: {
      ImportDeclaration: fixImportSource,
      ExportNamedDeclaration: fixImportSource,
    },
  }
}

function shouldIgnoreImport (source) {
  return !source ||
      // only change @interactjs scoped imports
      !source.value.startsWith('@interactjs/') ||
      // ignore imports of prod files
      source.value.endsWith(PROD_EXT) ||
      source.value.endsWith(PROD_EXT + '.js')
}

module.exports = babelPluginInteractjsProd.default = babelPluginInteractjsProd
