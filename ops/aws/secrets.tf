resource "aws_secretsmanager_secret" "cognito_user_pool" {
  name = "cognito-user-pool-id-${var.stage}"
}

resource "aws_secretsmanager_secret_version" "cognito_user_pool" {
  secret_id     = aws_secretsmanager_secret.cognito_user_pool.id
  secret_string = aws_cognito_user_pool.main.id
}

resource "aws_secretsmanager_secret" "cognito_user_pool_client" {
  name = "cognito-client-id-${var.stage}"
}

resource "aws_secretsmanager_secret_version" "cognito_user_pool_client" {
  secret_id     = aws_secretsmanager_secret.cognito_user_pool_client.id
  secret_string = aws_cognito_user_pool_client.main.id
}
