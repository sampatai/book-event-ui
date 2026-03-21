import type { LucideIcon } from "lucide-react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
  FileText,
  Users,
  Zap,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";

// Icon map: maps string names to lucide-react components
const iconMap: Record<string, LucideIcon> = {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  PieChart,
  Map,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  FileText,
  Users,
  Zap,
  Shield,
  HelpCircle,
  LogOut,
};

/**
 * Get a lucide-react icon component by name string
 * @param iconName - The name of the icon (e.g., "SquareTerminal", "Settings2")
 * @returns The LucideIcon component or undefined if not found
 *
 * @example
 * const SettingsIcon = getIconByName("Settings2");
 */
export function getIconByName(iconName?: string): LucideIcon | undefined {
  if (!iconName) return undefined;
  return iconMap[iconName];
}

/**
 * Get all available icon names
 * @returns Array of icon names
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconMap);
}
