---
title: "Containerized Docker"
date: Thu Sep  4 09:37:35 AM CDT 2025
published: true
description: "Disambiguating the darling of containerization"
goal: N/A
solution: N/A
tags: ["programming","containerization","docker","podman"]
---
# Terminology

"Docker" is a complicated term - it can refer to:

- The [Docker Company]
- A [Dockerfile], a kind of recipe for computers to make other computers
- The [Command Line Tool]
- The [docker-engine], which can only run on Linux
- An assortment of related tools like [docker-compose]
- The [Docker Hub], which is a repository of images
- [Docker Desktop] - An application for macOS, Windows, an Linux that is (potentially) not free
- [Docker Shim], a component of [Kubernetes] that is being sunset...
- ... and [CRI-dockerd], another component that can be used instead

Ironically, no uses the term to refer to people who dock boats.

To add to the confusion, people often use it to refer to [containerization] in general. But we should actually start there to begin to unravel this web of terms and ideas.

# Containerization

You're reading this on a screen, and that screen is connected to a computer of some sort. That computer is running an Operating System (OS) like Windows, MacOS, Linux, iOS, Android, etc. and you use that OS to run a web browser to view this text.

You also probably have dozens of other applications installed, and some of them probably interact with each other... even if you don't know it. A problem developers often run into is that not only do the programs they use interact with each other (often in unexpected ways), sometimes they're even _named_ the same thing (different versions of programs used by different projects, for example).

`Containerization` is a way of addressing these interactions - instead of running a program on your OS, you create a Virtual Machine (VM) instead, install an OS to it, then install only the _specific_ versions of the _exact_ programs you need to make whatever you're doing work.

# Introduction to Docker

The [Docker Company] created a tool for running these images and named it the [docker-engine]. To make it easier for people to use, they also created a repository where images could be stored and accessed, called the [Docker Hub], and provided a standard way of writing the instructions a computer should follow to make a given image. These instructions are generally written to a file named [Dockerfile] in a project, and that term also refers to the language used.

They really like the term "Docker," apparently.

They also really like Linux, as the [docker-engine] only runs on that OS. In order for someone on Windows or MacOS to use the images, they need _another_ Virtual Machine running Linux on their computer.

[Docker Desktop] is an application that installs, configures, manages, and maintains just such a VM. However, [it isn't free anymore]; if you're in a company of 250+ people or $10m+ annual revenue, you need to pay a licensing fee of anywhere from $5/month to $24/month.

# Alternative - Podman Desktop

```flare
Quick Note: the [podman](https://podman.io/) tool even comes pre-installed on [SteamOS 3.5 and above](https://www.reddit.com/r/SteamDeckTricks/comments/16uq6l2/podman_and_distrobox_are_preinstalled_on_steamos/), and you can install [Podman Desktop](https://podman-desktop.io/) from the [Discover App](#/steamdeck/guides/desktop-apps-from-game-mode) - just tell it not to install `podman` after you install it!
```

There is alternative, however, called [Podman Desktop]. As the very-similar name implies, it is designed to be a replacement for [Docker Desktop].

When you download and install the application, it installs an alternative to the [docker-engine] and [Command Line Tool] called, predictably, [podman]. The goal of this software is to be as close to a 1:1 replacement for the [Docker Company]'s ecosystem as possible; in their own words

> "Simply put: alias docker=podman"


![Podman Desktop](/images/thumbnail/podman_desktop.png)

Installation on most systems and basic management of resources is similar in complexity to its competitor (available on `brew`, `flatpak`, etc.), it uses the same [Dockerfile] files/language, and can pull images from the [Docker Hub].

However, it's not perfect. In 95% of cases, [podman] works flawlessly, but if you're running a project that requires specific features of the [docker-engine], you might have containers that fail to start, or low-level network connections that fail.

# Conclusion

[Podman Desktop] is the easiest and most similar replacement to [Docker Desktop]. There are some trade-offs such as [Podman Desktop]'s UI lacking a bit of refinement and some edge-case functionality.

But it is free to try out, and if you're on a Steam Deck, you're already using it if you're using [distrobox]!

[Docker Company]: https://www.docker.com/
[Dockerfile]: https://docs.docker.com/engine/reference/builder/
[Command Line Tool]: https://docs.docker.com/engine/reference/run/
[docker-engine]: https://docs.docker.com/engine/
[docker-compose]: https://docs.docker.com/compose/
[Docker Hub]: https://docs.docker.com/docker-hub/
[Docker Desktop]: https://www.docker.com/products/docker-desktop/
[Docker Shim]: https://kubernetes.io/blog/2022/02/17/dockershim-faq/
[CRI-dockerd]: https://github.com/Mirantis/cri-dockerd
[Kubernetes]: https://kubernetes.io/
[containerization]: https://en.wikipedia.org/wiki/Containerization_(computing)
[it isn't free anymore]: https://www.docker.com/pricing/
[distrobox]: #/steamdeck/guides/distrobox
[Minikube]: https://kubernetes-sigs-minikube.netlify.app/docs/
[Using minikube as Docker Desktop Replacement]: https://kubernetes-sigs-minikube.netlify.app/docs/tutorials/docker_desktop_replacement/
[Hyperkit]: https://github.com/moby/hyperkit
[homebrew]: https://brew.sh/
[Podman Desktop]: https://podman-desktop.io/
[podman]: https://podman.io/
[lazydocker]: https://github.com/jesseduffield/lazydocker
