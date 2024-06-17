'use client'

import React, { useEffect } from 'react';

const Canvas1 = () => {
    useEffect(() => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;

      const ctx = canvas.getContext("2d")!;
      const points: Vector3[] = [];
      const fov = 50;
      const dist = 50;
      const particleSize = 1;
      const maxAmplitude = 3000; // Best results with values > 500
      const sideLength = 150; // How many particles per side
      const spacing = 100; // Particle distance from each other
      
      let rotXCounter = 0;
      let rotYCounter = 0;
      let rotZCounter = 0;
      let counter = 0;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      class Vector3 {
        x: number
        y: number
        z: number
        color: string

        constructor(x:number, y:number, z:number) {
          this.x = x;
          this.y = y;
          this.z = z;
          this.color = "#0D0";
        }

        rotateX(angle: number) {
          const z = this.z * Math.cos(angle) - this.x * Math.sin(angle);
          const x = this.z * Math.sin(angle) + this.x * Math.cos(angle);
          return new Vector3(x, this.y, z);
        }

        rotateY(angle: number) {
          const y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
          const z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
          return new Vector3(this.x, y, z);
        }
        rotateZ(angle: number) {
          const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
          const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
          return new Vector3(x, y, this.z);
        }
        
        perspectiveProjection(fov: number, viewDistance: number) {
          const factor = fov / (viewDistance + this.z);
          const x = this.x * factor + canvas.width / 1.5;
          const y = this.y * factor + canvas.height / 2;
          return new Vector3(x, y, this.z);
        }
        draw() {
          const vec = this.rotateX(rotXCounter).rotateY(rotYCounter).rotateZ(rotZCounter).perspectiveProjection(fov, dist);
        
          this.color = `rgb(255, 255, 255)`;
          ctx.fillStyle = this.color;
          ctx.fillRect(vec.x, vec.y, particleSize, particleSize);
        }
      }
      
      // Init
      for (let z = 0; z < sideLength; z++) {
        for (let x = 0; x < sideLength; x++) {
          const xStart = -(sideLength * spacing) / 2;
          points.push(
          new Vector3(xStart + x * spacing, 0, xStart + z * spacing));
      
        }
      }
      
      (function loop() {
        const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grd.addColorStop(0, "#95a7c0");
          grd.addColorStop(1, "#d2d4dd"); 
          ctx.fillStyle = grd;

       // ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
        for (let i = 0, max = points.length; i < max; i++) {
          const x = i % sideLength;
          const z = Math.floor(i / sideLength);
          const xFinal = Math.sin(x / sideLength * 4 * Math.PI + counter);
          const zFinal = Math.cos(z / sideLength * 4 * Math.PI + counter);
          const gap = maxAmplitude * 0.3;
          const amp = maxAmplitude - gap;
      
          points[z * sideLength + x].y = maxAmplitude + xFinal * zFinal * amp;
      
          points[i].draw();
        }
        counter += 0.03;
      
        rotXCounter += 0.005;
        rotYCounter += 0.005;
        rotZCounter += 0;
      
        window.requestAnimationFrame(loop);
      })();
    },[])
    return (
        <div className='canvas'>
           <canvas width="1920" height="1080" id='canvas'></canvas>  
        </div>
    );
};

export default Canvas1;
