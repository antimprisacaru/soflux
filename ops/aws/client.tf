data "aws_iam_policy_document" "client_policy" {
  statement {
    actions   = [
      "s3:GetObject"
    ]
    principals {
      identifiers = ["*"]
      type        = "AWS"
    }
    resources = [
      "arn:aws:s3:::soflux-${var.stage}/*"
    ]
  }
}

resource "aws_s3_bucket" "client_bucket" {
  bucket = "soflux-${var.stage}"
  acl    = "public-read"
  policy = data.aws_iam_policy_document.client_policy.json
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "null_resource" "build" {
  provisioner "local-exec" {
    working_dir = "${path.module}/../../"
    command     = "gulp build:client"
  }
}

resource "aws_s3_bucket_object" "file" {
  for_each = fileset("${path.module}/../../dist/apps/client", "**")

  bucket       = aws_s3_bucket.client_bucket.id
  key          = each.key
  source       = "${path.module}/../../dist/apps/client/${each.key}"
  source_hash  = filemd5("${path.module}/../../dist/apps/client/${each.key}")
  acl          = "public-read"
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.key), null)

  depends_on = [
    aws_s3_bucket.client_bucket,
    null_resource.build
  ]
}
