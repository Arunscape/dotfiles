return {
  {
    "neovim/nvim-lspconfig",
    dependencies = { "williamboman/mason.nvim", "williamboman/mason-lspconfig.nvim", "saghen/blink.cmp", "rafamadriz/friendly-snippets", "j-hui/fidget.nvim" },


    config = function()
      require("fidget").setup({})
      require("mason").setup()

      --On Neovim 0.11+ and Blink.cmp 0.10+, you can get rid of capabilities
      local capabilities = require('blink.cmp').get_lsp_capabilities()
      require("mason-lspconfig").setup({
        automatic_installation = true,
        ensure_installed = {
          "ansiblels",
          "bashls",
          "clangd",
          "cssls",
          "denols",
          "docker_compose_language_service",
          "dockerls",
          "html",
          "htmx",
          "jsonls",
          "kotlin_language_server",
          "lua_ls",
          "mdx_analyzer",
          --"basedpyright",
          "ty",
          "ruff",
          "rust_analyzer",
          "sqlls",
          "tailwindcss",
          "terraformls",
          "denols",
          "yamlls",
          "terraformls",
          "phpactor",
          "denols",
          "zls",
        },
        handlers = {
          function(server_name) -- default handler (optional)
            require("lspconfig")[server_name].setup {
              capabilities = capabilities
            }
          end,


          lua_ls = function()
            local lspconfig = require("lspconfig")
            lspconfig.lua_ls.setup {
              capabilities = capabilities,
              settings = {
                Lua = {
                  diagnostics = {
                    globals = { "vim", "it", "describe", "before_each", "after_each" }
                  }
                }
              }
            }
          end,
          basedpyright = function()
            local lspconfig = require("lspconfig")
            lspconfig.basedpyright.setup {
              capabilities = capabilities,
              settings = {
                basedpyright = {
                  disableOrganizeImports = true,
                  -- https://github.com/DetachHead/basedpyright/issues/203
                  typeCheckingMode = 'off',
                }
              } }
          end,
          rust_analyzer = function()
            require('lspconfig').rust_analyzer.setup {
              cargo = {
                allFeatures = true,
                loadOutDirsFromCheck = true,
                runBuildScripts = true,
              },
              -- Other Configs ...
              settings = {
                ["rust-analyzer"] = {
                  -- Add clippy lints for Rust.
                  checkOnSave = {
                    allFeatures = true,
                    command = "clippy",
                    extraArgs = { "--no-deps" },
                  },
                  procMacro = {
                    enable = true,
                    ignored = {
                      leptos_macro = {
                        "server",
                        --"component",
                      },
                    },
                  },
                  inlayHints = {
                    bindingModeHints = {
                      enable = true
                    },
                    closureCaptureHints = {
                      enable = true
                    },
                  }
                },
              }
            }
          end,
        }
      })



      vim.diagnostic.config({
        -- update_in_insert = true,
        float = {
          focusable = false,
          style = "minimal",
          border = "rounded",
          source = "always",
          header = "",
          prefix = ""
        }
      })
    end,
  },
  {
    "stevearc/conform.nvim",
    event = { "BufWritePre" },
    cmd = { "ConformInfo" },
    keys = {
      {
        -- Customize or remove this keymap to your liking
        "<leader>f",
        function()
          require("conform").format({ async = true, lsp_fallback = true })
        end,
        mode = "",
        desc = "Format buffer",
      },
    },
    -- Everything in opts will be passed to setup()
    opts = {
      -- Define your formatters
      formatters_by_ft = {
        lua = { "stylua" },
        python = { "ruff_format" },
        javascript = { { "prettierd", "prettier" } },
        rust = { "rustfmt", "leptosfmt" }
      },
      -- Set up format-on-save
      format_on_save = {
        --  timeout_ms = 500,
        lsp_fallback = true
      },
      -- Customize formatters
      formatters = {
        shfmt = {
          prepend_args = { "-i", "2" },
        },
        leptosfmt = {
          command = "leptosfmt",
          args = { "--stdin" },
          condition = function(self, ctx)
            -- only run on rust files that import leptos
            return vim.bo.filetype == "rust" and vim.fn.search("use leptos") > 0
          end
        },
      },
    },
    init = function()
      -- If you want the formatexpr, here is the place to set it
      vim.o.formatexpr = "v:lua.require'conform'.formatexpr()"
    end,
    log_level = vim.log.levels.DEBUG,
  }
}
