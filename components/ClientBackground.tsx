"use client";

import dynamic from "next/dynamic";

const TechBackground = dynamic(() => import("@/components/TechBackground"), { ssr: false });

export default function ClientBackground() {
    return <TechBackground />;
}
