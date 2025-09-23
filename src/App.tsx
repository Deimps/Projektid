import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Filter,
  Search,
  Info,
  Download,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

/**
 * Interactive OS & Kernel Timeline
 * Single-file React component using Tailwind + shadcn/ui + Framer Motion
 *
 * Notes:
 * - Curated set – not literally every OS/kernel.
 * - Edit the DATA array to add/correct items.
 */

// ---------- Types ----------

type EntryType =
  | "Kernel"
  | "Operating System"
  | "RTOS"
  | "Microkernel"
  | "Mobile OS"
  | "Distro";

type Platform =
  | "Mainframe"
  | "Mini"
  | "Workstation"
  | "Desktop"
  | "Server"
  | "Embedded"
  | "Mobile"
  | "Tablet"
  | "Console"
  | "Experimental";

type Family =
  | "Early/Pre-Unix"
  | "Unix"
  | "BSD"
  | "System V"
  | "Linux"
  | "Windows/MS-DOS"
  | "macOS/OS X/NeXT"
  | "Mobile: Android"
  | "Mobile: iOS/iPadOS"
  | "Mobile: Other"
  | "Other/Alt"
  | "Research";

interface Entry {
  id: string;
  name: string;
  type: EntryType;
  family: Family;
  platform: Platform[];
  yearStart: number;
  yearEnd?: number;
  description: string;
  highlights?: string[];
  versions?: { version: string; year: number; notes?: string }[];
  related?: string[];
}

