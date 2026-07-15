#set page("a4", numbering: "1")
#set par(leading: 0.5em)
#set text(size: 12pt, font: "Fira Sans")

#show link: it => text(fill: blue, it)
#show ref: it => text(fill: blue, it)
#show figure.caption: it => text(size: 10pt, it)
#show heading: it => {
  set block(above: 1em, below: 1em)
  set text(font: "Fira Sans")
  it
}
#show heading.where(level: 1): set text(size: 20pt)
#show heading.where(level: 2): set text(size: 18pt)
#show heading.where(level: 3): set text(size: 16pt)
#show heading.where(level: 4): set text(size: 14pt)
#show heading.where(level: 5): set text(size: 12pt)
#show heading.where(level: 6): set text(size: 10pt)

#align(center)[
  #v(2em)
  = Fedora KDE dual-boot guide
  #v(2em)
]

This guide shows you how to dual-boot Fedora KDE (or any other Fedora
edition of your choice) with Windows 10/11. There are some extra
resources linked at the end that can help you if you get stuck.

As of the time of writing, the latest version of Fedora is 42. We
recommend that you download the latest version of Fedora that is
available, instead of using the version this guide uses.

Please follow this guide from top to bottom step-by-step if you're a
beginner to Linux. Do *not* attempt to use an LLM to summarize this
document. LLMs make mistakes.

If you want a video to follow, I recommend KSK Royal's excellent
Fedora Dual-boot guide available at the below link. Please come back
and follow the #link(<ais>)[After-install Steps] once you're done
following this video guide.

https://youtu.be/eHQJMy8Q7Zk

#pagebreak()

== Table of Contents

#outline(title: none, indent: auto)

#pagebreak()

#set heading(numbering: (..nums) => {
  let nums = nums.pos()
  if nums.len() <= 1 {
    return ""
  }
  if nums.len() == 2 {
    return str(nums.last()) + "."
  }
  return nums.slice(1).map(str).join(".")
})

== Things you need

- An internet connection
- A 4 GiB (gigabyte) or larger pendrive to flash Fedora on to.
  - 8GiB+ is recommended.
  - This pendrive will be *WIPED*, so please back up any existing data on it.
- A back-up of your computer's data in case anything goes wrong (which you should be taking anyway)
- At least 100GiB of free space on your hard drive to install Fedora on to.

== Downloading the installer ISO

To install Fedora KDE, you must download the "live" "ISO" file. An
ISO file is a file that contains a bunch of files (i.e. an archive of
files) which can be flashed onto a pendrive or CD.

A live system is an operating system that can directly be booted off
of a pendrive or CD without installing it to the hard disk. This
system is ephemeral in nature, meaning that it loses any file/disk
changes you make when you reboot. It is a great way to test out an
operating system and see if it is compatible with your machine's
hardware without installing it on your machine's hard drive. Most
Linux distros (including Fedora) provide a Live system ISO that you
can use to boot into a flashed pen-drive and run the installer from
within the live system.

This ISO can be downloaded from the
#link("https://fedoraproject.org")[Fedora Website].
I recommend you try finding the download link to the latest version of
"Fedora KDE Plasma Desktop" (the latest version is 42, as of time of
writing) yourself, but if you are unable to, here's a link to that page:

- Download page for Fedora KDE: https://fedoraproject.org/kde/download \
- Learn more about Fedora KDE: https://fedoraproject.org/kde/ \
- KDE main homepage (for optional reading): https://kde.org

#block(fill: luma(230), inset: 8pt, radius: 4pt, width: 100%)[
  === What is the difference between Fedora, Fedora KDE, and Plasma Desktop?

  *Fedora* is the distribution of Linux that we're going to be using. A
  Linux distribution is (in layman's terms) a collection of packages
  that come with your operating system to make using it easier. This
  can include low-level things like the bootloader (Fedora uses GRUB)
  , kernel (Fedora 42 uses Linux 6.15), to high level things like the
  Desktop Environment (the GUI you see, depends on the Fedora Edition
  ), the Web Browser (Fedora uses Firefox), and much more.

  All of these components can be swapped for other things, which
  makes a Linux install one of the most customizable and powerful
  systems out there! Linux runs on computers, phones (Android),
  toasters, Raspberry Pis, and even on the Mars Rover!

  *KDE* e.V. is a German non-profit organisation that develops free
  and open-source software for everyone to use. One of them is the
  *Plasma Desktop Environment* (which many people call "KDE"), a
  highly customisable and user-friendly desktop-environment for Linux
  and some other OSes. Plasma also comes with its own suite of
  applications, like a file manager (Dolphin), a PDF Viewer (Okular),
  an Image Viewer (Gwenview ), some games like Solitaire and
  Minesweeper, and much more!

  There are also other desktop environments that are available on
  Linux, an example being GNOME, a simple and user-friendly DE. GNOME
  has its own suite of applications (like Nautilus, Papers, Loupe for
  the GNOME equivalents of applications mentioned above).

  The choice of a DE depends on your use-case and preference. We
  recommend KDE because it looks familiar to Windows users, is more
  customisable, and has better support for newer technologies like
  HDR and VRR. But it's entirely up to you to choose which DE to use,
  since it's your computer and Linux lets you choose.

  *Links to GNOME*

  Learn more about Fedora GNOME: https://fedoraproject.org/workstation \
  Fedora GNOME download: https://fedoraproject.org/workstation/download \
  GNOME homepage (for optional reading): https://gnome.org
]

