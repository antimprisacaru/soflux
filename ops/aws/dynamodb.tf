resource "aws_dynamodb_table" "soflux_users" {
  name         = "soflux-users-${var.stage}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