// ---------- Data ----------
const DATA: Entry[] = [
  // Pre-Unix & Influences
  {
    id: "multics",
    name: "Multics",
    type: "Operating System",
    family: "Early/Pre-Unix",
    platform: ["Mainframe"],
    yearStart: 1965,
    yearEnd: 2000,
    description:
      "Ambitious time-sharing OS by MIT/GE/Bell Labs; pioneered ideas like hierarchical FS and dynamic linking; a key inspiration for Unix.",
    highlights: ["Time-sharing", "Hierarchical filesystem", "Dynamic linking"],
  },

  // Unix & descendants
  {
    id: "unix",
    name: "Unix (Original)",
    type: "Operating System",
    family: "Unix",
    platform: ["Mini", "Workstation"],
    yearStart: 1969,
    description:
      "Bell Labs (Thompson, Ritchie). Simplicity, process model, pipes, and the ‘everything is a file’ philosophy that shaped modern OSes.",
    highlights: ["C in kernel", "Pipes", "Process model"],
  },
  {
    id: "unixv6",
    name: "Unix V6",
    type: "Operating System",
    family: "Unix",
    platform: ["Mini"],
    yearStart: 1975,
    description:
      "First widely distributed Unix; used in academia, spread Unix culture.",
    related: ["unix"],
  },
  {
    id: "unixv7",
    name: "Unix V7",
    type: "Operating System",
    family: "Unix",
    platform: ["Mini"],
    yearStart: 1979,
    description:
      "Classic Research Unix; basis for many ports and later systems.",
    related: ["unix"],
  },

  // System V line
  {
    id: "sysv",
    name: "Unix System V",
    type: "Operating System",
    family: "System V",
    platform: ["Workstation", "Server"],
    yearStart: 1983,
    description:
      "AT&T commercial Unix branch; introduced System V IPC and init conventions.",
    highlights: ["SysV IPC", "init/system startup"],
    related: ["unix"],
  },
  {
    id: "sysv3",
    name: "System V Release 3",
    type: "Operating System",
    family: "System V",
    platform: ["Workstation", "Server"],
    yearStart: 1987,
    description: "SVR3: Enhanced IPC, STREAMS networking.",
  },
  {
    id: "sysv4",
    name: "System V Release 4",
    type: "Operating System",
    family: "System V",
    platform: ["Workstation", "Server"],
    yearStart: 1989,
    description:
      "SVR4: Major merge of System V, BSD, SunOS; basis of Solaris/UnixWare.",
  },
  {
    id: "unixware",
    name: "UnixWare",
    type: "Operating System",
    family: "System V",
    platform: ["Server", "Workstation"],
    yearStart: 1992,
    description: "Novell/SCO lineage of SVR4; enterprise Unix for x86.",
    versions: [
      { version: "1.0", year: 1992 },
      { version: "2.x", year: 1995 },
      { version: "7 (SVR5)", year: 1998, notes: "OpenUNIX 8 branding later" },
      { version: "7.1.4", year: 2004 },
    ],
    related: ["sysv4"],
  },
  {
    id: "solaris",
    name: "Solaris (SunOS 5)",
    type: "Operating System",
    family: "System V",
    platform: ["Server", "Workstation"],
    yearStart: 1992,
    description: "Sun Microsystems’ SVR4-based OS; ZFS, DTrace, Zones.",
    highlights: ["ZFS", "DTrace", "Zones/Containers"],
    related: ["sysv4"],
  },

  // BSD family
  {
    id: "bsd",
    name: "BSD (UC Berkeley)",
    type: "Operating System",
    family: "BSD",
    platform: ["Workstation", "Server"],
    yearStart: 1977,
    description:
      "Berkeley enhancements to Unix; TCP/IP stack, sockets, virtual memory, Fast File System.",
    highlights: ["Sockets", "TCP/IP", "FFS"],
    related: ["unix"],
  },
  {
    id: "netbsd",
    name: "NetBSD",
    type: "Operating System",
    family: "BSD",
    platform: ["Server", "Workstation", "Embedded"],
    yearStart: 1993,
    description:
      "Portable BSD known for clean design and wide hardware support.",
  },
  {
    id: "freebsd",
    name: "FreeBSD",
    type: "Operating System",
    family: "BSD",
    platform: ["Server", "Workstation"],
    yearStart: 1993,
    description:
      "Performance-focused BSD with robust networking and storage (e.g., bhyve, jails).",
    highlights: ["Jails", "bhyve", "ZFS integration"],
  },
  {
    id: "openbsd",
    name: "OpenBSD",
    type: "Operating System",
    family: "BSD",
    platform: ["Server", "Workstation", "Embedded"],
    yearStart: 1996,
    description:
      "Security-first BSD emphasizing correctness and proactive hardening.",
    highlights: ["pf", "pledge", "unveil"],
  },
  {
    id: "dragonflybsd",
    name: "DragonFly BSD",
    type: "Operating System",
    family: "BSD",
    platform: ["Server", "Workstation"],
    yearStart: 2003,
    description:
      "Fork of FreeBSD 4.x; HAMMER filesystem and unique SMP approach.",
    highlights: ["HAMMER FS", "Lightweight kernel threads"],
  },

  // Microsoft line
  {
    id: "msdos",
    name: "MS-DOS",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1981,
    description: "Command-line OS for IBM PCs; foundation for early Windows.",
  },
  {
    id: "win1",
    name: "Windows 1.0",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1985,
    description: "GUI environment over DOS; start of Windows line.",
  },
  {
    id: "win2x",
    name: "Windows 2.x",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1987,
    description:
      "Early GUI over MS-DOS; overlapping windows on some hardware; foundations for later 3.x.",
  },
  {
    id: "win21x",
    name: "Windows/286 & Windows/386 2.1x",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1988,
    description:
      "Split line targeting 80286 vs 80386; enhanced memory and multitasking modes.",
  },
  {
    id: "win30",
    name: "Windows 3.0",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1990,
    description:
      "Protected mode support, Program Manager; major usability leap.",
  },
  {
    id: "win31",
    name: "Windows 3.1",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1992,
    description: "TrueType fonts, stability improvements; widely adopted.",
  },
  {
    id: "wfw311",
    name: "Windows for Workgroups 3.11",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop", "Server"],
    yearStart: 1993,
    description:
      "Built-in networking, 32-bit file access; workgroup features and file sharing.",
  },
  {
    id: "win95",
    name: "Windows 95",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1995,
    description:
      "New UI, Plug and Play, 32-bit userland; mainstream breakthrough.",
  },
  {
    id: "win98",
    name: "Windows 98",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 1998,
    description:
      "USB era consumer Windows; IE integration; legacy of DOS/9x line.",
    versions: [
      { version: "98 First Edition", year: 1998 },
      {
        version: "98 Second Edition (SE)",
        year: 1999,
        notes: "USB/networking",
      },
    ],
  },
  {
    id: "winme",
    name: "Windows Me",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 2000,
    description:
      "Final consumer Windows 9x; System Restore, WDM drivers; notorious stability issues.",
    highlights: ["System Restore", "WDM drivers", "End of 9x line"],
  },
  {
    id: "winnt",
    name: "Windows NT",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Server", "Workstation"],
    yearStart: 1993,
    description:
      "New kernel architecture; security model; became base for all modern Windows.",
  },
  {
    id: "win2000",
    name: "Windows 2000",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Server", "Workstation"],
    yearStart: 1999,
    description: "NT 5.0; Active Directory era.",
  },
  {
    id: "winxp",
    name: "Windows XP",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop", "Server"],
    yearStart: 2001,
    description: "Unified consumer/pro lines on NT kernel; very long-lived.",
  },
  {
    id: "vista",
    name: "Windows Vista",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop", "Server"],
    yearStart: 2007,
    description:
      "NT 6.0: UAC, Aero, revamped audio/graphics stacks (WDDM); groundwork for Windows 7.",
    highlights: ["UAC", "Aero Glass", "WDDM", "ASLR/Kernel Patch Protection"],
  },
  {
    id: "win7",
    name: "Windows 7",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 2009,
    description: "Polished follow-up to Vista; widely adopted.",
  },
  {
    id: "win8",
    name: "Windows 8",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop", "Tablet"],
    yearStart: 2012,
    description:
      "NT 6.2: Fast boot, new Start screen & WinRT app model; touch-first UI.",
    highlights: ["UEFI Secure Boot", "WinRT", "Faster boot", "Storage Spaces"],
  },
  {
    id: "win81",
    name: "Windows 8.1",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 2013,
    description:
      "Refined Windows 8 with Start button return, improved Store and apps.",
  },
  {
    id: "win10",
    name: "Windows 10",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop", "Server"],
    yearStart: 2015,
    description:
      "‘Windows as a Service’ with continuous feature updates; widespread enterprise adoption.",
    highlights: ["WSL/WSL2", "DirectX 12", "Windows Defender ATP", "Sandbox"],
    versions: [
      { version: "1507/1511", year: 2015, notes: "Initial + Nov Update" },
      { version: "1607 (Anniversary)", year: 2016, notes: "WSL (preview)" },
      { version: "1703/1709", year: 2017, notes: "Game Mode, Edge updates" },
      { version: "1809", year: 2018, notes: "Quality focus" },
      { version: "2004/20H2", year: 2020, notes: "WSL2 GA, new Edge" },
      { version: "21H2/22H2", year: 2021, notes: "LTSC + last major waves" },
    ],
  },
  {
    id: "win11",
    name: "Windows 11",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Desktop"],
    yearStart: 2021,
    description:
      "Modernized UI and stricter security baseline (TPM 2.0, VBS); subsystem enhancements.",
    highlights: [
      "TPM 2.0 baseline",
      "WSA (Android Subsystem)",
      "Dev Drive",
      "Copilot",
    ],
    versions: [
      { version: "21H2", year: 2021, notes: "Initial release" },
      { version: "22H2", year: 2022, notes: "Tabs in Explorer, WSA updates" },
      { version: "23H2/24H2", year: 2023, notes: "AI features, perf/security" },
    ],
  },
  {
    id: "winserver_full",
    name: "Windows Server (2003–2025)",
    type: "Operating System",
    family: "Windows/MS-DOS",
    platform: ["Server"],
    yearStart: 2003,
    description: "NT server releases with LTSC cadence.",
    highlights: [
      "Active Directory",
      "Hyper-V",
      "Failover clustering",
      "Containers",
      "SMB over QUIC",
      "Secured-core",
    ],
    versions: [
      { version: "Server 2003", year: 2003, notes: "AD improvements" },
      { version: "Server 2008", year: 2008, notes: "Hyper-V, Server Core" },
      {
        version: "Server 2012 / R2",
        year: 2012,
        notes: "Storage Spaces, PowerShell DSC",
      },
      {
        version: "Server 2016",
        year: 2016,
        notes: "Containers, Nano Server (initial)",
      },
      {
        version: "Server 2019",
        year: 2018,
        notes: "Windows Admin Center; Storage Migration",
      },
      {
        version: "Server 2022",
        year: 2021,
        notes: "Secured-core; SMB over QUIC",
      },
      { version: "Server 2025", year: 2024, notes: "Current LTSC" },
    ],
  },

  // Apple line
  {
    id: "apple1",
    name: "Classic Mac OS (System 1–9)",
    type: "Operating System",
    family: "macOS/OS X/NeXT",
    platform: ["Desktop"],
    yearStart: 1984,
    yearEnd: 2001,
    description:
      "Original Mac OS, cooperative multitasking, early GUI pioneer.",
  },
  {
    id: "nextstep",
    name: "NeXTSTEP/OpenStep",
    type: "Operating System",
    family: "macOS/OS X/NeXT",
    platform: ["Workstation", "Desktop"],
    yearStart: 1989,
    description:
      "Objective-C, Display PostScript; basis for OS X after Apple acquired NeXT.",
  },
  {
    id: "osx",
    name: "Mac OS X (10.0–10.15)",
    type: "Operating System",
    family: "macOS/OS X/NeXT",
    platform: ["Desktop", "Workstation"],
    yearStart: 2001,
    description:
      "Unix-based (XNU kernel), Aqua UI; transitioned from PowerPC→Intel→Apple Silicon over time.",
    highlights: ["XNU kernel", "Launchd", "App Sandbox"],
    versions: [
      { version: "10.0 Cheetah", year: 2001 },
      { version: "10.4 Tiger", year: 2005, notes: "Spotlight, Dashboard" },
      { version: "10.6 Snow Leopard", year: 2009 },
      { version: "10.10 Yosemite", year: 2014 },
      { version: "10.15 Catalina", year: 2019 },
    ],
  },
  {
    id: "macos11",
    name: "macOS 11 Big Sur → 12 Monterey → 13 Ventura → 14 Sonoma → 15 Sequoia",
    type: "Operating System",
    family: "macOS/OS X/NeXT",
    platform: ["Desktop", "Workstation"],
    yearStart: 2020,
    description:
      "Apple Silicon era with UI refresh, privacy controls, and deeper iOS/iPadOS tech sharing.",
    highlights: ["Apple Silicon", "Rosetta 2", "System extensions", "SwiftUI"],
    versions: [
      {
        version: "11 Big Sur",
        year: 2020,
        notes: "UI redesign; Apple Silicon",
      },
      {
        version: "12 Monterey",
        year: 2021,
        notes: "Shortcuts; Universal Control",
      },
      { version: "13 Ventura", year: 2022, notes: "Stage Manager; Passkeys" },
      {
        version: "14 Sonoma",
        year: 2023,
        notes: "Game Mode; widgets on desktop",
      },
      { version: "15 Sequoia", year: 2024, notes: "iPhone Mirroring" },
    ],
  },

  // Linux kernel and major distros
  {
    id: "linux",
    name: "Linux Kernel",
    type: "Kernel",
    family: "Linux",
    platform: ["Server", "Desktop", "Embedded", "Mobile", "Console"],
    yearStart: 1991,
    description:
      "Monolithic Unix-like kernel by Linus Torvalds; runs from phones to supercomputers.",
    highlights: [
      "SMP",
      "Namespaces + cgroups",
      "eBPF",
      "io_uring",
      "SELinux/AppArmor",
    ],
    versions: [
      { version: "1.0", year: 1994, notes: "First stable" },
      { version: "2.0", year: 1996, notes: "SMP" },
      { version: "2.6", year: 2003, notes: "udev, O(1) scheduler era" },
      { version: "3.x", year: 2011, notes: "Versioning reset" },
      { version: "4.x", year: 2015, notes: "Early eBPF growth" },
      { version: "5.x", year: 2019, notes: "io_uring, WireGuard" },
      {
        version: "6.x",
        year: 2022,
        notes: "Rust-in-kernel starts, BPF matures",
      },
    ],
  },
  {
    id: "slackware",
    name: "Slackware",
    type: "Distro",
    family: "Linux",
    platform: ["Desktop", "Server"],
    yearStart: 1993,
    description: "Oldest maintained distro; KISS philosophy.",
  },
  {
    id: "debian",
    name: "Debian",
    type: "Distro",
    family: "Linux",
    platform: ["Server", "Desktop", "Embedded"],
    yearStart: 1993,
    description:
      "Community-driven distro with strong emphasis on stability, portability, and a huge package archive. Basis for many derivatives (Ubuntu, Raspbian, etc.).",
    highlights: [
      "APT & dpkg packaging",
      "stable / testing / unstable branches",
      "Policy & reproducibility",
      "Reproducible builds initiative",
      "Multiarch support",
      "Huge repo, many ports",
      "Wide architecture coverage",
    ],
    versions: [
      { version: "1.1 Buzz", year: 1996, notes: "Early APT tooling era" },
      { version: "2.2 Potato", year: 2000 },
      { version: "3.1 Sarge", year: 2005, notes: "New Debian Installer" },
      { version: "4.0 Etch", year: 2007 },
      { version: "5.0 Lenny", year: 2009 },
      { version: "6.0 Squeeze", year: 2011 },
      { version: "7 Wheezy", year: 2013, notes: "Multiarch (initial)" },
      { version: "8 Jessie", year: 2015, notes: "systemd by default" },
      { version: "9 Stretch", year: 2017 },
      { version: "10 Buster", year: 2019, notes: "Wayland default in GNOME" },
      { version: "11 Bullseye", year: 2021 },
      { version: "12 Bookworm", year: 2023 },
    ],
  },
  {
    id: "redhat",
    name: "Red Hat Linux / RHEL",
    type: "Distro",
    family: "Linux",
    platform: ["Server", "Desktop"],
    yearStart: 1995,
    description:
      "Enterprise focus; now RHEL with downstream clones (AlmaLinux, Rocky).",
    highlights: [
      "SELinux",
      "systemd (RHEL 7)",
      "Podman/containers (RHEL 8)",
      "RHEL Stream",
    ],
    versions: [
      { version: "RHEL 6", year: 2010 },
      { version: "RHEL 7", year: 2014, notes: "systemd; docker era" },
      { version: "RHEL 8", year: 2019, notes: "AppStreams; Podman" },
      { version: "RHEL 9", year: 2022 },
    ],
  },
  {
    id: "suse",
    name: "SUSE / openSUSE",
    type: "Distro",
    family: "Linux",
    platform: ["Server", "Desktop"],
    yearStart: 1994,
    description:
      "YaST tools; enterprise (SLES) and community (Tumbleweed/MicroOS).",
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    type: "Distro",
    family: "Linux",
    platform: ["Desktop", "Server"],
    yearStart: 2004,
    description:
      "Debian-based distro with regular six-month releases and LTS cadence; strong focus on usability, cloud/devops tooling, and commercial support.",
    highlights: [
      "LTS release cadence (5+ years support)",
      "Cloud-init & great cloud images",
      "Snap packaging (alongside APT)",
      "systemd (since 15.04)",
      "WSL popularity on Windows",
      "ZFS on root (experimental)",
    ],
    versions: [
      { version: "4.10 Warty Warthog", year: 2004, notes: "First release" },
      { version: "6.06 LTS Dapper Drake", year: 2006, notes: "First LTS" },
      { version: "8.04 LTS Hardy Heron", year: 2008 },
      { version: "10.04 LTS Lucid Lynx", year: 2010, notes: "Long-lived LTS" },
      { version: "12.04 LTS Precise Pangolin", year: 2012 },
      { version: "14.04 LTS Trusty Tahr", year: 2014 },
      {
        version: "16.04 LTS Xenial Xerus",
        year: 2016,
        notes: "Snaps introduced",
      },
      { version: "18.04 LTS Bionic Beaver", year: 2018 },
      { version: "20.04 LTS Focal Fossa", year: 2020 },
      { version: "22.04 LTS Jammy Jellyfish", year: 2022, notes: "GNOME 42" },
      {
        version: "24.04 LTS Noble Numbat",
        year: 2024,
        notes: "Kernel 6.x, refreshed toolchain, latest LTS",
      },
    ],
  },
  {
    id: "arch",
    name: "Arch Linux",
    type: "Distro",
    family: "Linux",
    platform: ["Desktop"],
    yearStart: 2002,
    description: "Rolling release; pacman; DIY ethos.",
    highlights: ["AUR", "KISS", "Rolling release"],
  },
  {
    id: "gentoo",
    name: "Gentoo",
    type: "Distro",
    family: "Linux",
    platform: ["Desktop", "Server"],
    yearStart: 2000,
    description: "Source-based; Portage; deep customization.",
  },
  {
    id: "alpine",
    name: "Alpine Linux",
    type: "Distro",
    family: "Linux",
    platform: ["Server", "Embedded"],
    yearStart: 2005,
    description:
      "musl + busybox; widely used in containers for minimal images.",
  },
  {
    id: "chromeos",
    name: "ChromeOS",
    type: "Operating System",
    family: "Linux",
    platform: ["Desktop"],
    yearStart: 2011,
    description:
      "Google’s Chromium-based OS with Linux underpinnings; web-first with Linux container (Crostini).",
  },

  // Mobile (Apple & Android ecosystems + others)
  {
    id: "ios",
    name: "iOS",
    type: "Mobile OS",
    family: "Mobile: iOS/iPadOS",
    platform: ["Mobile"],
    yearStart: 2007,
    description:
      "Apple’s smartphone OS derived from macOS (XNU). Strong privacy model and tight hardware integration.",
    highlights: [
      "App Store",
      "Secure Enclave",
      "Sandboxing",
      "Metal",
      "Apple Intelligence",
    ],
    versions: [
      { version: "iPhone OS 1", year: 2007, notes: "First iPhone" },
      { version: "iPhone OS 2", year: 2008, notes: "App Store introduced" },
      { version: "iOS 4", year: 2010, notes: "Renamed to iOS; multitasking" },
      { version: "iOS 7", year: 2013, notes: "Visual redesign" },
      { version: "iOS 11", year: 2017, notes: "ARKit, Files app" },
      { version: "iOS 13", year: 2019, notes: "Dark Mode; iPadOS split" },
      { version: "iOS 16", year: 2022, notes: "Lock Screen widgets" },
      { version: "iOS 17", year: 2023, notes: "StandBy, improved AirDrop" },
      {
        version: "iOS 18",
        year: 2024,
        notes: "Major personalization, privacy",
      },
      {
        version: "iOS 26",
        year: 2025,
        notes: "Liquid Glass design, Apple Intelligence expansions",
      },
    ],
  },
  {
    id: "ipados",
    name: "iPadOS",
    type: "Mobile OS",
    family: "Mobile: iOS/iPadOS",
    platform: ["Mobile"],
    yearStart: 2019,
    description:
      "Tablet-focused fork of iOS with multitasking features (Stage Manager, desktop-class apps).",
    highlights: [
      "Stage Manager",
      "External display support",
      "Pencil hover",
      "Desktop-class apps",
    ],
    versions: [
      { version: "13", year: 2019, notes: "Forked from iOS" },
      { version: "14", year: 2020 },
      { version: "15", year: 2021 },
      { version: "16", year: 2022, notes: "Stage Manager" },
      { version: "17", year: 2023 },
      { version: "18", year: 2024 },
    ],
  },
  {
    id: "watchos",
    name: "watchOS",
    type: "Mobile OS",
    family: "Mobile: iOS/iPadOS",
    platform: ["Mobile", "Embedded"],
    yearStart: 2015,
    description: "Apple Watch OS; health/fitness focus and glanceable UI.",
    versions: [
      { version: "1", year: 2015 },
      { version: "10", year: 2023 },
      { version: "11", year: 2024 },
    ],
  },
  {
    id: "tvos",
    name: "tvOS",
    type: "Mobile OS",
    family: "Mobile: iOS/iPadOS",
    platform: ["Embedded"],
    yearStart: 2015,
    description: "Apple TV OS with media focus and App Store.",
    versions: [
      { version: "9", year: 2015 },
      { version: "17", year: 2023 },
      { version: "18", year: 2024 },
    ],
  },
  {
    id: "visionos",
    name: "visionOS",
    type: "Mobile OS",
    family: "Mobile: iOS/iPadOS",
    platform: ["Mobile", "Embedded"],
    yearStart: 2024,
    description: "Apple’s spatial computing OS for Vision Pro.",
    versions: [
      { version: "1", year: 2024 },
      { version: "2", year: 2025 },
    ],
  },

  {
    id: "android",
    name: "Android",
    type: "Mobile OS",
    family: "Mobile: Android",
    platform: ["Mobile", "Embedded"],
    yearStart: 2008,
    description:
      "Linux-kernel-based mobile OS by Google; dominant smartphone platform.",
    highlights: [
      "Material Design",
      "Project Treble/Mainline",
      "ART",
      "Scoped storage",
      "Android App Bundle",
    ],
    versions: [
      { version: "1.0", year: 2008 },
      { version: "4.4 KitKat", year: 2013, notes: "Low-RAM optimizations" },
      {
        version: "5.x Lollipop",
        year: 2014,
        notes: "Material Design, ART default",
      },
      {
        version: "6.0 Marshmallow",
        year: 2015,
        notes: "Doze, runtime permissions",
      },
      { version: "7.x Nougat", year: 2016, notes: "Split-screen, Vulkan" },
      { version: "8.x Oreo", year: 2017, notes: "Project Treble" },
      { version: "9 Pie", year: 2018, notes: "Digital Wellbeing" },
      { version: "10", year: 2019, notes: "Scoped storage" },
      { version: "11", year: 2020, notes: "One-time permissions" },
      { version: "12", year: 2021, notes: "Material You" },
      { version: "13", year: 2022, notes: "Per-app language" },
      { version: "14", year: 2023, notes: "Health Connect, satellite support" },
      {
        version: "15",
        year: 2024,
        notes: "Partial screen sharing, Private Space",
      },
      { version: "16", year: 2025, notes: "Platform refinements" },
    ],
  },
  {
    id: "wearos",
    name: "Wear OS (Android Wear)",
    type: "Mobile OS",
    family: "Mobile: Android",
    platform: ["Mobile", "Embedded"],
    yearStart: 2014,
    description: "Google’s smartwatch OS built on Android.",
  },
  {
    id: "androidtv",
    name: "Android TV / Google TV",
    type: "Mobile OS",
    family: "Mobile: Android",
    platform: ["Embedded"],
    yearStart: 2014,
    description: "Android variant optimized for televisions and set-top boxes.",
  },
  {
    id: "aaos",
    name: "Android Automotive OS (AAOS)",
    type: "Mobile OS",
    family: "Mobile: Android",
    platform: ["Embedded"],
    yearStart: 2017,
    description:
      "Android-based in-vehicle infotainment platform with standalone apps.",
  },
  {
    id: "fireos",
    name: "Fire OS (Amazon)",
    type: "Mobile OS",
    family: "Mobile: Android",
    platform: ["Mobile", "Embedded"],
    yearStart: 2012,
    description: "Amazon’s Android fork for Fire tablets/TV/phones.",
  },

  {
    id: "symbian",
    name: "Symbian",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 1998,
    yearEnd: 2012,
    description: "Pre-smartphone era leader used by Nokia and others.",
  },
  {
    id: "palmos",
    name: "Palm OS (Garnet)",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 1996,
    yearEnd: 2009,
    description: "Early PDA/smartphone OS used by Palm/Handspring.",
  },
  {
    id: "webos",
    name: "webOS",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile", "Embedded"],
    yearStart: 2009,
    description: "Palm→HP→LG OS; now primarily on LG TVs and appliances.",
  },
  {
    id: "bada",
    name: "Bada",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2010,
    yearEnd: 2013,
    description: "Samsung’s smartphone OS; later merged into Tizen.",
  },
  {
    id: "tizen",
    name: "Tizen",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile", "Embedded"],
    yearStart: 2012,
    description:
      "Linux-based OS used in wearables and TVs; community + Samsung.",
  },
  {
    id: "firefoxos",
    name: "Firefox OS (Boot to Gecko)",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2013,
    yearEnd: 2016,
    description: "Mozilla’s web-app-first mobile OS.",
  },
  {
    id: "ubuntutouch",
    name: "Ubuntu Touch",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2013,
    description: "Ubuntu for phones; now community-maintained by UBports.",
  },
  {
    id: "kaios",
    name: "KaiOS",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2017,
    description:
      "Feature-phone OS derived from Firefox OS, popular in emerging markets.",
  },
  {
    id: "harmonyos",
    name: "HarmonyOS",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile", "Embedded"],
    yearStart: 2019,
    description: "Huawei’s distributed OS for phones, wearables, and IoT.",
  },
  {
    id: "blackberryos",
    name: "BlackBerry OS / QNX-based BB10",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 1999,
    yearEnd: 2013,
    description: "From Java-based OS to QNX microkernel in BB10.",
  },
  {
    id: "windowsphone",
    name: "Windows Phone / Windows Mobile",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2003,
    yearEnd: 2017,
    description: "Microsoft’s mobile OS attempts; Metro UI innovation.",
  },
  {
    id: "sailfish",
    name: "Sailfish OS",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2013,
    description: "Jolla’s Qt-based continuation of MeeGo ideas.",
  },
  {
    id: "meego",
    name: "MeeGo / Maemo / Moblin",
    type: "Mobile OS",
    family: "Mobile: Other",
    platform: ["Mobile"],
    yearStart: 2005,
    description:
      "Linux-based mobile projects by Nokia/Intel that influenced later systems.",
  },

  // Microkernels & research kernels
  {
    id: "mach",
    name: "Mach",
    type: "Microkernel",
    family: "Research",
    platform: ["Workstation"],
    yearStart: 1985,
    description:
      "Carnegie Mellon microkernel; influenced XNU (macOS) and GNU Hurd.",
  },
  {
    id: "gnu_hurd",
    name: "GNU Hurd",
    type: "Operating System",
    family: "Research",
    platform: ["Workstation", "Server"],
    yearStart: 1990,
    description:
      "Collection of servers running on Mach; never reached mainstream but foundational research.",
  },
  {
    id: "minix",
    name: "MINIX",
    type: "Operating System",
    family: "Research",
    platform: ["Desktop", "Embedded"],
    yearStart: 1987,
    description:
      "Educational Unix-like microkernel OS by Andrew Tanenbaum; inspired Linux.",
  },
  {
    id: "plan9",
    name: "Plan 9 from Bell Labs",
    type: "Operating System",
    family: "Research",
    platform: ["Workstation"],
    yearStart: 1987,
    description:
      "Distributed OS redefining ‘everything is a file’; per-process namespaces, 9P protocol.",
  },
  {
    id: "inferno",
    name: "Inferno",
    type: "Operating System",
    family: "Research",
    platform: ["Embedded", "Workstation"],
    yearStart: 1995,
    description: "Limbo language and Dis VM; portable distributed OS.",
  },
  {
    id: "l4",
    name: "L4 Microkernel Family",
    type: "Microkernel",
    family: "Research",
    platform: ["Embedded", "Mobile", "Workstation"],
    yearStart: 1993,
    description:
      "Second-generation microkernel performance; seL4 formally verified variant.",
  },
  {
    id: "sel4",
    name: "seL4",
    type: "Microkernel",
    family: "Research",
    platform: ["Embedded", "Mobile"],
    yearStart: 2009,
    description:
      "Formally verified microkernel with strong security properties.",
  },
  {
    id: "fuchsia",
    name: "Fuchsia",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Embedded", "Mobile"],
    yearStart: 2016,
    description:
      "Google’s Zircon microkernel-based OS; deployed in some devices (e.g., Nest Hub).",
  },

  // Other notable OS/kernels
  {
    id: "beos",
    name: "BeOS",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Desktop"],
    yearStart: 1995,
    description:
      "Multimedia-focused OS with pervasive multithreading; BFS filesystem.",
  },
  {
    id: "haiku",
    name: "Haiku",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Desktop"],
    yearStart: 2001,
    description: "Open-source BeOS re-implementation; still active.",
  },
  {
    id: "qnx",
    name: "QNX",
    type: "RTOS",
    family: "Other/Alt",
    platform: ["Embedded"],
    yearStart: 1982,
    description:
      "Commercial microkernel RTOS widely used in automotive/industrial.",
  },
  {
    id: "vxworks",
    name: "VxWorks",
    type: "RTOS",
    family: "Other/Alt",
    platform: ["Embedded"],
    yearStart: 1987,
    description: "Wind River’s RTOS; aerospace and mission-critical systems.",
  },
  {
    id: "amigaos",
    name: "AmigaOS",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Desktop"],
    yearStart: 1985,
    description: "Preemptive multitasking and advanced multimedia in the 80s.",
  },
  {
    id: "os2",
    name: "OS/2",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Desktop"],
    yearStart: 1987,
    description: "IBM/Microsoft then IBM; robust but lost market to Windows.",
  },
  {
    id: "aix",
    name: "AIX",
    type: "Operating System",
    family: "Unix",
    platform: ["Server", "Workstation"],
    yearStart: 1986,
    description:
      "IBM’s Unix for POWER systems; enterprise reliability features.",
  },
  {
    id: "hpux",
    name: "HP-UX",
    type: "Operating System",
    family: "Unix",
    platform: ["Server"],
    yearStart: 1984,
    description:
      "HP’s Unix for PA-RISC/Itanium; enterprise features like Serviceguard.",
  },
  {
    id: "irix",
    name: "IRIX",
    type: "Operating System",
    family: "Unix",
    platform: ["Workstation"],
    yearStart: 1988,
    yearEnd: 2006,
    description: "SGI’s Unix for MIPS workstations; advanced graphics stack.",
  },
  {
    id: "tru64",
    name: "Tru64 UNIX (OSF/1)",
    type: "Operating System",
    family: "Unix",
    platform: ["Server", "Workstation"],
    yearStart: 1992,
    yearEnd: 2012,
    description: "Digital/Compaq/HP 64-bit Unix for Alpha.",
  },
  {
    id: "serenity",
    name: "SerenityOS",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Desktop"],
    yearStart: 2018,
    description:
      "Hobbyist Unix-like OS with custom kernel and a retro-modern UX.",
  },
  {
    id: "redox",
    name: "Redox OS",
    type: "Operating System",
    family: "Other/Alt",
    platform: ["Desktop", "Server"],
    yearStart: 2015,
    description:
      "Rust-based microkernel OS focusing on safety and modern design.",
  },
  {
    id: "hurdish",
    name: "(Meta) Unix-like Family",
    type: "Kernel",
    family: "Research",
    platform: ["Workstation"],
    yearStart: 1970,
    description:
      "Placeholder indicating numerous academic/proprietary Unixes not individually listed (Xenix, A/UX, Ultrix, etc.).",
  },
];

