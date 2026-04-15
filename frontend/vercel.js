const rawRenderBackendUrl = process.env.RENDER_BACKEND_URL || (
  process.env.VERCEL ? '' : 'http://localhost:5000'
)

if (!rawRenderBackendUrl) {
  throw new Error('Missing RENDER_BACKEND_URL for Vercel deployment.')
}

const renderBackendUrl = rawRenderBackendUrl.replace(/\/+$/, '')

export const config = {
  framework: 'vite',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  rewrites: [
    {
      source: '/api/:path*',
      destination: `${renderBackendUrl}/api/:path*`,
    },
    {
      source: '/((?!api/|assets/|.*\\..*).*)',
      destination: '/index.html',
    },
  ],
}
