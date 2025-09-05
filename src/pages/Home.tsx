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
  BookOpen,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Floating code/formula elements
const FloatingCodeElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    const codeSnippets = [
      "∫f(x)dx",
      "Σn²",
      "π²/6",
      "e^(iπ)+1=0",
      "∇²φ=0",
      "console.log()",
      "const x =>",
      "if(n%2==0)",
      "√2",
      "∞",
      "lim x→0",
      "f'(x)",
      "det(A)",
      "{x|x∈ℝ}",
      "async/await",
      "useState()",
      "∂f/∂x",
      "sin(θ)",
      "O(log n)",
      "∀x∈ℕ",
      "∂²u/∂t²",
      "λx.x+1",
      "∃!x∈ℝ",
      "∮C F·dr",
      "npm install",
      "git commit",
      "while(true)",
      "∫₀^∞ e^(-x²)dx",
      "matrix.multiply()",
      "∑(n=1 to ∞)",
      "ℂ → ℝ",
      "||v||₂",
      "eigenvalues",
      "BigO(n²)",
      "∇×F",
      "div·curl=0",
      "OR 1=1 --",
      "cargo build --release",
      "line console 0",
      "line vty 0 15",
      "write mem",
      "CHLO",
    ];

    const elements: HTMLDivElement[] = [];

    // Predefined spawn positions for more balanced distribution
    const spawnPositions = [
      // Top edge positions
      { side: 0, x: 10, y: -20, name: "top-left" },
      { side: 0, x: 30, y: -25, name: "top-left-center" },
      { side: 0, x: 50, y: -20, name: "top-center" },
      { side: 0, x: 70, y: -25, name: "top-right-center" },
      { side: 0, x: 90, y: -20, name: "top-right" },

      // Right edge positions
      { side: 1, x: 120, y: 15, name: "right-top" },
      { side: 1, x: 125, y: 35, name: "right-top-center" },
      { side: 1, x: 120, y: 50, name: "right-center" },
      { side: 1, x: 125, y: 65, name: "right-bottom-center" },
      { side: 1, x: 120, y: 85, name: "right-bottom" },

      // Bottom edge positions
      { side: 2, x: 90, y: 120, name: "bottom-right" },
      { side: 2, x: 70, y: 125, name: "bottom-right-center" },
      { side: 2, x: 50, y: 120, name: "bottom-center" },
      { side: 2, x: 30, y: 125, name: "bottom-left-center" },
      { side: 2, x: 10, y: 120, name: "bottom-left" },

      // Left edge positions
      { side: 3, x: -20, y: 85, name: "left-bottom" },
      { side: 3, x: -25, y: 65, name: "left-bottom-center" },
      { side: 3, x: -20, y: 50, name: "left-center" },
      { side: 3, x: -25, y: 35, name: "left-top-center" },
      { side: 3, x: -20, y: 15, name: "left-top" },
    ];

    // Shuffle the spawn positions for variety
    const shuffledPositions = [...spawnPositions].sort(
      () => Math.random() - 0.5,
    );

    // Reduce count for less density
    for (let i = 0; i < 40; i++) {
      const element = document.createElement("div");
      const snippet =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

      element.textContent = snippet;
      // More vibrant color, stronger glow effect
      element.className =
        "absolute text-blue-100 font-mono opacity-0 select-none pointer-events-none font-bold";
      element.style.fontSize = `${Math.random() * 20 + 16}px`; // Larger font size
      element.style.textShadow =
        "0 0 20px rgba(59, 130, 246, 1), 0 0 40px rgba(16, 215, 255, 0.6)"; // Stronger glow effect

      // Use predefined positions in cycle, with some randomness
      const positionIndex = i % shuffledPositions.length;
      const basePosition = shuffledPositions[positionIndex];

      // Add small random offset to avoid exact same positions
      const startX = basePosition.x + (Math.random() * 10 - 5); // ±5% variation
      const startY = basePosition.y + (Math.random() * 10 - 5); // ±5% variation

      element.style.left = `${startX}%`;
      element.style.top = `${startY}%`;
      element.style.zIndex = "0";

      container.appendChild(element);
      elements.push(element);

      // Calculate target position in center area (42.5% to 57.5% = center ±15%)
      const targetXPercent = Math.random() * 20 + 40; // 40% to 60% of viewport
      const targetYPercent = Math.random() * 20 + 40; // 40% to 60% of viewport

      // 3D perspective animation - improved visibility
      const startScale = Math.random() * 0.8 + 1.3; // Smaller start
      const endScale = Math.random() * 0.1 + 0.1; // Slightly larger end
      const startOpacity = Math.random() * 0.4 + 0.3; // Higher opacity for better visibility

      gsap.set(element, {
        scale: startScale,
        opacity: 0,
        z: Math.random() * 200 + 100, // Start closer
        rotateX: Math.random() * 30, // Less rotation
        rotateY: Math.random() * 30,
        transformPerspective: 800,
      });

      // Slower, less frequent animation
      const tl = gsap.timeline({
        repeat: -1,
        delay: Math.random() * 2, // Shorter random delay
        repeatDelay: 0, // No delay between repeats
      });

      tl.to(element, {
        opacity: startOpacity,
        duration: 0.8, // Slower fade in
        ease: "power2.out",
      })
        .to(element, {
          scale: endScale,
          z: -600, // Move back, but not as far
          left: `${targetXPercent}%`,
          top: `${targetYPercent}%`,
          rotateX: `+=${Math.random() * 60 - 30}`,
          rotateY: `+=${Math.random() * 60 - 30}`,
          opacity: 0,
          duration: Math.random() * 6 + 6, // Slower movement
          ease: "power1.inOut",
        })
        .set(element, {
          // Reset to new balanced spawn position
          ...((): { left: string; top: string } => {
            const nextIndex =
              (i + Math.floor(elements.length / 2)) % shuffledPositions.length;
            const resetPosition = shuffledPositions[nextIndex];
            const resetX = resetPosition.x + (Math.random() * 4 - 2);
            const resetY = resetPosition.y + (Math.random() * 4 - 2);
            return {
              left: `${resetX}%`,
              top: `${resetY}%`,
            };
          })(),
          scale: startScale,
          z: Math.random() * 200 + 100,
          rotateX: Math.random() * 30,
          rotateY: Math.random() * 30,
        });
    }

    return (): void => {
      elements.forEach((element) => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "600px", perspectiveOrigin: "50% 50%" }}
    />
  );
};

