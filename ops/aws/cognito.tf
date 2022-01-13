resource "aws_cognito_user_pool" "main" {
  name = "soflux-identity-pool-${var.stage}"

  password_policy {
    minimum_length    = 6
    require_lowercase = false
    require_numbers   = false
    require_symbols   = false
    require_uppercase = false
  }
}

resource "aws_cognito_user_pool_client" "main" {
  name  = "soflux-user-pool-client-${var.stage}"

  user_pool_id        = aws_cognito_user_pool.main.id
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]

  refresh_token_validity = 365
}
