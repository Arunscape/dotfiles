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

vim.opt.wildignore = {'*/cache/*', '*/tmp/*', "*/target/*", "*/build/*"}

--vim.api.nvim_set_keymap(mode, key, result, {noremap = true, silent = true})
vim.api.nvim_set_keymap("", "<leader>y", [["+y]], {noremap = true, silent = true})
vim.api.nvim_set_keymap("", "<leader>p", [["+p]], {noremap = true, silent = true})

require('plugins')
--vim.cmd 'PackerClean'
--vim.cmd 'PackerSync'

vim.cmd('colorscheme base16-chalk')

vim.cmd([[autocmd BufWritePost plugins.lua source <afile> | PackerCompile]])


local function setup_servers()
  require'lspinstall'.setup()

  local languages = {
    "bash",
    "cmake",
    "cpp",
    "css",
    "dockerfile",
    "elixir",
    "go",
    "graphql",
    "haskell",
    "html",
    "java",
    "json",
    "kotlin",
    "latex",
    "lua",
    "python",
    "ruby",
    "rust",
    "svelte",
    "tailwindcss",
    "typescript",
    "vim",
    "yaml",
    "deno",
  }


  vim.cmd("let g:coq_settings = { 'auto_start': v:true }")

  local servers = {}
  for _, lang in pairs(require'lspinstall'.installed_servers()) do
    servers[lang] = true
  end

  for _, lang in pairs(languages) do
    if not servers[lang] then
      require'lspinstall'.install_server(lang)
    end
    require'lspconfig'[lang].setup(require"coq".lsp_ensure_capabilities(
--
    ))
  end
end

-- Automatically reload after `:LspInstall <server>` so we don't have to restart neovim
require'lspinstall'.post_install_hook = function ()
  setup_servers() -- reload installed servers
  vim.cmd("bufdo e") -- this triggers the FileType autocmd that starts the server
end

setup_servers()

