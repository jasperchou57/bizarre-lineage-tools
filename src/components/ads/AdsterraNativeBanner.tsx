"use client";

import { useEffect, useRef } from "react";

const AD_ID = "b9cc7bbdce346bae6482b8026832fe80";

export function AdsterraNativeBanner() {
    const injected = useRef(false);

    useEffect(() => {
        if (injected.current) return;
        injected.current = true;

        const script = document.createElement("script");
        script.src = `https://alibisboast.com/${AD_ID}/invoke.js`;
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        document.body.appendChild(script);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <div id={`container-${AD_ID}`} />
        </div>
    );
}
