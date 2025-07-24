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

function isMacos()
  return wezterm.target_triple:sub(- #"-apple-darwin") == '-apple-darwin'
end

local opacity_mod = 'CTRL'

if isMacos() then
  opacity_mod = opacity_mod .. '|SHIFT'
end

wezterm.on('decrease-opacity', function(window, _pane)
  change_opacity(window, -0.1)
end)
wezterm.on('increase-opacity', function(window, _pane)
  change_opacity(window, 0.1)
end)


config.font = wezterm.font_with_fallback {
  { family = "FiraCode Nerd Font",  weight = "DemiBold" },
  { family = 'Monocraft Nerd Font', weight = 'Book' },
  'Monocraft',
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
local workspace_switcher = wezterm.plugin.require("https://github.com/MLFlexer/smart_workspace_switcher.wezterm")
if isMacos() then
  opacity_mod = opacity_mod .. '|SHIFT'
  workspace_switcher.zoxide_path = "/opt/homebrew/bin/zoxide"
end
workspace_switcher.apply_to_config(config)

return config
