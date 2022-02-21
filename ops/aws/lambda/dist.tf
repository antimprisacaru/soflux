resource "null_resource" "build" {
  provisioner "local-exec" {
    working_dir = "${path.module}/../../../"
    command     = var.source_build_script
  }

  triggers = {
    always_run = timestamp()
  }
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "./../../dist/${var.source_path}"
  output_path = "${path.module}/dist/${var.lambda_name}.zip"

  depends_on = [
    null_resource.build
  ]
}

resource "null_resource" "download" {
  triggers = {
    build_number = timestamp()
  }

  provisioner "local-exec" {
    working_dir = "."
    command     = "aws s3 cp ${path.module}/dist/${var.lambda_name}.zip s3://soflux-lambda/${var.lambda_name}.zip"
  }

  depends_on = [
    data.archive_file.lambda
  ]
}

resource "aws_s3_bucket_object" "lambda_source" {
  bucket = local.source_bucket
  key    = "${var.lambda_name}.zip"
  source = "${path.module}/dist/${var.lambda_name}.zip"
  etag   = timestamp()

  depends_on = [
    null_resource.download
  ]
}

locals {
  source_bucket  = var.source_bucket == "" ? "soflux-lambda" : var.source_bucket
}

