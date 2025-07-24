return {
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
  },
  capabilities = {
    experimental = {
      serverStatusNotification = true
    }
  }
}