=== Downloading the ISO <dli>

Click on the download button next to the ISO you want. If you have an
Intel/AMD CPU (most of you will), download the x86_64 ISO. If you
have an ARM CPU (Snapdragon X-Elite), download the aarch64 ISO. Click
the little green download icon to begin downloading. *Make sure you
download the Live ISO*, and not anything else.

#figure(
  caption: [A screenshot of the Fedora KDE download page],
  image(
    "assets/KDE-Download.png",
    height: 8cm,
  ),
)

==== Download using a Torrent Client (for advanced users)

_Note: This section is only for advanced users who have torrented
before. You may safely skip this section if you wish._

Downloading a large file (~2.5 GiB) through a browser may have issues
if you're on a slow/unreliable connection. You can use a torrent
client like https://qbittorrent.org to download Fedora (and most
other Linux ISOs), which is faster, more reliable, and contributes
back to the open-source community if you seed (you should (I'm
watching you)).

You can get the torrent file for Fedora ISOs from
https://torrent.fedoraproject.org.

Again, we recommend finding the download links yourself, but here
are some direct download links in case you weren't able to.

Fedora KDE x86_64 (for Intel and AMD) torrent: https://torrent.fedoraproject.org/torrents/Fedora-KDE-Desktop-Live-x86_64-42.torrent \
Fedora KDE aarch64 (for ARM computers) torrent: https://torrent.fedoraproject.org/torrents/Fedora-KDE-Desktop-Live-aarch64-42.torrent

Fedora GNOME x86_64 (for Intel and AMD) torrent: https://torrent.fedoraproject.org/torrents/Fedora-Workstation-Live-aarch64-42.torrent \
Fedora GNOME aarch64 (for ARM computers) torrent: https://torrent.fedoraproject.org/torrents/Fedora-Workstation-Live-x86_64-42.torrent

==== Download using Fedora Media Writer

You can also download the ISO using Fedora Media Writer, an
application made by the Fedora team to flash ISOs to a pendrive. Skip
to the #link(<fmw>)[Fedora Media Writer] section to see instructions.

=== Checking the ISO's hash

Please refer to the instructions given #link("https://docs.fedoraproject.org/en-US/fedora/latest/preparing-boot-media/#sect-verifying-images")[here] to verify the integrity of the downloaded ISO file.

== Flashing the Pendrive

Let's flash the pendrive with the ISO so we can boot into it. There
are tools made specifically for this purpose, we'll dive into two
of those here, Rufus (for Windows computers), and Fedora Media Writer
(for all computers, intended as a backup option if Rufus doesn't work
for some reason).

Make sure you've inserted your pendrive into the computer. *A final
warning: This step removes all the data on your pendrive. Make sure
you have backed it up (i.e. copied it to another location)*.

To avoid flashing the wrong drive, please disconnect any other
external storage devices you may have connected (such as other
pendrives, SSDs, CDs, etc).

During the flashing process, Windows may show some notifications
about "something being wrong with the drive" or to "choose options"
for it. Please ignore these notifications.

=== Using Rufus

Rufus is a tool that helps you flash an ISO file onto a pendrive.

It is a tool specifically built *for Windows computers*. If you're
using something else, you should use Fedora Media Writer (described
in the next section).

Download Rufus from https://rufus.ie. For Intel and AMD computers,
download the x64 version. For ARM computers, download the ARM64
version. You can download the "Portable" version if you like (i.e. it
does not have an installer, but the direct executable file is
downloaded instead). The Portable version is easier to remove from
your computer (you don't have to go to Settings and manually remove
it, just delete the downloaded file).

