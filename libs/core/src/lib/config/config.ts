export default () => ({
  environment: process.env.NODE_ENV,
  monolith_port: parseInt(process.env.MONOLITH_PORT || '3000', 10),
  namespace_uuid: process.env.NAMESPACE_UUID,
  cloud_provider: process.env.CLOUD_PROVIDER,
  jwt_secret: process.env.JWT_SECRET
});
