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

vim.cmd [[autocmd CursorHold,CursorHoldI * lua require'nvim-lightbulb'.update_lightbulb()]]

-- Provided by setup function
--nnoremap <silent> <leader>f :Format<CR>

require'nvim-treesitter.configs'.setup {
  ensure_installed = "all", -- one of "all", "maintained" (parsers with maintainers), or a list of languages
  ignore_install = { }, -- List of parsers to ignore installing
  highlight = {
    enable = true,              -- false will disable the whole extension
    disable = { },  -- list of language that will be disabled
    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    additional_vim_regex_highlighting = false,
  },
}


--local function setup_servers()
--  require'lspinstall'.setup()
--
--  local languages = {
--    "bash",
--    "cmake",
--    "cpp",
--    "css",
--    "dockerfile",
--    "elixir",
--    "go",
--    "graphql",
--    "haskell",
--    "html",
--    "java",
--    "json",
--    "kotlin",
--    "latex",
--    "lua",
--    "python",
--    "ruby",
--    "rust",
--    "svelte",
--    "tailwindcss",
--    "typescript",
--    "vim",
--    "yaml",
--    "deno",
--  }
--
--
--  vim.cmd("let g:coq_settings = { 'auto_start': 'shut-up' }")
--
--  local servers = {}
--  for _, lang in pairs(require'lspinstall'.installed_servers()) do
--    servers[lang] = true
--  end
--
--  for _, lang in pairs(languages) do
--    if not servers[lang] then
--      require'lspinstall'.install_server(lang)
--    end
--    require'lspconfig'[lang].setup(require"coq".lsp_ensure_capabilities(
----
--    ))
--  end
--end
--
---- Automatically reload after `:LspInstall <server>` so we don't have to restart neovim
--require'lspinstall'.post_install_hook = function ()
--  setup_servers() -- reload installed servers
--  vim.cmd("bufdo e") -- this triggers the FileType autocmd that starts the server
--end
--
local lsp_installer = require "nvim-lsp-installer"
local coq = require "coq"
local lspservers = {
--  'angularls'               ,-- Angular
--  'ansiblels'               ,-- Ansible
--  'arduino_language_server' ,-- Arduino [(docs!!!)][arduino]
--  'spectral'                ,-- AsyncAPI
  'bashls'                  ,-- Bash
--  'bicep'                   ,-- Bicep
--  'ccls'                    ,-- C
  'clangd'                  ,-- C
--  'csharpls'                ,-- C#
--  'omnisharp'               ,-- C#
--  'ccls'                    ,-- C++
--  'clangd'                  ,-- C++
--  'cmake'                   ,-- CMake
--  'cssls'                   ,-- CSS
--  'cssmodules_ls'           ,-- CSS
--  'clojure_lsp'             ,-- Clojure
--  'codeqlls'                ,-- CodeQL
--  'dartls'                  ,-- Dart
  'denols'                  ,-- Deno
--  'diagnosticls'            ,-- Diagnostic (general purpose server)
--  'serve_d'                 ,-- Dlang
  'dockerls'                ,-- Docker
--  'dotls'                   ,-- Dot
--  'efm'                     ,-- EFM (general purpose server)
--  'eslint'                  ,-- ESLint [(docs)][eslint]
--  'elixirls'                ,-- Elixir
--  'elmls'                   ,-- Elm
--  'ember'                   ,-- Ember
--  'emmet_ls'                ,-- Emmet
--  'erlangls'                ,-- Erlang
--  'fsautocomplete'          ,-- F#
--  'fortls'                  ,-- Fortran
--  'gopls'                   ,-- Go
  'grammarly'               ,-- Grammarly
  'graphql'                 ,-- GraphQL
--  'groovyls'                ,-- Groovy
  'html'                    ,-- HTML
--  'hls'                     ,-- Haskell
  'jsonls'                  ,-- JSON
--  'jdtls'                   ,-- Java
--  'quick_lint_js'           ,-- JavaScript
  'tsserver'                ,-- JavaScript
--  'jsonnet_ls'              ,-- Jsonnet
--  'kotlin_language_server'  ,-- Kotlin
--  'ltex'                    ,-- LaTeX
--  'texlab'                  ,-- LaTeX
--  'sumneko_lua'             ,-- Lua
--  'zk'                      ,-- Markdown
--  'ocamlls'                 ,-- OCaml
--  'ccls'                    ,-- Objective C
--  'spectral'                ,-- OpenAPI
--  'intelephense'            ,-- PHP
--  'phpactor'                ,-- PHP
--  'powershell_es'           ,-- Powershell
--  'prismals'                ,-- Prisma
--  'puppet'                  ,-- Puppet
--  'purescriptls'            ,-- PureScript
--  'jedi_language_server'    ,-- Python
  'pyright'                 ,-- Python
--  'pylsp'                   ,-- Python [(docs)][pylsp]
--  'rescriptls'              ,-- ReScript
--  'rome'                    ,-- Rome
--  'solargraph'              ,-- Ruby
  'rust_analyzer'           ,-- Rust [(wiki)][rust_analyzer]
--  'sqlls'                   ,-- SQL
--  'sqls'                    ,-- SQL
--  'solang'                  ,-- Solang Solidity
--  'solidity_ls'             ,-- Solidity (vscode)
--  'sorbet'                  ,-- Sorbet
--  'esbonio'                 ,-- Sphinx
--  'stylelint_lsp'           ,-- Stylelint
  'svelte'                  ,-- Svelte
--  'sourcekit'               ,-- Swift
  'tailwindcss'             ,-- Tailwind CSS
--  'terraformls'             ,-- Terraform
--  'tflint'                  ,-- Terraform [(docs)][tflint]
--  'tsserver'                ,-- TypeScript [(docs)][tsserver]
--  'vala_ls'                 ,-- Vala
  'vimls'                   ,-- VimL
--  'volar'                   ,-- Vue
--  'vuels'                   ,-- Vue
--  'lemminx'                 ,-- XML
  'yamlls'                  ,-- YAML
--  'zls'                     ,-- Zig
}

