import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Play, ArrowUpRight } from "@phosphor-icons/react";

import { games } from "../data/games";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-zinc-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        {/* HERO - Left aligned, asymmetrical */}
        <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-[6rem] tracking-tighter leading-[1.05] font-medium"
            >
              Selected
              <br />
              <span className="text-zinc-600">Experiences</span>
            </motion.h1>
          </div>
          <div className="md:col-span-4 pb-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-zinc-500 text-lg max-w-[28ch] leading-relaxed"
            >
              A curated collection of micro-games designed for focus and flow.
            </motion.p>
          </div>
        </header>

        {/* BENTO GRID */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800"
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 },
                },
              }}
              className={`group bg-[#0a0a0a] relative overflow-hidden ${game.colSpan}`}
            >
              {/* Background Image & Gradient */}
              {game.image && (
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover object-center opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                  </div>
                  {/* Gradient để mờ dần về phía bên phải */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] group-hover:from-transparent group-hover:via-[#0a0a0a]/50 group-hover:to-[#0a0a0a]/80 transition-all duration-700 pointer-events-none" />
                  {/* Gradient làm tối dần phần đáy (chỗ đặt chữ) để nổi bật text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent pointer-events-none" />
                </>
              )}

              <Link
                to={game.path}
                className="block h-full p-8 md:p-12 relative z-10"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start mb-32 md:mb-48">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-500/80">
                    {game.category}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500 ease-out">
                    {game.path !== "#" ? (
                      <Play
                        weight="fill"
                        className="text-zinc-600 group-hover:text-[#0a0a0a] transition-colors"
                        size={14}
                      />
                    ) : (
                      <ArrowUpRight
                        className="text-zinc-600 group-hover:text-[#0a0a0a] transition-colors"
                        size={14}
                      />
                    )}
                  </div>
                </div>

                {/* Bottom Section */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-zinc-50 transition-colors duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {game.name}
                  </h3>
                  <p className="text-zinc-200 text-sm md:text-base max-w-[40ch] leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {game.description}
                  </p>
                </div>
              </Link>

              {/* Hover Background FX */}
              <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/30 transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 pt-8 border-t border-zinc-900 flex justify-between items-center text-zinc-600 text-sm"
        >
          <p>© {new Date().getFullYear()} Game Portal</p>
          <p className="font-mono text-xs uppercase tracking-widest">
            System v1.0
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
