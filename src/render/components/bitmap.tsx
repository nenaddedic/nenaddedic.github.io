import { Pixel } from "../bitmap";
import React, { useEffect, useRef } from "react";
    
export default function Bitmap({ pixels }: { pixels: Pixel[][] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const t = Date.now();
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = pixels[0].length;
            canvas.height = pixels.length;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                // Draw the bitmap on the canvas
                pixels.forEach((row, y) => {
                    row.forEach((pixel, x) => {
                        ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
                        ctx.fillRect(x, y, 1, 1);
                    });
                });
            }
        }
        console.log(`Bitmap rendering took ${Date.now() - t} ms`);
    }, [pixels]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
}