#figure(caption: [A screenshot of the Rufus download page], image(
  "assets/Rufus-Download-Page.png",
  height: 6cm,
))

Next, open Rufus (you may click "No" on the update confirmation
dialog that appears), it should look like this:

#figure(caption: [A screenshot of the start menu of Rufus], image(
  "assets/Rufus_Start.jpeg",
  height: 6cm,
))

Follow these steps:

1. Select your pendrive from the dropdown list.
2. Press the SELECT button (make sure the dropdown next to it says Disk or ISO image).
3. Select the ISO you downloaded in the file picker that appears.
4. Do not make any changes to any other settings.

Rufus should look similar to the below image:

#figure(
  caption: [A screenshot of an example of the options to be selected],
  image(
    "assets/Rufus_Flashing.jpeg",
    height: 6cm,
  ),
)

Next, click the "START" button to flash the pendrive. Use the ISO
Image mode as recommended. If this pendrive doesn't boot during the
boot process described later, re-flash using DD mode.

If a warning about the GRUB version comes up, select the option to
download the latest GRUB from the internet (usually "Yes").

Say "OK" to the warning about disk data erasure popup to begin
flashing your pendrive!

After it's done, Rufus should give you a notification/sound and say
its status is READY again. You may close Rufus when this is done.

#figure(caption: [A screenshot of the last step], image(
  "assets/Rufus_Starts.jpeg",
  height: 6cm,
))

=== Using Ventoy

Ventoy is a tool that helps you flash and boot ISO files from a pendrive.

It is a tool that works on multiple platforms, including Linux, Windows and MacOS.

Download Ventoy from https://www.ventoy.net. On the Download page, select the appropriate version for your system. For windows, download the `.zip` file, extract it, and run `Ventoy2Disk.exe`.

#figure(caption: [A screenshot of the Ventoy download page], image(
  "assets/Ventoy_Page.png",
  height: 6cm,
))

Once you open Ventoy, it should look like this:

#figure(caption: [A screenshot of Ventoy once downloaded], image(
  "assets/Ventoy_Install_1.jpeg",
  height: 6cm,
))

Follow the following steps:
1. Select your pendrive from the dropdown list
2. Click the `Install` button to install Ventoy to the selected USB drive.
3. Confirm the warning prompts that appear (ensure you have backed up the data in the disk before)
4. Once the installation is complete, the USB drive will can be used for ISO files

#figure(
  caption: [A screenshot of Ventoy while flashing the ISO],
  image(
    "assets/Ventoy_Install_2.jpeg",
    height: 6cm,
  ),
)

Next, copy the ISO file downloaded to the Ventoy-formatted USB drive. You can use the drive for booting once done. During boot, Ventoy will show the list of available ISO files to select from.

=== Using Fedora Media Writer <fmw>

Fedora Media Writer is a pendrive flashing tool developed by the same
team as the Fedora Linux distribution. We keep this option as a
backup because Rufus generally has more success with bespoke computer
configurations. Fedora Media Writer only supports x86_64 devices.

Please refer to the instructions given #link("https://docs.fedoraproject.org/en-US/fedora/latest/preparing-boot-media")[here] to download and use Fedora Media Writer.

Note that while writing the ISO image to the USB device, you may
choose the "Download automatically" option and select the
"Fedora KDE Plasma Desktop" option from the dropdown instead of
"Fedora Workstation". Once you click "Next", make sure to select
version 42, and choose the correct hardware architecture. See
#link(<dli>)[this] section to determine your hardware architecture.

== Creating space for Fedora

Now, we need to partition the computer's hard drive into two to give
some space for Fedora. For most college-work and daily tasks, giving
80-128GiB of space to fedora should be enough.

If you plan on using Fedora/Linux more faithfully and want to install
lots of software and games on it, try giving as much space to fedora
as you can, leaving windows with about 40GiB of _free space_ left.

Files on your Windows computer can be viewed under Fedora, so you
don't have to worry about moving important stuff onto another drive
to copy it over to Fedora.

Your computer's drives may already be partitioned into some units
(called partitions/volumes) by Windows, and you may have multiple
drives in your computer. This section comes down to your preference
of which partition of your drive to shrink to make space for the new
Fedora volume that will be created. Fedora will be installed onto
this partition of your drive.

To partition your drive, open Windows Disk management by following
*one* of these two methods listed below:

