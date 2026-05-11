---
title: Introduction to Free and Open Source Software
author: "OS² #1"
date: 2026-04-10
tags: [osos]
excerpt: What FOSS is, why it matters, how licenses work, and how to make your first contribution to an open source project.
---

### What is Free and Open Source Software?

Software that gives you the right to *use*, *share*, *modify*, and *distribute* it, and *provides the means* to exercise those rights through the software's source code.

**Free Software** emphasises users having control over the software they use. 

**Open Source Software** emphasises access to the source code, with permission to modify it. 

These two ideologies work together to give us FOSS.

### The Four Freedoms

For software to be considered "free", it must give you:

1. The freedom to run the program as you wish, for any purpose.
2. The freedom to study how the program works, and change it so it does your computing as you wish. Access to the source code is a precondition for this.
3. The freedom to redistribute copies so you can help others.
4. The freedom to distribute copies of your modified versions to others. Access to the source code is a precondition for this.

## Software You Already Use

You've probably used FOSS without realising it. Linux, Firefox, VLC, GIMP, Krita, Inkscape, LibreOffice are all free and open source. If you're running Linux, nearly all the software you use is free.

A lot of FOSS software runs quietly in the background, even inside closed-source software you use every day:

- **HarfBuzz** handles text rendering on almost every platform
- **zlib** is a compression format used nearly everywhere
- **Minix** is what inspired Linus Torvalds to create the Linux Kernel, and if you’re using an Intel CPU, it’s also used in the Intel Management Engine.

## Why Use FOSS?

- You have complete freedom to use the software as you wish. No EULA, no Terms of Usage, no sanctions.
- You can look at its source code.
- You can modify its source code.
- You can send a copy to a friend.

With non-free software, the provider has full control over how you use the software on YOUR machine. You don't get to see what it does, and you can't change its behavior. Closed-source software is essentially a black box, despite running on your hardware.

Open source software also benefits from contributions from all around the world!

## Licenses

Open source licenses are licenses that cover a piece of software by providing you the four freedoms. They typically also:

- Abstain the maintainer from any warranty of damage caused by the software
- Place copyright notices on the software
- Govern how modified versions can be distributed

Licenses broadly fall into two categories:

**Permissive** (MIT, Apache 2, BSD, ISC): permits distribution and modification with no major conditions beyond keeping the copyright notice intact.

**Copyleft** (GPL, LGPL, MPL): permits distribution and modification, but requires that the source code of derived works be made freely available under the same license. The Linux kernel uses GPL v2, which is why any modified kernel must also be open source.

When contributing to an existing project, you'll generally stick to whatever license it already uses. If you're starting your own project, [choosealicense.com](https://choosealicense.com/licenses/) is a good starting point.

## How to Contribute

A lot of people think contributing to open source means writing code. It doesn't. There’s lots of other ways you can contribute.

- filing a detailed bug report
- improving documentation
- translating the interface
- testing a beta release
- helping someone out in the community forum

The code wouldn't be useful without any of these things around it. Documentation/Translation PRs are also often easier to get accepted since they put less burden on the maintainer to review and verify.

Testing and feedback are also incredibly important to how software actually gets built. It gives maintainers a sense of how other people actually experience their software, something they can't get just by building it themselves. We at [OSDG](https://github.com/OSDG-IIITH/) would really appreciate it if you tried out our projects and told us what you think.

### How GitHub Works

Most FOSS projects are on **GitHub**. GitHub is a not free and open source host for project source code, bug trackers, pull requests, and other things. This is called a **“git forge”**

GitHub has Issues, Pull Requests, and Discussions, which are the main ways people collaborate.

- **Issues**: bug reports and feature requests
- **Pull Requests (PRs)**: source code contributions from external developers
- **Discussions**: longer conversations and planning

There are two (major) classes of people in a project:

- **Maintainer**: develops and maintains the software primarily
- **Contributor**: an external developer who provides a contribution

Only maintainers can push directly to a repository. If you're a contributor, you fork the repository to your own account first, make your changes there, and then open a PR back to the original.

Maintainers also use PRs internally. Working on a feature branch and sending a PR to main avoids conflicts and keeps the codebase clean.

### Sending Your First PR

1. Find a repository you want to contribute to
2. Fork it to your own account
3. Clone your fork locally
4. Make your changes
5. Commit and push to your fork
6. Open a PR to the original repository

PRs are usually linked to the issue they fix. Adding `Fixes #10` in a PR description means issue #10 will automatically close once the PR is merged.

### Finding Things to Work On

Look for issues labelled **good first issue** or **beginners**. These are intentionally approachable and just need someone to fix them.

If you want to add a new feature, open an issue and discuss it with the maintainers first. You don't want to put in the work only to have the PR rejected because it doesn't fit the project's direction.

## Being a Good Contributor

Maintainers are humans, often unpaid and very busy. Be respectful of their time.

- Check if someone has already reported the bug or opened a PR for the change you want to make
- Respect the project's license, code of conduct, and contributing guidelines
- If a project has an LLM policy, follow it. And if you do use an LLM, make sure the code actually works and that the license of the code it was trained on is compatible with the project's license (it won’t be)

Create a contribution because you want to create a contribution. Do not do it to pad out your resumé, or to make your profile shiny, but to promote ethical software. Any contribution is meaningful, as long as you have put meaning behind it.

---

## Activity

https://github.com/OSDG-IIITH/os2-1-PR
