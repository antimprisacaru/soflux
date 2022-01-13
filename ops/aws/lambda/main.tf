resource "aws_iam_role" "lambda" {
  name                 = substr("soflux-${var.lambda_name}-lambda", 0, 64)
  max_session_duration = 12 * 3600

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowLambda",
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      }
    },
    {
      "Sid": "AllowAccount",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_s3_sources" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.soflux_lambda_sources_policy.arn
}

data "aws_iam_policy_document" "soflux_lambda_sources_policy" {
  version = "2012-10-17"
  statement {
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "arn:aws:s3:::soflux-lambda-sources/*"
    ]
  }
}

resource "aws_iam_policy" "soflux_lambda_sources_policy" {
  name   = "soflux-${var.lambda_name}-sources"
  policy = data.aws_iam_policy_document.soflux_lambda_sources_policy.json
}

data "aws_iam_policy_document" "lambda_basic" {
  version = "2012-10-17"
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = [
      "arn:aws:lambda:*"
    ]
  }
}

resource "aws_iam_policy" "lambda_basic" {
  name   = "soflux-${var.lambda_name}-basic"
  description = "Basic Policy for soflux lambdas"
  path   = "/"
  policy = data.aws_iam_policy_document.lambda_basic.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.lambda_basic.arn
}

resource "aws_lambda_function" "lambda" {
  s3_bucket        = local.source_bucket
  s3_key           = aws_s3_bucket_object.lambda_source.key
  function_name    = substr(var.lambda_name, 0, 64)
  role             = aws_iam_role.lambda.arn
  handler          = var.handler_name
  runtime          = "nodejs12.x"
  memory_size      = var.memory
  timeout          = var.timeout
  source_code_hash = aws_s3_bucket_object.lambda_source.etag

  environment {
    variables = var.environment_variables
  }
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.lambda_name}"
  retention_in_days = 30
}
