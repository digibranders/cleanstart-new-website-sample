"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import svgPaths from '@/lib/svg-data/svg-ny1mcrs1mx';
import trustedSvgPaths from '@/lib/svg-data/svg-0p28azmihl';
import { CallToActionButton } from '@/components/shared/call-to-action-button';

/* ---- Data ---- */

const avatars = [
  'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwZXhlY3V0aXZlJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyNjAzMjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNTg4NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1699413209298-4e2abf5bd991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjB0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyNjAzMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1705164454513-d8274719fdf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGNvcnBvcmF0ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjYwMzI3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1568585105565-e372998a195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdWl0JTIwaGVhZHNob3QlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzcyNjAzMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const contentSlides = [
  {
    type: 'Case Study',
    brand: 'HPE',
    result: '97.6% CVE reduction',
    title: 'HPE eliminates 88,000 CVEs across containerized infrastructure',
    description:
      'Hewlett Packard Enterprise migrated 200+ production container images to CleanStart hardened builds, eliminating 88,000 known CVEs and reducing their attack surface by 80%. Security review cycles dropped from weeks to hours.',
    date: 'Q4 2025',
    cta: 'Read Case Study',
    image: '/images/figma/891596228f2ccc9edf84581e6b09c7000509f721.webp',
  },
  {
    type: 'Case Study',
    brand: 'Hitachi',
    result: '352,000+ hours saved',
    title: 'Hitachi eliminates patching overhead with deterministic builds',
    description:
      'Hitachi\'s platform engineering team replaced unpredictable base images with CleanStart\'s verified source builds, saving over 352,000 engineering hours annually and achieving zero security incidents in their first deployment quarter.',
    date: 'Q3 2025',
    cta: 'Read Case Study',
    image: '/images/figma/3939a4a7b7ba76abe2ee30e4f57fbb4728675be9.webp',
  },
  {
    type: 'Case Study',
    brand: 'Encora',
    result: 'FIPS 140-2 compliant',
    title: 'Encora achieves full FIPS compliance for defense-grade deployments',
    description:
      'Encora\'s DevSecOps team leveraged CleanStart\'s hardened container images to meet stringent federal compliance requirements, enabling rapid deployment into regulated environments with full software traceability via CleanSBOM.',
    date: 'Q2 2025',
    cta: 'Read Case Study',
    image: '/images/figma/d96951a1bd5bb3095e272f77dc790777830fd5f3.webp',
  },
];

const testimonials = [
  {
    id: 0,
    brand: 'hpe',
    quote:
      'Our proactive threat detection tools have transformed our response time to incidents. We now identify and neutralize threats before they escalate into costly breaches.',
    name: 'Lucas Zhang',
    title: 'CISO',
    role: 'CFO',
  },
  {
    id: 1,
    brand: 'hitachi',
    quote:
      'CleanStart gave us the confidence to ship faster. Zero-CVE images mean our compliance team finally sleeps at night.',
    name: 'Sarah Mitchell',
    title: 'VP Engineering',
    role: 'CTO',
  },
  {
    id: 2,
    brand: 'eventus',
    quote:
      'The automated vulnerability scanning reduced our security review cycle from weeks to hours. Game-changing for our release cadence.',
    name: 'David Park',
    title: 'DevOps Lead',
    role: 'SRE',
  },
  {
    id: 3,
    brand: 'encora',
    quote:
      'We deployed across 200+ microservices with zero security incidents in the first quarter. That\'s unprecedented for our organization.',
    name: 'Aisha Patel',
    title: 'Security Architect',
    role: 'CISO',
  },
  {
    id: 4,
    brand: 'livlong',
    quote:
      'Integration was seamless — our teams adopted CleanStart with minimal friction, and the ROI was visible within the first month.',
    name: 'Marcus Chen',
    title: 'Platform Engineer',
    role: 'CTO',
  },
];

/* ---- Brand Logo Components ---- */

