resource "aws_s3_bucket" "logs_bucket" {
  bucket_prefix = "cf-logs-${var.stage}"
  acl           = "private"
}

resource "aws_cloudfront_distribution" "soflux_distribution" {
  origin {
    domain_name = aws_s3_bucket.client_bucket.website_endpoint
    origin_id   = "client"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1","TLSv1.1"]
    }
  }

  origin {
    domain_name = "${aws_api_gateway_rest_api.soflux.id}.execute-api.eu-central-1.amazonaws.com"
    origin_path = "/${var.stage}/graphql"
    origin_id = "monolith"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1","TLSv1.1"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "client"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  ordered_cache_behavior {
    path_pattern     = "/graphql"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "monolith"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  logging_config {
    include_cookies = true
    bucket          = aws_s3_bucket.logs_bucket.bucket_domain_name
    prefix          = "cloudfront_logs"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  depends_on = [aws_api_gateway_integration.lambda, aws_api_gateway_integration.lambda_root, aws_s3_bucket_object.file]
}
