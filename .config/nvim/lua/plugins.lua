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
          mason = true,
          nvimtree = true,
          telescope = true,
          gitsigns = true,
        }
      })
      vim.cmd.colorscheme "catppuccin"
    end
  },
  {
    'ms-jpq/coq_nvim',
    config = function()
      vim.g.coq_settings = {
        auto_start = 'shut-up',
      }
    end
  },
  'ms-jpq/coq.artifacts',
  {
    'ms-jpq/coq.thirdparty',
    branch = '3p',
  },
  {
    'williamboman/mason.nvim',
    config = true,
  },
  'neovim/nvim-lspconfig',
  {
    'williamboman/mason-lspconfig.nvim',
    dependencies = {
      'neovim/nvim-lspconfig',
      'williamboman/mason.nvim',
      'ms-jpq/coq_nvim',
      'ms-jpq/coq.artifacts',
      'ms-jpq/coq.thirdparty',
    },
    config = function()
      require('mason-lspconfig').setup({
        automatic_installation = true,
        ensure_installed = {
          "awk_ls",
          "ansiblels",
          "bashls",
          "clangd",
          "neocmake",
          "cssls",
          "denols",
          "dockerls",
          "docker_compose_language_service",
          "efm",
          "gopls",
          "grammarly",
          "graphql",
          "html",
          --"hls",
          "jsonls",
          --"julials",
          "kotlin_language_server",
          "pyright",
          "prosemd_lsp",
          "rust_analyzer",
          "rnix",
          --"ocamllsp",
          "openscad_lsp",
          "prismals",
          "lua_ls",
          "svelte",
          "sqlls",
          "solidity",
          "taplo",
          "tailwindcss",
          "lemminx",
          "texlab",
          "tsserver",
          "vimls",
          "yamlls",
        },
      })
      local coq = require "coq"
      require("mason-lspconfig").setup_handlers {
        -- The first entry (without a key) will be the default handler
        -- and will be called for each installed server that doesn't have
        -- a dedicated handler.
        function(server_name) -- default handler (optional)
          require("lspconfig")[server_name].setup {
            coq.lsp_ensure_capabilities {}
          }
        end,
        -- Next, you can provide a dedicated handler for specific servers.
        -- For example, a handler override for the `rust_analyzer`:
        -- ["rust_analyzer"] = function ()
        --     require("rust-tools").setup {}
        -- end
        ["lua_ls"] = function()
          require("lspconfig")["lua_ls"].setup {
            coq.lsp_ensure_capabilities {
              settings = {
                Lua = {
                  diagnostics = {
                    globals = { "vim" },
                  },
                },
                workspace = {
                  library = vim.api.nvim_get_runtime_file("", true),
                },
                telemetry = {
                  enable = false,
                },
              },
            },
          }
        end,

      }
    end
  },
  'mfussenegger/nvim-dap',
  {
    'nvim-telescope/telescope-fzf-native.nvim',
    build = 'make'
  },
  {
    'nvim-telescope/telescope.nvim',
    branch = '0.1.x',
    dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
      require('telescope').setup {}
      require('telescope').load_extension('fzf')

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
          dotfiles = true,
        },
      }
      -- leader+t to toggle file view
      local nvimtree = require('nvim-tree.api')
      vim.keymap.set("n", '<leader>t', nvimtree.tree.toggle, {})
    end
  },
  'lewis6991/gitsigns.nvim',
  'lukas-reineke/indent-blankline.nvim',
  'github/copilot.vim',
  {
    'nvim-orgmode/orgmode',
    --ft= {'org'},
    config = function()
      require('orgmode').setup {}
      require('orgmode').setup_ts_grammar()
    end
  },
}

local opts = nil
require("lazy").setup(plugins, opts)
