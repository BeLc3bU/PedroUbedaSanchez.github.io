import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1000 }) {
    const mesh = useRef<THREE.Points>(null!)

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return positions
    }, [count])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        mesh.current.rotation.y = time * 0.05
        mesh.current.rotation.x = time * 0.02
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                    // @ts-ignore - Fiber types sometimes lag behind Three.js BufferAttribute requirements
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#22d3ee"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    )
}

export default function TechBackground() {
    return (
        <div className="fixed inset-0 -z-20 bg-background overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <Particles count={1500} />
            </Canvas>
        </div>
    )
}
