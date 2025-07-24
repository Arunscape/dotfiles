local wezterm = require 'wezterm'
local config = wezterm.config_builder()

local window_background_opacity = 0.8

function change_opacity(window, amount)
  local overrides = window:get_config_overrides() or {}

  local opacity = overrides.window_background_opacity or window_background_opacity

  opacity = math.min(math.max(opacity + amount, 0), 1)

  overrides.window_background_opacity = opacity
  window:set_config_overrides(overrides)
end

function getOS()
  -- ask LuaJIT first
  if jit then
    return jit.os
  end

  -- Unix, Linux variants
  local fh, err = assert(io.popen("uname -o 2>/dev/null", "r"))
  if fh then
    osname = fh:read()
  end

  return osname or "Windows"
end

local opacity_mod = getOS() == 'Darwin' and 'CTRL|SHIFT' or 'CTRL'

wezterm.on('decrease-opacity', function(window, _pane)
  change_opacity(window, -0.1)
end)
wezterm.on('increase-opacity', function(window, _pane)
  change_opacity(window, 0.1)
end)

config.font = wezterm.font_with_fallback {
  { family = 'Monocraft Nerd Font', weight = 'Book' },
  'Monocraft',
  'Fira Code Nerd Font',
  'Fira Code',
  'Noto Sans Mono',
  'Noto Color Emoji',
  'KanjiStrokeOrders',
}

config.color_scheme = "Catppuccin Mocha"
config.window_background_opacity = window_background_opacity
config.window_close_confirmation = "NeverPrompt"
config.scrollback_lines = 10000
config.keys = {
  {
    key = 'LeftArrow',
    mods = opacity_mod,
    action = wezterm.action.EmitEvent 'increase-opacity',
  },
  {
    key = 'RightArrow',
    mods = opacity_mod,
    action = wezterm.action.EmitEvent 'decrease-opacity',
  },
  {
    key = 'w',
    mods = 'CTRL|SHIFT',
    action = wezterm.action.DisableDefaultAssignment,
  },
}
--config.debug_key_events = true
config.leader = { key = 'w', mods = 'CTRL', timeout_milliseconds = 1000 }
wezterm.plugin.require("https://gitlab.com/xarvex/presentation.wez").apply_to_config(config)
wezterm.plugin.require("https://github.com/MLFlexer/smart_workspace_switcher.wezterm").apply_to_config(config)


return config
