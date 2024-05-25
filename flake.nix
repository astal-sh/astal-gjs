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
    ];

    buildInputs = with pkgs; [
      gjs
      astal.packages.${system}.default
    ];
  in {
    packages.${system}.default = pkgs.stdenv.mkDerivation rec {
      inherit nativeBuildInputs buildInputs;

      pname = "astal-js";
      version = "0.1.0";

      src = pkgs.buildNpmPackage {
        name = pname;
        src = ./.;
        dontNpmBuild = true;
        npmDepsHash = "sha256-XNuT+Csuik8V1s0zJ37cRIYsdJeEKaQAS9PMn5fsf4s=";
        installPhase = ''
          mkdir -p $out
          cp -r * $out
        '';
      };

      buildPhase = ''
        ${pkgs.esbuild}/bin/esbuild \
          --bundle src/main.ts \
          --outfile=shell.js \
          --format=esm \
          --external:console \
          --external:system \
          --external:file://\* \
          --external:gi://\* \
          --external:resource://\* \
      '';

      installPhase = ''
        mkdir -p $out/bin
        mkdir -p $out/share
        cp -r shell.js $out/share/shell.js
        echo "#!/usr/bin/env bash" > $out/bin/astal-js
        echo "${pkgs.gjs}/bin/gjs -m $out/share/shell.js $@" >> $out/bin/astal-js
        chmod +x $out/bin/astal-js
      '';
    };

    devShells.${system}.default = pkgs.mkShell {
      inherit nativeBuildInputs buildInputs;
    };
  };
}
