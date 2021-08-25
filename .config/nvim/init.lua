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
--vim.cmd 'autocmd User PackerComplete'
--vim.cmd 'PackerSync'
