{ config, pkgs, ... }:

{
  # List packages installed in system profile. To search by name, run:
  # $ nix-env -qaP | grep wget
  environment.systemPackages = with pkgs;
    [ vim
      git
      neovim
      thefuck
      starship
      pyenv
      nodejs_21
      p7zip
      ripgrep
      bat
      ranger
      rustup
#     opam
      lsd
      ollama
      jdk17
      maven
      uncrustify
      jq
      fzy
      libfido2
      openssh
      lua-language-server
      chromedriver
      lua
    ];

  # Use a custom configuration.nix location.
  # $ darwin-rebuild switch -I darwin-config=$HOME/.config/nixpkgs/darwin/configuration.nix
  # environment.darwinConfig = "$HOME/.config/nixpkgs/darwin/configuration.nix";

  # Auto upgrade nix package and the daemon service.
  services.nix-daemon.enable = true;
  # nix.package = pkgs.nix;

  # Create /etc/zshrc that loads the nix-darwin environment.
  programs.zsh.enable = true;  # default shell on catalina
  # programs.fish.enable = true;

  # Used for backwards compatibility, please read the changelog before changing.
  # $ darwin-rebuild changelog
  system.stateVersion = 4;

  nixpkgs.config.allowUnfree = true;
  nix.settings.auto-optimise-store = true;

  homebrew.enable = true;

  homebrew.brews = [
    "colima"
    "docker"
    "pinentry-touchid"
  ];

  homebrew.casks = [
    "zed"
    "intellij-idea-ce"
    "visual-studio-code"
    "dbeaver-community"
    "pycharm-ce"
    "obsidian"
    "wezterm"
    "chromium"
    "spotify"
    "sf"
  ];

  homebrew.masApps = {
    Xcode = 497799835;
  };

  homebrew.taps = [
    "jorgelbg/tap"
  ];

  homebrew.onActivation.autoUpdate = true;
  homebrew.onActivation.cleanup = "zap";
  homebrew.onActivation.upgrade = true;
  

}
