import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSWaves = () => {
    const mountRef = useRef<HTMLDivElement>(null); // Specify the type as HTMLDivElement

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) { // Check if mountRef.current is not null
            mountRef.current.appendChild(renderer.domElement);
        }

        // Modify the plane geometry
        const geometry = new THREE.PlaneGeometry(20, 20, 200, 200);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Set background color to white
        scene.background = new THREE.Color(0xffffff);

        camera.position.z = 15;
        camera.position.y = 10;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Update vertices to create wave effect
            const time = Date.now() * 0.001;
            const positionAttribute = plane.geometry.attributes.position;
            for (let i = 0; i < positionAttribute.count; i++) {
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i);
                const wave = Math.sin(x * 0.5 + time) * 0.5 + Math.sin(y * 0.5 + time) * 0.5;
                positionAttribute.setZ(i, wave);
            }
            positionAttribute.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            if (mountRef.current) { // Check if mountRef.current is not null
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeJSWaves;