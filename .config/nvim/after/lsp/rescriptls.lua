---@type vim.lsp.Config
return {
  cmd = { 'rescript-language-server', '--stdio' },
  filetypes = { 'rescript' },
  root_markers = { 'bsconfig.json', 'rescript.json', '.git' },
  ---@type lspconfig.settings.rescriptls
  settings = {},
  init_options = {
    extensionConfiguration = {
      -- buggy, prompts much too often, superseded by incrementalTypechecking, below
      askToStartBuild = false,

      allowBuiltInFormatter = true, -- lower latency
      incrementalTypechecking = {   -- removes the need for external build process
        enabled = true,
        acrossFiles = true,
      },
      cache = { projectConfig = { enabled = true } }, -- speed up latency dramatically
      codeLens = true,
      inlayHints = { enable = true },
    },
  },
}
