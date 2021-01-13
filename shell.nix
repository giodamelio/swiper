let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-14_x
    pkgs.python2

    # Development tools
    pkgs.just
  ];

  shellHook = ''
  export PYTHON=$(which python2)
  '';
}
