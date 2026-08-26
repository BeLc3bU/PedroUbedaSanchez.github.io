"use client";

import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("@/components/Terminal").then((mod) => mod.Terminal), {
    ssr: false,
});

export default function ClientTerminal() {
    return <Terminal />;
}
