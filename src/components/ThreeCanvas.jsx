import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // 1. Scene & Camera Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 6;

        // 2. WebGL Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // 3. 3D Geometries & Floating Objects (Three.js Journey Style)
        const objectsGroup = new THREE.Group();
        scene.add(objectsGroup);

        // A. Wireframe Torus Knot (Optimized subdivisions)
        const torusKnotGeo = new THREE.TorusKnotGeometry(0.8, 0.25, 48, 12);
        const torusKnotMat = new THREE.MeshStandardMaterial({
            color: 0x14b8a6,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
            emissive: 0x0f766e,
            emissiveIntensity: 0.5
        });
        const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
        torusKnot.position.set(-3.5, 1, -2);
        objectsGroup.add(torusKnot);

        // B. Glowing Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(0.9, 1);
        const icoMat = new THREE.MeshStandardMaterial({
            color: 0x0ea5e9,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
            emissive: 0x0284c7,
            emissiveIntensity: 0.6
        });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        icoMesh.position.set(3.5, -2, -3);
        objectsGroup.add(icoMesh);

        // C. Floating Octahedron Ring
        const octaGeo = new THREE.OctahedronGeometry(0.7);
        const octaMat = new THREE.MeshStandardMaterial({
            color: 0x10b981,
            wireframe: true,
            transparent: true,
            opacity: 0.45
        });
        const octaMesh = new THREE.Mesh(octaGeo, octaMat);
        octaMesh.position.set(-2.5, -4, -1);
        objectsGroup.add(octaMesh);

        // 4. Three.js Journey Particle Field (Optimized particles count)
        const particlesCount = 300;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorPalette = [
            new THREE.Color(0x14b8a6), // Emerald/Teal
            new THREE.Color(0x0ea5e9), // Sky Blue
            new THREE.Color(0x10b981), // Emerald
            new THREE.Color(0x6366f1)  // Indigo Accent
        ];

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create canvas texture for soft glowing particles
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
        const particleTexture = new THREE.CanvasTexture(canvas);

        const particlesMat = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            map: particleTexture,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // 5. Ambient & Directional Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x14b8a6, 2, 20);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // 6. Scroll & Mouse Parallax Listener (Three.js Journey Scroll Animation)
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 7. Animation Loop with Smooth LERP & Scroll Reactivity
        const clock = new THREE.Clock();
        let lastRenderTime = 0;
        const fpsInterval = 1000 / 30; // Limit rendering to 30 FPS for high efficiency

        const animate = (timestamp) => {
            requestAnimationFrame(animate);

            // FPS Control
            if (!timestamp) timestamp = performance.now();
            const elapsed = timestamp - lastRenderTime;
            if (elapsed < fpsInterval) return;
            lastRenderTime = timestamp - (elapsed % fpsInterval);

            const elapsedTime = clock.getElapsedTime();
            const scrollY = window.scrollY;

            // Rotate objects
            torusKnot.rotation.x = elapsedTime * 0.3;
            torusKnot.rotation.y = elapsedTime * 0.4;

            icoMesh.rotation.x = elapsedTime * 0.25;
            icoMesh.rotation.z = elapsedTime * 0.35;

            octaMesh.rotation.y = elapsedTime * 0.5;

            // Scroll-linked camera movement (Three.js Journey style)
            camera.position.y = -scrollY * 0.003;

            // Mouse parallax with smooth interpolation (lerp)
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            camera.position.x = targetX * 0.5;
            camera.rotation.y = -targetX * 0.1;
            camera.rotation.x = targetY * 0.1;

            // Particle slow rotation
            particleSystem.rotation.y = elapsedTime * 0.03;

            renderer.render(scene, camera);
        };

        animate();


        // 8. Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        />
    );
};

export default ThreeCanvas;
