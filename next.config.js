const nextConfig = {
  env: {
    BASE_API_URL: 'http://192.168.0.14:4000/api',
    GCP_API_KEY: 'AIzaSyCiByOVsTONV6IbAiApGDLIq1S-WSp8WHY',
  },
  images: {
    domains: [
      'localhost',
      'huru-bucket-maja.s3-sa-east-1.amazonaws.com',
      'huru-bucket-maja.s3.amazonaws.com',
      'amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
