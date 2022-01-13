resource "aws_api_gateway_rest_api" "soflux" {
  name = "soflux-${var.stage}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_deployment" "soflux" {
  rest_api_id = aws_api_gateway_rest_api.soflux.id

  triggers = {
    redeployment = sha1(timestamp())
  }

  depends_on = [aws_api_gateway_integration.soflux]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "soflux" {
  deployment_id = aws_api_gateway_deployment.soflux.id
  rest_api_id   = aws_api_gateway_rest_api.soflux.id
  stage_name    = var.stage
}

resource "aws_api_gateway_resource" "soflux" {
  parent_id   = aws_api_gateway_rest_api.soflux.root_resource_id
  path_part   = "{PROXY+}"
  rest_api_id = aws_api_gateway_rest_api.soflux.id
}

resource "aws_api_gateway_method" "soflux" {
  authorization = "NONE"
  http_method   = "ANY"
  resource_id   = aws_api_gateway_resource.soflux.id
  rest_api_id   = aws_api_gateway_rest_api.soflux.id
}

resource "aws_api_gateway_integration" "soflux" {
  http_method             = aws_api_gateway_method.soflux.http_method
  resource_id             = aws_api_gateway_resource.soflux.id
  rest_api_id             = aws_api_gateway_rest_api.soflux.id
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  depends_on              = [aws_api_gateway_method.soflux]
  uri                     = module.monolith.lambda.invoke_arn
}

resource "aws_lambda_permission" "soflux_lambda_permission" {
  action = "lambda:InvokeFunction"
  function_name = module.monolith.lambda.function_name
  principal = "apigateway.amazonaws.com"
  statement_id = "AllowAPIGatewayInvoke"
  source_arn = module.monolith.lambda.arn
}
