import React, { useEffect, useRef, useState } from 'react';

export const HeroShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect low-performance / reduced motion environments
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const gl = canvas.getContext('webgl', {
      powerPreference: 'high-performance',
      alpha: true,
      antialias: false,
      depth: false,
    });
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform float u_wake;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
      }

      void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;

          vec2 mouse = u_mouse / u_resolution.xy;
          mouse.x *= u_resolution.x / u_resolution.y;

          // Slow, hypnotic, Apple-keynote velocity
          float t = u_time * 0.12;

          vec2 delta = st - mouse;
          float dist = length(delta);
          float mouseInfluence = smoothstep(0.7, 0.0, dist) * 0.32;
          vec2 distortedST = st + normalize(delta + 0.0001) * mouseInfluence;

          float n1 = snoise(distortedST * 1.5 + vec2(t * 0.25, -t * 0.2));
          float n2 = snoise(distortedST * 3.0 - vec2(-t * 0.15, t * 0.3) + vec2(n1 * 0.6));

          // Architectural topography isolines
          float contour = abs(fract(n2 * 4.0 + t * 0.15) - 0.5);
          float lines = smoothstep(0.065, 0.0, contour) * 0.5;

          // Subtle coordinate dot matrix
          vec2 gridST = fract(distortedST * 12.0) - 0.5;
          float dots = smoothstep(0.045, 0.01, length(gridST)) * smoothstep(0.2, 0.8, n1 + 0.5) * 0.25;

          // Color palette: deep obsidian base + luminous teal / electric cyan highlights
          vec3 bg = vec3(0.015, 0.016, 0.022);
          vec3 latentGlow = mix(vec3(0.04, 0.08, 0.12), vec3(0.12, 0.06, 0.11), n2 * 0.5 + 0.5);
          vec3 contourColor = mix(vec3(0.25, 0.82, 0.72), vec3(0.70, 0.88, 0.98), n1 * 0.5 + 0.5);
          vec3 mouseGlowColor = vec3(0.22, 0.85, 0.75) * smoothstep(0.65, 0.0, dist);

          vec3 finalColor = bg;
          finalColor += latentGlow * (0.4 + 0.5 * n1);
          finalColor += contourColor * lines;
          finalColor += dots * vec3(0.7, 0.85, 0.95);
          finalColor += mouseGlowColor * 0.3;

          // Vignette mask to keep focus on center typography
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float vignette = smoothstep(1.25, 0.18, length(uv - vec2(0.5, 0.45)));
          finalColor *= vignette * 0.92;

          // Seamless cinematic wake-up bloom
          finalColor *= smoothstep(0.0, 1.0, u_wake);

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(src: string, type: number): WebGLShader | null {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const vShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uWakeLoc = gl.getUniformLocation(program, 'u_wake');
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let targetMouse = { x: 0.5, y: 0.5 };
    let currentMouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Bound DPR for guaranteed 60fps
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    };

    if (!isTouchOnly) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    let animationFrameId: number;
    const startTime = performance.now();
    let wakeVal = prefersReducedMotion ? 1.0 : 0.0;

    const render = (now: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      // Smooth wake-up transition over ~1.8s
      if (wakeVal < 1.0) {
        wakeVal = Math.min(1.0, (now - startTime) / 1800);
      }

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;

      gl.enableVertexAttribArray(posAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTimeLoc, (now - startTime) * 0.001);
      gl.uniform1f(uWakeLoc, wakeVal);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, currentMouse.x * canvas.width, currentMouse.y * canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // If user prefers reduced motion, draw once and pause render loop
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);
    setIsReady(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-1000 ease-out ${
        isReady ? 'opacity-70' : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  );
};
