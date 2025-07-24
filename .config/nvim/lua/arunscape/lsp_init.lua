vim.keymap.set('n', '<leader>f', function()
  vim.lsp.buf.format {
    async = true
  }
end, {})

-- inlay hints
vim.lsp.inlay_hint.enable()

vim.lsp.config('*', {
  root_markers = { '.git' },
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



-- auto format on save
vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("my.lsp", {}),
  callback = function(args)
    local client = assert(vim.lsp.get_client_by_id(args.data.client_id))
    local bufnr = args.buf

    -- Enable formatting on save if supported
    if client.supports_method("textDocument/formatting", nil) then
      vim.api.nvim_create_autocmd("BufWritePre", {
        group = vim.api.nvim_create_augroup("my.lsp.format", { clear = false }),
        buffer = bufnr,
        callback = function()
          vim.lsp.buf.format({ bufnr = bufnr, timeout_ms = 1000 })
        end,
      })
    end
  end,
})


-- basically, all I need to do is create a file that returns an empty table for
-- each default config from nvim/nvim-lspconfig that I want to use
local lsp_files = vim.api.nvim_get_runtime_file("after/lsp/*.lua", true)
for _, file in ipairs(lsp_files) do
  --local name = file:gsub("%.lua$", "")
  local name = file:gsub(".*/(.-)%.lua$", "%1")
  vim.lsp.enable({ name })
end
