"use client";

import { motion } from 'motion/react';
import svgPaths from '@/lib/svg-data/svg-0p28azmihl';

export function TrustedBySection() {
  return (
    <section className="bg-white py-6 md:py-[40px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex items-center gap-0 animate-[scroll_30s_linear_infinite]">
            <LogoRow />
            <LogoRow />
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function LogoRow() {
  return (
    <div className="flex items-center shrink-0">
      {/* Encora (first instance with gradient overlay) */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <EncoraLogo />
      </div>

      {/* HPE */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px] overflow-hidden">
        <HPELogo />
      </div>

      {/* KPMG */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <KPMGLogo />
      </div>

      {/* HITACHI */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <HitachiLogo />
      </div>

      {/* eventus */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <EventusLogo />
      </div>

      {/* Loops logo (two circles) */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <LoopsLogo />
      </div>

      {/* Livlong */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <LivlongLogo />
      </div>

      {/* Encora (full text) */}
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <EncoraBigLogo />
      </div>
    </div>
  );
}

function EncoraLogo() {
  return (
    <svg width="63" height="18" viewBox="0 0 62.6814 17.9757" fill="none">
      <g clipPath="url(#encora1)">
        <path d={svgPaths.p365dd500} fill="black" />
        <path d={svgPaths.p25d33bf0} fill="black" />
        <path d={svgPaths.p13c52200} fill="black" />
        <path d={svgPaths.p2b6a72c0} fill="black" />
      </g>
      <defs>
        <clipPath id="encora1">
          <rect fill="white" height="17.9757" width="62.6814" />
        </clipPath>
      </defs>
    </svg>
  );
}

function HPELogo() {
  return (
    <div className="relative w-[91px] h-[27px]">
      <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.8427 27.2995">
        <g>
          <path d={svgPaths.pea9e800} fill="black" />
          <path d={svgPaths.p18475f80} fill="black" />
          <path d={svgPaths.p3d48d200} fill="black" />
          <path d={svgPaths.p21d41a80} fill="black" />
          <path d={svgPaths.p152bbe00} fill="black" />
          <path d={svgPaths.p2a4a1b80} fill="black" />
          <path d={svgPaths.p29d6d980} fill="black" />
          <path d={svgPaths.p2afac700} fill="black" />
        </g>
      </svg>
      <svg className="absolute" style={{ top: '24.59%', left: '33.79%', width: '54.52px', height: '11.36px' }} fill="none" viewBox="0 0 54.5175 11.3641">
        <g>
          <path d={svgPaths.p3714ac80} fill="black" />
          <path d={svgPaths.p58c5df0} fill="black" />
          <path d={svgPaths.p30696700} fill="black" />
          <path d={svgPaths.p14975f00} fill="black" />
          <path d={svgPaths.pe6bfc80} fill="black" />
          <path d={svgPaths.p19211700} fill="black" />
          <path d={svgPaths.p188c3000} fill="black" />
        </g>
      </svg>
      <svg className="absolute" style={{ top: '22.39%', left: '94.52%', width: '4.98px', height: '2.82px' }} fill="none" viewBox="0 0 4.97845 2.81527">
        <g>
          <path d={svgPaths.p318adf80} fill="black" />
          <path d={svgPaths.p24bd3740} fill="black" />
        </g>
      </svg>
    </div>
  );
}

function KPMGLogo() {
  return (
    <svg width="68" height="27" viewBox="0 0 68.132 27.2337" fill="none">
      <g clipPath="url(#kpmg1)">
        <path d={svgPaths.p1e533e00} fill="black" />
      </g>
      <defs>
        <clipPath id="kpmg1">
          <rect fill="white" height="27.2337" width="68.132" />
        </clipPath>
      </defs>
    </svg>
  );
}

function HitachiLogo() {
  return (
    <svg width="114" height="20" viewBox="0 0 114.462 19.9581" fill="none">
      <g clipPath="url(#hitachi1)">
        <path d={svgPaths.p33ea6f00} fill="black" />
        <path d={svgPaths.p34754e80} fill="black" />
        <path d={svgPaths.p2b541080} fill="black" />
        <path d={svgPaths.p6e21b00} fill="black" />
        <path d={svgPaths.p2e3a0b80} fill="black" />
        <path d={svgPaths.p372cb680} fill="black" />
        <path d={svgPaths.p2066f180} fill="black" />
      </g>
      <defs>
        <clipPath id="hitachi1">
          <rect fill="white" height="19.9581" width="114.462" />
        </clipPath>
      </defs>
    </svg>
  );
}

function EventusLogo() {
  return (
    <svg width="91" height="15" viewBox="0 0 90.8427 14.6382" fill="none">
      <g clipPath="url(#eventus1)">
        <path clipRule="evenodd" d={svgPaths.p995ac80} fill="black" fillRule="evenodd" />
        <path d={svgPaths.pbf5b872} fill="black" />
        <path clipRule="evenodd" d={svgPaths.p1f6f2200} fill="black" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p28631600} fill="black" fillRule="evenodd" />
        <path d={svgPaths.p3a68a200} fill="black" />
        <path d={svgPaths.p3c46a4d0} fill="black" />
      </g>
      <defs>
        <clipPath id="eventus1">
          <rect fill="white" height="14.6382" width="90.8427" />
        </clipPath>
      </defs>
    </svg>
  );
}

function LoopsLogo() {
  return (
    <svg width="31" height="22" viewBox="0 0 30.8863 21.9562" fill="none">
      <ellipse cx="8.17584" cy="13.5201" rx="7.26741" ry="7.39305" stroke="black" strokeWidth="1.81685" />
      <ellipse cx="22.7104" cy="7.86659" rx="7.26741" ry="6.95816" stroke="black" strokeWidth="1.81685" />
      <path d={svgPaths.pa9dfca0} stroke="black" strokeWidth="1.81685" />
    </svg>
  );
}

function LivlongLogo() {
  return (
    <svg width="77" height="27" viewBox="0 0 77.2163 27.0934" fill="none">
      <g clipPath="url(#livlong1)">
        <path d={svgPaths.p1bf2d140} fill="black" />
        <path d={svgPaths.p13045d40} fill="black" />
        <path d={svgPaths.p185c2f40} fill="black" />
        <path d={svgPaths.p20220480} fill="black" />
        <path d={svgPaths.p55bba80} fill="black" />
        <path d={svgPaths.pd29f500} fill="black" />
        <path d={svgPaths.pb16cc00} fill="black" />
        <path d={svgPaths.p23c32680} fill="black" />
        <path d={svgPaths.p31d02b40} fill="black" />
        <path d={svgPaths.p235d59c0} fill="black" />
        <path d={svgPaths.p3dd1300} fill="black" />
        <path d={svgPaths.p13c87700} fill="black" />
        <path d={svgPaths.p2f60f480} fill="black" />
        <path d={svgPaths.p3bb99480} fill="black" />
        <path d={svgPaths.p3983a80} fill="black" />
        <path d={svgPaths.p25cbcf80} fill="black" />
        <path d={svgPaths.p2adec800} fill="black" />
        <path d={svgPaths.p243d0ef0} fill="black" />
        <path d={svgPaths.p114fc00} fill="black" />
        <path d={svgPaths.p3267fb80} fill="black" />
        <path d={svgPaths.p2c732b80} fill="black" />
        <path d={svgPaths.p285bd240} fill="black" />
        <path d={svgPaths.p2303db00} fill="black" />
        <path d={svgPaths.p13072710} fill="black" />
        <path d={svgPaths.p1a61d680} fill="black" />
        <path d={svgPaths.p4e5a3c0} fill="black" />
        <path d={svgPaths.p3dcd4800} fill="black" />
        <path d={svgPaths.p1c9d20c0} fill="black" />
        <path d={svgPaths.p35b91370} fill="black" />
        <path d={svgPaths.p9633a00} fill="black" />
        <path d={svgPaths.p228f7e00} fill="black" />
        <path d={svgPaths.pe315880} fill="black" />
        <path d={svgPaths.p2e416900} fill="black" />
        <path d={svgPaths.p3be932e0} fill="black" />
        <path d={svgPaths.p1edb6700} fill="black" />
        <path d={svgPaths.p34fd9100} fill="black" />
        <path d={svgPaths.p3f88b400} fill="black" />
        <path d={svgPaths.p6213000} fill="black" />
        <path d={svgPaths.pba1f900} fill="black" />
        <path d={svgPaths.p3105e700} fill="black" />
        <path d={svgPaths.p3de53980} fill="black" />
        <path d={svgPaths.pf3db600} fill="black" />
        <path d={svgPaths.p35fb880} fill="black" />
        <path d={svgPaths.p13998e80} fill="black" />
        <path d={svgPaths.p109d000} fill="black" />
        <path d={svgPaths.p2f63e100} fill="black" />
        <path d={svgPaths.p26f24280} fill="black" />
        <path d={svgPaths.p11450380} fill="black" />
        <path d={svgPaths.p23da8500} fill="black" />
        <path d={svgPaths.p2cbebd00} fill="black" />
        <path d={svgPaths.pc1491e0} fill="black" />
        <path d={svgPaths.p5483f00} fill="black" />
        <path d={svgPaths.p30fd6e80} fill="black" />
        <path d={svgPaths.p3e6f4580} fill="black" />
        <path d={svgPaths.p17c9e780} fill="black" />
        <path d={svgPaths.p160aa880} fill="black" />
        <path d={svgPaths.paff6900} fill="black" />
        <path d={svgPaths.p1b2ed00} fill="black" />
        <path d={svgPaths.p2e976500} fill="black" />
        <path d={svgPaths.p396aa800} fill="black" />
        <path d={svgPaths.p903fd40} fill="black" />
        <path d={svgPaths.p29c7cb80} fill="black" />
        <path d={svgPaths.p41c2000} fill="black" />
        <path d={svgPaths.p3c89e080} fill="black" />
        <path d={svgPaths.p5f80ef2} fill="black" />
        <path d={svgPaths.p3f7ad380} fill="black" />
        <path d={svgPaths.p272c6f00} fill="black" />
        <path d={svgPaths.p3cf9e2c0} fill="black" />
        <path d={svgPaths.p3b2f1b00} fill="black" />
        <path d={svgPaths.p15981100} fill="black" />
        <path d={svgPaths.p1f464d00} fill="black" />
        <path d={svgPaths.p6e3c600} fill="black" />
        <path d={svgPaths.p23198f00} fill="black" />
        <path d={svgPaths.p391ddb00} fill="black" />
        <path d={svgPaths.p2a22d800} fill="black" />
        <path d={svgPaths.p3de09d70} fill="black" />
        <path d={svgPaths.p3aef2900} fill="black" />
        <path d={svgPaths.p30463c00} fill="black" />
        <path d={svgPaths.p32ca2800} fill="black" />
        <path d={svgPaths.p2f5b2900} fill="black" />
        <path d={svgPaths.p119cd00} fill="black" />
        <path d={svgPaths.p2ad4f6a0} fill="black" />
        <path d={svgPaths.p3a9fc900} fill="black" />
        <path d={svgPaths.pb0bdf00} fill="black" />
        <path d={svgPaths.p2231f900} fill="black" />
        <path d={svgPaths.p3bf23880} fill="black" />
        <path d={svgPaths.p248cfe00} fill="black" />
        <path d={svgPaths.p22c6aa00} fill="black" />
        <path d={svgPaths.p2a93e680} fill="black" />
        <path d={svgPaths.pde85800} fill="black" />
        <path d={svgPaths.p3c27a980} fill="black" />
        <path d={svgPaths.p10351080} fill="black" />
        <path d={svgPaths.p3d435100} fill="black" />
        <path d={svgPaths.p160b29f0} fill="black" />
        <path d={svgPaths.pa6434b0} fill="black" />
        <path d={svgPaths.p282ba300} fill="black" />
        <path d={svgPaths.pd1d3100} fill="black" />
        <path d={svgPaths.p2c3af9f0} fill="black" />
        <path d={svgPaths.pdb82300} fill="black" />
        <path d={svgPaths.p2df2db00} fill="black" />
        <path d={svgPaths.p2c3d2200} fill="black" />
        <path d={svgPaths.p1e1235c0} fill="black" />
        <path d={svgPaths.pec85600} fill="black" />
        <path d={svgPaths.p149c8980} fill="black" />
        <path d={svgPaths.p1e352000} fill="black" />
        <path d={svgPaths.p2edcff80} fill="black" />
        <path d={svgPaths.p21e5dc00} fill="black" />
        <path d={svgPaths.p26ba1c00} fill="black" />
        <path d={svgPaths.p3bd9d700} fill="black" />
        <path d={svgPaths.p3da2a00} fill="black" />
        <path d={svgPaths.p3fb22180} fill="black" />
        <path d={svgPaths.pc37eb00} fill="black" />
        <path d={svgPaths.p3e800280} fill="black" />
        <path d={svgPaths.p85fa80} fill="black" />
        <path d={svgPaths.p11557ca0} fill="black" />
        <path d={svgPaths.p287a0300} fill="black" />
        <path d={svgPaths.p5b5c800} fill="black" />
        <path d={svgPaths.p37d7b2b0} fill="black" />
        <path d={svgPaths.pe94e080} fill="black" />
        <path d={svgPaths.p1577b900} fill="black" />
        <path d={svgPaths.p2f254400} fill="black" />
        <path d={svgPaths.p30f03cb0} fill="black" />
        <path d={svgPaths.p3050e000} fill="black" />
        <path d={svgPaths.p3e01a8c0} fill="black" />
        <path d={svgPaths.p369c1000} fill="black" />
        <path d={svgPaths.p3fc48400} fill="black" />
        <path d={svgPaths.p2825ba00} fill="black" />
        <path d={svgPaths.p1a62800} fill="black" />
        <path d={svgPaths.p2d30b480} fill="black" />
        <path d={svgPaths.p3bd7baf0} fill="black" />
        <path d={svgPaths.p35a199c0} fill="black" />
        <path d={svgPaths.p20d4570} fill="black" />
        <path d={svgPaths.pe557140} fill="black" />
        <path d={svgPaths.p1df0d2c0} fill="black" />
        <path d={svgPaths.p1032acc0} fill="black" />
        <path d={svgPaths.p38eef030} fill="black" />
        <path d={svgPaths.p79f80} fill="black" />
        <path d={svgPaths.p2f2c3c80} fill="black" />
        <path d={svgPaths.p240f0000} fill="black" />
        <path d={svgPaths.p11c62100} fill="black" />
        <path d={svgPaths.p2c60e2f0} fill="black" />
        <path d={svgPaths.p24cb4800} fill="black" />
        <path d={svgPaths.p30fa0700} fill="black" />
        <path d={svgPaths.p16dfa200} fill="black" />
        <path d={svgPaths.p3834a80} fill="black" />
        <path d={svgPaths.p1bb4a300} fill="black" />
        <path d={svgPaths.p1859dc00} fill="black" />
        <path d={svgPaths.p7e33200} fill="black" />
        <path d={svgPaths.p36a3c500} fill="black" />
        <path d={svgPaths.p485fd80} fill="black" />
        <path d={svgPaths.p375e1a00} fill="black" />
        <path d={svgPaths.p6d8680} fill="black" />
        <path d={svgPaths.p1bd3f700} fill="black" />
        <path d={svgPaths.p26f4cf00} fill="black" />
        <path d={svgPaths.p3541c210} fill="black" />
        <path d={svgPaths.p2832b900} fill="black" />
        <path d={svgPaths.p18e05a00} fill="black" />
        <path d={svgPaths.p28372000} fill="black" />
        <path d={svgPaths.p206ab880} fill="black" />
        <path d={svgPaths.p3bdb3680} fill="black" />
        <path d={svgPaths.p1af5380} fill="black" />
        <path d={svgPaths.p2cf8d300} fill="black" />
        <path d={svgPaths.p37ab7f70} fill="black" />
        <path d={svgPaths.p35ae700} fill="black" />
        <path d={svgPaths.p12804800} fill="black" />
        <path d={svgPaths.p5503f00} fill="black" />
      </g>
      <defs>
        <clipPath id="livlong1">
          <rect fill="white" height="27.0934" width="77.2163" />
        </clipPath>
      </defs>
    </svg>
  );
}

function EncoraBigLogo() {
  return (
    <svg width="91" height="15" viewBox="0 0 90.8427 14.6382" fill="none">
      <g clipPath="url(#encorabig1)">
        <path clipRule="evenodd" d={svgPaths.p995ac80} fill="black" fillRule="evenodd" />
        <path d={svgPaths.pbf5b872} fill="black" />
        <path clipRule="evenodd" d={svgPaths.p1f6f2200} fill="black" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p28631600} fill="black" fillRule="evenodd" />
        <path d={svgPaths.p3a68a200} fill="black" />
        <path d={svgPaths.p3c46a4d0} fill="black" />
      </g>
      <defs>
        <clipPath id="encorabig1">
          <rect fill="white" height="14.6382" width="90.8427" />
        </clipPath>
      </defs>
    </svg>
  );
}
