import {
  Delete01Icon,
  HelpCircleIcon,
  Home01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

export const BreadcrumbData = [
  {
    label: "Documentations",
    value: "documentations",
    url: "/docs",
    match: "/docs",
  },
  {
    label: "Dashboard",
    value: "dashboard",
    url: "/dashboard",
    match: "/dashboard",
  },
  {
    label: "Account",
    value: "account",
    url: "/dashboard/account/settings",
    match: "/dashboard/account",
  },
];

export const SidebarData = {
  navMain: [
    {
      title: "All Files",
      url: "/dashboard",
      icon: Home01Icon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings01Icon,
    },
    {
      title: "Trash",
      url: "/dashboard/trash",
      icon: Delete01Icon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};