local function on_attach(client, bufnr)
  -- Set up buffer-local keymaps (vim.api.nvim_buf_set_keymap()), etc.
  vim.api.nvim_set_keymap("n", "<leader><leader>", ":lua vim.lsp.buf.code_action()<CR>", {noremap = true, silent = true})
  vim.api.nvim_set_keymap("n", "<leader>f", ":lua vim.lsp.buf.formatting()<CR>", {noremap = true, silent = true})
  vim.cmd("let g:coq_settings = { 'auto_start': 'shut-up' }")
end

local enhance_server_opts = {
  -- Provide settings that should only apply to the "eslintls" server
  ["eslintls"] = function(opts)
    opts.settings = {
      format = {
        enable = true,
      },
    }
  end,
}

for _, name in pairs(lspservers) do
  local server_is_found, server = lsp_installer.get_server(name)
  if server_is_found then
    if not server:is_installed() then
      print("Installing " .. name)
      server:install()
    end
  end
end


lsp_installer.on_server_ready(function(server)
    local opts = {
      on_attach = on_attach,
    }

    if server.name == "rust_analyzer" then
        -- Initialize the LSP via rust-tools instead
        require("rust-tools").setup {
            -- The "server" property provided in rust-tools setup function are the
            -- settings rust-tools will provide to lspconfig during init.            --
            -- We merge the necessary settings from nvim-lsp-installer (server:get_default_options())
            -- with the user's own settings (opts).
            server = vim.tbl_deep_extend("force", server:get_default_options(), coq.lsp_ensure_capabilities(opts)),
        }
        server:attach_buffers()
    else
        if enhance_server_opts[server.name] then
          -- Enhance the default opts with the server-specific ones
          enhance_server_opts[server.name](opts)
        end
        server:setup(coq.lsp_ensure_capabilities(opts))
    end
end)

require'lsp_extensions'.inlay_hints()
