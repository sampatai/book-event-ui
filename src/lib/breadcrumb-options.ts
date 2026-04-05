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
  return (
    BREADCRUMB_OPTIONS[pathname] ?? [
      { label: "Dashboard", href: "/", hideOnMobile: true },
      { label: "Page", isCurrent: true },
    ]
  );
}
