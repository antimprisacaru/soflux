import cloudConfig from './cloud-config';

export default () => ({
    env: process.env.ENV,
    monolith_port: parseInt(process.env.MONOLITH_PORT || '3000', 10),
    namespace_uuid: process.env.NAMESPACE_UUID,
    cloud: cloudConfig(),
    jwt_secret: process.env.JWT_SECRET
});