function HPELogo(): React.JSX.Element {
  return (
    <div className="relative w-[91px] h-[27px]">
      <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.8427 27.2995">
        <g>
          <path d={trustedSvgPaths.pea9e800} fill="black" />
          <path d={trustedSvgPaths.p18475f80} fill="black" />
          <path d={trustedSvgPaths.p3d48d200} fill="black" />
          <path d={trustedSvgPaths.p21d41a80} fill="black" />
          <path d={trustedSvgPaths.p152bbe00} fill="black" />
          <path d={trustedSvgPaths.p2a4a1b80} fill="black" />
          <path d={trustedSvgPaths.p29d6d980} fill="black" />
          <path d={trustedSvgPaths.p2afac700} fill="black" />
        </g>
      </svg>
      <svg className="absolute" style={{ top: '24.59%', left: '33.79%', width: '54.52px', height: '11.36px' }} fill="none" viewBox="0 0 54.5175 11.3641">
        <g>
          <path d={trustedSvgPaths.p3714ac80} fill="black" />
          <path d={trustedSvgPaths.p58c5df0} fill="black" />
          <path d={trustedSvgPaths.p30696700} fill="black" />
          <path d={trustedSvgPaths.p14975f00} fill="black" />
          <path d={trustedSvgPaths.pe6bfc80} fill="black" />
          <path d={trustedSvgPaths.p19211700} fill="black" />
          <path d={trustedSvgPaths.p188c3000} fill="black" />
        </g>
      </svg>
      <svg className="absolute" style={{ top: '22.39%', left: '94.52%', width: '4.98px', height: '2.82px' }} fill="none" viewBox="0 0 4.97845 2.81527">
        <g>
          <path d={trustedSvgPaths.p318adf80} fill="black" />
          <path d={trustedSvgPaths.p24bd3740} fill="black" />
        </g>
      </svg>
    </div>
  );
}

function HitachiLogo(): React.JSX.Element {
  return (
    <svg width="114" height="20" viewBox="0 0 114.462 19.9581" fill="none">
      <g clipPath="url(#hitachi_t)">
        <path d={trustedSvgPaths.p33ea6f00} fill="black" />
        <path d={trustedSvgPaths.p34754e80} fill="black" />
        <path d={trustedSvgPaths.p2b541080} fill="black" />
        <path d={trustedSvgPaths.p6e21b00} fill="black" />
        <path d={trustedSvgPaths.p2e3a0b80} fill="black" />
        <path d={trustedSvgPaths.p372cb680} fill="black" />
        <path d={trustedSvgPaths.p2066f180} fill="black" />
      </g>
      <defs>
        <clipPath id="hitachi_t">
          <rect fill="white" height="19.9581" width="114.462" />
        </clipPath>
      </defs>
    </svg>
  );
}

function EventusLogo(): React.JSX.Element {
  return (
    <svg width="91" height="15" viewBox="0 0 90.8427 14.6382" fill="none">
      <g clipPath="url(#eventus_t)">
        <path clipRule="evenodd" d={trustedSvgPaths.p995ac80} fill="black" fillRule="evenodd" />
        <path d={trustedSvgPaths.pbf5b872} fill="black" />
        <path clipRule="evenodd" d={trustedSvgPaths.p1f6f2200} fill="black" fillRule="evenodd" />
        <path clipRule="evenodd" d={trustedSvgPaths.p28631600} fill="black" fillRule="evenodd" />
        <path d={trustedSvgPaths.p3a68a200} fill="black" />
        <path d={trustedSvgPaths.p3c46a4d0} fill="black" />
      </g>
      <defs>
        <clipPath id="eventus_t">
          <rect fill="white" height="14.6382" width="90.8427" />
        </clipPath>
      </defs>
    </svg>
  );
}

function EncoraLogo(): React.JSX.Element {
  return (
    <svg width="63" height="18" viewBox="0 0 62.6814 17.9757" fill="none">
      <g clipPath="url(#encora_t)">
        <path d={trustedSvgPaths.p365dd500} fill="black" />
        <path d={trustedSvgPaths.p25d33bf0} fill="black" />
        <path d={trustedSvgPaths.p13c52200} fill="black" />
        <path d={trustedSvgPaths.p2b6a72c0} fill="black" />
      </g>
      <defs>
        <clipPath id="encora_t">
          <rect fill="white" height="17.9757" width="62.6814" />
        </clipPath>
      </defs>
    </svg>
  );
}

