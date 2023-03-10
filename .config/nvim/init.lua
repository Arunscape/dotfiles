-- general settings
-- vim.o
--
-- window scoped
-- vim.wo
--
-- buffer scoped
-- vim.bo
--
-- global variables
-- vim.g

--vim.opt.autochdir = true
vim.opt.autoread = true
vim.opt.autowrite = true
vim.opt.mouse = "a"
vim.opt.number = true
vim.opt.termguicolors = true
vim.opt.syntax = "on"
vim.opt.smartcase = true
vim.opt.incsearch = true
vim.opt.signcolumn = "number"
vim.opt.splitright = true

-- use space as a the leader key
vim.g.mapleader = ' '

vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.softtabstop = 2
vim.opt.expandtab = true

vim.opt.autoindent = true
vim.opt.copyindent = true
vim.opt.smartindent = true

vim.opt.wildignore = {'*/cache/*', '*/tmp/*', "*/target/*", "*/build/*", "*/node_modules/*"}

--vim.api.nvim_set_keymap(mode, key, result, {noremap = true, silent = true})
-- leader+y to copy to system clipboard
vim.api.nvim_set_keymap("", "<leader>y", [["+y]], {noremap = true, silent = true})
-- leader+p to paste from system clipboard
vim.api.nvim_set_keymap("", "<leader>p", [["+p]], {noremap = true, silent = true})
local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
vim.keymap.set('n', '<leader>fg', builtin.live_grep, {})
vim.keymap.set('n', '<leader>fb', builtin.buffers, {})
vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})

-- leader+t to toggle file view
local nvimtree = require('nvim-tree.api')
vim.keymap.set("n", '<leader>t', nvimtree.tree.toggle, {})

require('plugins')

require("mason").setup()
require("mason-lspconfig").setup({
    automatic_installation = true,
    automatic_setup = true,
})

local coq = require "coq"
require("mason-lspconfig").setup_handlers {
        -- The first entry (without a key) will be the default handler
        -- and will be called for each installed server that doesn't have
        -- a dedicated handler.
        function (server_name) -- default handler (optional)
            require("lspconfig")[server_name].setup {
              coq.lsp_ensure_capabilities{}
            }
        end,
        -- Next, you can provide a dedicated handler for specific servers.
        -- For example, a handler override for the `rust_analyzer`:
        -- ["rust_analyzer"] = function ()
        --     require("rust-tools").setup {}
        -- end
}

require("mason-null-ls").setup({
    automatic_installation = true,
    automatic_setup = true,
})
require('mason-null-ls').setup_handlers()

--vim.cmd('colorscheme base16-chalk')

--require('nightfox').setup({
--  options = {
--    transparent = true
--  },
--})
--vim.cmd('colorscheme carbonfox')

require("catppuccin").setup({
    flavour = "mocha",
    transparent_background = true,
    integrations = {
      coc_nvim = true,
      treesitter = true,
      indent_blankline = {
        enabled = true,
        colored_indent_levels = true,
      },
      markdown = true,
      mason = true,
      nvimtree = true,
      telescope = true,
      gitsigns = true,
    }
})
vim.cmd.colorscheme "catppuccin"

require'nvim-treesitter.configs'.setup {
  auto_install = true,

  highlight = {
    enable = true,
    additional_vim_regex_highlighting = {'org'},
  },
}

require('telescope').setup{}
require('telescope').load_extension('fzf')

require("nvim-tree").setup({
  filters = {
    dotfiles = true,
  },
})

require('gitsigns').setup()
require("indent_blankline").setup {}
require('orgmode').setup_ts_grammar()

vim.cmd("autocmd BufWritePre lua vim.lsp.buf.format()")

vim.g.coq_settings = {
  auto_start = 'shut-up',
}
