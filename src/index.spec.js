import { mapValues } from '@dword-design/functions'
import depcheck from 'depcheck'
import outputFiles from 'output-files'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from '.'

const runTest = config => () =>
  withLocalTmpDir(async () => {
    await outputFiles(config.files)

    const result = await depcheck('.', {
      package: {
        dependencies: {
          'ceiling-plugin-foo': '^1.0.0',
        },
      },
      specials: [self],
    })
    expect(result.dependencies).toEqual([])
  })

export default {
  valid: {
    files: {
      '.ceilingrc.json': JSON.stringify({
        plugins: ['foo'],
      }),
    },
  },
} |> mapValues(runTest)
