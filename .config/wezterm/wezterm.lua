local wezterm = require 'wezterm'

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

return {
  --font = wezterm.font 'Miracode',
  font = wezterm.font 'Monocraft',
  color_scheme = "Catppuccin Mocha",
  window_background_opacity = window_background_opacity,
  scrollback_lines = 10000,
  keys = {
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
  },
  --  debug_key_events = true,
}
