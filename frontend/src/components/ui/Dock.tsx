// frontend/src/components/ui/Dock.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';

// Extracted into a clean sub-component to stop re-render thrashing
function DockItem({ item, mouseX }: { item: any; mouseX: any }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Calculates distance based on absolute screen position, eliminating the jitter loop
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Base size 44px, expands to 64px on hover
    const widthSync = useTransform(distance, [-150, 0, 150], [44, 64, 44]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <div className="relative flex flex-col items-center justify-end h-full">
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-12 whitespace-pre rounded-md border border-neutral-800 bg-[#060010] px-3 py-1.5 text-xs text-white shadow-xl pointer-events-none z-50"
                    >
                        {item.label}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                ref={ref}
                style={{ width, height: width }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={item.onClick}
                // EXACT REFERENCE MATCH: Sharp rounded-2xl, deep background, fine border
                className="flex items-center justify-center rounded-2xl bg-[#060010] border border-neutral-800 transition-colors hover:bg-neutral-900 focus:outline-none text-neutral-400 hover:text-white shrink-0 z-40"
            >
                {item.icon}
            </motion.button>
        </div>
    );
}

export default function Dock({ items }: { items: any[] }) {
    const mouseX = useMotionValue(Infinity);

    return (
        // Fixed wrapper centers the dock without causing transform layout shifts
        <div className="fixed bottom-6 left-0 w-full flex justify-center z-50 pointer-events-none">
            <div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                // Fixed height (h-[60px]) + items-end forces icons to grow upwards out of the dock
                className="flex items-end gap-2 rounded-2xl border border-neutral-800 bg-[#060010]/95 backdrop-blur-md px-3 pb-2 h-[60px] shadow-2xl pointer-events-auto"
            >
                {items.map((item, index) => (
                    <DockItem key={index} item={item} mouseX={mouseX} />
                ))}
            </div>
        </div>
    );
}