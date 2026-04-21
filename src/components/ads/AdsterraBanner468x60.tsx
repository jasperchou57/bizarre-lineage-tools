"use client";

import { useEffect, useRef } from "react";

const AD_KEY = "2772b6761a3502537c0f7a463df05bdc";

export function AdsterraBanner468x60() {
    const slotRef = useRef<HTMLDivElement>(null);
    const injected = useRef(false);

    useEffect(() => {
        if (injected.current || !slotRef.current) return;
        injected.current = true;

        (window as unknown as { atOptions?: Record<string, unknown> }).atOptions = {
            key: AD_KEY,
            format: "iframe",
            height: 60,
            width: 468,
            params: {},
        };

        const script = document.createElement("script");
        script.src = `https://alibisboast.com/${AD_KEY}/invoke.js`;
        script.async = true;
        slotRef.current.appendChild(script);
    }, []);

    return (
        <div className="w-full flex justify-center py-2 bg-background">
            <div ref={slotRef} style={{ width: 468, height: 60 }} />
        </div>
    );
}
