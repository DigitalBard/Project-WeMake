import { reactRouter } from '@react-router/dev/vite'
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const sentryConfig: SentryReactRouterBuildOptions = {
  org: 'dhp-rb',
  project: 'wemake',
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
}

export default defineConfig(config => ({
  plugins: [reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}))
