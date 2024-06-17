'use client'

import React, { useEffect } from 'react';

const Canvas2 = () => {
    useEffect(() => {
  /**
   *3D海洋效应与 Canvas2D
  * 您可以更改注释 "效果属性" 下的属性
  */

  // Init Context
  const c = document.createElement('canvas').getContext('2d')!;
  const postctx = document.getElementsByClassName('canvas2')[0].appendChild(document.createElement('canvas')).getContext('2d')!;

  const canvas = c.canvas
  const vertices: number[][] = []

  // Effect Properties
  const vertexCount = 10000
  const vertexSize = 5
  const oceanWidth = 204
  const oceanHeight = -80
  const gridSize = 32;
  const waveSize = 5;
  const perspective = 100;
  let stop: number

  // Common variables
  const depth = (vertexCount / oceanWidth * gridSize)
  let frame = 0
  const { sin, cos, PI } = Math

  // Render loop
  const loop = () => {
    const rad = sin(frame / 100) * PI / 20
    const rad2 = sin(frame / 50) * PI / 10
    frame++
    if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) { 
      postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
      postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
    }

    
      const grd = c.createLinearGradient(0, 0, 0, canvas.height);
        grd.addColorStop(0, "#95a7c0");
      grd.addColorStop(1, "#d2d4dd"); 
      c.fillStyle = grd;
      
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.translate(canvas.width / 2, canvas.height / 2)
    
    c.beginPath()
    vertices.forEach((vertex, i) => {

      let x = vertex[0] - frame % (gridSize * 2)
      let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0)
      const wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000))
      let y = vertex[1] + wave * waveSize
      const a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
      let tx, ty, tz
      
      y -= oceanHeight
      
      // Transformation variables
      tx = x
      ty = y
      tz = z

      // Rotation Y
      tx = x * cos(rad) + z * sin(rad)
      tz = -x * sin(rad) + z * cos(rad)
      
      x = tx
      y = ty
      z = tz
      
      // Rotation Z
      tx = x * cos(rad) - y * sin(rad)
      ty = x * sin(rad) + y * cos(rad) 
      
      x = tx;
      y = ty;
      z = tz;
      
      // Rotation X
      
      ty = y * cos(rad2) - z * sin(rad2)
      tz = y * sin(rad2) + z * cos(rad2)
      
      x = tx;
      y = ty;
      z = tz;

      x /= z / perspective
      y /= z / perspective
      
      
          
      if (a < 0.01) return
      if (z < 0) return
    
      
      c.globalAlpha = a
      c.fillStyle = `#ffffff`
      c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize)
      c.globalAlpha = 1
    })
    c.restore()
    
    
    // Post-processing
    postctx.drawImage(canvas, 0, 0)
    
    // postctx.globalCompositeOperation = "screen"
    // postctx.filter = 'blue(16px)'
    // postctx.drawImage(canvas, 0, 0)
    // postctx.filter = 'blue(0)'
    // postctx.globalCompositeOperation = "source-over"
    
    stop =  requestAnimationFrame(loop)
  }

  // Generating dots
  for (let i = 0; i < vertexCount; i++) {
    const x = i % oceanWidth
    const y = 0
    const z = i / oceanWidth >> 0
    const offset = oceanWidth / 2
    vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
  }

  loop() 
  return () => {
    window.cancelAnimationFrame(stop)
  }

},[])
    return (
        <div className='canvas canvas2'>
          {/* <canvas width="1920" height="1080" id='canvas'></canvas>  */}
        </div>
    );
};

export default Canvas2;
