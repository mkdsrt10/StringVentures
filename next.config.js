module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['buddydrrx.s3.us-east-2.amazonaws.com'],
  },
  env:{
    ENVSTAGE:"live"
  }
}
