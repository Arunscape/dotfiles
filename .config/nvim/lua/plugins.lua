local fn = vim.fn

-- Auto install packer.nvim
local install_path = fn.stdpath('data') .. '/site/pack/packer/start/packer.nvim'

if fn.isdirectory(install_path) == 0 then
  fn.system({'git', 'clone', 'https://github.com/wbthomason/packer.nvim', install_path})
  vim.cmd 'autocmd User PackerComplete ++once'
  require('packer').sync()
end

require('packer').startup(function()
  -- Packer can manage itself
  use 'wbthomason/packer.nvim'
  use 'RRethy/nvim-base16'
  use 'neovim/nvim-lspconfig'
  use 'nvim-lua/lsp-status.nvim'
  use 'nvim-lua/completion.nvim'
  use 'sbdchd/neoformat'
  use {
        'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate'
    }
end)

vim.cmd('colorscheme base16-chalk')

-- function to attach completion when setting up lsp
local on_attach = function(client)
    lsp_status.register_progress()
    lsp_status.config(
        {
            status_symbol = "LSP ",
            indicator_errors = "E",
            indicator_warnings = "W",
            indicator_info = "I",
            indicator_hint = "H",
            indicator_ok = "ok"
        }
    )

    require "completion".on_attach(client)

end

local servers = {
"als",
"angularls",
"ansiblels",
"bashls",
"beancount",
"bicep",
"ccls",
"clangd",
"clojure_lsp",
"cmake",
"codeqlls",
"crystalline",
"cssls",
"dartls",
"denols",
"dhall_lsp_server",
"diagnosticls",
"dockerls",
"dotls",
"efm",
"elixirls",
"elmls",
"ember",
"erlangls",
"flow",
"fortls",
"fsautocomplete",
"gdscript",
"ghcide",
"gopls",
"graphql",
"groovyls",
"haxe_language_server",
"hie",
"hls",
"html",
"intelephense",
"java_language_server",
"jdtls",
"jedi_language_server",
"jsonls",
"julials",
"kotlin_language_server",
"lean3ls",
"leanls",
"metals",
"mint",
"nimls",
"ocamlls",
"ocamllsp",
"omnisharp",
"perlls",
"perlpls",
"phpactor",
"powershell_es",
"prismals",
"puppet",
"purescriptls",
"pylsp",
"pyright",
"r_language_server",
"racket_langserver",
"rescriptls",
"rls",
"rnix",
"rome",
"rust_analyzer",
"scry",
"serve_d",
"solargraph",
"sorbet",
"sourcekit",
"sqlls",
"sqls",
"stylelint_lsp",
"sumneko_lua",
"svelte",
"svls",
"tailwindcss",
"terraformls",
"texlab",
"tflint",
"tsserver",
"vala_ls",
"vimls",
"vls",
"vuels",
"yamlls",
"zeta_note",
"zls"}

local nvim_lsp = require "lspconfig"
local lsp_status = require("lsp-status")

for _, lsp in ipairs(servers) do
  nvim_lsp[lsp].setup {
    on_attach = on_attach,
    capabilities = lsp_status.capabilities
  }
end

