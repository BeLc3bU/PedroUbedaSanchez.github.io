---
name: react-flow-architect
description: "Build production-ready ReactFlow applications with hierarchical navigation, performance optimization, and advanced state management."
allowed-tools: Read, Write, Edit, Glob, Grep
risk: unknown
source: community
---

# ReactFlow Architect

Build production-ready ReactFlow applications with hierarchical navigation, performance optimization, and advanced state management.

## Quick Start
Create basic interactive graph:

```tsx
import ReactFlow, { Node, Edge } from "reactflow";

const nodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "2", position: { x: 100, y: 100 }, data: { label: "Node 2" } },
];

const edges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

export default function Graph() {
  return <ReactFlow nodes={nodes} edges={edges} />;
}
```

## Complete Example
```typescript
import React, { useState, useCallback, useMemo, useRef } from 'react';
import ReactFlow, { Node, Edge, useReactFlow } from 'reactflow';
import dagre from 'dagre';
import { debounce } from 'lodash';

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  expandedNodeIds: Set<string>;
  history: GraphState[];
  historyIndex: number;
}

export default function InteractiveGraph() {
  const [state, setState] = useState<GraphState>({
    nodes: [],
    edges: [],
    selectedNodeId: null,
    expandedNodeIds: new Set(),
    history: [],
    historyIndex: 0,
  });

  const { fitView } = useReactFlow();
  const layoutCacheRef = useRef<Map<string, Node[]>>(new Map());

  // Memoized styled edges
  const styledEdges = useMemo(() => {
    return state.edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        strokeWidth: state.selectedNodeId === edge.source || state.selectedNodeId === edge.target ? 3 : 2,
        stroke: state.selectedNodeId === edge.source || state.selectedNodeId === edge.target ? '#3b82f6' : '#94a3b8',
      },
      animated: state.selectedNodeId === edge.source || state.selectedNodeId === edge.target,
    }));
  }, [state.edges, state.selectedNodeId]);

  // Debounced layout calculation
  const debouncedLayout = useMemo(
    () => debounce((nodes: Node[], edges: Edge[]) => {
      const cacheKey = generateLayoutCacheKey(nodes, edges);

      if (layoutCacheRef.current.has(cacheKey)) {
        return layoutCacheRef.current.get(cacheKey)!;
      }

      const layouted = applyDagreLayout(nodes, edges);
      layoutCacheRef.current.set(cacheKey, layouted);

      return layouted;
    }, 150),
    []
  );

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setState(prev => ({
      ...prev,
      selectedNodeId: node.id,
    }));
  }, []);

  return (
    <ReactFlow
      nodes={state.nodes}
      edges={styledEdges}
      onNodeClick={handleNodeClick}
      fitView
    />
  );
}
```

## When to Use
This skill is applicable to execute the workflow or actions described in the overview.
