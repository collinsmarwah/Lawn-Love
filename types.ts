import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export type PageView = 'home' | 'services' | 'about' | 'gallery' | 'reviews' | 'contact' | 'estimate';

export interface NavLink {
  label: string;
  view: PageView;
}