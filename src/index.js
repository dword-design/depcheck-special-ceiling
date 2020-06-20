import { includes, map } from '@dword-design/functions'
import P from 'path'
import { transform as pluginNameToPackageName } from 'plugin-name-to-package-name'

const filenames = [
  '.ceilingrc',
  '.ceilingrc.json',
  '.ceilingrc.js',
  '.ceiling.config.js',
]

export default filename => {
  if (filenames |> includes(filename |> P.basename)) {
    const config = require(filename)
    const plugins = config.plugins || []
    return (
      plugins
      |> map(shortName => pluginNameToPackageName(shortName, 'ceiling-plugin'))
    )
  }
  return []
}
