local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

local plugins = {
  {
    "catppuccin/nvim",
    name = "catppuccin",
    config = function()
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
          --mason = true,
          nvimtree = true,
          telescope = true,
          gitsigns = true,
        }
      })
      vim.cmd.colorscheme "catppuccin"
    end
  },
  'mfussenegger/nvim-dap',
  {
    'nvim-telescope/telescope-fzy-native.nvim',
    build = 'make'
  },
  {
    'nvim-telescope/telescope.nvim',
    branch = '0.1.x',
    dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
      require('telescope').setup {}
      require('telescope').load_extension('fzy_native')

      local builtin = require('telescope.builtin')
      vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
      vim.keymap.set('n', '<leader>fg', builtin.live_grep, {})
      vim.keymap.set('n', '<leader>fb', builtin.buffers, {})
      vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})
    end
  },
  {
    'nvim-treesitter/nvim-treesitter',
    build = function()
      require("nvim-treesitter.install").update({ with_sync = true })
    end,
    config = function()
      local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
      parser_config.org = {
        install_info = {
          url = 'https://github.com/milisims/tree-sitter-org',
          revision = 'main',
          files = { 'src/parser.c', 'src/scanner.cc' },
        },
        filetype = 'org',
      }
      require('nvim-treesitter.configs').setup {
        auto_install = true,
        highlight = {
          enable = true,
          additional_vim_regex_highlighting = { 'org' },
        },
      }
    end
  },
  {
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
  },
  'lewis6991/gitsigns.nvim',
  'lukas-reineke/indent-blankline.nvim',
  {
    'akinsho/bufferline.nvim',
    dependencies = { 'nvim-tree/nvim-web-devicons' },
    config = true,
  },
  'simrat39/rust-tools.nvim',
  {
    'VonHeikemen/lsp-zero.nvim',
    branch = 'v2.x',
    lazy = true,
    config = function()
      -- This is where you modify the settings for lsp-zero
      -- Note: autocompletion settings will not take effect

      require('lsp-zero.settings').preset({})
    end
  },

  -- Autocompletion
  {
    'hrsh7th/nvim-cmp',
    event = 'InsertEnter',
    dependencies = {
      { 'L3MON4D3/LuaSnip' },
    },
    config = function()
      -- Here is where you configure the autocompletion settings.
      -- The arguments for .extend() have the same shape as `manage_nvim_cmp`:
      -- https://github.com/VonHeikemen/lsp-zero.nvim/blob/v2.x/doc/md/api-reference.md#manage_nvim_cmp

      require('lsp-zero.cmp').extend()

      -- And you can configure cmp even more, if you want to.
      local cmp = require('cmp')
      local cmp_action = require('lsp-zero.cmp').action()

      cmp.setup({
        mapping = {
          ['<C-Space>'] = cmp.mapping.complete(),
          ['<C-f>'] = cmp_action.luasnip_jump_forward(),
          ['<C-b>'] = cmp_action.luasnip_jump_backward(),
        }
      })
    end
  },
  {
    'neovim/nvim-lspconfig',
    cmd = 'LspInfo',
    event = { 'BufReadPre', 'BufNewFile' },
    dependencies = {
      { 'hrsh7th/cmp-nvim-lsp' },
      { 'williamboman/mason-lspconfig.nvim' },
      { 'williamboman/mason.nvim' },
    },
    config = function()
      -- This is where all the LSP shenanigans will live

      local lsp = require('lsp-zero')

      lsp.on_attach(function(client, bufnr)
        -- see :help lsp-zero-keybindings
        -- to learn the available actions
        lsp.default_keymaps({ buffer = bufnr })
      end)

      -- (Optional) Configure lua language server for neovim
      require('lspconfig').lua_ls.setup(lsp.nvim_lua_ls())
      require('lspconfig').rust_analyzer.setup {
        -- Other Configs ...
        settings = {
          ["rust-analyzer"] = {
            -- Other Settings ...
            procMacro = {
              ignored = {
                  leptos_macro = {
                      "server",
                      "component",
                  },
              },
            },
          },
        }
      }

      lsp.setup()
    end
  },
  {
    'Exafunction/codeium.vim',
    config = function()
      -- Change '<C-g>' here to any keycode you like.
      vim.keymap.set('i', '<C-g>', function() return vim.fn['codeium#Accept']() end, { expr = true })
      vim.keymap.set('i', '<c-;>', function() return vim.fn['codeium#CycleCompletions'](1) end, { expr = true })
      vim.keymap.set('i', '<c-,>', function() return vim.fn['codeium#CycleCompletions'](-1) end, { expr = true })
      vim.keymap.set('i', '<c-x>', function() return vim.fn['codeium#Clear']() end, { expr = true })
    end
  }
}

local opts = nil
require("lazy").setup(plugins, opts)
