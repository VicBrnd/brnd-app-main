import {
  Delete01Icon,
  HelpCircleIcon,
  Home01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

export const data = {
  navMain: [
    {
      title: "All Files",
      url: "/dashboard",
      icon: Home01Icon,
    },
    {
      title: "Trash",
      url: "/dashboard/trash",
      icon: Delete01Icon,
    },
  ],
  tree: [
    ["Uploadthing", ["API"]],
    ["Zustand", ["Sidebar Store"]],
    ["React", ["UseActionState"]],
    ["NextJs", "Rate-Limiter"],
    ["BetterAuth", "Auth Config"],
    ["Redis", "@upstash/redis"],
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings01Icon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};
