local fn = vim.fn

-- Auto install packer.nvim
local install_path = fn.stdpath('data') .. '/site/pack/packer/start/packer.nvim'

if fn.isdirectory(install_path) == 0 then
  fn.system({'git', 'clone', 'https://github.com/wbthomason/packer.nvim', install_path})
  vim.cmd 'autocmd User PackerComplete ++once'
  require('packer').sync()
end

return require('packer').startup(function()
  -- Packer can manage itself
  use 'wbthomason/packer.nvim'
  use 'RRethy/nvim-base16'
  use 'neovim/nvim-lspconfig'
  use 'sbdchd/neoformat'
  use {
        'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate'
    }
  use 'kabouzeid/nvim-lspinstall'
  use { 'ms-jpq/coq_nvim', branch = 'coq'} -- fast as fuck completion
  use { 'ms-jpq/coq.artifacts', branch= 'artifacts'} -- 9000+ Snippets
  use 'kosayoda/nvim-lightbulb'
  use 'nvim-lua/lsp_extensions.nvim'
end)
