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
vim.api.nvim_set_keymap("", "<leader>y", [["+y]], {noremap = true, silent = true})
vim.api.nvim_set_keymap("", "<leader>p", [["+p]], {noremap = true, silent = true})


require('plugins')

require("mason").setup()
require("mason-lspconfig").setup({
    ensure_installed = { 
      "sumneko_lua", 
      "rust_analyzer", 
      "bashls",
      "awk_ls",
      "cssmodules_ls",
      "dockerls",
      "eslint",
      "grammarly",
      "graphql",
      "html",
      "jsonls",
      "tsserver",
      "pyright",
      "taplo", --toml
      "vimls",
      "lemminx",
      "yamlls",
    },
    automatic_installation = true,
})

vim.g.coq_settings = {
  auto_start = 'shut-up',
}
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

--vim.cmd('colorscheme base16-chalk')

require('nightfox').setup({
  options = {
    transparent = true
  },
})
vim.cmd('colorscheme carbonfox')
