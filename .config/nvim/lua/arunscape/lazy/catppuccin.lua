return {
  "catppuccin/nvim",
  name = "catppuccin",
  priority = 1000,
  config = function()
    require("catppuccin").setup({
      flavour = "mocha",
      transparent_background = true,
      integrations = {
        cmp = true,
        telescope = true,
        treesitter = true,
        indent_blankline = {
          enabled = true,
          colored_indent_levels = true,
        },
        markdown = true,
        nvimtree = true,
        gitsigns = true,
        illuminate = true,
        semantic_tokens = true,
      }
    })
    vim.cmd.colorscheme "catppuccin"
  end
}
