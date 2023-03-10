local ensure_packer = function()
  local fn = vim.fn
  local install_path = fn.stdpath('data') .. '/site/pack/packer/start/packer.nvim'
  if fn.empty(fn.glob(install_path)) > 0 then
    fn.system({ 'git', 'clone', '--depth', '1', 'https://github.com/wbthomason/packer.nvim', install_path })
    vim.cmd [[packadd packer.nvim]]
    return true
  end
  return false
end

local packer_bootstrap = ensure_packer()

vim.cmd([[
  augroup packer_user_config
    autocmd!
    autocmd BufWritePost plugins.lua source <afile> | PackerCompile
  augroup end
]])

return require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'
  use 'williamboman/mason.nvim'
  use 'neovim/nvim-lspconfig'
  use 'williamboman/mason-lspconfig.nvim'
  use "jose-elias-alvarez/null-ls.nvim"
  use "jay-babu/mason-null-ls.nvim"
  use 'mfussenegger/nvim-dap'
  use 'ms-jpq/coq_nvim'
  use 'ms-jpq/coq.artifacts'
  use {
    'ms-jpq/coq.thirdparty',
    branch = '3p',
  }
  use { "catppuccin/nvim", as = "catppuccin" }
  use 'github/copilot.vim'
  use {
    'nvim-telescope/telescope.nvim', tag = '0.1.1',
    -- or                       , branch = '0.1.x',
    requires = { { 'nvim-lua/plenary.nvim' } }
  }
  use {
    'nvim-treesitter/nvim-treesitter',
    run = function()
      local ts_update = require('nvim-treesitter.install').update({ with_sync = true })
      ts_update()
    end,
  }
  use { 'nvim-telescope/telescope-fzf-native.nvim', run = 'make' }
  use {
    'nvim-tree/nvim-tree.lua',
    requires = { 'nvim-tree/nvim-web-devicons' },
  }
  use 'lewis6991/gitsigns.nvim'
  use "lukas-reineke/indent-blankline.nvim"
  use { 'nvim-orgmode/orgmode', config = function()
    require('orgmode').setup {}
  end
  }

  -- Automatically set up your configuration after cloning packer.nvim
  -- Put this at the end after all plugins
  if packer_bootstrap then
    require('packer').sync()
  end
end)
