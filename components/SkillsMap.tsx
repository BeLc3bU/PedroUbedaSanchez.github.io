"use client";

import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType,
    type Connection,
    type Edge,
    type Node,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {};
const edgeTypes = {};

const initialNodes: Node[] = [
    {
        id: "core",
        data: { label: "Sistemas Críticos" },
        position: { x: 250, y: 0 },
        className:
            "bg-primary text-primary-foreground font-bold rounded-lg border-2 border-primary shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    },
    {
        id: "it",
        data: { label: "IT Infra & Security" },
        position: { x: 100, y: 150 },
        className: "bg-card border-primary/50 text-foreground rounded-md",
    },
    {
        id: "avionics",
        data: { label: "Aviónica Senior" },
        position: { x: 400, y: 150 },
        className: "bg-card border-primary/50 text-foreground rounded-md",
    },
    {
        id: "military",
        data: { label: "Disciplina & Valores" },
        position: { x: 250, y: 300 },
        className: "bg-card border-indigo-500/50 text-foreground rounded-md",
    },
];

const initialEdges: Edge[] = [
    {
        id: "e1-2",
        source: "core",
        target: "it",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e1-3",
        source: "core",
        target: "avionics",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    { id: "e2-4", source: "it", target: "military", style: { strokeDasharray: "5,5" } },
    { id: "e3-4", source: "avionics", target: "military", style: { strokeDasharray: "5,5" } },
];

export default function SkillsMap() {
    const [mounted, setMounted] = useState(false);
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    if (!mounted) {
        return (
            <div className="h-[500px] w-full bg-card/20 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground font-mono">
                    Cargando mapa de habilidades...
                </div>
            </div>
        );
    }

    return (
        <div className="h-[500px] w-full bg-card/20 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-2xl">
            <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                className="dark"
            >
                <Background color="#1e293b" gap={20} />
                <Controls />
                <MiniMap
                    nodeColor={(n) => {
                        if (n.id === "core") return "#22d3ee";
                        return "#1e293b";
                    }}
                    maskColor="rgba(2, 6, 23, 0.7)"
                />
            </ReactFlow>
        </div>
    );
}
