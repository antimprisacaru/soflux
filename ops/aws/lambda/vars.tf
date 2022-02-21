variable "source_bucket" {
  type    = string
  default = ""
}

variable "lambda_name" {
  type = string
}

variable "source_path" {
  type = string
}

variable "source_build_script" {
  type = string
}

variable "memory" {
  type    = string
  default = "128"
}

variable "timeout" {
  type    = string
  default = "15"
}

variable "environment_variables" {
  type    = map(string)
  default = null
}

variable "set_environment_variables" {
  type    = bool
  default = true
}

variable "handler_name" {
  type    = string
  default = "index.handler"
}

variable "stage" {
  type    = string
  default = "dev"
}
