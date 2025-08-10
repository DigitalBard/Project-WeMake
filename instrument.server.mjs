import * as Sentry from '@sentry/react-router'

Sentry.init({
  dsn: 'https://bd2697b69fb0e38c74bb6f9d62c74761@o4509818145931264.ingest.us.sentry.io/4509818153533440',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
})
