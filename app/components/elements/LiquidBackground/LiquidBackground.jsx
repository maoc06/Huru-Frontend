import { useEffect, useRef } from 'react';
import styles from './LiquidBackground.module.scss';

const LiquidBackground = ({ children, variant = 'signup' }) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Store reference to adaptShapesToNewSize for later use
    let adaptShapesToNewSizeRef = null;

    const resizeCanvas = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Store old dimensions for smooth transition
      const oldWidth = canvas.width || newWidth;
      const oldHeight = canvas.height || newHeight;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Call adaptShapesToNewSize only if it's available
      if (adaptShapesToNewSizeRef) {
        adaptShapesToNewSizeRef(oldWidth, oldHeight, newWidth, newHeight);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse/touch interaction handlers
    const handleMouseMove = (e) => {
      targetMousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetMousePos.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initialize mouse position to center
    targetMousePos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    mousePos.current = { ...targetMousePos.current };

    // Liquid blob parameters with relative positioning
    const blobs = [
      {
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.3,
        relativeX: 0.2, // Store relative position for responsive behavior
        relativeY: 0.3,
        baseRadius: 120,
        radius: 120,
        speed: 0.02,
        phase: 0,
        color: 'rgba(124, 189, 181, 0.6)',
        targetX: window.innerWidth * 0.2,
        targetY: window.innerHeight * 0.3,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.7,
        relativeX: 0.8,
        relativeY: 0.7,
        baseRadius: 150,
        radius: 150,
        speed: 0.015,
        phase: Math.PI,
        color: 'rgba(98, 194, 161, 0.5)',
        targetX: window.innerWidth * 0.8,
        targetY: window.innerHeight * 0.7,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.6,
        y: window.innerHeight * 0.2,
        relativeX: 0.6,
        relativeY: 0.2,
        baseRadius: 100,
        radius: 100,
        speed: 0.025,
        phase: Math.PI / 2,
        color: 'rgba(8, 29, 61, 0.3)',
        targetX: window.innerWidth * 0.6,
        targetY: window.innerHeight * 0.2,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.3,
        y: window.innerHeight * 0.8,
        relativeX: 0.3,
        relativeY: 0.8,
        baseRadius: 80,
        radius: 80,
        speed: 0.03,
        phase: Math.PI * 1.5,
        color: 'rgba(13, 53, 112, 0.4)',
        targetX: window.innerWidth * 0.3,
        targetY: window.innerHeight * 0.8,
        isTransitioning: false,
      }
    ];

    // Semi-donut shapes with relative positioning
    const semiDonuts = [
      {
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.15,
        relativeX: 0.1,
        relativeY: 0.15,
        outerRadius: 60,
        innerRadius: 35,
        speed: 0.018,
        phase: 0,
        rotation: 0,
        rotationSpeed: 0.008,
        color: 'rgba(124, 189, 181, 0.4)',
        startAngle: 0,
        endAngle: Math.PI,
        targetX: window.innerWidth * 0.1,
        targetY: window.innerHeight * 0.15,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.9,
        y: window.innerHeight * 0.4,
        relativeX: 0.9,
        relativeY: 0.4,
        outerRadius: 45,
        innerRadius: 25,
        speed: 0.022,
        phase: Math.PI / 3,
        rotation: Math.PI / 4,
        rotationSpeed: -0.012,
        color: 'rgba(98, 194, 161, 0.45)',
        startAngle: Math.PI / 4,
        endAngle: Math.PI * 1.25,
        targetX: window.innerWidth * 0.9,
        targetY: window.innerHeight * 0.4,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.85,
        relativeX: 0.15,
        relativeY: 0.85,
        outerRadius: 70,
        innerRadius: 40,
        speed: 0.016,
        phase: Math.PI / 2,
        rotation: Math.PI / 2,
        rotationSpeed: 0.01,
        color: 'rgba(8, 29, 61, 0.35)',
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 1.5,
        targetX: window.innerWidth * 0.15,
        targetY: window.innerHeight * 0.85,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.1,
        relativeX: 0.85,
        relativeY: 0.1,
        outerRadius: 35,
        innerRadius: 20,
        speed: 0.028,
        phase: Math.PI * 1.2,
        rotation: Math.PI * 1.5,
        rotationSpeed: -0.015,
        color: 'rgba(13, 53, 112, 0.3)',
        startAngle: Math.PI * 1.2,
        endAngle: Math.PI * 1.9,
        targetX: window.innerWidth * 0.85,
        targetY: window.innerHeight * 0.1,
        isTransitioning: false,
      },
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.9,
        relativeX: 0.5,
        relativeY: 0.9,
        outerRadius: 50,
        innerRadius: 28,
        speed: 0.02,
        phase: Math.PI * 0.8,
        rotation: Math.PI * 0.3,
        rotationSpeed: 0.009,
        color: 'rgba(124, 189, 181, 0.35)',
        startAngle: 0,
        endAngle: Math.PI * 0.8,
        targetX: window.innerWidth * 0.5,
        targetY: window.innerHeight * 0.9,
        isTransitioning: false,
      }
    ];

    // Function to smoothly adapt shapes to new screen dimensions
    const adaptShapesToNewSize = (oldWidth, oldHeight, newWidth, newHeight) => {
      // Check if arrays exist before trying to iterate
      if (!blobs || !semiDonuts) return;
      
      // Smoothly transition blob positions using relative positioning
      blobs.forEach((blob) => {
        // Use stored relative position for accurate scaling
        const targetX = blob.relativeX * newWidth;
        const targetY = blob.relativeY * newHeight;
        
        // Smooth interpolation to new position
        blob.targetX = targetX;
        blob.targetY = targetY;
        blob.isTransitioning = true;
      });
      
      // Smoothly transition donut positions using relative positioning
      semiDonuts.forEach((donut) => {
        // Use stored relative position for accurate scaling
        const targetX = donut.relativeX * newWidth;
        const targetY = donut.relativeY * newHeight;
        
        // Smooth interpolation to new position
        donut.targetX = targetX;
        donut.targetY = targetY;
        donut.isTransitioning = true;
      });
    };

    // Assign the function to the reference so resizeCanvas can use it
    adaptShapesToNewSizeRef = adaptShapesToNewSize;

    // Function to draw semi-donut with round borders
    const drawSemiDonut = (donut) => {
      ctx.save();
      ctx.translate(donut.x, donut.y);
      ctx.rotate(donut.rotation);
      
      // Create the semi-donut path
      ctx.beginPath();
      
      // Outer arc
      ctx.arc(0, 0, donut.outerRadius, donut.startAngle, donut.endAngle, false);
      
      // Connect to inner arc with rounded cap
      const endX = Math.cos(donut.endAngle) * donut.innerRadius;
      const endY = Math.sin(donut.endAngle) * donut.innerRadius;
      ctx.lineTo(endX, endY);
      
      // Inner arc (reverse direction)
      ctx.arc(0, 0, donut.innerRadius, donut.endAngle, donut.startAngle, true);
      
      // Connect back to start with rounded cap
      const startX = Math.cos(donut.startAngle) * donut.outerRadius;
      const startY = Math.sin(donut.startAngle) * donut.outerRadius;
      ctx.lineTo(startX, startY);
      
      ctx.closePath();
      
      // Fill the semi-donut
      ctx.fillStyle = donut.color;
      ctx.fill();
      
      // Add rounded end caps
      ctx.beginPath();
      ctx.arc(startX, startY, (donut.outerRadius - donut.innerRadius) / 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(endX, endY, (donut.outerRadius - donut.innerRadius) / 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Smooth interpolation function for mouse position
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    // Calculate gravity attraction force
    const calculateAttraction = (shapeX, shapeY, mouseX, mouseY, maxDistance = 300, strength = 0.3) => {
      const dx = mouseX - shapeX;
      const dy = mouseY - shapeY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > maxDistance) return { x: 0, y: 0 };
      
      const force = (1 - distance / maxDistance) * strength;
      const angle = Math.atan2(dy, dx);
      
      return {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force
      };
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse position interpolation for fluid movement
      mousePos.current.x = lerp(mousePos.current.x, targetMousePos.current.x, 0.05);
      mousePos.current.y = lerp(mousePos.current.y, targetMousePos.current.y, 0.05);

      // Animate liquid blobs
      blobs.forEach((blob) => {
        // Handle smooth transition to new screen size
        if (blob.isTransitioning) {
          blob.x = lerp(blob.x, blob.targetX, 0.08);
          blob.y = lerp(blob.y, blob.targetY, 0.08);
          
          // Stop transitioning when close enough
          const distanceToTarget = Math.sqrt(
            Math.pow(blob.targetX - blob.x, 2) + Math.pow(blob.targetY - blob.y, 2)
          );
          if (distanceToTarget < 5) {
            blob.isTransitioning = false;
            // Update relative position to current screen
            blob.relativeX = blob.x / canvas.width;
            blob.relativeY = blob.y / canvas.height;
          }
        }
        
        // Update blob properties
        blob.phase += blob.speed;
        blob.radius = blob.baseRadius + Math.sin(blob.phase) * 20;
        
        // Calculate gravity attraction to mouse
        const attraction = calculateAttraction(
          blob.x, 
          blob.y, 
          mousePos.current.x, 
          mousePos.current.y, 
          350, // max distance
          0.8  // strength
        );
        
        // Combine natural drift with mouse attraction
        const naturalDriftX = Math.sin(blob.phase * 0.5) * 0.5;
        const naturalDriftY = Math.cos(blob.phase * 0.3) * 0.3;
        
        if (!blob.isTransitioning) {
          blob.x += naturalDriftX + attraction.x;
          blob.y += naturalDriftY + attraction.y;
        }

        // Keep blobs within screen bounds
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

        // Create liquid blob shape
        ctx.beginPath();
        
        const points = 8;
        const angleStep = (Math.PI * 2) / points;
        
        for (let i = 0; i <= points; i++) {
          const angle = i * angleStep;
          const variation = Math.sin(blob.phase + angle * 3) * 15;
          const radius = blob.radius + variation;
          
          const x = blob.x + Math.cos(angle) * radius;
          const y = blob.y + Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            // Use quadratic curves for smoother liquid effect
            const prevAngle = (i - 1) * angleStep;
            const prevVariation = Math.sin(blob.phase + prevAngle * 3) * 15;
            const prevRadius = blob.radius + prevVariation;
            const prevX = blob.x + Math.cos(prevAngle) * prevRadius;
            const prevY = blob.y + Math.sin(prevAngle) * prevRadius;
            
            const cpX = (prevX + x) / 2 + Math.sin(blob.phase + angle) * 10;
            const cpY = (prevY + y) / 2 + Math.cos(blob.phase + angle) * 10;
            
            ctx.quadraticCurveTo(cpX, cpY, x, y);
          }
        }
        
        ctx.closePath();
        ctx.fillStyle = blob.color;
        ctx.fill();
      });

      // Animate semi-donuts
      semiDonuts.forEach((donut) => {
        // Handle smooth transition to new screen size
        if (donut.isTransitioning) {
          donut.x = lerp(donut.x, donut.targetX, 0.08);
          donut.y = lerp(donut.y, donut.targetY, 0.08);
          
          // Stop transitioning when close enough
          const distanceToTarget = Math.sqrt(
            Math.pow(donut.targetX - donut.x, 2) + Math.pow(donut.targetY - donut.y, 2)
          );
          if (distanceToTarget < 5) {
            donut.isTransitioning = false;
            // Update relative position to current screen
            donut.relativeX = donut.x / canvas.width;
            donut.relativeY = donut.y / canvas.height;
          }
        }
        
        // Update donut properties
        donut.phase += donut.speed;
        donut.rotation += donut.rotationSpeed;
        
        // Calculate gravity attraction to mouse (lighter for donuts)
        const attraction = calculateAttraction(
          donut.x, 
          donut.y, 
          mousePos.current.x, 
          mousePos.current.y, 
          250, // max distance (smaller than blobs)
          0.4  // strength (weaker than blobs)
        );
        
        // Combine natural floating with mouse attraction
        const naturalFloatX = Math.sin(donut.phase * 0.7) * 0.3;
        const naturalFloatY = Math.cos(donut.phase * 0.5) * 0.4;
        
        if (!donut.isTransitioning) {
          donut.x += naturalFloatX + attraction.x;
          donut.y += naturalFloatY + attraction.y;
        }
        
        // Slight radius pulsing
        const radiusVariation = Math.sin(donut.phase * 2) * 3;
        const currentOuterRadius = donut.outerRadius + radiusVariation;
        const currentInnerRadius = donut.innerRadius + radiusVariation * 0.5;
        
        // Keep donuts within screen bounds
        const maxRadius = Math.max(currentOuterRadius, currentInnerRadius);
        if (donut.x < -maxRadius) donut.x = canvas.width + maxRadius;
        if (donut.x > canvas.width + maxRadius) donut.x = -maxRadius;
        if (donut.y < -maxRadius) donut.y = canvas.height + maxRadius;
        if (donut.y > canvas.height + maxRadius) donut.y = -maxRadius;
        
        // Create temporary donut object with current values
        const currentDonut = {
          ...donut,
          outerRadius: currentOuterRadius,
          innerRadius: currentInnerRadius
        };
        
        drawSemiDonut(currentDonut);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className={styles.liquidBackground}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default LiquidBackground; 