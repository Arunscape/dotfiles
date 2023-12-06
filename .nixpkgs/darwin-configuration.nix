{ config, pkgs, ... }:

{
  # List packages installed in system profile. To search by name, run:
  # $ nix-env -qaP | grep wget
  environment.systemPackages =
    [ pkgs.vim
      pkgs.git
      pkgs.jetbrains.pycharm-community
      pkgs.vscode
      pkgs.neovim
      pkgs.thefuck
      pkgs.starship
      pkgs.wezterm
      pkgs.pyenv
      pkgs.nodejs_21
      pkgs.p7zip
      pkgs.ripgrep
      pkgs.bat
      pkgs.ranger
      pkgs.rustup
#      pkgs.opam
      pkgs.lsd
      pkgs.obsidian
      pkgs.ollama
      pkgs.jdk17
      pkgs.maven
      pkgs.uncrustify
      pkgs.jq
      pkgs.fzy
      pkgs.libfido2
      pkgs.openssh
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
  

}
