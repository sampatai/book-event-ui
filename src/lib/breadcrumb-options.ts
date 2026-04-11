export interface BreadcrumbOptionItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
  hideOnMobile?: boolean;
}

const BREADCRUMB_OPTIONS: Record<string, BreadcrumbOptionItem[]> = {
  "/": [{ label: "Dashboard", isCurrent: true }],
  "/users": [
    { label: "Dashboard", href: "/", hideOnMobile: true },
    { label: "Users", isCurrent: true },
  ],
  "/pandit": [
    { label: "Dashboard", href: "/", hideOnMobile: true },
    { label: "Pandits", isCurrent: true },
  ],
  "/settings": [
    { label: "Dashboard", href: "/", hideOnMobile: true },
    { label: "Settings", isCurrent: true },
  ],
};

export function getBreadcrumbOptions(pathname: string): BreadcrumbOptionItem[] {
  if (BREADCRUMB_OPTIONS[pathname]) {
    return BREADCRUMB_OPTIONS[pathname];
  }

  if (pathname === "/pandit/create") {
    return [
      { label: "Dashboard", href: "/", hideOnMobile: true },
      { label: "Pandits", href: "/pandit" },
      { label: "Create", isCurrent: true },
    ];
  }

  if (pathname.startsWith("/pandit/edit/")) {
    return [
      { label: "Dashboard", href: "/", hideOnMobile: true },
      { label: "Pandits", href: "/pandit" },
      { label: "Edit", isCurrent: true },
    ];
  }

  return [
    { label: "Dashboard", href: "/", hideOnMobile: true },
    { label: "Page", isCurrent: true },
  ];
}
