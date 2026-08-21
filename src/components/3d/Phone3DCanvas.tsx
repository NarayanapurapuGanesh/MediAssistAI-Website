import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Shield, Activity, RefreshCw } from 'lucide-react';
import { APP_CONFIG } from '../../config/appConfig';

interface Phone3DCanvasProps {
  interactive?: boolean;
  className?: string;
}

export const Phone3DCanvas: React.FC<Phone3DCanvasProps> = ({
  interactive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isRotatingManually, setIsRotatingManually] = useState<boolean>(false);
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL support
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Detect mobile / low-power devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
    setIsLowPower(isMobile);

    let animationFrameId: number;
    let isDisposed = false;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile, // antialias on desktop for crisp edges, disable on mobile for max fps
      powerPreference: 'high-performance',
    });

    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2); // Clean white studio key light
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.2); // Soft sky-blue fill light
    fillLight.position.set(-6, -2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // Root Group for Phone & Attached Elements
    const rootGroup = new THREE.Group();
    rootGroup.scale.set(0.78, 0.78, 0.78);
    scene.add(rootGroup);

    const phoneGroup = new THREE.Group();
    rootGroup.add(phoneGroup);

    // --- Dynamic Procedural Canvas Texture for Phone Screen ---
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 2048;
    const ctx = screenCanvas.getContext('2d');

    const drawPhoneScreen = (pulseOffset: number = 0) => {
      if (!ctx) return;
      const w = screenCanvas.width;
      const h = screenCanvas.height;

      // Background: Clean Clinical Off-White
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, w, h);

      // Top Status Bar (Android)
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('9:41', 70, 75);

      // Battery & 5G
      ctx.fillStyle = '#0369A1';
      ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('5G', w - 220, 75);
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(w - 140, 52, 54, 28);
      ctx.fillRect(w - 84, 58, 6, 16);

      // Clinical App Header
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(50, 110, w - 100, 130, 28);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Logo Icon in Header
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.roundRect(80, 140, 70, 70, 18);
      ctx.fill();
      // White Cross in Logo
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(109, 152, 12, 46);
      ctx.fillRect(92, 169, 46, 12);

      // App Title & Online Status
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('MediAssist', 175, 172);

      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.arc(185, 206, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#059669';
      ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Render Backend Online', 205, 214);

      // Patient Greeting Card
      ctx.fillStyle = '#F0F9FF';
      ctx.beginPath();
      ctx.roundRect(50, 265, w - 100, 210, 32);
      ctx.fill();
      ctx.strokeStyle = '#BAE6FD';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#0369A1';
      ctx.font = 'bold 42px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Hello, Alex', 90, 335);

      ctx.fillStyle = '#475569';
      ctx.font = '32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('How can I assist your health today?', 90, 385);

      // Quick action pill tags
      const tags = ['💊 Med Check', '🩺 Symptoms', '📊 Vitals'];
      tags.forEach((tag, i) => {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(90 + i * 280, 410, 260, 50, 25);
        ctx.fill();
        ctx.strokeStyle = '#BAE6FD';
        ctx.stroke();
        ctx.fillStyle = '#0369A1';
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(tag, 115 + i * 280, 445);
      });

      // AI Consultation Chat Bubble
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(50, 505, w - 100, 390, 32);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Assistant badge
      ctx.fillStyle = '#0284C7';
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✦ Clinical AI Assistant', 90, 565);

      ctx.fillStyle = '#1E293B';
      ctx.font = '34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Amoxicillin 500mg is scheduled for', 90, 630);
      ctx.fillText('12:00 PM. Take with a full glass of water.', 90, 680);

      // Vitals Waveform Inside Card
      ctx.strokeStyle = '#0284C7';
      ctx.lineWidth = 5;
      ctx.beginPath();
      const waveY = 810;
      ctx.moveTo(90, waveY);
      for (let x = 90; x < w - 90; x += 10) {
        const normalizedX = (x - 90) / 100 + pulseOffset;
        let y = waveY + Math.sin(normalizedX * 2) * 6;
        if (x > 380 && x < 540) {
          y += Math.sin((x - 380) * 0.15) * 40;
        }
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('HEART RATE MONITOR • 72 BPM STABLE', 90, 755);

      // Medicine Schedule Card
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(50, 925, w - 100, 350, 32);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#0369A1';
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('TODAY\'S MEDICATION SCHEDULE', 90, 985);

      // Pill Row 1
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Metformin 500mg', 90, 1055);
      ctx.fillStyle = '#64748B';
      ctx.font = '28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Taken at 08:00 AM • Morning', 90, 1100);
      ctx.fillStyle = '#ECFDF5';
      ctx.beginPath();
      ctx.roundRect(w - 240, 1025, 140, 52, 26);
      ctx.fill();
      ctx.strokeStyle = '#A7F3D0';
      ctx.stroke();
      ctx.fillStyle = '#065F46';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✓ Done', w - 205, 1060);

      // Pill Row 2
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Amoxicillin 500mg', 90, 1180);
      ctx.fillStyle = '#64748B';
      ctx.font = '28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Upcoming at 12:00 PM • Lunch', 90, 1225);
      ctx.fillStyle = '#F0F9FF';
      ctx.beginPath();
      ctx.roundRect(w - 260, 1150, 160, 52, 26);
      ctx.fill();
      ctx.strokeStyle = '#BAE6FD';
      ctx.stroke();
      ctx.fillStyle = '#0369A1';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('⏰ Due', w - 220, 1185);

      // Security / Cloud Sync Badge
      ctx.fillStyle = '#ECFDF5';
      ctx.beginPath();
      ctx.roundRect(50, 1305, w - 100, 115, 26);
      ctx.fill();
      ctx.strokeStyle = '#A7F3D0';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#065F46';
      ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('🔒 TLS 1.3 Encrypted Render Cloud Connection', 90, 1375);

      // Bottom Input / Action Bar
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(50, 1780, w - 100, 120, 60);
      ctx.fill();
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Ask MediAssist a health query...', 110, 1855);

      // Send Button
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.arc(w - 110, 1840, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('➤', w - 124, 1852);

      // Android Bottom Navigation Bar (Home indicator pill)
      ctx.fillStyle = '#94A3B8';
      ctx.beginPath();
      ctx.roundRect(w / 2 - 120, h - 50, 240, 10, 5);
      ctx.fill();
    };

    drawPhoneScreen(0);

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // --- Phone 3D Geometry ---
    const phoneWidth = 2.4;
    const phoneHeight = 4.9;
    const phoneDepth = 0.22;
    const cornerRadius = 0.28;

    // Custom Rounded Box Chassis using ExtrudeGeometry
    const shape = new THREE.Shape();
    const x = -phoneWidth / 2;
    const y = -phoneHeight / 2;
    const w = phoneWidth;
    const h = phoneHeight;
    const r = cornerRadius;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      depth: phoneDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const phoneBodyGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    phoneBodyGeometry.center();

    // Sleek Natural Aluminum Chassis Material
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.35,
    });

    const phoneMesh = new THREE.Mesh(phoneBodyGeometry, bodyMaterial);
    phoneGroup.add(phoneMesh);

    // Front Screen Panel
    const screenGeometry = new THREE.PlaneGeometry(phoneWidth - 0.1, phoneHeight - 0.12);
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: false,
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.051;
    phoneGroup.add(screenMesh);

    // Top Camera Island Pill
    const cameraPillGeom = new THREE.CapsuleGeometry(0.06, 0.25, 4, 8);
    const cameraPillMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const cameraPill = new THREE.Mesh(cameraPillGeom, cameraPillMat);
    cameraPill.rotation.z = Math.PI / 2;
    cameraPill.position.set(0, phoneHeight / 2 - 0.22, phoneDepth / 2 + 0.053);
    phoneGroup.add(cameraPill);

    // Camera Lens
    const lensGeom = new THREE.CircleGeometry(0.035, 16);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const lens = new THREE.Mesh(lensGeom, lensMat);
    lens.position.set(0.08, phoneHeight / 2 - 0.22, phoneDepth / 2 + 0.055);
    phoneGroup.add(lens);

    // Rear Camera Bump
    const camBumpGeom = new THREE.BoxGeometry(0.8, 1.1, 0.08);
    const camBumpMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const camBump = new THREE.Mesh(camBumpGeom, camBumpMat);
    camBump.position.set(-0.6, 1.6, -phoneDepth / 2 - 0.06);
    phoneGroup.add(camBump);

    // Rear Lenses
    for (let i = 0; i < 3; i++) {
      const lensRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.2 })
      );
      lensRing.rotation.x = Math.PI / 2;
      lensRing.position.set(-0.6, 1.9 - i * 0.32, -phoneDepth / 2 - 0.1);
      phoneGroup.add(lensRing);
    }

    // --- Floating Orbiting Medical 3D Objects ---

    // 1. Clinical 3D Medical Cross (Solid Teal/Blue)
    const crossGroup = new THREE.Group();
    const crossMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.2,
      roughness: 0.2,
    });
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.15), crossMat);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.15), crossMat);
    crossGroup.add(crossV, crossH);
    crossGroup.position.set(1.9, 1.4, 0.8);
    crossGroup.scale.set(0.9, 0.9, 0.9);
    rootGroup.add(crossGroup);

    // 2. 3D Capsule Pill (Sky Blue + Pure White Gloss)
    const pillGroup = new THREE.Group();
    const pillTopGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.35, 16);
    const pillCapGeom = new THREE.SphereGeometry(0.16, 16, 8);

    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.2,
      roughness: 0.1,
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
    });

    const topHalf = new THREE.Mesh(pillTopGeom, blueMat);
    topHalf.position.y = 0.175;
    const topCap = new THREE.Mesh(pillCapGeom, blueMat);
    topCap.position.y = 0.35;

    const botHalf = new THREE.Mesh(pillTopGeom, whiteMat);
    botHalf.position.y = -0.175;
    const botCap = new THREE.Mesh(pillCapGeom, whiteMat);
    botCap.position.y = -0.35;

    pillGroup.add(topHalf, topCap, botHalf, botCap);
    pillGroup.rotation.z = Math.PI / 3.5;
    pillGroup.rotation.x = Math.PI / 5;
    pillGroup.position.set(-1.8, -1.2, 0.9);
    rootGroup.add(pillGroup);

    // 3. 3D Floating Security Shield
    const shieldGroup = new THREE.Group();
    const shieldGeom = new THREE.ConeGeometry(0.3, 0.6, 6);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.4,
      roughness: 0.3,
    });
    const shieldMesh = new THREE.Mesh(shieldGeom, shieldMat);
    shieldMesh.rotation.x = Math.PI;
    shieldGroup.add(shieldMesh);
    shieldGroup.position.set(-1.9, 1.6, 0.6);
    rootGroup.add(shieldGroup);

    // 4. Subtle AI Particle Field
    const particleCount = isMobile ? 30 : 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleScales[i] = Math.random() * 0.08 + 0.03;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.05,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Mouse Parallax & Smooth Interpolation ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      mouse.targetX = ((clientX / rect.width) * 2 - 1) * 0.35;
      mouse.targetY = (-(clientY / rect.height) * 2 + 1) * 0.25;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Drag-to-rotate interaction handling
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      setIsRotatingManually(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      phoneGroup.rotation.y += deltaX * 0.008;
      phoneGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleWindowMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    // Resize Observer for flawless responsive handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!entry.contentBoxSize) continue;
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          // Dynamically adjust distance based on screen width
          if (newWidth < 450) {
            camera.position.z = 7.4;
          } else if (newWidth < 768) {
            camera.position.z = 7.0;
          } else {
            camera.position.z = 6.6;
          }
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let pulseTimer = 0;

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Parallax Dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base Floating Motion
      const floatY = Math.sin(elapsedTime * 1.5) * 0.12;
      const floatRotZ = Math.cos(elapsedTime * 1.2) * 0.02;

      rootGroup.position.y = floatY;

      if (!isDragging) {
        // Natural gentle idle rotation + mouse influence
        const baseRotY = Math.sin(elapsedTime * 0.6) * 0.15;
        const baseRotX = Math.cos(elapsedTime * 0.8) * 0.05;

        phoneGroup.rotation.y = baseRotY + mouse.x * 0.8;
        phoneGroup.rotation.x = baseRotX - mouse.y * 0.6;
        phoneGroup.rotation.z = floatRotZ;
      }

      // Orbiting medical 3D elements animation
      crossGroup.position.y = 1.4 + Math.sin(elapsedTime * 2.2) * 0.15;
      crossGroup.rotation.y += 0.015;
      crossGroup.rotation.z = Math.sin(elapsedTime) * 0.2;

      pillGroup.position.y = -1.2 + Math.cos(elapsedTime * 1.8) * 0.18;
      pillGroup.rotation.y += 0.02;
      pillGroup.rotation.x += 0.01;

      shieldGroup.position.y = 1.6 + Math.sin(elapsedTime * 1.6 + 1) * 0.12;
      shieldGroup.rotation.y += 0.01;

      // Particles subtle drift
      particles.rotation.y = elapsedTime * 0.03;

      // Refresh screen canvas pulse waveform every ~100ms
      pulseTimer += 0.05;
      if (pulseTimer > 0.1) {
        drawPhoneScreen(elapsedTime * 2);
        screenTexture.needsUpdate = true;
        pulseTimer = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);

      // Dispose Three.js objects
      renderer.dispose();
      phoneBodyGeometry.dispose();
      screenGeometry.dispose();
      screenTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [interactive]);

  const handleResetOrientation = () => {
    setIsRotatingManually(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] flex items-center justify-center select-none ${className}`}
    >
      {webGLSupported ? (
        <>
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
            aria-label="3D Interactive MediAssist Smartphone Mockup"
          />

          {/* Interactive 3D Controls overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none px-2">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-700 pointer-events-auto shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span className="font-semibold">Interactive 3D Preview</span>
              {isLowPower && <span className="text-[10px] text-slate-400 font-medium">(Optimized)</span>}
            </div>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              {isRotatingManually && (
                <button
                  id="reset-3d-view-btn"
                  onClick={handleResetOrientation}
                  className="bg-white hover:bg-slate-50 backdrop-blur-md border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer font-medium"
                  title="Reset 3D angle"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                  <span>Reset Angle</span>
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-3 py-1.5 text-[11px] text-slate-600 shadow-sm font-medium">
                <RotateCw className="w-3.5 h-3.5 text-sky-600" />
                <span>Drag to inspect 360°</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Graceful High-Fidelity Fallback when WebGL is unavailable */
        <div className="w-full max-w-sm mx-auto p-6 card-clean rounded-3xl shadow-lg relative overflow-hidden bg-white">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
                <Activity className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">MediAssist</h4>
                <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Render Backend Online
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              v{APP_CONFIG.appVersion}
            </span>
          </div>

          <div className="my-6 space-y-3">
            <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200">
              <p className="text-xs text-sky-700 font-semibold mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Assistant Active
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                "Welcome to MediAssist. Your personalized healthcare insights and medication schedule are synced."
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Daily Medicine Routine</span>
              <span className="text-xs font-semibold text-emerald-700">On Track</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Cloud Sync Status</span>
              <span className="text-xs font-semibold text-sky-700 flex items-center gap-1">
                <Shield className="w-3 h-3" /> HTTPS Protected
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
