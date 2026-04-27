import { motion } from "framer-motion";

export const LuxuryLoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      {/* Animated Gold Rings */}
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-accent"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-accent"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
      </div>

      {/* Elegant Text */}
      <motion.p
        className="text-sm font-['Playfair_Display'] text-muted-foreground"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Searching luxury destinations...
      </motion.p>
    </div>
  );
};