function LivlongLogo(): React.JSX.Element {
  return (
    <svg width="77" height="27" viewBox="0 0 77.2163 27.0934" fill="none">
      <g clipPath="url(#livlong_t)">
        <path d={trustedSvgPaths.p1bf2d140} fill="black" />
        <path d={trustedSvgPaths.p13045d40} fill="black" />
        <path d={trustedSvgPaths.p185c2f40} fill="black" />
        <path d={trustedSvgPaths.p20220480} fill="black" />
        <path d={trustedSvgPaths.p55bba80} fill="black" />
        <path d={trustedSvgPaths.pd29f500} fill="black" />
        <path d={trustedSvgPaths.pb16cc00} fill="black" />
        <path d={trustedSvgPaths.p23c32680} fill="black" />
        <path d={trustedSvgPaths.p31d02b40} fill="black" />
        <path d={trustedSvgPaths.p235d59c0} fill="black" />
        <path d={trustedSvgPaths.p3dd1300} fill="black" />
        <path d={trustedSvgPaths.p13c87700} fill="black" />
        <path d={trustedSvgPaths.p2f60f480} fill="black" />
        <path d={trustedSvgPaths.p3bb99480} fill="black" />
        <path d={trustedSvgPaths.p3983a80} fill="black" />
        <path d={trustedSvgPaths.p25cbcf80} fill="black" />
        <path d={trustedSvgPaths.p2adec800} fill="black" />
        <path d={trustedSvgPaths.p243d0ef0} fill="black" />
        <path d={trustedSvgPaths.p114fc00} fill="black" />
        <path d={trustedSvgPaths.p3267fb80} fill="black" />
        <path d={trustedSvgPaths.p2c732b80} fill="black" />
        <path d={trustedSvgPaths.p285bd240} fill="black" />
        <path d={trustedSvgPaths.p2303db00} fill="black" />
        <path d={trustedSvgPaths.p13072710} fill="black" />
        <path d={trustedSvgPaths.p1a61d680} fill="black" />
        <path d={trustedSvgPaths.p4e5a3c0} fill="black" />
        <path d={trustedSvgPaths.p3dcd4800} fill="black" />
        <path d={trustedSvgPaths.p1c9d20c0} fill="black" />
        <path d={trustedSvgPaths.p35b91370} fill="black" />
        <path d={trustedSvgPaths.p9633a00} fill="black" />
        <path d={trustedSvgPaths.p228f7e00} fill="black" />
        <path d={trustedSvgPaths.pe315880} fill="black" />
        <path d={trustedSvgPaths.p2e416900} fill="black" />
        <path d={trustedSvgPaths.p3be932e0} fill="black" />
        <path d={trustedSvgPaths.p1edb6700} fill="black" />
        <path d={trustedSvgPaths.p34fd9100} fill="black" />
        <path d={trustedSvgPaths.p3f88b400} fill="black" />
        <path d={trustedSvgPaths.p6213000} fill="black" />
        <path d={trustedSvgPaths.pba1f900} fill="black" />
        <path d={trustedSvgPaths.p3105e700} fill="black" />
        <path d={trustedSvgPaths.p3de53980} fill="black" />
        <path d={trustedSvgPaths.pf3db600} fill="black" />
        <path d={trustedSvgPaths.p35fb880} fill="black" />
        <path d={trustedSvgPaths.p13998e80} fill="black" />
        <path d={trustedSvgPaths.p109d000} fill="black" />
        <path d={trustedSvgPaths.p2f63e100} fill="black" />
        <path d={trustedSvgPaths.p26f24280} fill="black" />
        <path d={trustedSvgPaths.p11450380} fill="black" />
        <path d={trustedSvgPaths.p23da8500} fill="black" />
        <path d={trustedSvgPaths.p2cbebd00} fill="black" />
        <path d={trustedSvgPaths.pc1491e0} fill="black" />
        <path d={trustedSvgPaths.p5483f00} fill="black" />
        <path d={trustedSvgPaths.p30fd6e80} fill="black" />
        <path d={trustedSvgPaths.p3e6f4580} fill="black" />
        <path d={trustedSvgPaths.p17c9e780} fill="black" />
        <path d={trustedSvgPaths.p160aa880} fill="black" />
        <path d={trustedSvgPaths.paff6900} fill="black" />
        <path d={trustedSvgPaths.p1b2ed00} fill="black" />
        <path d={trustedSvgPaths.p2e976500} fill="black" />
        <path d={trustedSvgPaths.p396aa800} fill="black" />
        <path d={trustedSvgPaths.p903fd40} fill="black" />
        <path d={trustedSvgPaths.p29c7cb80} fill="black" />
        <path d={trustedSvgPaths.p41c2000} fill="black" />
        <path d={trustedSvgPaths.p3c89e080} fill="black" />
        <path d={trustedSvgPaths.p5f80ef2} fill="black" />
        <path d={trustedSvgPaths.p3f7ad380} fill="black" />
        <path d={trustedSvgPaths.p272c6f00} fill="black" />
        <path d={trustedSvgPaths.p3cf9e2c0} fill="black" />
        <path d={trustedSvgPaths.p3b2f1b00} fill="black" />
        <path d={trustedSvgPaths.p15981100} fill="black" />
        <path d={trustedSvgPaths.p1f464d00} fill="black" />
        <path d={trustedSvgPaths.p6e3c600} fill="black" />
        <path d={trustedSvgPaths.p23198f00} fill="black" />
        <path d={trustedSvgPaths.p391ddb00} fill="black" />
        <path d={trustedSvgPaths.p2a22d800} fill="black" />
        <path d={trustedSvgPaths.p3de09d70} fill="black" />
        <path d={trustedSvgPaths.p3aef2900} fill="black" />
        <path d={trustedSvgPaths.p30463c00} fill="black" />
        <path d={trustedSvgPaths.p32ca2800} fill="black" />
        <path d={trustedSvgPaths.p2f5b2900} fill="black" />
        <path d={trustedSvgPaths.p119cd00} fill="black" />
        <path d={trustedSvgPaths.p2ad4f6a0} fill="black" />
        <path d={trustedSvgPaths.p3a9fc900} fill="black" />
        <path d={trustedSvgPaths.pb0bdf00} fill="black" />
        <path d={trustedSvgPaths.p2231f900} fill="black" />
        <path d={trustedSvgPaths.p3bf23880} fill="black" />
        <path d={trustedSvgPaths.p248cfe00} fill="black" />
        <path d={trustedSvgPaths.p22c6aa00} fill="black" />
        <path d={trustedSvgPaths.p2a93e680} fill="black" />
        <path d={trustedSvgPaths.pde85800} fill="black" />
        <path d={trustedSvgPaths.p3c27a980} fill="black" />
        <path d={trustedSvgPaths.p10351080} fill="black" />
        <path d={trustedSvgPaths.p3d435100} fill="black" />
        <path d={trustedSvgPaths.p160b29f0} fill="black" />
        <path d={trustedSvgPaths.pa6434b0} fill="black" />
        <path d={trustedSvgPaths.p282ba300} fill="black" />
        <path d={trustedSvgPaths.pd1d3100} fill="black" />
        <path d={trustedSvgPaths.p2c3af9f0} fill="black" />
        <path d={trustedSvgPaths.pdb82300} fill="black" />
        <path d={trustedSvgPaths.p2df2db00} fill="black" />
        <path d={trustedSvgPaths.p2c3d2200} fill="black" />
        <path d={trustedSvgPaths.p1e1235c0} fill="black" />
        <path d={trustedSvgPaths.pec85600} fill="black" />
        <path d={trustedSvgPaths.p149c8980} fill="black" />
        <path d={trustedSvgPaths.p1e352000} fill="black" />
        <path d={trustedSvgPaths.p2edcff80} fill="black" />
        <path d={trustedSvgPaths.p21e5dc00} fill="black" />
        <path d={trustedSvgPaths.p26ba1c00} fill="black" />
        <path d={trustedSvgPaths.p3bd9d700} fill="black" />
        <path d={trustedSvgPaths.p3da2a00} fill="black" />
        <path d={trustedSvgPaths.p3fb22180} fill="black" />
        <path d={trustedSvgPaths.pc37eb00} fill="black" />
        <path d={trustedSvgPaths.p3e800280} fill="black" />
        <path d={trustedSvgPaths.p85fa80} fill="black" />
        <path d={trustedSvgPaths.p11557ca0} fill="black" />
        <path d={trustedSvgPaths.p287a0300} fill="black" />
        <path d={trustedSvgPaths.p5b5c800} fill="black" />
        <path d={trustedSvgPaths.p37d7b2b0} fill="black" />
        <path d={trustedSvgPaths.pe94e080} fill="black" />
        <path d={trustedSvgPaths.p1577b900} fill="black" />
        <path d={trustedSvgPaths.p2f254400} fill="black" />
        <path d={trustedSvgPaths.p30f03cb0} fill="black" />
        <path d={trustedSvgPaths.p3050e000} fill="black" />
        <path d={trustedSvgPaths.p3e01a8c0} fill="black" />
        <path d={trustedSvgPaths.p369c1000} fill="black" />
        <path d={trustedSvgPaths.p3fc48400} fill="black" />
        <path d={trustedSvgPaths.p2825ba00} fill="black" />
        <path d={trustedSvgPaths.p1a62800} fill="black" />
        <path d={trustedSvgPaths.p2d30b480} fill="black" />
        <path d={trustedSvgPaths.p3bd7baf0} fill="black" />
        <path d={trustedSvgPaths.p35a199c0} fill="black" />
        <path d={trustedSvgPaths.p20d4570} fill="black" />
        <path d={trustedSvgPaths.pe557140} fill="black" />
        <path d={trustedSvgPaths.p1df0d2c0} fill="black" />
        <path d={trustedSvgPaths.p1032acc0} fill="black" />
        <path d={trustedSvgPaths.p38eef030} fill="black" />
        <path d={trustedSvgPaths.p79f80} fill="black" />
        <path d={trustedSvgPaths.p2f2c3c80} fill="black" />
        <path d={trustedSvgPaths.p240f0000} fill="black" />
        <path d={trustedSvgPaths.p11c62100} fill="black" />
        <path d={trustedSvgPaths.p2c60e2f0} fill="black" />
        <path d={trustedSvgPaths.p24cb4800} fill="black" />
        <path d={trustedSvgPaths.p30fa0700} fill="black" />
        <path d={trustedSvgPaths.p16dfa200} fill="black" />
        <path d={trustedSvgPaths.p3834a80} fill="black" />
        <path d={trustedSvgPaths.p1bb4a300} fill="black" />
        <path d={trustedSvgPaths.p1859dc00} fill="black" />
        <path d={trustedSvgPaths.p7e33200} fill="black" />
        <path d={trustedSvgPaths.p36a3c500} fill="black" />
        <path d={trustedSvgPaths.p485fd80} fill="black" />
        <path d={trustedSvgPaths.p375e1a00} fill="black" />
        <path d={trustedSvgPaths.p6d8680} fill="black" />
        <path d={trustedSvgPaths.p1bd3f700} fill="black" />
        <path d={trustedSvgPaths.p26f4cf00} fill="black" />
        <path d={trustedSvgPaths.p3541c210} fill="black" />
        <path d={trustedSvgPaths.p2832b900} fill="black" />
        <path d={trustedSvgPaths.p18e05a00} fill="black" />
        <path d={trustedSvgPaths.p28372000} fill="black" />
        <path d={trustedSvgPaths.p206ab880} fill="black" />
        <path d={trustedSvgPaths.p3bdb3680} fill="black" />
        <path d={trustedSvgPaths.p1af5380} fill="black" />
        <path d={trustedSvgPaths.p2cf8d300} fill="black" />
        <path d={trustedSvgPaths.p37ab7f70} fill="black" />
        <path d={trustedSvgPaths.p35ae700} fill="black" />
        <path d={trustedSvgPaths.p12804800} fill="black" />
        <path d={trustedSvgPaths.p5503f00} fill="black" />
      </g>
      <defs>
        <clipPath id="livlong_t">
          <rect fill="white" height="27.0934" width="77.2163" />
        </clipPath>
      </defs>
    </svg>
  );
}

