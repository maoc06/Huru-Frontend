const nextConfig = {
  env: {
    BASE_API_URL: 'http://192.168.0.14:4000/api',
    GCP_API_KEY: 'AIzaSyCiByOVsTONV6IbAiApGDLIq1S-WSp8WHY',
    GOOGLE_CLIENT_ID:
      '681570192204-ctccnudkst1qgqq8bgppbqbf8r1q0c3j.apps.googleusercontent.com',
    FACEBOOK_CLIENT_ID: '509838006695234',
  },
  images: {
    domains: [
      'localhost',
      'huru-bucket-maja.s3-sa-east-1.amazonaws.com',
      'huru-bucket-maja.s3.sa-east-1.amazonaws.com',
      'huru-bucket-maja.s3.amazonaws.com',
      'amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