- Right-click the start button and choose Disk Management
- Type "Disk Management" and choose "Create and format hard disk partitions" in the start menu

The window that opened should look like this:

#figure(caption: [A screenshot of the disk management window], image(
  "assets/Disk_Management_1.jpeg",
  height: 6cm,
))

It might look different for you --- you may have more/less drives
with more/less partitions.

Find the drive with the "Windows C:" partition. If you have a D: drive
or an E: drive, you may have multiple partitions listed, in which case,
find the largest partition which is NOT an EFI or recovery partition to
shrink to give space to Fedora. You can use your file explorer's This
PC page to see which drives map to which partitions if it isn't clearly
obvious from just this program's screen.

Once you've selected the partition to shrink (I choose the Windows
C: partition), right-click it and click the "Shrink Volume option".

This dialog should appear.

#figure(caption: [A screenshot of the Shrink Volume Window], image(
  "assets/Shrink_Volume.jpeg",
  height: 6cm,
))

In the input, enter the amount of space to give to Fedora *in MiB*
(Windows displays MiB as MB, the difference between MiB and MB is
left as an exercise to the reader). 1 GiB is 1024 MiB, so use your
computer's calculator to find the equivalent amount in MiB.

For example, if I wanted to give Fedora 128 gigabytes of space, I'd
type `131072` (128*1024) in the input box.

Do choose wisely, as changing this number in the future will require
you to *remove and re-install Fedora*.

Click "Shrink" to shrink the partition.

You should now have a fresh unallocated volume show up.

#figure(
  caption: [A screenshot of the disk information after partition],
  image(
    "assets/Disk_Parted.jpeg",
    height: 6cm,
  ),
)

You may close Disk Management.

== Disabling BitLocker Encryption (only for Win10 Pro / Win 11)

_Note: This step is only necessary for Windows 10 Pro and Windows 11
(all editions) devices. You can skip this section if you have Win 10
Home or an older edition of Windows._

BitLocker is Windows' solution for full-disk encryption, i.e. it
encrypts the contents of your hard drive. It is a nice feature, but
unfortunately, it prevents dual-booting with Linux in an easy way.

There is a way of keeping BitLocker enabled while having Linux
dualbooted, but that process is very advanced. Also, keeping
BitLocker enabled will prevent you from accessing your Windows files
from Linux.

For now, we will have to disable this feature to proceed with the
installation.

*Please note that if you forget to disable BitLocker encryption, it
may render your Windows installation in a partially or fully bricked
state.*

=== Disabling Encryption

To disable BitLocker encryption:

1. Search for "device encryption" in the start menu.
2. Click the first option that appears (should open the settings app).
3. Turn the toggle for "Device Encryption" *off* if it isn't already.
4. Confirm "Turn Off" in the dialog box that appears.
5. Wait until the decryption finishes.

=== Alternative Method

*Only do this method if the above one does not work*, i.e. you are
unable to find the "Device Encryption" settings page.

1. Search for "Bitlocker" in the start menu and open the control panel page that comes.
#figure(
  caption: [A screenshot of the BitLocker settings page],
  image(
    "assets/BitLocker_Page.jpeg",
    height: 6cm,
  ),
)

2. Select the disk you want to disable BitLocker on (usually the C: drive).
3. Backup the BitLocker key if you wish to keep it (optional).

#figure(
  caption: [A screenshot of saving the BitLocker encryption key],
  image(
    "assets/Bitlocker_Save.jpeg",
    height: 6cm,
  ),
)

4. Click the "Turn off BitLocker" option.

#figure(caption: [A screenshot of disabling BitLocker], image(
  "assets/Bitlocker_Disable.jpeg",
  height: 6cm,
))

This process will take a bit of time (depending on the size of your
drive) to complete.

#block(fill: luma(230), inset: 8pt, radius: 4pt, width: 100%)[
  If you don't find any BitLocker option, your device may not support
  BitLocker. This usually happens on Windows 10 devices.
]

== Boot into your computer's UEFI Settings

*Before proceeding into the UEFI, please make sure you have your
pendrive plugged in.* This is to allow the UEFI to show you the
pendrive's entry in the boot order selection page (covered later).

Now you have to boot into your computer's UEFI (Unified Extensible
Firmware Interface) settings. A computer's UEFI is (in layman's terms
) the part of the computer that is responsible for starting the
operating system and is generally the first thing that starts up when
you boot your computer.

Your computer's UEFI has some settings that you have to change to
allow you to boot into your Fedora pendrive.

