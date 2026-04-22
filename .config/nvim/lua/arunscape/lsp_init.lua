-- 1. Global Keymaps
vim.keymap.set('n', '<leader>f', function()
  vim.lsp.buf.format({ async = true })
end, { desc = "LSP: Format current buffer" })

-- 2. Diagnostic Configuration
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

-- 3. Default LSP Config (Neovim 0.11+)
-- This sets defaults for all servers managed by the built-in lsp engine
vim.lsp.config('*', {
  root_markers = { '.git' },
})

-- 4. LSP Attachment Logic
-- Define augroups outside the callback to prevent redundant creation
local lsp_group = vim.api.nvim_create_augroup("my.lsp", { clear = true })
local format_group = vim.api.nvim_create_augroup("my.lsp.format", { clear = false })

vim.api.nvim_create_autocmd("LspAttach", {
  group = lsp_group,
  callback = function(args)
    -- MODERNIZATION: get_client_by_id is deprecated in 0.11+
    -- We now use get_clients and filter by id.
    local client = assert(vim.lsp.get_clients({ id = args.data.client_id })[1])
    local bufnr = args.buf

    -- FIXED: Changed the dot (.) to a colon (:)
    -- The client object is now a metatable class in Neovim 0.11+
    local can_format = client:supports_method("textDocument/formatting", { bufnr = bufnr })

    -- Auto-format on save
    if can_format then
      vim.api.nvim_create_autocmd("BufWritePre", {
        group = format_group,
        buffer = bufnr,
        callback = function()
          vim.lsp.buf.format({ bufnr = bufnr, id = client.id, timeout_ms = 1000 })
        end,
      })
    end

    -- FIXED: Also updated to the colon (:) syntax here
    if client:supports_method("textDocument/inlayHint", { bufnr = bufnr }) then
      vim.lsp.inlay_hint.enable(true, { bufnr = bufnr })
    end
  end,
})

-- 5. Dynamic Server Loading
-- Automatically enables any server that has a corresponding file in after/lsp/
local lsp_files = vim.api.nvim_get_runtime_file("after/lsp/*.lua", true)
for _, file in ipairs(lsp_files) do
  -- Extract filename without path or extension (e.g., "lua_ls" from "/.../lua_ls.lua")
  local name = file:match("([^/]+)%.lua$")
  if name then
    -- Using the modern vim.lsp.enable
    vim.lsp.enable(name)
  end
end