function BrandLogo({ brand }: { brand: string }): React.JSX.Element | null {
  switch (brand) {
    case 'hpe':
      return <HPELogo />;
    case 'hitachi':
      return <HitachiLogo />;
    case 'eventus':
      return <EventusLogo />;
    case 'encora':
      return <EncoraLogo />;
    case 'livlong':
      return <LivlongLogo />;
    default:
      return null;
  }
}

function QuoteIcon(): React.JSX.Element {
  return (
    <svg width="12" height="11" viewBox="0 0 12 11.04" fill="none" className="shrink-0 mt-[2px]">
      <path d={svgPaths.p210c6230} fill="black" />
    </svg>
  );
}

/* ---- Main Section ---- */

export function TestimonialsSection(): React.JSX.Element {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % contentSlides.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + contentSlides.length) % contentSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, paused]);

  const slide = contentSlides[activeSlide];

  return (
    <section className="bg-white relative">
      <div className="flex flex-col lg:flex-row lg:items-start">
        {/* Left: 50% width, sticky, dark bg */}
        <div className="bg-[#181818] w-full lg:w-1/2 lg:sticky lg:top-0 lg:self-start lg:h-screen relative flex flex-col">
          {/* Image area */}
          <div className="relative h-[320px] lg:h-[45vh] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={`img-${activeSlide}`}
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {/* Badges on image */}
            <div className="absolute bottom-[20px] left-[20px] flex flex-row gap-[12px] z-10">
              <span className="bg-[#056BF1] px-[16px] py-[8px] rounded-[8px] font-['Google_Sans',sans-serif] text-[13px] font-semibold uppercase tracking-wide text-white">
                {slide.type}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-[16px] py-[8px] rounded-[8px] border border-white/20 font-['Google_Sans',sans-serif] text-[13px] text-white">
                {slide.result}
              </span>
            </div>
          </div>

          {/* Content below image */}
          <div className="px-[50px] pt-[100px] pb-[60px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeSlide}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white leading-[1.2] tracking-[-0.02em]">
                  {slide.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] md:text-[18px] text-[#94A3B8] leading-[1.6] mt-[32px]">
                  {slide.description}
                </p>
                <div className="mt-[24px]">
                  <CallToActionButton label={slide.cta} variant="light" size="md" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="absolute bottom-[50px] right-[50px] flex flex-row gap-[12px]">
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-[44px] h-[44px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-[44px] h-[44px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="w-[44px] h-[44px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              {paused ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="white" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="2.5" width="3.5" height="11" rx="1" fill="white" />
                  <rect x="9.5" y="2.5" width="3.5" height="11" rx="1" fill="white" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Right: 50% width, scrollable testimonial cards */}
        <div className="w-full lg:w-1/2 shrink-0 flex flex-col">
          {testimonials.map((item, index) => {
            const bgColor = index % 2 !== 0 ? 'bg-[#cdf5fe]' : 'bg-white';

            return (
              <TestimonialCard
                key={item.id}
                item={item}
                index={index}
                bgColor={bgColor}
                avatar={avatars[index]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Testimonial Card ---- */

function TestimonialCard({
  item,
  index,
  bgColor,
  avatar,
}: {
  item: (typeof testimonials)[number];
  index: number;
  bgColor: string;
  avatar: string;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${bgColor} flex flex-col justify-between px-6 md:px-[40px] md:pr-[60px] py-[40px] min-h-[360px] lg:min-h-[420px]`}
    >
      {/* Logo */}
      <div className="flex justify-start pt-4">
        <div style={{ transform: 'scale(1.5)', transformOrigin: 'left center' }}>
          <BrandLogo brand={item.brand} />
        </div>
      </div>

      {/* Quote */}
      <div className="flex gap-[6px] mt-auto">
        <QuoteIcon />
        <p className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-black leading-[1.5] max-w-[602px]">
          {item.quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-[12px] mt-[32px]">
        <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden border border-black/10">
          <Image
            alt={item.name}
            className="w-full h-full object-cover"
            src={avatar}
            width={36}
            height={36}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-['Google_Sans',sans-serif] font-medium text-[15px] text-black">
            {item.name}
          </span>
          <span className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-black/50">
            {item.title}, {item.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