_Note: The UEFI Settings may also be (incorrectly) referred to as the
BIOS settings by some manufacturers and websites. Other names for it
are Boot Options, Firmware Settings, etc._

You can boot into the UEFI settings from Windows by following any
*one* of these two steps:

=== Method 1: Advanced Startup

Windows has a feature called Advanced Startup that allows you to,
among other things, boot into the UEFI Settings.

To get into advanced startup mode, follow any *one* of these two
steps:

- Open Command Prompt, and type the below command in it and press enter.

```cmd
shutdown /r /o /f /t 00
```

OR

- Open the start menu as if you were going to restart your computer, but _hold down Shift on your keyboard_ while you press the Restart button.

*Boot into the UEFI Settings:*

When you're in advanced startup, press Troubleshoot, then Advanced
Options, then click UEFI Firmware Settings, and finally click Restart
to boot into the UEFI settings.

#grid(
  columns: 2,
  column-gutter: 2pt,
  row-gutter: 2pt,

  image("assets/AS-1.jpg", height: 6cm),
  image("assets/AS-2.jpg", height: 6cm),

  image("assets/AS-3.jpg", height: 6cm),
  image("assets/AS-4.jpg", height: 6cm),
)

=== Method 2: Keyboard smashing <keyb>

You can open the UEFI settings by repeatedly pressing a specific key
on your keyboard as soon as the machine starts up. The specific key
depends from manufacturer to manufacturer and laptop to laptop.

It's usually one of F2, F7, F12, Delete, Enter, etc. Here's a list of
the keys for some common manufacturers:

```
  Acer: F2 or DEL
  ASUS: F2 or DEL
  Dell: F2 or F12
  HP: ESC or F10
  Lenovo: F2 or Fn + F2
  MSI: DEL
```

If these do not work, you'll need to find the key for your device, by
searching the internet. Search for "How to open BIOS on \<laptop brand>",
replacing \<laptop brand> with your laptop's name and model (for example
Framework 13, Lenovo Thinkpad, etc.).

Once you find the key, restart your computer, and press that key up
and down rapidly. You should directly be dropped into the BIOS.

== Change Boot Order and (optionally) Disable Secure Boot

UEFI firmware settings look different from computer to computer.
Older laptops will have a screen that is only controllable using keys
on your keyboard, while newer ones have mouse support. I will not be
providing screenshots here since UEFIs are different from computer to
computer.

Please feel free to use an internet search engine to get help with
this step. Stick to your manufacturer's official website if they have
instructions there. Popular YouTube videos may also be consulted.

Get familiar with your UEFI's control scheme. If it's keyboard only,
it's usually listed at the bottom of the screen.

Next, you have to find the "Boot Order" listing. It's usually present
in the "Boot" category. It looks like a changeable list of "bootable"
secondary storage media like Hard Drives, CDs, pendrives, etc. You
must move your pendrive to the top of the list, if it isn't there
already. Please look at the control scheme to know how to do so.
Usually to move entries, it's the F5/F6 or +/- keys on your keyboard,
but please check instead of blindly trusting this guide. If you find
multiple USB entries, move them all to the top.

After that's done, you can "Save and Exit" from the BIOS (usually the
F10 key, but please check). The computer should now boot into Fedora
from the pendrive.

You'll see a GNU GRUB boot menu, don't worry about that, either wait
for it to automatically select, or choose "Test this media and
start Fedora 42" from the list. Booting may take a few minutes.

Note that if you do not see the GRUB boot menu, or the computer reboots
into Windows, you will need to disable Secure Boot. Re-boot into the
BIOS/UEFI menu, and find an option called "Secure Boot" and *disable*
it. It's usually present in the "Security" category of your UEFI.

=== Using the boot menu

If the boot order page in the UEFI didn't work, most laptops allow
you to choose a boot device. You can find the Boot Menu key using the
same instructions as finding the BIOS key as outlined #link(<keyb>)[here].

You can also choose the boot device from the Advanced Startup part of
Windows too.

== Explore the Live System

_Note: The following screenshots are of Fedora KDE._

Welcome to the Fedora KDE Live System! This is what you should be
seeing.

#image("assets/Fedora-1.png", height: 10cm)

Please note that the version of KDE Plasma which is installed on the
pendrive is _older_ than the version that'll be installed once you
install Fedora. Expect some visual differences.

You can now look around the environment, see what apps are present,
see how KDE works, and explore as much as you wish! Do remember that
whatever files you create, apps you install, or settings you modify
will be *lost* on the next reboot.

