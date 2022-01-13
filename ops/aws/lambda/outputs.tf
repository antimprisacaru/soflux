output "lambda" {
  value = aws_lambda_function.lambda
}

output "role_name" {
  value = aws_iam_role.lambda.name
}
