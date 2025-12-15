import { 
  Scissors, 
  Sprout, 
  Shovel, 
  Wind, 
  Droplets, 
  CloudRain, 
  Trash2, 
  Snowflake,
  Trees,
  Flower2
} from "lucide-react";
import { Service, Review, NavLink } from "./types";

export const COMPANY_INFO = {
  name: "Lawn Love",
  location: "Newark, NJ",
  phone: "(973) 718-5114",
  phoneRaw: "9737185114",
  email: "hello@lawnlovenewark.com",
  address: "123 Broad St, Newark, NJ 07102",
  facebook: "https://www.facebook.com/lawnlove"
};

export const SERVICES: Service[] = [
  {
    id: "mowing",
    title: "Lawn Mowing",
    description: "Weekly or bi-weekly mowing service including edging, trimming, and blowing off hard surfaces.",
    icon: Scissors
  },
  {
    id: "fertilization",
    title: "Lawn Fertilization",
    description: "Custom nutrient plans to feed your lawn exactly what it needs to grow thick, green, and healthy.",
    icon: Sprout
  },
  {
    id: "bush-trimming",
    title: "Bush Trimming",
    description: "Keep your shrubs, hedges, and bushes neat and healthy with professional pruning.",
    icon: Trees
  },
  {
    id: "weed-control",
    title: "Weed Control",
    description: "Targeted treatments to eliminate broadleaf weeds and crabgrass without harming your turf.",
    icon: Flower2
  },
  {
    id: "aeration",
    title: "Lawn Aeration",
    description: "Core aeration to relieve soil compaction and allow air, water, and nutrients to reach the roots.",
    icon: Wind
  },
  {
    id: "seeding",
    title: "Lawn Seeding",
    description: "Overseeding patchy areas or establishing new turf for a lush, full lawn.",
    icon: Droplets
  },
  {
    id: "cleanup",
    title: "Yard Clean Up",
    description: "Spring and fall leaf removal, debris clearing, and general property tidying.",
    icon: Trash2
  },
  {
    id: "gutter",
    title: "Gutter Cleaning",
    description: "Removing debris from gutters to prevent water damage and clogs.",
    icon: CloudRain
  },
  {
    id: "snow",
    title: "Snow Removal",
    description: "Clearing driveways and walkways of snow and ice in winter months.",
    icon: Snowflake
  },
  {
    id: "gardening",
    title: "Gardening",
    description: "Planting, weeding, and maintenance for flower beds and gardens.",
    icon: Shovel
  }
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah L.",
    location: "Ironbound, Newark",
    rating: 5,
    text: "So easy to book. I got a quote in 5 minutes and they were out the next day to mow. My lawn hasn't looked this good in years.",
    date: "2 days ago",
    verified: true
  },
  {
    id: "2",
    author: "Marcus J.",
    location: "Newark, NJ",
    rating: 5,
    text: "Lawn Love transformed my backyard. The team was punctual, polite, and did an amazing job cleaning up the fall leaves. Highly recommend!",
    date: "1 week ago",
    verified: true
  },
  {
    id: "3",
    author: "David R.",
    location: "University Heights",
    rating: 5,
    text: "Honest pricing and reliable service. I appreciate that they send a text before they arrive. Great local business.",
    date: "3 weeks ago",
    verified: true
  }
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", view: "home" },
  { label: "Services", view: "services" },
  { label: "Gallery", view: "gallery" },
  { label: "Reviews", view: "reviews" },
  { label: "About", view: "about" },
  { label: "Contact", view: "contact" },
];