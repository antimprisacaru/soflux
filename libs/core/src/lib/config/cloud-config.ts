const env = process.env;

export default () => ({
  provider: env.PROVIDER,
  aws: {
    cognitoClientId: env.AWS_COGNITO_CLIENT_ID,
    cognitoUserPoolId: env.AWS_COGNITO_USER_POOL_ID
  }
});
