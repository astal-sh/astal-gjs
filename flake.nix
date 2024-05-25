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
      esbuild
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
        npmDepsHash = "sha256-RnhAG2qTmQSIdCuHIuQw1aY6/HQpwjKtrDCvq/WJoy8=";
        installPhase = ''
          mkdir -p $out
          cp -r * $out
        '';
      };

      buildPhase = ''
        esbuild \
          --bundle src/main.ts \
          --outdir=dist \
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
        cp -r dist/* $out/share
        echo "#!/usr/bin/env bash" > $out/bin/astal-js
        echo "${pkgs.gjs}/bin/gjs -m $out/share/main.js $@" >> $out/bin/astal-js
        chmod +x $out/bin/astal-js
      '';
    };

    devShells.${system}.default = pkgs.mkShell {
      inherit nativeBuildInputs buildInputs;
    };
  };
}
