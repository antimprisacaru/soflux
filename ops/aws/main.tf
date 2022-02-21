module "monolith" {
  source                    = "./lambda"
  lambda_name               = "soflux-api-${var.stage}"
  source_path               = "apps/monolith"
  source_build_script       = "gulp build:monolith"
  handler_name              = "main.handler"
  timeout                   = 60
  memory                    = 256
  environment_variables     = {
    ENV                      = var.stage
    NAMESPACE_UUID           = "94d5a6f3-9f37-47b3-9d27-cab0db4b7494"
    JWT_SECRET               = "3525a474-a7ad-424f-b750-7cd1c03af399"
    PROVIDER                 = "aws"
    AWS_COGNITO_USER_POOL_ID = aws_cognito_user_pool_client.main.user_pool_id,
    AWS_COGNITO_CLIENT_ID    = aws_cognito_user_pool_client.main.id
  }
  set_environment_variables = true
  stage                     = var.stage
}

data "aws_caller_identity" "caller" {}