Also do remember that any changes you make to *other drives* on your
computer (such as the one with Windows) in the live system *WILL*
persist, so don't go deleting System32 thinking it'll magically
revert back!

The Welcome application that opens up when you start the distro is
quite helpful. Please take a look at what it says. If you missed it,
it can be opened by opening the "Welcome Center" application from the
"Start Menu"-like equivalent (called Application Launcher on KDE).

Once you're done exploring, open the Fedora Installer application
(called Install to Hard Drive) by clicking the shortcut on the
Desktop, or from the Start Menu.

This will open a full-screen Anaconda installer.

== Install Fedora

Welcome to the Fedora Installer!

#image("assets/Installer-1.png", height: 8cm)

Choose your desired language, and click next. You should be seeing
this screen (henceforth dubbed the "Main menu").

#image("assets/Installer-2.png", height: 8cm)

We shall now go step-by-step through the installer

=== Keyboard

Click "Keyboard" in the main menu. English (US) is the keyboard
layout that most QWERTY keyboards in India use.

#image("assets/Installer-3.png", height: 8cm)

If you've purchased your computer from outside the country, e.g.
Dubai or Germany, you may have a different keyboard layout. Add one
by pressing the "+" button. Select your keyboard's layout and click
"Add". You can remove the existing "English (US)" layout by selecting
it and clicking the "-" button. You may also add additional keyboard
layouts for different languages if you wish.

Test out your keyboard layout and make sure it's correct (by checking
all the keys on your keyboard and seeing if they map correctly) using
the input box in the top right.

After you're done, click the "Done" button that's present on the
*top-left* of the screen.

=== Time & Date

Choose "Time & Date" from the main menu, and select Region "Asia" and
city "Kolkata". Leave date-time as automatic, don't change anything
else.

#image("assets/Installer-4.png", height: 8cm)

=== Network & Host Name

Let's give your computer a name. Select "Network & Host Name" from
the main menu, and type a name for your computer. This is your
computer's name, NOT your username. It will be visible when anyone
tries to connect to your computer.

Click apply and then click done to change the host name.

You may choose to connect to the Internet using the WiFi icon in the
"Taskbar" (called Panel in KDE), but that's optional. If you do
decide to connect, KDE might ask you to create a new "Wallet" (a
place where passwords are stored). You can choose a simple blowfish
wallet with a simple password since it's a live environment. The
wallet will automatically be set up for you in the actual install.

=== User Creation

Choose "User Creation" from the main menu. Here you'll create a user
for this machine. Enter your details and make sure the "wheel group
membership" option is checked.

#image("assets/Installer-5.png", height: 8cm)

Please enter a password, do not uncheck the "Require a password"
option. It only creates headaches for you later.

Click "Done" to go back.

In the main menu, the root account should automatically be disabled.
There's nothing for us to do there.

=== Installation Destination

Here's the main (and most important) part! We shall now select the
drive to install Fedora to! Please be careful here. You must choose
the drive that you gave space to in the Disk Management step.

#image("assets/Installer-6.png", height: 8cm)

Notice how I have only one disk and how there is a checkmark on that
disk? Fedora has automatically selected that disk and decided on an
automatic partition layout.

If you want to select another disk, click it until the checkmark
appears on it. Click a checkmarked disk to unselect it (the check
disappears). A disk being blue does not mean it's selected, that's
just visual feedback because you clicked it. Selected disks are
checkmarked.

For dualbooting, we have to create partitions ourselves. *Select
"Custom" in the storage configuration* and click done.

You should see this page:

#image("assets/Installer-7.png", height: 8cm)

Notice how Fedora has automatically detected 128GiB of free space
that I had created using Disk Management on Windows earlier.

The Fedora installer offers to automatically create partitions for
us. You may choose to Encrypt your Data using a password (which
achieves the same effect as BitLocker, but requiring a password to
decrypt the drive, instead of being seamless) if you wish.

Click the "Click here to create them automatically" button. This
creates a partition layout using btrfs, a filesystem that lets you do
cool things like take snapshots of your data (which is outside the
scope of this guide).

#image("assets/Installer-8.png", height: 8cm)

Notice that the available space jumped down to 1.3MiB. The partitions
have been made to be created, let's press "Done" and accept our
changes to go back! Please note that there should not be any "Delete"
entries in the changes list.

#image("assets/Installer-9.png", height: 8cm)

=== Install!

