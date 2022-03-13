/* eslint-disable unicorn/prefer-module,unicorn/prefer-node-protocol,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions */
import axios from 'axios'
import path from 'path'

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async ({dev}) => [],
  plugins: [
    'react-static-plugin-typescript',
    require.resolve('react-static-plugin-sass'),
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
