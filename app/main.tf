terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "github" {
  owner = "SATISHKAALANGI"
}

resource "github_repository" "repo" {
  name        = "my-terraform-repo"
  description = "Repository created using Terraform"
  visibility  = "public"
  auto_init   = true
}