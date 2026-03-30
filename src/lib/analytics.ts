// GA4 custom event tracking
// Events: planner_open, planner_save, vault_open, vault_export, compare_open, codes_click, stand_planner_cta

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
}
