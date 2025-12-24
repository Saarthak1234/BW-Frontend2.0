// lib/gtag.ts

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log the pageview with the correct URL
export const pageview = (url: string) => {
  if (GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Interface for GTag event parameters
interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// Log specific events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};