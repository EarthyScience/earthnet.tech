"use client"

import { useRef, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

type SideProps = {
  rotation?: [number, number, number];
  bg?: string;
  children?: ReactNode;
  index: number;
};

function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }: SideProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const { nodes } = useGLTF('/aobox-transformed.glb')
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += delta
    }
  })
  return (
    <MeshPortalMaterial worldUnits={false} attach={`material-${index}`} resolution={512} blur={0.5}>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <mesh
        castShadow
        receiveShadow
        rotation={rotation}
        geometry={(nodes.Cube as THREE.Mesh).geometry}
      >
        <meshStandardMaterial
          aoMapIntensity={1}
          aoMap={((nodes.Cube as THREE.Mesh).material as THREE.MeshStandardMaterial).aoMap}
          color={bg}
        />
        <spotLight
          castShadow
          color={bg}
          intensity={2}
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-normalBias={0.05}
          shadow-bias={0.0001}
        />
      </mesh>
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshLambertMaterial color={bg} />
      </mesh>
    </MeshPortalMaterial>
  )
}

export const MagicBox = ({
  width = "400px",
  height = "400px",
  className = ""
}: { width?: string; height?: string; className?: string }) => (
  <div className={className} style={{ width, height }}>
    <Canvas
      shadows
      camera={{ position: [-2.5, 0.5, -2.5] }}
      style={{ width: "100%", height: "100%" }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <Edges />
        <Side rotation={[0, 0, 0]} bg="orange" index={0}>
            <mesh>
                <torusGeometry args={[0.65, 0.3, 64]} />
                <meshStandardMaterial color={'#f0f0f0'} metalness={0.5} roughness={0.5} />
            </mesh>
        </Side>
        <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
            <mesh>
                <sphereGeometry />
                <meshStandardMaterial color={'#f0f0f0'} metalness={0.5} roughness={0.5} />
            </mesh>
        </Side>
        <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="lightgreen" index={2}>
            <mesh>
                <boxGeometry args={[1.15, 1.15, 1.15]} />
                <meshStandardMaterial color={'#f0f0f0'} metalness={0.5} roughness={0.5} />
            </mesh>
        </Side>
        <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="aquamarine" index={3}>
            <mesh>
                <boxGeometry args={[1.15, 1.15, 1.15]} />
                <meshStandardMaterial color={'#f0f0f0'} metalness={0.5} roughness={0.5} />
            </mesh>
        </Side>
        <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
            <mesh>
                <sphereGeometry />
                <meshStandardMaterial color={'#f0f0f0'} metalness={0.5} roughness={0.5} />
            </mesh>
        </Side>
        <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
            <mesh>
                <boxGeometry args={[1.15, 1.15, 1.15]} />
                <meshStandardMaterial color={'#f0f0f0'} metalness={0.5} roughness={0.5} />
            </mesh>
        </Side>
      </mesh>
      <OrbitControls
                  enableDamping={true}
                  enablePan={false}
                  enableZoom={true}
                  minDistance={3}
                  maxDistance={6}
                />
    </Canvas>
  </div>
)