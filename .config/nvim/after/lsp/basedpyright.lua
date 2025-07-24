return {
  -- use `uv` to run inside proper environment
  -- cmd = { 'uv', 'run', 'basedpyright-langserver', '--stdio' },
  settings = {
    -- let ruff/ty handle it
    disableOrganizeImports = true,
    basedpyright = {
      analysis = {
        -- let ruff/ty handle it
        ignore = { '*' },
        typeCheckingMode = 'off',
      },
    },
  },
}