// ---------- Helpers ----------
const FAMILIES: Family[] = [
  "Early/Pre-Unix",
  "Unix",
  "BSD",
  "System V",
  "Linux",
  "Windows/MS-DOS",
  "macOS/OS X/NeXT",
  "Mobile: Android",
  "Mobile: iOS/iPadOS",
  "Mobile: Other",
  "Other/Alt",
  "Research",
];

const TYPES: EntryType[] = [
  "Kernel",
  "Operating System",
  "RTOS",
  "Microkernel",
  "Mobile OS",
  "Distro",
];

function yearToDecade(y: number) {
  return Math.floor(y / 10) * 10;
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Compute available year range from the data
const DATA_MIN_YEAR = Math.min(...DATA.map((d) => d.yearStart));
const DATA_MAX_YEAR = Math.max(...DATA.map((d) => d.yearEnd ?? d.yearStart));

// ---------- UI ----------

export default function OSTimeline() {
  const [query, setQuery] = useState("");
  const [selectedFamilies, setSelectedFamilies] = useState<Family[]>([
    ...FAMILIES,
  ]);
  const [selectedTypes, setSelectedTypes] = useState<EntryType[]>([...TYPES]);
  const minYear = DATA_MIN_YEAR;
  const maxYear = DATA_MAX_YEAR;
  const [range, setRange] = useState<number[]>([minYear, maxYear]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const [start, end] = range;
    const q = query.trim().toLowerCase();
    return DATA.filter((e) => {
      const withinRange =
        e.yearStart <= end && (e.yearEnd ?? e.yearStart) >= start;
      const familyOk = selectedFamilies.includes(e.family);
      const typeOk = selectedTypes.includes(e.type);
      const match = !q
        ? true
        : [
            e.name,
            e.description,
            ...(e.highlights ?? []),
            ...(e.versions?.map((v) => v.version) ?? []),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);
      return withinRange && familyOk && typeOk && match;
    }).sort((a, b) => a.yearStart - b.yearStart);
  }, [query, selectedFamilies, selectedTypes, range]);

  const decades = useMemo(() => {
    const map = new Map<number, Entry[]>();
    filtered.forEach((e) => {
      const d = yearToDecade(e.yearStart);
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(e);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  function toggleFamily(f: Family) {
    setSelectedFamilies((cur) => {
      const allSelected = cur.length === FAMILIES.length;
      const isOnlyThis = cur.length === 1 && cur[0] === f;

      if (allSelected) return [f]; // isolate on first click when all are selected
      if (isOnlyThis) return [...FAMILIES]; // clicking again resets to all
      return cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]; // normal toggle otherwise
    });
  }

  function toggleType(t: EntryType) {
    setSelectedTypes((cur) => {
      const allSelected = cur.length === TYPES.length;
      const isOnlyThis = cur.length === 1 && cur[0] === t;

      if (allSelected) return [t]; // isolate
      if (isOnlyThis) return [...TYPES]; // reset
      return cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t];
    });
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `os-kernel-timeline-${range[0]}-${range[1]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // give the download a tick before revoking
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Kernels & Operating Systems – Interactive Timeline
            </h1>
            <p className="text-slate-600 mt-1">
              1960s–2025 • filter by family, type, and decade • search names,
              features, and versions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportJSON}>
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </header>

        {/* Controls */}
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, description, version, feature…"
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">
                  {filtered.length} items
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setSelectedFamilies([...FAMILIES]);
                    setSelectedTypes([...TYPES]);
                    setRange([minYear, maxYear]);
                  }}
                >
                  Reset filters
                </Button>
              </div>
            </div>

            <Tabs defaultValue="families" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                <TabsTrigger value="families">Families</TabsTrigger>
                <TabsTrigger value="types">Types</TabsTrigger>
                <TabsTrigger value="range">Decade Range</TabsTrigger>
              </TabsList>

              <TabsContent value="families" className="mt-3">
                <ScrollArea className="h-40 pr-2">
                  <div className="flex flex-wrap gap-2">
                    {FAMILIES.map((f) => (
                      <Button
                        key={f}
                        size="sm"
                        variant={
                          selectedFamilies.includes(f) ? "default" : "outline"
                        }
                        onClick={() => toggleFamily(f)}
                        className="rounded-2xl"
                      >
                        {f}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-xs text-slate-500 mt-2">
                  Tip: click once to isolate; click again to reset. Otherwise,
                  combine buttons to multi-select.
                </p>
              </TabsContent>

              <TabsContent value="types" className="mt-3">
                <ScrollArea className="h-40 pr-2">
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <Button
                        key={t}
                        size="sm"
                        variant={
                          selectedTypes.includes(t) ? "default" : "outline"
                        }
                        onClick={() => toggleType(t)}
                        className="rounded-2xl"
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-xs text-slate-500 mt-2">
                  Tip: click once to isolate; click again to reset. Otherwise,
                  combine buttons to multi-select.
                </p>
              </TabsContent>

              <TabsContent value="range" className="mt-3">
                <div className="px-2">
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                    <span>{range[0]}</span>
                    <span>{range[1]}</span>
                  </div>
                  {/* Emulate a range with two single-value sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500">From</label>
                      <Slider
                        value={[range[0]]}
                        min={minYear}
                        max={maxYear}
                        step={1}
                        onValueChange={(v) =>
                          setRange(([_, r]) => [clamp(v[0], minYear, r), r])
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">To</label>
                      <Slider
                        value={[range[1]]}
                        min={minYear}
                        max={maxYear}
                        step={1}
                        onValueChange={(v) =>
                          setRange(([l, _]) => [l, clamp(v[0], l, maxYear)])
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Timeline */}
        <ScrollArea className="h-[70vh] rounded-lg border pr-2">
          <div className="space-y-6">
            {decades.length === 0 && (
              <p className="text-slate-500 text-sm">
                No results. Try widening filters.
              </p>
            )}

            {decades.map(([decade, items]) => (
              <div key={decade} className="relative">
                <div className="sticky top-0 bg-white/70 backdrop-blur z-10 py-1">
                  <h2 className="text-xl font-semibold">{decade}s</h2>
                </div>

                <div className="relative pl-4 md:pl-8">
                  <div className="absolute left-1 md:left-2 top-1 bottom-1 w-px bg-slate-200" />
                  <div className="space-y-3 mt-3">
                    {items.map((e) => (
                      <motion.div
                        key={e.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <div className="absolute -left-1.5 md:-left-2 top-3 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-lg font-semibold leading-tight">
                                    {e.name}
                                  </h3>
                                  <Badge variant="secondary">{e.type}</Badge>
                                  <Badge variant="outline">{e.family}</Badge>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  <span>{e.yearStart}</span>
                                  {e.yearEnd ? (
                                    <span> – {e.yearEnd}</span>
                                  ) : null}
                                  <span className="ml-2">
                                    [{e.platform.join(", ")}]
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setExpanded(expanded === e.id ? null : e.id)
                                  }
                                >
                                  {expanded === e.id ? (
                                    <>
                                      <ChevronDown className="w-4 h-4 mr-1" />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <ChevronRight className="w-4 h-4 mr-1" />
                                      Details
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>

                            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                              {e.description}
                            </p>

                            <AnimatePresence initial={false}>
                              {expanded === e.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <h4 className="text-sm font-semibold mb-1">
                                        Highlights
                                      </h4>
                                      {e.highlights &&
                                      e.highlights.length > 0 ? (
                                        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                          {e.highlights.map((h, i) => (
                                            <li key={i}>{h}</li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="text-sm text-slate-500">
                                          —
                                        </p>
                                      )}
                                    </div>
                                    <div className="md:col-span-2">
                                      <h4 className="text-sm font-semibold mb-1">
                                        Notable Versions
                                      </h4>
                                      {e.versions && e.versions.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                          {e.versions.map((v, i) => (
                                            <div
                                              key={i}
                                              className="text-sm border rounded-lg p-2"
                                            >
                                              <div className="font-medium">
                                                {v.version}
                                              </div>
                                              <div className="text-xs text-slate-500">
                                                {v.year}
                                              </div>
                                              {v.notes && (
                                                <div className="text-xs mt-1 text-slate-600">
                                                  {v.notes}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-slate-500">
                                          —
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {e.related && e.related.length > 0 && (
                                    <div className="pt-3">
                                      <h4 className="text-sm font-semibold mb-1">
                                        Related
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {e.related.map((rid) => {
                                          const r = DATA.find(
                                            (x) => x.id === rid
                                          );
                                          if (!r) return null;
                                          return (
                                            <Badge key={rid} variant="outline">
                                              {r.name}
                                            </Badge>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <footer className="text-xs text-slate-500 pt-6">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            This is a living, curated timeline. To add or correct entries, edit
            the DATA array at the top.
          </div>
        </footer>
      </div>
    </div>
  );
}
