const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    
    //scope: '/app',
    //sw: 'service-worker.js',
    //...
})
  
  module.exports = withPWA({
    reactStrictMode: false,
    swcMinify: true,
    output: 'standalone',
    images: {
      domains: ['media-exp1.licdn.com']
    }
  }) 