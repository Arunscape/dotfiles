return {
  {
    "neovim/nvim-lspconfig",
    dependencies = { "williamboman/mason.nvim", "williamboman/mason-lspconfig.nvim", "hrsh7th/cmp-nvim-lsp",
      "hrsh7th/cmp-buffer", "hrsh7th/cmp-path", "hrsh7th/cmp-cmdline", "hrsh7th/nvim-cmp",
      "L3MON4D3/LuaSnip", "saadparwaiz1/cmp_luasnip", "j-hui/fidget.nvim" },

    config = function()
      local cmp = require('cmp')
      local cmp_lsp = require("cmp_nvim_lsp")
      local capabilities = vim.tbl_deep_extend("force", {}, vim.lsp.protocol.make_client_capabilities(),
        cmp_lsp.default_capabilities())

      require("fidget").setup({})
      require("mason").setup()
      require("mason-lspconfig").setup({
        automatic_installation = true,
        ensure_installed = {
          "ansiblels",
          "bashls",
          "clangd",
          "cmake",
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
          "ocamllsp",
          --"openscad_lsp",
          "pyright",
          "rust_analyzer",
          "sqlls",
          "tailwindcss",
          "terraformls",
          "tsserver",
          "yamlls",
          "terraformls",
          "typst_lsp",
          "phpactor",
          "denols",
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

      local cmp_select = {
        behavior = cmp.SelectBehavior.Select
      }

      cmp.setup({
        snippet = {
          expand = function(args)
            require('luasnip').lsp_expand(args.body) -- For `luasnip` users.
          end
        },
        --      mapping = cmp.mapping.preset.insert({
        --        ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
        --        ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
        --        ['<C-y>'] = cmp.mapping.confirm({
        --          select = true
        --        }),
        --        ["<C-Space>"] = cmp.mapping.complete()
        --      }),
        mapping = cmp.mapping.preset.insert({
          ['<C-b>'] = cmp.mapping.scroll_docs(-4),
          ['<C-f>'] = cmp.mapping.scroll_docs(4),
          ['<C-Space>'] = cmp.mapping.complete(),
          ['<C-e>'] = cmp.mapping.abort(),
          ['<CR>'] = cmp.mapping.confirm({ select = true }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
        }),
        sources = cmp.config.sources(
          {
            { name = 'nvim_lsp' },
            { name = 'luasnip' } -- For luasnip users.
          },
          {
            {
              name = 'codeium'
            }
          },
          {
            {
              name = 'buffer'
            }
          }
        )
      }
      )

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
        python = { "isort", "black" },
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
        }
      },
    },
    init = function()
      -- If you want the formatexpr, here is the place to set it
      vim.o.formatexpr = "v:lua.require'conform'.formatexpr()"
    end,
    log_level = vim.log.levels.DEBUG,
  }
}
