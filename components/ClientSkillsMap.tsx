"use client";

import dynamic from "next/dynamic";

const SkillsMap = dynamic(() => import("@/components/SkillsMap"), { ssr: false });

export default function ClientSkillsMap() {
    return <SkillsMap />;
}
