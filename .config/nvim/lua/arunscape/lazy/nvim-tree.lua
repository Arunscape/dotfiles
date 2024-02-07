return {
  'nvim-tree/nvim-tree.lua',
  dependencies = { 'nvim-tree/nvim-web-devicons' },
  config = function()
    require('nvim-tree').setup {
      filters = {
        dotfiles = false,
      },
    }
    -- leader+t to toggle file view
    local nvimtree = require('nvim-tree.api')
    vim.keymap.set("n", '<leader>t', nvimtree.tree.toggle, {})
  end
}
