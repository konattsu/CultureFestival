import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Zap,
  Globe,
  Cpu,
  PaintBucket,
  Rocket,
  ArrowRight,
  Star,
  Triangle,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Floating particles component
const FloatingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    // Create particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-blue-400 rounded-full opacity-70";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);

      // Animate particles
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        scale: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return (): void => {
      particles.forEach((particle) => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
};

// Hero section with 3D effects
const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    if (hero === null || title === null) return;

    // GSAP Timeline for complex animations
    const tl = gsap.timeline();

    tl.fromTo(
      title,
      {
        scale: 0.5,
        rotateX: -90,
        opacity: 0,
        y: 100,
      },
      {
        scale: 1,
        rotateX: 0,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
      },
    );

    // Mouse movement parallax
    const handleMouseMove = (e: MouseEvent): void => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      gsap.to(title, {
        rotateY: x,
        rotateX: -y,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return (): void => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="border-neon-blue absolute top-20 left-20 h-32 w-32 border-2 opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Triangle className="text-neon-blue h-full w-full" />
        </motion.div>
        <motion.div
          className="border-neon-pink absolute right-20 bottom-20 h-24 w-24 border-2 opacity-60"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className="text-neon-pink h-full w-full" />
        </motion.div>
        <motion.div
          className="bg-neon-green absolute top-1/2 left-10 h-16 w-16 rounded-full opacity-40"
          animate={{ y: [-20, 20] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <FloatingParticles />

      {/* Main Title */}
      <div className="relative z-10 text-center">
        <motion.h1
          ref={titleRef}
          className="from-neon-blue via-neon-purple to-neon-pink mb-8 bg-gradient-to-r bg-clip-text text-8xl font-extrabold"
          style={{
            filter: "drop-shadow(0 0 30px rgba(16, 215, 255, 0.5))",
            transformStyle: "preserve-3d",
          }}
        >
          数学部
        </motion.h1>

        <motion.div
          className="mb-8 flex items-center justify-center space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Sparkles className="text-neon-yellow h-8 w-8 animate-pulse" />
          <span className="text-2xl font-light tracking-widest text-white">
            CULTURE FESTIVAL
          </span>
          <Sparkles className="text-neon-yellow h-8 w-8 animate-pulse" />
        </motion.div>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          数学とテクノロジーの魔法で、文化祭を革新する。
          <br />
          <span className="text-neon-blue">未来への扉がここに開かれる。</span>
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <Link
            to="/contents"
            className="group from-neon-blue to-neon-purple animate-glow relative rounded-full bg-gradient-to-r px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-110"
          >
            <span className="relative z-10 flex items-center">
              コンテンツを探索
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="from-neon-pink to-neon-yellow absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          <Link
            to="/map"
            className="border-neon-green text-neon-green hover:bg-neon-green flex items-center rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:text-black"
          >
            <Globe className="mr-2 h-5 w-5" />
            マップを見る
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Feature cards with hover effects
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}> = ({ icon, title, description, gradient, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 100, opacity: 0, rotateX: -45 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        delay: delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [delay]);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative rounded-2xl bg-gradient-to-br p-8 ${gradient} cursor-pointer border border-white/20 backdrop-blur-lg transition-all duration-500 hover:scale-105`}
      whileHover={{ y: -10 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-6 text-4xl text-white transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
        <p className="leading-relaxed text-gray-200">{description}</p>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
};

const Home: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const features = featuresRef.current;
    if (!features) return;

    // Smooth reveal animation for the entire section
    gsap.fromTo(
      features,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: features,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const features = [
    {
      icon: <Cpu />,
      title: "数学 & IT",
      description:
        "最先端の数学とテクノロジーを融合した革新的なコンテンツをお届けします。",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      icon: <PaintBucket />,
      title: "インタラクティブ体験",
      description:
        "ブラウザ上で動作するミニゲームや可視化ツールで、学習を楽しく。",
      gradient: "from-pink-600 to-red-600",
    },
    {
      icon: <Rocket />,
      title: "部誌 & 研究",
      description: "数学部員が作成した研究成果や面白い発見を分かりやすく紹介。",
      gradient: "from-green-600 to-teal-600",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <HeroSection />
      {/* Features Section */}
      <section ref={featuresRef} className="relative px-4 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div className="mb-20 text-center">
            <h2 className="from-neon-blue to-neon-purple mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold">
              特別な体験をあなたに
            </h2>
            <div className="from-neon-pink to-neon-yellow mx-auto h-1 w-32 rounded-full bg-gradient-to-r" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition Info Section */}
      <section className="relative px-4 py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 flex items-center justify-center text-4xl font-bold text-white">
              <Zap className="text-neon-yellow mr-4 h-8 w-8 animate-pulse" />
              数学部の展示
              <Zap className="text-neon-yellow ml-4 h-8 w-8 animate-pulse" />
            </h2>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
              <p className="mb-6 text-xl leading-relaxed text-gray-200">
                <span className="text-neon-blue font-semibold">4階401室</span>
                にて展示中！
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                パズルの体験コーナーと数学動画の上映を行っています。
                <br />
                <span className="text-neon-green">冷房完備</span>
                の快適な環境で、数学の魅力を感じてください。
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
