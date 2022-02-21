output "lambda" {
  value = aws_lambda_function.lambda
}

output "role_name" {
  value = aws_iam_role.lambda.name
}

output "api_id" {
  value = aws_api_gateway_rest_api.soflux.id
}
