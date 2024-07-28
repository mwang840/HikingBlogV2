"use client";
import { motion } from "framer-motion";
import Head from "next/head";
export default function About(){
    return <div className="flex min-h-screen flex-col items-center justify-between p-24">
       <motion.div animate="visible">
        <h1>About</h1>
       </motion.div>
    </div>
}