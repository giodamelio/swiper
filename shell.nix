let
  pkgs = import <nixpkgs> {};
  unstable = import <nixos-unstable> {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-12_x

    # Development tools
    pkgs.awscli
    pkgs.just
    unstable.terraform_0_14
  ];

  shellHook = ''
    alias tf=teraform
  '';
}