// Floating particles component
const FloatingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    // Create particles
    const particles: HTMLDivElement[] = [];
    // Reduced count since we have code elements too
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-blue-400 rounded-full opacity-50";
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
      {/* <div className="absolute inset-0 overflow-hidden">
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
      </div> */}

      <FloatingCodeElements />
      <FloatingParticles />

      {/* Main Title */}
      <div className="relative z-10 text-center text-white">
        <motion.h1
          ref={titleRef}
          className="via-neon-purple to-neon-pink mb-8 bg-gradient-to-r bg-clip-text text-8xl font-extrabold"
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
          <Sparkles className="h-8 w-8 animate-pulse" />
          <span className="text-2xl font-light tracking-widest">
            CULTURE FESTIVAL
          </span>
          <Sparkles className="h-8 w-8 animate-pulse" />
        </motion.div>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          数学とテクノロジーが織りなす魔法で、文化祭をもっと面白く。
          <br />
          <span className="text-neon-blue">
            未来への扉が、いまここで開かれる。
          </span>
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
            to="/blog"
            className="border-neon-yellow hover:bg-neon-yellow flex items-center rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:text-black"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            ブログを読む
          </Link>

          <Link
            to="/map"
            className="border-neon-green hover:bg-neon-green flex items-center rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:text-black"
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
    if (card === null) return;

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
      {/* <div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
    if (features === null) return;

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
    <div className="relative min-h-screen overflow-hidden">
      {/* <div className="relative min-h-screen overflow-hidden bg-black"> */}
      <HeroSection />
      {/* Features Section */}
      <section ref={featuresRef} className="relative px-4 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-200 to-white dark:from-black dark:via-gray-900 dark:to-black" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div className="mb-20 text-center">
            <h2 className="from-neon-blue to-neon-purple mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold">
              魔法のような体験を。
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
        <div className="absolute inset-0" />

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
                パズル体験コーナーや、数学に関する動画の上映もご用意しています。
                <br />
                <span className="text-neon-green">冷房完備</span>
                の快適な空間で、数学の楽しさをぜひ体感してください。
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
