"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8
                 w-14 h-14 sm:w-16 sm:h-16
                 bg-gradient-to-br from-sage-500 to-sage-600 
                 text-white rounded-2xl
                 shadow-xl shadow-sage-500/30
                 flex items-center justify-center
                 hover:shadow-2xl hover:shadow-sage-500/40
                 transition-shadow z-30"
    >
      <Plus className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
    </motion.button>
  );
};
