'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-light">

      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpeg"
            alt="Luxury Model"
            fill
            priority
            className="object-cover animate-[slowZoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <span className="text-[#C6A34A] text-sm md:text-base uppercase tracking-[0.35em] font-medium mb-6 block">
            Maison Lumière
          </span>

          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl leading-[0.92] mb-6 drop-shadow-2xl">
            Shine Beyond<br />Ordinary
          </h1>

          <p className="text-lg md:text-xl font-light tracking-wide mb-10 text-white/85">
            Timeless luxury crafted to perfection.
          </p>

          <Link
            href="/shop"
            className="btn-primary px-10 py-4 text-base hover:scale-105 hover:shadow-2xl transition-all duration-500"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative aspect-[3/4] overflow-hidden block"
          >
            <Link href="/shop?category=Rings">
              <img
                src="/images/rings.jpeg"
                alt="Rings"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-playfair text-3xl text-white mb-2">Rings</h3>
                <span className="text-gold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Discover <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative aspect-[3/4] overflow-hidden block"
          >
            <Link href="/shop?category=Necklaces">
              <img
                src="/images/necklace.jpeg"
                alt="Necklaces"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-playfair text-3xl text-white mb-2">Necklaces</h3>
                <span className="text-gold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Discover <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative aspect-[3/4] overflow-hidden block"
          >
            <Link href="/shop?category=Earrings">
              <img
                src="/images/earings.jpeg" alt="Earrings"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-playfair text-3xl text-white mb-2">Earrings</h3>
                <span className="text-gold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Discover <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Brand Story Split */}
      <section className="py-24 bg-white border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-4 border border-gold"
            >
              <img
                src="/images/craftman.jpeg" alt="Craftsmanship"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-6 block">Our Heritage</span>
              <h2 className="font-playfair text-4xl lg:text-5xl mb-8 leading-tight text-dark">Crafted with<br />Passion</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                For over three decades, LUMIÈRE has been the epitome of refined elegance. Every piece in our collection is meticulously handcrafted by master artisans using only ethically sourced, premium materials.
              </p>
              <p className="text-gray-600 mb-10 leading-relaxed">
                We believe that true luxury lies in the details. From the initial sketch to the final polish, our commitment to perfection ensures that each creation is not merely an accessory, but an heirloom designed to transcend generations.
              </p>
              <Link href="/about" className="btn-outline">
                Read Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Parallax Banner */}
      <section className="relative py-40 flex items-center justify-center text-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('/images/banner.jpeg')" }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-white max-w-3xl px-4"
        >
          <h2 className="font-playfair text-4xl lg:text-5xl mb-10 leading-snug">
            Elegance is the Only Beauty That Never Fades.
          </h2>

          <Link href="/shop" className="btn-primary">
            Discover the Art
          </Link>
        </motion.div>

      </section>
      {/* Testimonials */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl text-dark mb-4">Client Expressions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Eleanor V.", city: "New York", quote: "The craftsmanship is simply unparalleled. My engagement ring from LUMIÈRE catches the light beautifully." },
              { name: "Sophia M.", city: "London", quote: "An exquisite experience from start to finish. The personalization and the breathtaking diamond pendant are pure luxury." },
              { name: "James R.", city: "Paris", quote: "I purchased the aura gold hoops for my wife's anniversary. They are elegant, timeless... Exceptional quality." }
            ].map((client, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                key={i}
                className="bg-white p-10 text-center border border-gold/10 shadow-lg hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="flex justify-center text-gold mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="font-playfair italic text-lg text-dark mb-8 leading-relaxed">"{client.quote}"</p>
                <div className="inline-flex w-12 h-12 rounded-full bg-light text-gold items-center justify-center font-playfair text-xl mb-3">
                  {client.name.charAt(0)}
                </div>
                <h4 className="font-medium text-dark">{client.name}</h4>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{client.city}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div >
  );
}
