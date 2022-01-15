output "api" {
  value = aws_api_gateway_deployment.soflux.invoke_url
}

output "aws_cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "aws_cognito_client_pool_id" {
  value = aws_cognito_user_pool_client.main.id
}

output "deployment" {
  value = "https://${aws_cloudfront_distribution.soflux_distribution.id}.cloudfront.net"
}
