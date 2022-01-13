variable "stage" {
  type    = string
  default = "dev"
}

locals {
  mime_types = jsondecode(file("${path.module}/utils/mimes.json"))
}
