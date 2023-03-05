local wezterm = require 'wezterm'

local window_background_opacity = 0.8

function change_opacity(window, amount)
  local overrides = window:get_config_overrides() or {}

  local opacity = overrides.window_background_opacity or window_background_opacity

  opacity = math.min(math.max(opacity + amount, 0), 1)
  
  overrides.window_background_opacity = opacity
  window:set_config_overrides(overrides)
end

wezterm.on('decrease-opacity', function(window, _pane)
  change_opacity(window, -0.1)
end)
wezterm.on('increase-opacity', function(window, _pane)
  change_opacity(window, 0.1)
end)

return {
  font = wezterm.font 'Monocraft',
  color_scheme = "Catppuccin Mocha",
  window_background_opacity = window_background_opacity,
  keys = {
    {
      key = 'LeftArrow',
      mods = 'CTRL',
      action = wezterm.action.EmitEvent 'increase-opacity',
    },
    {
      key = 'RightArrow',
      mods = 'CTRL',
      action = wezterm.action.EmitEvent 'decrease-opacity',
    },
  },
--  debug_key_events = true,
}
