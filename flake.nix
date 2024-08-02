{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    astal.url = "github:astal-sh/libastal";
  };

  outputs = {
    self,
    nixpkgs,
    astal,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};

    nativeBuildInputs = with pkgs; [
      wrapGAppsHook
      gobject-introspection
      nodejs
    ];

    buildInputs = with pkgs; [
      gjs
      astal.packages.${system}.default
    ];
  in {
    packages.${system}.default = pkgs.stdenv.mkDerivation rec {
      inherit nativeBuildInputs buildInputs;

      pname = "astal";
      version = "0.1.0";

      src = pkgs.buildNpmPackage {
        name = pname;
        src = ./.;
        npmDepsHash = "sha256-Epa4MtYQaQo40S5Wzyqi08UOzY8Tlew8rf3xpf8MZKU=";
        installPhase = ''
          mkdir $out
          cp -r dist/* $out
        '';
      };

      installPhase = ''
        mkdir -p $out/bin
        mkdir -p $out/share
        cp -r * $out/share

        echo "#!/usr/bin/env bash" > $out/bin/${pname}
        echo "$out/share/main.js \$@" >> $out/bin/${pname}
        chmod +x $out/bin/${pname}
      '';
    };

    devShells.${system}.default = pkgs.mkShell {
      inherit nativeBuildInputs buildInputs;
    };
  };
}
