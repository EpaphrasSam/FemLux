"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { FaTiktok, FaWhatsapp, FaSnapchatGhost } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 px-4">
          {/* Logo and Description */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <div className="mb-4 p-3 bg-white rounded-xl shadow-lg">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="FemLUX by MC Logo"
                  width={150}
                  height={50}
                  className="h-auto"
                />
              </Link>
            </div>
            {/* <p className="text-white/80 text-center md:text-left">
              Empowering women through fashion and beauty. Your one-stop destination for all things feminine and fabulous.
            </p> */}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/about-us"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/terms-of-use"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/femlux_by_mc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.snapchat.com/add/blissbycharii"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Follow us on Snapchat"
              >
                <FaSnapchatGhost className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@femlux1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Follow us on TikTok"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/233530555785"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Chat with us on WhatsApp"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 px-4">
          <div className="text-center text-white/60 text-sm">
            {new Date().getFullYear()} FemLUX by MC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
