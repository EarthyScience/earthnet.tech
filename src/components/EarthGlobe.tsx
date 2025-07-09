"use client"
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, Mesh } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface SphereProps {
  rotationSpeed?: number;
  scale?: number;
  initialRotation?: [number, number, number];
}

const geometries = [
  { name: 'cube', args: [1.25, 1.25, 1.25], segments: 1 },
  { name: 'prism', args: [1, 1, 1], segments: 4 },
  { name: 'octagon', args: [1, 1, 1], segments: 8 },
  { name: 'sphere16', args: [1, 16, 16], segments: 16 },
  { name: 'sphere32', args: [1, 32, 32], segments: 32 },
  { name: 'sphere64', args: [1, 64, 64], segments: 64 }
];

const Sphere = ({
  rotationSpeed = 0.001,
  scale = 2.0,
  initialRotation = [0, 0.41, 0]
}: SphereProps) => {
  const texture = useLoader(TextureLoader, './t2m_despair_map.png');
  const meshRef = useRef<Mesh>(null);
  const [geometryIndex, setGeometryIndex] = useState(0);
  const [currentSegments, setCurrentSegments] = useState(geometries[0].segments);

  useSpring({
    segments: geometries[geometryIndex].segments,
    config: { duration: 1000 },
    onChange: ({ value }) => {
      setCurrentSegments(Math.round(value.segments));
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGeometryIndex((prev) => (prev + 1) % geometries.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  const currentGeometry = geometries[geometryIndex];

  return (
    <animated.mesh ref={meshRef} scale={scale} rotation={initialRotation}>
      {currentGeometry.name === 'cube' ? (
        <boxGeometry args={currentGeometry.args as [number, number, number, number?, number?, number?]} />
      ) : (
        <sphereGeometry
          args={[1.0, currentSegments, currentSegments]}
        />
      )}
      <meshStandardMaterial attach="material" map={texture} />
    </animated.mesh>
  );
};

interface EarthGlobeProps {
  width?: string;
  height?: string;
  cameraPosition?: [number, number, number];
  lightIntensity?: number;
  ambientIntensity?: number;
  enableControls?: boolean;
  className?: string;
}

const EarthGlobe = ({
  width = "740px",
  height = "350px",
  cameraPosition = [0, 0, -3.5],
  lightIntensity = 10,
  ambientIntensity = 0.2,
  enableControls = true,
  className = ""
}: EarthGlobeProps) => {
  return (
    <div className={`${className}`} style={{ width, height }}>
      <Canvas
        camera={{
          position: cameraPosition,
          rotateZ: Math.PI
        }}
      >
        <directionalLight position={[-10, 5, 0]} intensity={lightIntensity} />
        <ambientLight intensity={ambientIntensity} />
        <Sphere />
        {enableControls && (
          <OrbitControls
            enableDamping={true}
            enablePan={false}
            enableZoom={false}
          />
        )}
      </Canvas>
    </div>
  );
};

export default EarthGlobe;