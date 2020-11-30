import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    indent: false
  },
  plugins: [
    del({ targets: ['./dist', './types'] }),
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true
    })
  ]
}
