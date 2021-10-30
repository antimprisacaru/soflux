export const config = () => ({
    environment: process.env.NODE_ENV,
    monolith_port: parseInt(process.env.MONOLITH_PORT || '3000', 10)
});