*This is the last time you can turn back and make a backup of your
system if you haven't already.* Clicking the "Begin Installation"
button will perform changes to your hard drive. If you've followed
all the steps as above, you can continue without fear.

Click Begin Installation to partition your disks and start the
installation!

#image("assets/Installer-10.png", height: 8cm)

After the installation is done, click "Finish Installation" to close
the installer. You have installed Fedora on your hard drive! You can
now restart your computer to exit the live environment, or continue
looking around if you like.

To restart your computer, open the application launcher and press the
"Restart" button and confirm to restart your computer. After the
computer shuts down, remove your USB before it begins booting up.

#block(fill: luma(230), inset: 8pt, radius: 4pt, width: 100%)[
  Make sure you remove the USB before the computer boots up, otherwise
  it will boot back into the live environment again. If it does so,
  please restart again and remove the USB this time!
]

You should now reboot into Fedora. The GRUB menu that appears should
let you pick between booting into Fedora or Windows. Congratulations!
You've successfully dual-booted your computer.

#block(fill: luma(230), inset: 8pt, radius: 4pt, width: 100%)[
  If you aren't booted into Fedora, but into windows directly, you'll
  have to open your UEFI settings and update the boot order to move
  the Fedora entry to the top.
]

== After-install Steps <ais>

These are some things you should do after installing Fedora. Please
follow this section from top-to-bottom for the best results.

=== Connect to the Internet

You can connect to the Internet using the WiFi icon in the "System
Tray", i.e. on the right side of the panel (taskbar). Choose the WiFi
network you wish to connect to and enter its credentials to connect.

Please look at the next section for instructions to connect to the
IIIT WiFi/LAN/VPN.

==== Connect to IIIT WiFi

1. Click on the WiFi button in the System Tray (present in the bottom-right of the panel/taskbar). This opens the Network Applet.
2. Click the Connect button next to the `wifi@iiith` listing
#align(center, image("assets/WiFi-1.png", height: 9cm))
3. In the window that appears, enter your email and 802.1x password in the WiFi security tab. Make sure the other fields are left as shown.
#align(center, image("assets/WiFi-2.png", height: 9cm))
4. Click the Save button and you should now be connected!

==== Connect to IIIT LAN

1. Plug in your LAN Cable.
2. Open the System Settings application and go to the WiFi & Networking subsection in the WiFi & Internet section present in the Networking category.
3. Select the "Wired Connection 1" connection.
4. Go to the "802.1x Security" tab and enter your email and 802.1x password. Leave the other fields as shown.
#align(center, image("assets/IIIT_LAN.png", height: 9cm))
5. Click the Apply button. You may need to re-plug your LAN cable. You should now be connected!

==== Connect to IIIT VPN

