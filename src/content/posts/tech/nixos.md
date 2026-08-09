---
title: "My NixOS Personal Note"
published: 2025-12-10T20:42:37+07:00
updated: 2026-04-01
draft: false
image: "../images/nixos/featured.png"
description: "My personal notes with regard to Nixos' stuff. Additional suggestions coming from you might be taken into account and will definitely very helpful."
tags: ["nixos", "linux", "desktop", "config", "cofiguration", "home-manager"]
category: "nixos"
---

### 1. NixOS main config files

**1. NixOS config**:  
`/etc/nixos/configuration.nix` -> nix default system config.

**2. Nix Home Manager config**:  
`~/.config/home-manager/home.nix` -> nix home manager config.

### 2. Adding & Removing Packages

1. Search for the package name on https://search.nixos.org/packages.
2. Add the desired package(s) in  
- `configuration.nix`:

```shell
environment.systemPackages = with pkgs; [
    obs-studio # contoh meng-install obs-studio
];
```

Then, after adding the package name(s), run this command on the terminal:

```shell
sudo nixos-rebuild switch # directly switch to a new profile
sudo nixos-rebuild boot # apply the alteration on the boot menu
sudo nixos-rebuild test # try the change without saving it on the boot menu
```

- `home.nix`:

```shell
home.packages = with pkgs; [
    obs-studio
];
```

Then, after adding the package name(s), run this command on the terminal:

```shell
home-manager switch
```

3. Alternatively, install a package as a temporary one:

```shell
nix-shell -p obs-studio
```

4. To remove package(s), simply remove it from the config files and run this command on the terminal:

```shell
# for configuration.nix

sudo nixos-rebuild switch # directly switch to a new profile
sudo nixos-rebuild boot # apply the alteration on the boot menu
sudo nixos-rebuild test # try the change without saving it on the boot menu
```

or 

```shell
home-manager switch # for home.nix
```

### 3. Listing & Upgrading Packages[^1]

1. **Listing** Nix channels

```shell
sudo nix-channel --list
```

2. **Adding/Changing** channels

```shell
sudo nix-channel --add {name}
```

For instance, I would like to add **"NixOS"** 25.11 channel:

```shell
sudo nix-channel --add https://nixos.org/channels/nixos-25.11 nixos
```

A similar command goes with **"home-manager"** 25.11 channel:

```shell
sudo nix-channel --add https://github.com/nix-community/home-manager/archive/release-25.11.tar.gz home-manager
```

3. **Removing** channels

```shell
sudo nix-channel --remove {channel-alias}
```

For instance, I would like to remove **"nixos"** channel:

```shell
sudo nix-channel --remove nixos
```

A similar command goes with **"home-manager"** channel:

```shell
sudo nix-channel --remove home-manager
```

4. **Updating** channels

```shell
sudo nix-channel --update
```

> **Notes:** Using the previous command won't cause a rebuild itself; if you want to update channels and rebuild, use the following command to do both in one step.

5. **Upgrading** Nix packages

```shell
sudo nixos-rebuild --upgrade
```


### 4. Listing & Deleting NixOS generations

1. **Listing** NixOS generations  
- Rebuild generations

```shell
nixos-rebuild list-generations
```

atau 

```shell
sudo nix-env -p /nix/var/nix/profiles/system --list-generations
```

- Env generations

```shell
nix-env --list-generations
```

- Home manager generations

```shell
home-manager generations
```

2. **Deleting** NixOS generations
- Deleting rebuild generations

```shell
sudo nix-env -p /nix/var/nix/profiles/system --delete-generations <number>
```

- Deleting env generations

```shell
nix-env --delete-generations <number>
```

- Deleting home manager generations

```shell
home-manager remove-generations <number>
```


[^1]: https://nixos.wiki/wiki/Nix_channels










