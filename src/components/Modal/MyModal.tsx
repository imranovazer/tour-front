import { ReactNode } from "react";
import { motion } from "framer-motion";

function MyModal({
  children,

  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleInnerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed w-full min-h-screen bg-slate-500/40 top-0 left-0 z-50 flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      <motion.div
        className="dark:bg-slate-700 w-[500px] bg-slate-100 p-5 rounded-xl shadow-xl"
        onClick={handleInnerClick}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,

          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default MyModal;