1. Go to https://vpn.iiit.ac.in and download the ovpn file for *Ubuntu and Debian*. It will be named `ubuntu_new.ovpn`.
2. Open the System Settings application and go to the WiFi & Networking subsection in the WiFi & Internet section present in the Networking category.
3. Click the Plus (+) button to create a new connection.
4. Scroll to the bottom and choose "Import VPN Connection..." in the window that appears.
#align(center, image("assets/IIIT_VPN-1.png", height: 9cm))
4. Enter your IIIT email as the username and LDAP password in the inputs as shown. Leave the other fields as shown. Rename the connection if you wish (I've called it "IIIT VPN").
#align(center, image("assets/IIIT_VPN-2.png", height: 9cm))
5. Click apply. The new VPN connection will be visible with a shield icon. Click "Connect" to connect to it.

Please note that the VPN will not work on IIIT WiFi or LAN. You must
be connected to a network not managed by IIIT to use the VPN.

=== Update your system

The Fedora installer copies files from the live system, and live
system ISOs are not refreshed with new versions of packages, so you
have to manually update your system to get the latest versions of
installed packages and applications.

This is kind of similar to performing a Windows update.

You may follow any *one* of the two methods listed below.

==== Method 1: Using the Discover Store

Open the "Discover" application from the Application launcher.
Discover is KDE's app store. You install most applications from here.
Unlike the Windows and Mac stores, Discover contains many more
packages and applications, and does not need an account to use.

Go to the Updates section in Discover and click the "Update" button.

// TODO: Discover update screenshot

You may have to enter your password. After the updates are
downloaded, you may have to restart your computer. These restarts are
only required if critical components like the kernel and bootloader
are updated. For regular app updates, there is no need for a restart.

If you see such a screen, click the Restart and Install updates
button.

#align(center, image("assets/Updates-2.png", height: 8cm))

==== Method 2: Using the Terminal

Fedora uses the `dnf` package manager to install packages.

To update your system, run the following command in the Konsole
application, KDE's terminal.

```bash
sudo dnf upgrade --refresh
```

You'll be asked for confirmation. Press "Y" and then enter to confirm
the update. You should restart your computer after updating.

=== Install Proprietary Media Codecs

Fedora is free and open-source software. The Fedora team only puts
packages that are free and open-source in their "repositories".
Repositories (or repos) are servers where you can download packages
from. Fedora has a default repo maintained by the Fedora team that
has lots of useful packages, but if you want to install a proprietary
closed-source application like Discord, Steam, etc., you'll have to
add another repository, or alternatively use Flatpaks (covered
later).

Unfortunately, most of the videos we watch are encoded with the HEVC
codec, which is not open-source software. Thus, Fedora does not
include it in its default repos.

There is a third-party (as in repos not made or endorsed by the
Fedora team) repository called RPMFusion that packages, according to
them, "software that the Fedora Project [...] doesn't want to ship",
which includes proprietary media codecs.

We want you to visit their website at https://rpmfusion.org and
follow the instructions to "Enable RPM Fusion on your system". You
can use the Graphical Setup method which downloads an `rpm` file that
can be opened using Discover and enabled. *Please download the
correct RPM file for your Fedora version*, `42` in case of this
guide. *Do this for both the `free` and `nonfree` repositories.*

We're not providing specific instructions here to let you learn how
to read the documentation and follow instructions from other
websites.

Next, after RPM fusion is enabled, install the proprietary media
codecs by following the instructions on this page: \
https://rpmfusion.org/Howto/Multimedia

You have to install `ffmpeg` and hardware-accelerated drivers for
your system (Intel, AMD, or NVIDIA).

Additionally, if you have an NVIDIA graphics card, please give this
page a read: \
https://rpmfusion.org/Howto/NVIDIA

=== Change Plasma settings

The Plasma Desktop Environment is one of the most customisable DEs
on Linux. Open the "System Settings" application and look around to
find options that may interest you

#align(center, image("assets/System Settings.png", height: 13cm))

A few recommended categories of settings to check out: \
Mouse & Touchpad, Keyboard, Sound, the Appearance & Style section,
etc.

Enjoy your new desktop that YOU can own and customize!

=== Install Applications

On Windows, you're used to going to app websites and downloading an
"exe" file. On Fedora (and other Linux distros), applications are
"packaged" for installation by the distro team and made available to
you through a package installer tool like `dnf` or `flatpak`. You
could also install applications from the web by downloading "rpm"
files and opening them using Discover, but this method must be used
as a last resort.

The Discover application makes installing applications easy! It is a
GUI app store that uses these package installers to install apps
while giving you a friendly UI to do so. Open Discover, search for
the application you want, or browse applications using the categories
in the left sidebar, and click the "Install" button to install the
application.

For example, here I search for Steam and I've installed the "Flatpak"
version.

#align(center, image("assets/Discover-1.png", height: 8cm))

Flatpak is another packaging format, like the default RPM you saw
earlier. Flatpak is meant for graphical apps (like Firefox, Steam,
and other GUI apps). It runs them in a sandbox environment which
prevents installed applications from modifying files willy-nilly.

Flatpak should be the preferred method of installing applications,
unless the sandboxing nature interferes with the application's
functioning. For example, VS Code is an application that doesn't work
that well with Flatpak.

For other packages, stuff like the Python programming language, the
GCC C compiler, a new Kernel, or basically anything that isn't a GUI
application, the RPM format should be used. You can install these
apps using the `dnf` command line tool or through Discover.

Here are some useful `dnf` commands:

#align(center, table(
  align: center,
  column-gutter: 2pt,
  row-gutter: 2pt,
  columns: 2,
  [Install a package], [`sudo dnf install <package>`],
  [Search for packages], [`dnf search <package>`],
  [Get package info], [`dnf info <package>`],
  [Remove a package], [`dnf remove <package>`],
  [Upgrade a package], [`dnf upgrade <package>`],
))

To install VS Code, you should download the "RPM" file from
the VS Code website.

=== Browse files from Windows

Open the "Dolphin" file manager. In the left sidebar, you should see
your Windows drive in the "Devices" section. Click on it to mount it,
you may have to enter your password.

You can now browse your Windows files! Make sure to eject your drive
(by pressing the little eject icon button next to the drive name)
once you're done browsing!

