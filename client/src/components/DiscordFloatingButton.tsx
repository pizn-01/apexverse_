import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Discord logo SVG component
const DiscordLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 127.14 96.36"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
);

export default function DiscordFloatingButton() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds
        const showTimer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);

        // Hide popup after 8 seconds (3s delay + 5s visible)
        const hideTimer = setTimeout(() => {
            setShowPopup(false);
        }, 8000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <motion.a
            href="https://discord.com/invite/VcxhaAzBEE"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Join our Discord server"
        >
            {/* Pulsing ring effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-[#5865F2]/30"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main button */}
            <div className="relative w-14 h-14 rounded-full bg-[#5865F2] shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                <DiscordLogo className="h-8 w-8 text-white drop-shadow-md" />
            </div>

            {/* Timed popup - "Join now!" */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#5865F2] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xl"
                        initial={{ opacity: 0, x: 10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.8 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                    >
                        Join now! 🎉
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-[#5865F2]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover tooltip */}
            <motion.div
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            >
                Join our Discord
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
            </motion.div>
        </motion.a>
    );
}
