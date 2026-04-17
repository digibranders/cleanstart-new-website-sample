'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CallToActionButton } from '@/components/shared/call-to-action-button';

// --- Inlined SVG path data (from Figma export svg-0tcrrv7e40) ---
const LOGO_SVG_PATHS = {
  // Accent mark (cyan)
  p33248900: "M9.69324 1.65233V11.1858L2.71394 15.3629V5.67384L0 7.23787L0.0735775 7.28412V18.575L1.22768 19.2667L12.6069 12.6153V0.0273288L12.5606 0L9.69324 1.65233Z",
  // "C" letterform top
  p164f400: "M12.8634 12.3672L4.17707 7.25679L11.4864 3.24369L19.8427 8.0262V8.38567L22.7101 6.73334L11.3224 0L0 6.76067V19.1847L2.63826 20.7634V9.56501L10.1494 13.9712L12.8634 12.4072V12.3672Z",
  // Remaining letterforms
  p29578200: "M4.11821 2.68661C4.71103 2.28719 5.451 2.08748 6.34233 2.08748C7.33037 2.08748 8.13551 2.33134 8.75356 2.81905C9.37371 3.30676 9.81306 3.98367 10.0695 4.84977L12.3063 4.23383C11.8942 2.93887 11.1795 1.9088 10.162 1.1457C9.14246 0.3826 7.86853 0 6.34233 0C5.01585 0 3.88066 0.290104 2.93677 0.870311C1.99288 1.45052 1.26552 2.25986 0.758894 3.29625C0.252264 4.33263 0 5.53719 0 6.90572C0 8.27426 0.254366 9.47671 0.758894 10.5152C1.26552 11.5516 1.99078 12.3609 2.93677 12.9411C3.88276 13.5213 5.01795 13.8114 6.34233 13.8114C7.87063 13.8114 9.14457 13.4288 10.162 12.6658C11.1816 11.9027 11.8963 10.8726 12.3063 9.57762L10.0695 8.96168C9.81096 9.82148 9.37371 10.4963 8.75356 10.9861C8.13341 11.478 7.33037 11.7219 6.34233 11.7219C5.4531 11.7219 4.70892 11.5222 4.114 11.1227C3.51908 10.7233 3.07131 10.1641 2.7749 9.44308C2.47639 8.72203 2.32923 7.87694 2.32923 6.90572C2.33554 5.93661 2.4869 5.09153 2.78541 4.36837C3.08393 3.64732 3.52749 3.08813 4.12031 2.68871L4.11821 2.68661Z",
  p25a63f40: "M2.21782 0H0V13.534H2.21782V0Z",
  pfbeab80: "M7.57212 0.723156C6.85107 0.241753 5.97445 0 4.94437 0C3.96895 0 3.10915 0.220731 2.36708 0.662193C1.625 1.10365 1.04479 1.72591 0.626455 2.52684C0.208117 3.32778 0 4.27167 0 5.35851C0 6.36546 0.212321 7.25469 0.639067 8.0283C1.06581 8.80191 1.65863 9.40524 2.41963 9.8425C3.18063 10.2777 4.06355 10.4963 5.0705 10.4963C6.07746 10.4963 6.90362 10.2482 7.69826 9.75C8.49289 9.25178 9.0815 8.55595 9.462 7.66041L7.27151 6.99822C7.05709 7.4586 6.75226 7.80967 6.35495 8.05142C5.95973 8.29318 5.48884 8.4151 4.94227 8.4151C4.09508 8.4151 3.45181 8.13971 3.00825 7.58684C2.66138 7.15378 2.45327 6.57778 2.37759 5.86514H9.57131C9.6575 4.67529 9.52507 3.64101 9.1761 2.76229C8.82714 1.88567 8.29107 1.20456 7.57002 0.723156H7.57212ZM5.03477 1.94243C5.83991 1.94243 6.42853 2.19049 6.80272 2.68871C7.06759 3.04188 7.23997 3.54431 7.31986 4.18968H2.43435C2.53525 3.61578 2.72655 3.14699 3.01035 2.78541C3.45181 2.22413 4.12662 1.94243 5.03477 1.94243Z",
  p157f1500: "M8.38987 1.84994C8.06403 1.19405 7.56581 0.721055 6.89311 0.433053C6.2204 0.145052 5.44259 0 4.55966 0C3.38664 0 2.45537 0.254366 1.76585 0.7652C1.07422 1.27393 0.607536 1.94874 0.361579 2.78962L2.38599 3.42448C2.55206 2.91575 2.84217 2.55627 3.26051 2.34816C3.67884 2.14004 4.1098 2.03493 4.55757 2.03493C5.29964 2.03493 5.82729 2.1968 6.14052 2.52264C6.4012 2.79382 6.54835 3.19114 6.58829 3.71038C6.18887 3.76924 5.79576 3.826 5.41737 3.88066C4.78881 3.96895 4.20439 4.06565 3.66833 4.17076C3.13017 4.27587 2.66348 4.39149 2.26407 4.52183C1.73641 4.70052 1.30756 4.92755 0.975417 5.20715C0.64327 5.48674 0.397312 5.81889 0.239647 6.20149C0.0798802 6.58619 0 7.01714 0 7.49434C0 8.04091 0.128229 8.54124 0.382595 8.99531C0.636962 9.44939 1.01325 9.81307 1.51148 10.0864C2.00759 10.3596 2.61513 10.4963 3.33409 10.4963C4.22962 10.4963 4.97801 10.3281 5.57503 9.99386C6.03541 9.73739 6.45165 9.3653 6.82163 8.87969V10.2188H8.76406V4.114C8.76406 3.68516 8.74515 3.28784 8.70941 2.92206C8.67157 2.55627 8.56436 2.1989 8.38777 1.84994H8.38987ZM6.34444 7.08021C6.27086 7.30724 6.12791 7.549 5.91559 7.80757C5.70326 8.06614 5.41947 8.28266 5.0642 8.46135C4.70893 8.64004 4.27797 8.72833 3.77555 8.72833C3.42448 8.72833 3.13228 8.67367 2.89683 8.56226C2.66138 8.45084 2.4806 8.30369 2.35867 8.11659C2.23674 7.9295 2.17367 7.71297 2.17367 7.46701C2.17367 7.25259 2.22202 7.06549 2.31662 6.90572C2.41122 6.74596 2.54787 6.60511 2.72655 6.48318C2.90524 6.36125 3.12176 6.25404 3.38033 6.16155C3.64311 6.07536 3.94793 5.99757 4.29269 5.9261C4.63535 5.85463 5.04738 5.78105 5.52668 5.70116C5.8315 5.65071 6.18047 5.59395 6.56307 5.53299C6.55886 5.70116 6.55255 5.89246 6.54414 6.11109C6.52943 6.47688 6.46215 6.80061 6.34653 7.08231L6.34444 7.08021Z",
  p2d484200: "M8.82083 2.52264C8.68629 2.09379 8.47817 1.68807 8.19437 1.30757C7.91268 0.92707 7.53218 0.613842 7.05288 0.367885C6.57357 0.121928 5.96604 0 5.23027 0C4.2969 0 3.51277 0.203913 2.8737 0.61174C2.53104 0.830369 2.23463 1.09104 1.98027 1.39166V0.283797H0V10.2272H2.24725V5.11675C2.24725 4.50922 2.31452 4.011 2.44906 3.61999C2.5836 3.23108 2.76439 2.92416 2.98722 2.69922C3.21006 2.47429 3.46232 2.31662 3.73771 2.22413C4.0131 2.13163 4.29269 2.08538 4.57649 2.08538C5.10414 2.08538 5.52248 2.1989 5.8336 2.42594C6.14473 2.65298 6.37597 2.94308 6.53363 3.29625C6.6913 3.64942 6.7901 4.0152 6.83215 4.3957C6.87419 4.7762 6.89732 5.12306 6.89732 5.43629V10.223H9.14457V4.67109C9.14457 4.43144 9.12354 4.12031 9.0836 3.73561C9.04366 3.35301 8.95537 2.94518 8.82083 2.51633V2.52264Z",
  p27204200: "M9.40104 6.9774C9.02684 6.71463 8.63794 6.50861 8.23221 6.36146C7.82649 6.2143 7.46281 6.09868 7.13697 6.01249L4.76148 5.3503C4.46087 5.27042 4.16446 5.17161 3.87225 5.05179C3.58005 4.93196 3.33619 4.77009 3.14069 4.56408C2.94518 4.35806 2.84638 4.09318 2.84638 3.76734C2.84638 3.42469 2.962 3.12197 3.19114 2.8655C3.42028 2.60693 3.72509 2.40932 4.10349 2.27058C4.47978 2.13183 4.88971 2.06666 5.33328 2.07297C5.78735 2.08558 6.21621 2.17808 6.61773 2.34836C7.01925 2.52074 7.3598 2.7709 7.63939 3.09884C7.91898 3.42679 8.10818 3.8241 8.20488 4.29079L10.5888 3.87666C10.3912 3.06101 10.0548 2.36307 9.57551 1.78707C9.09621 1.21107 8.50129 0.769608 7.78865 0.464789C7.076 0.15997 6.26665 0.00650931 5.3585 0.000202712C4.46297 -0.00610389 3.64732 0.134744 2.91365 0.422745C2.17998 0.710746 1.59767 1.1459 1.16462 1.72611C0.731567 2.30632 0.515041 3.02317 0.515041 3.87666C0.515041 4.45897 0.611737 4.94878 0.805139 5.3461C0.998542 5.74131 1.24661 6.06715 1.55142 6.32152C1.85414 6.57588 2.17788 6.77559 2.51844 6.92064C2.85899 7.06569 3.17643 7.17921 3.47073 7.2654L6.89521 8.27866C7.14117 8.35224 7.3577 8.44053 7.5448 8.54144C7.73189 8.64234 7.88535 8.75376 8.00517 8.87779C8.125 9.00182 8.21539 9.14057 8.27636 9.29613C8.33732 9.45379 8.36885 9.62197 8.36885 9.80696C8.36885 10.219 8.23852 10.5659 7.97785 10.8476C7.71718 11.1292 7.37872 11.3437 6.96038 11.4929C6.54205 11.6401 6.09848 11.7137 5.62549 11.7137C4.82665 11.7137 4.12241 11.4992 3.51277 11.0683C2.90103 10.6394 2.49742 10.0319 2.30191 9.24567L0 9.59464C0.134541 10.4607 0.451973 11.207 0.952296 11.8356C1.45262 12.4641 2.09169 12.9476 2.8674 13.2861C3.64311 13.6246 4.51763 13.7927 5.48674 13.7927C6.16785 13.7927 6.81953 13.7065 7.44389 13.5342C8.06614 13.3618 8.62112 13.1053 9.10462 12.7606C9.58813 12.4158 9.97493 11.9848 10.2608 11.4677C10.5467 10.9485 10.6897 10.3451 10.6897 9.6577C10.6897 8.97029 10.5678 8.44894 10.326 8.01799C10.0842 7.58914 9.77523 7.24228 9.40104 6.9774Z",
  p2ad29300: "M4.0131 0H1.80368V2.76229H0V4.50291H1.80368V8.64634C1.80368 9.21184 1.80999 9.71847 1.8226 10.1662C1.83522 10.614 1.95505 11.0534 2.18208 11.4822C2.44065 11.9552 2.81694 12.3 3.31517 12.5186C3.81339 12.7372 4.37468 12.8528 5.00534 12.8676C5.63389 12.8823 6.27716 12.8297 6.93515 12.7057V10.8452C6.315 10.9377 5.76212 10.9609 5.27862 10.9188C4.79511 10.8768 4.43985 10.6708 4.21912 10.3029C4.10349 10.1137 4.04042 9.86772 4.02991 9.56711C4.0194 9.26649 4.0152 8.91753 4.0152 8.51811V4.50501H6.93305V2.76439H4.0152V0.00210185L4.0131 0Z",
  p234fdc80: "M8.38988 1.84994C8.06404 1.19405 7.56582 0.721055 6.89311 0.433053C6.22041 0.145052 5.44259 0 4.55966 0C3.38664 0 2.45537 0.254366 1.76585 0.7652C1.07422 1.27393 0.607536 1.94874 0.361579 2.78962L2.38599 3.42448C2.55206 2.91575 2.84217 2.55627 3.26051 2.34816C3.67884 2.14004 4.1098 2.03493 4.55757 2.03493C5.29964 2.03493 5.82729 2.1968 6.14052 2.52264C6.40119 2.79382 6.54835 3.19114 6.58829 3.71038C6.18887 3.76924 5.79576 3.826 5.41737 3.88066C4.78881 3.96895 4.20439 4.06565 3.66833 4.17076C3.13017 4.27587 2.66348 4.39149 2.26407 4.52183C1.73641 4.70052 1.30756 4.92755 0.975417 5.20715C0.64327 5.48674 0.399415 5.81889 0.239647 6.20149C0.0798802 6.58619 0 7.01714 0 7.49434C0 8.04091 0.128229 8.54124 0.382595 8.99531C0.636961 9.44939 1.01326 9.81307 1.50938 10.0864C2.0076 10.3596 2.61513 10.4963 3.33198 10.4963C4.22752 10.4963 4.9759 10.3281 5.57293 9.99386C6.03331 9.73739 6.44954 9.3653 6.81953 8.87969V10.2188H8.76196V4.114C8.76196 3.68516 8.74305 3.28784 8.70731 2.92206C8.66947 2.55627 8.56225 2.1989 8.38567 1.84994H8.38988ZM6.34444 7.08021C6.27086 7.30724 6.12791 7.549 5.91559 7.80757C5.70326 8.06614 5.41947 8.28266 5.0642 8.46135C4.70893 8.64004 4.27797 8.72833 3.77555 8.72833C3.42658 8.72833 3.13228 8.67367 2.89683 8.56226C2.66138 8.45084 2.4806 8.30369 2.35867 8.11659C2.23674 7.9295 2.17367 7.71297 2.17367 7.46701C2.17367 7.25259 2.22202 7.06549 2.31662 6.90572C2.41122 6.74596 2.54787 6.60511 2.72655 6.48318C2.90524 6.36125 3.12176 6.25404 3.38033 6.16155C3.64311 6.07536 3.94793 5.99757 4.29269 5.9261C4.63535 5.85463 5.04738 5.78105 5.52668 5.70116C5.8315 5.65071 6.18047 5.59395 6.56307 5.53299C6.55886 5.70116 6.55255 5.89246 6.54414 6.11109C6.52943 6.47688 6.46215 6.80061 6.34653 7.08231L6.34444 7.08021Z",
  p3ffe2d00: "M4.69001 0.00722592C4.37678 0.0282479 4.07196 0.0871099 3.77345 0.181709C3.47494 0.276308 3.20375 0.406644 2.9578 0.572718C2.66979 0.751405 2.42174 0.97634 2.21573 1.24963C2.12323 1.37366 2.03914 1.50399 1.96136 1.64063V0.0492701H0V9.99267H2.22834V4.93899C2.22834 4.55849 2.27458 4.20321 2.36708 3.87527C2.45958 3.54733 2.60252 3.25302 2.79592 2.99655C2.98932 2.73798 3.23949 2.52776 3.54641 2.36169C3.85333 2.1767 4.19809 2.06948 4.58279 2.04005C4.96539 2.00852 5.30595 2.03795 5.60026 2.12204V0.0513727C5.30595 0.00302213 5.00113 -0.0116934 4.6879 0.00932857L4.69001 0.00722592Z",
  p370d8700: "M6.93094 4.50291V2.76229H4.01309V0H1.80368V2.76229H0V4.50291H1.80368V8.64635C1.80368 9.21184 1.80999 9.71847 1.8226 10.1662C1.83522 10.614 1.95505 11.0534 2.18208 11.4822C2.44065 11.9552 2.81694 12.3 3.31516 12.5186C3.81338 12.7372 4.37468 12.8528 5.00534 12.8676C5.63389 12.8823 6.27716 12.8297 6.93515 12.7057V10.8452C6.315 10.9377 5.76212 10.9609 5.27862 10.9188C4.79511 10.8768 4.43985 10.6708 4.21912 10.3029C4.10349 10.1137 4.04042 9.86772 4.02991 9.56711C4.0194 9.26649 4.0152 8.91753 4.0152 8.51811V4.50501H6.93305L6.93094 4.50291Z",
} as const;

// WhiteBgLogoH SVG paths (from svg-y6p28mumv2)
const WHITE_BG_LOGO_PATHS = {
  p29ce6900: "M94.39 39.89V85.24L61.19 105.11V59.02L48.28 66.46L48.63 66.68V120.39L54.12 123.68L108.25 92.04V32.16L108.03 32.03L94.39 39.89Z",
  p3fca2280: "M61.19 58.83L19.87 34.52L54.64 15.43L94.39 38.18V39.89L108.03 32.03L53.86 0L0 32.16V91.26L12.55 98.77V45.5L48.28 66.46L61.19 59.02V58.83Z",
  p1f572f30: "M157.05 42.27C159.87 40.37 163.39 39.42 167.63 39.42C172.33 39.42 176.16 40.58 179.1 42.9C182.05 45.22 184.14 48.44 185.36 52.56L196 49.63C194.04 43.47 190.64 38.57 185.8 34.94C180.95 31.31 174.89 29.49 167.63 29.49C161.32 29.49 155.92 30.87 151.43 33.63C146.94 36.39 143.48 40.24 141.07 45.17C138.66 50.1 137.46 55.83 137.46 62.34C137.46 68.85 138.67 74.57 141.07 79.51C143.48 84.44 146.93 88.29 151.43 91.05C155.93 93.81 161.33 95.19 167.63 95.19C174.9 95.19 180.96 93.37 185.8 89.74C190.65 86.11 194.05 81.21 196 75.05L185.36 72.12C184.13 76.21 182.05 79.42 179.1 81.75C176.15 84.09 172.33 85.25 167.63 85.25C163.4 85.25 159.86 84.3 157.03 82.4C154.2 80.5 152.07 77.84 150.66 74.41C149.24 70.98 148.54 66.96 148.54 62.34C148.57 57.73 149.29 53.71 150.71 50.27C152.13 46.84 154.24 44.18 157.06 42.28L157.05 42.27Z",
  p2b83b900: "M217.06 29.49H206.51V93.87H217.06V29.49Z",
  p16f59d00: "M263.6 48.69C260.17 46.4 256 45.25 251.1 45.25C246.46 45.25 242.37 46.3 238.84 48.4C235.31 50.5 232.55 53.46 230.56 57.27C228.57 61.08 227.58 65.57 227.58 70.74C227.58 75.53 228.59 79.76 230.62 83.44C232.65 87.12 235.47 89.99 239.09 92.07C242.71 94.14 246.91 95.18 251.7 95.18C256.49 95.18 260.42 94 264.2 91.63C267.98 89.26 270.78 85.95 272.59 81.69L262.17 78.54C261.15 80.73 259.7 82.4 257.81 83.55C255.93 84.7 253.69 85.28 251.09 85.28C247.06 85.28 244 83.97 241.89 81.34C240.24 79.28 239.25 76.54 238.89 73.15H273.11C273.52 67.49 272.89 62.57 271.23 58.39C269.57 54.22 267.02 50.98 263.59 48.69H263.6ZM251.53 54.49C255.36 54.49 258.16 55.67 259.94 58.04C261.2 59.72 262.02 62.11 262.4 65.18H239.16C239.64 62.45 240.55 60.22 241.9 58.5C244 55.83 247.21 54.49 251.53 54.49Z",
  p21d0f200: "M319.33 54.05C317.78 50.93 315.41 48.68 312.21 47.31C309.01 45.94 305.31 45.25 301.11 45.25C295.53 45.25 291.1 46.46 287.82 48.89C284.53 51.31 282.31 54.52 281.14 58.52L290.77 61.54C291.56 59.12 292.94 57.41 294.93 56.42C296.92 55.43 298.97 54.93 301.1 54.93C304.63 54.93 307.14 55.7 308.63 57.25C309.87 58.54 310.57 60.43 310.76 62.9C308.86 63.18 306.99 63.45 305.19 63.71C302.2 64.13 299.42 64.59 296.87 65.09C294.31 65.59 292.09 66.14 290.19 66.76C287.68 67.61 285.64 68.69 284.06 70.02C282.48 71.35 281.31 72.93 280.56 74.75C279.8 76.58 279.42 78.63 279.42 80.9C279.42 83.5 280.03 85.88 281.24 88.04C282.45 90.2 284.24 91.93 286.61 93.23C288.97 94.53 291.86 95.18 295.28 95.18C299.54 95.18 303.1 94.38 305.94 92.79C308.13 91.57 310.11 89.8 311.87 87.49V93.86H321.11V64.82C321.11 62.78 321.02 60.89 320.85 59.15C320.67 57.41 320.16 55.71 319.32 54.05H319.33ZM309.6 78.93C309.25 80.01 308.57 81.16 307.56 82.39C306.55 83.62 305.2 84.65 303.51 85.5C301.82 86.35 299.77 86.77 297.38 86.77C295.71 86.77 294.32 86.51 293.2 85.98C292.08 85.45 291.22 84.75 290.64 83.86C290.06 82.97 289.76 81.94 289.76 80.77C289.76 79.75 289.99 78.86 290.44 78.1C290.89 77.34 291.54 76.67 292.39 76.09C293.24 75.51 294.27 75 295.5 74.56C296.75 74.15 298.2 73.78 299.84 73.44C301.47 73.1 303.43 72.75 305.71 72.37C307.16 72.13 308.82 71.86 310.64 71.57C310.62 72.37 310.59 73.28 310.55 74.32C310.48 76.06 310.16 77.6 309.61 78.94L309.6 78.93Z",
  p362f2000: "M374.37 57.21C373.73 55.17 372.74 53.24 371.39 51.43C370.05 49.62 368.24 48.13 365.96 46.96C363.68 45.79 360.79 45.21 357.29 45.21C352.85 45.21 349.12 46.18 346.08 48.12C344.45 49.16 343.04 50.4 341.83 51.83V46.56H332.41V93.86H343.1V69.55C343.1 66.66 343.42 64.29 344.06 62.43C344.7 60.58 345.56 59.12 346.62 58.05C347.68 56.98 348.88 56.23 350.19 55.79C351.5 55.35 352.83 55.13 354.18 55.13C356.69 55.13 358.68 55.67 360.16 56.75C361.64 57.83 362.74 59.21 363.49 60.89C364.24 62.57 364.71 64.31 364.91 66.12C365.11 67.93 365.22 69.58 365.22 71.07V93.84H375.91V67.43C375.91 66.29 375.81 64.81 375.62 62.98C375.43 61.16 375.01 59.22 374.37 57.18V57.21Z",
  p2f58340: "M429.25 62.77C427.47 61.52 425.62 60.54 423.69 59.84C421.76 59.14 420.03 58.59 418.48 58.18L407.18 55.03C405.75 54.65 404.34 54.18 402.95 53.61C401.56 53.04 400.4 52.27 399.47 51.29C398.54 50.31 398.07 49.05 398.07 47.5C398.07 45.87 398.62 44.43 399.71 43.21C400.8 41.98 402.25 41.04 404.05 40.38C405.84 39.72 407.79 39.41 409.9 39.44C412.06 39.5 414.1 39.94 416.01 40.75C417.92 41.57 419.54 42.76 420.87 44.32C422.2 45.88 423.1 47.77 423.56 49.99L434.9 48.02C433.96 44.14 432.36 40.82 430.08 38.08C427.8 35.34 424.97 33.24 421.58 31.79C418.19 30.34 414.34 29.61 410.02 29.58C405.76 29.55 401.88 30.22 398.39 31.59C394.9 32.96 392.13 35.03 390.07 37.79C388.01 40.55 386.98 43.96 386.98 48.02C386.98 50.79 387.44 53.12 388.36 55.01C389.28 56.89 390.46 58.44 391.91 59.65C393.35 60.86 394.89 61.81 396.51 62.5C398.13 63.19 399.64 63.73 401.04 64.14L417.33 68.96C418.5 69.31 419.53 69.73 420.42 70.21C421.31 70.69 422.04 71.22 422.61 71.81C423.18 72.4 423.61 73.06 423.9 73.8C424.19 74.55 424.34 75.35 424.34 76.23C424.34 78.19 423.72 79.84 422.48 81.18C421.24 82.52 419.63 83.54 417.64 84.25C415.65 84.95 413.54 85.3 411.29 85.3C407.49 85.3 404.14 84.28 401.24 82.23C398.33 80.19 396.41 77.3 395.48 73.56L384.53 75.22C385.17 79.34 386.68 82.89 389.06 85.88C391.44 88.87 394.48 91.17 398.17 92.78C401.86 94.39 406.02 95.19 410.63 95.19C413.87 95.19 416.97 94.78 419.94 93.96C422.9 93.14 425.54 91.92 427.84 90.28C430.14 88.64 431.98 86.59 433.34 84.13C434.7 81.66 435.38 78.79 435.38 75.52C435.38 72.25 434.8 69.77 433.65 67.72C432.5 65.68 431.03 64.03 429.25 62.77Z",
  p7f53600: "M458.72 33.43H448.21V46.57H439.63V54.85H448.21V74.56C448.21 77.25 448.24 79.66 448.3 81.79C448.36 83.92 448.93 86.01 450.01 88.05C451.24 90.3 453.03 91.94 455.4 92.98C457.77 94.02 460.44 94.57 463.44 94.64C466.43 94.71 469.49 94.46 472.62 93.87V85.02C469.67 85.46 467.04 85.57 464.74 85.37C462.44 85.17 460.75 84.19 459.7 82.44C459.15 81.54 458.85 80.37 458.8 78.94C458.75 77.51 458.73 75.85 458.73 73.95V54.86H472.61V46.58H458.73V33.44L458.72 33.43Z",
  p6365c00: "M520.08 54.05C518.53 50.93 516.16 48.68 512.96 47.31C509.76 45.94 506.06 45.25 501.86 45.25C496.28 45.25 491.85 46.46 488.57 48.89C485.28 51.31 483.06 54.52 481.89 58.52L491.52 61.54C492.31 59.12 493.69 57.41 495.68 56.42C497.67 55.43 499.72 54.93 501.85 54.93C505.38 54.93 507.89 55.7 509.38 57.25C510.62 58.54 511.32 60.43 511.51 62.9C509.61 63.18 507.74 63.45 505.94 63.71C502.95 64.13 500.17 64.59 497.62 65.09C495.06 65.59 492.84 66.14 490.94 66.76C488.43 67.61 486.39 68.69 484.81 70.02C483.23 71.35 482.07 72.93 481.31 74.75C480.55 76.58 480.17 78.63 480.17 80.9C480.17 83.5 480.78 85.88 481.99 88.04C483.2 90.2 484.99 91.93 487.35 93.23C489.72 94.53 492.61 95.18 496.02 95.18C500.28 95.18 503.84 94.38 506.68 92.79C508.87 91.57 510.85 89.8 512.61 87.49V93.86H521.85V64.82C521.85 62.78 521.76 60.89 521.59 59.15C521.41 57.41 520.9 55.71 520.06 54.05H520.08ZM510.35 78.93C510 80.01 509.32 81.16 508.31 82.39C507.3 83.62 505.95 84.65 504.26 85.5C502.57 86.35 500.52 86.77 498.13 86.77C496.47 86.77 495.07 86.51 493.95 85.98C492.83 85.45 491.97 84.75 491.39 83.86C490.81 82.97 490.51 81.94 490.51 80.77C490.51 79.75 490.74 78.86 491.19 78.1C491.64 77.34 492.29 76.67 493.14 76.09C493.99 75.51 495.02 75 496.25 74.56C497.5 74.15 498.95 73.78 500.59 73.44C502.22 73.1 504.18 72.75 506.46 72.37C507.91 72.13 509.57 71.86 511.39 71.57C511.37 72.37 511.34 73.28 511.3 74.32C511.23 76.06 510.91 77.6 510.36 78.94L510.35 78.93Z",
  p394c40c0: "M595.93 54.84V46.56H582.05V33.42H571.54V46.56H562.96V54.84H571.54V74.55C571.54 77.24 571.57 79.65 571.63 81.78C571.69 83.91 572.26 86 573.34 88.04C574.57 90.29 576.36 91.93 578.73 92.97C581.1 94.01 583.77 94.56 586.77 94.63C589.76 94.7 592.82 94.45 595.95 93.86V85.01C593 85.45 590.37 85.56 588.07 85.36C585.77 85.16 584.08 84.18 583.03 82.43C582.48 81.53 582.18 80.36 582.13 78.93C582.08 77.5 582.06 75.84 582.06 73.94V54.85H595.94L595.93 54.84Z",
  p4ba000: "M555.55 46.37C554.06 46.47 552.61 46.75 551.19 47.2C549.77 47.65 548.48 48.27 547.31 49.06C545.94 49.91 544.76 50.98 543.78 52.28C543.34 52.87 542.94 53.49 542.57 54.14V46.57H533.24V93.87H543.84V69.83C543.84 68.02 544.06 66.33 544.5 64.77C544.94 63.21 545.62 61.81 546.54 60.59C547.46 59.36 548.65 58.36 550.11 57.57C551.57 56.69 553.21 56.18 555.04 56.04C556.86 55.89 558.48 56.03 559.88 56.43V46.58C558.48 46.35 557.03 46.28 555.54 46.38L555.55 46.37Z",
} as const;

// --- Mega Menu Data ---
interface MegaMenuGroup {
  heading?: string;
  items: { title: string; desc: string; path: string }[];
}

interface MegaMenuEntry {
  label: string;
  groups: MegaMenuGroup[];
}

const megaMenuData: Record<string, MegaMenuEntry> = {
  Products: {
    label: 'PRODUCTS',
    groups: [
      {
        items: [
          { title: 'CleanStart Images', desc: 'Hardened, zero-CVE base images for production workloads', path: '/products/hardened-images' },
          { title: 'CleanStart SBOM', desc: 'Software Bill of Materials for full supply chain transparency', path: '/products/software-bill-of-materials' },
          { title: 'CleanSight', desc: 'Real-time visibility and intelligence for container security', path: '/products/cleansight-dashboard' },
        ],
      },
    ],
  },
  Solutions: {
    label: 'SOLUTIONS',
    groups: [
      {
        heading: 'Core Capabilities',
        items: [
          { title: 'FIPS Compliance', desc: 'Automated FIPS 140-2/3 compliance for regulated environments', path: '/solutions/fips-compliance' },
          { title: 'Enhance SCA', desc: 'Strengthen Software Composition Analysis with verified data', path: '/solutions/software-composition-analysis' },
          { title: 'Vulnerability Remediation', desc: 'Automated detection and patching of known CVEs', path: '/solutions/vulnerability-remediation' },
          { title: 'Attack Surface Reduction', desc: 'Minimize container footprint for fewer vulnerabilities', path: '/solutions/attack-surface-reduction' },
        ],
      },
      {
        heading: 'Audience',
        items: [
          { title: 'For Developers', desc: 'Secure foundations for fast, confident deployments', path: '/solutions/for-developers' },
          { title: 'For CISO', desc: 'Enterprise-grade security posture and compliance reporting', path: '/solutions/for-ciso' },
        ],
      },
    ],
  },
  Resources: {
    label: 'RESOURCES',
    groups: [
      {
        heading: 'Insights',
        items: [
          { title: 'Blog', desc: 'Latest insights on container security and best practices', path: '/resources/blog' },
          { title: 'Resource Center', desc: 'Whitepapers, guides, and technical documentation', path: '/resources/resource-center' },
          { title: 'Newsroom', desc: 'Press releases, media coverage, and announcements', path: '/resources/newsroom' },
          { title: 'Knowledge Hub', desc: 'In-depth articles and tutorials on cybersecurity', path: '/resources/knowledge-hub' },
        ],
      },
      {
        heading: 'Events',
        items: [
          { title: 'Events', desc: 'Meet us at industry conferences and workshops', path: '/resources/events' },
          { title: 'Podcast', desc: 'The Compliance Maze -- expert discussions on security', path: '/resources/podcast' },
        ],
      },
    ],
  },
  Company: {
    label: 'COMPANY',
    groups: [
      {
        items: [
          { title: 'About Us', desc: "Our mission to secure the world's software supply chain", path: '/company/about' },
          { title: 'Teams', desc: 'The people building the future of container security', path: '/company/team' },
          { title: 'Careers', desc: 'Join our team and help build a more secure future', path: '/company/careers' },
          { title: 'Contact Us', desc: 'Get in touch with our sales and support teams', path: '/company/contact' },
          { title: 'Community', desc: 'Join the clean software movement', path: '/community' },
        ],
      },
    ],
  },
};

const pageLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '#' },
  { label: 'Solutions', path: '#' },
  { label: 'Resources', path: '#' },
  { label: 'Company', path: '#' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Partners', path: '/partners' },
];

// --- NavLogo (transparent/dark background variant using individual SVG paths) ---
function NavLogo({ dark = false }: { dark?: boolean }) {
  const textFill = dark ? '#0f1924' : 'white';
  return (
    <div className="relative w-[126px] h-[26px] shrink-0">
      <div className="absolute inset-0">
        <svg className="absolute" style={{ left: '8.34%', top: '25.9%', width: '12.61px', height: '19.27px' }} fill="none" viewBox="0 0 12.6069 19.2667">
          <path d={LOGO_SVG_PATHS.p33248900} fill="#2CC1EB" />
        </svg>
        <svg className="absolute" style={{ left: '0.29%', top: '0', width: '22.71px', height: '20.76px' }} fill="none" viewBox="0 0 22.7101 20.7634">
          <path d={LOGO_SVG_PATHS.p164f400} fill={dark ? '#0f1924' : 'white'} />
        </svg>
        {[
          { left: '23.22%', top: '23.84%', w: '12.31px', h: '13.81px', vw: 12.3063, vh: 13.8115, p: LOGO_SVG_PATHS.p29578200 },
          { left: '34.74%', top: '23.84%', w: '2.22px', h: '13.53px', vw: 2.21782, vh: 13.534, p: LOGO_SVG_PATHS.p25a63f40 },
          { left: '38.25%', top: '36.59%', w: '9.60px', h: '10.50px', vw: 9.59681, vh: 10.4963, p: LOGO_SVG_PATHS.pfbeab80 },
          { left: '46.9%', top: '36.59%', w: '8.76px', h: '10.50px', vw: 8.76406, vh: 10.4963, p: LOGO_SVG_PATHS.p157f1500 },
          { left: '55.74%', top: '36.55%', w: '9.14px', h: '10.23px', vw: 9.14457, vh: 10.2272, p: LOGO_SVG_PATHS.p2d484200 },
          { left: '64.44%', top: '23.92%', w: '10.69px', h: '13.79px', vw: 10.6897, vh: 13.7927, p: LOGO_SVG_PATHS.p27204200 },
          { left: '73.63%', top: '27.03%', w: '6.94px', h: '12.87px', vw: 6.93515, vh: 12.87, p: LOGO_SVG_PATHS.p2ad29300 },
          { left: '80.4%', top: '36.59%', w: '8.76px', h: '10.50px', vw: 8.76196, vh: 10.4963, p: LOGO_SVG_PATHS.p234fdc80 },
          { left: '89.25%', top: '37.46%', w: '5.60px', h: '9.99px', vw: 5.60026, vh: 9.99267, p: LOGO_SVG_PATHS.p3ffe2d00 },
          { left: '94.21%', top: '27.02%', w: '6.94px', h: '12.87px', vw: 6.93515, vh: 12.87, p: LOGO_SVG_PATHS.p370d8700 },
        ].map((s, i) => (
          <svg key={i} className="absolute" style={{ left: s.left, top: s.top, width: s.w, height: s.h }} fill="none" viewBox={`0 0 ${s.vw} ${s.vh}`}>
            <path d={s.p} fill={textFill} />
          </svg>
        ))}
      </div>
    </div>
  );
}

// --- WhiteBgLogoH (dark logo on white background, full SVG) ---
function WhiteBgLogoH() {
  return (
    <div className="relative size-full">
      <div className="absolute contents inset-0">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 595.95 123.68">
          <g>
            <path d={WHITE_BG_LOGO_PATHS.p29ce6900} fill="#066BEF" />
            <path d={WHITE_BG_LOGO_PATHS.p3fca2280} fill="#08C5F0" />
            <g>
              <path d={WHITE_BG_LOGO_PATHS.p1f572f30} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p2b83b900} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p16f59d00} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p21d0f200} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p362f2000} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p2f58340} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p7f53600} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p6365c00} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p4ba000} fill="#0E0F24" />
              <path d={WHITE_BG_LOGO_PATHS.p394c40c0} fill="#0E0F24" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function ChevronDown({ dark = false, open = false }: { dark?: boolean; open?: boolean }) {
  return (
    <svg
      width="10" height="6" viewBox="0 0 10 6" fill="none"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1L5 5L9 1" stroke={dark ? '#0f1924' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- NavigationMegaMenu (renamed from MegaMenuPanel) ---
function NavigationMegaMenu({ activeItem, onClose }: { activeItem: string; onClose: () => void }) {
  const data = megaMenuData[activeItem];
  if (!data) return null;

  return (
    <motion.div
      className="absolute top-full left-0 right-0 z-[60] pt-2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onMouseLeave={onClose}
    >
      <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
        <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
          <div className="flex min-h-[340px]">
            {/* Left: Pages column */}
            <div className="w-[200px] shrink-0 bg-gray-50/80 border-r border-gray-100 py-6 px-6">
              <p className="font-['Google_Sans',sans-serif] font-semibold text-[11px] text-[#06c7f2] tracking-[1.5px] uppercase mb-4">
                Pages
              </p>
              <nav className="flex flex-col gap-1">
                {pageLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.path}
                    className={`font-['Google_Sans',sans-serif] text-[14px] py-1.5 rounded-md transition-colors no-underline ${
                      link.label === activeItem
                        ? 'text-[#056bf1] font-semibold'
                        : 'text-[#181818] hover:text-[#056bf1] font-normal'
                    }`}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Middle: Category content with groups */}
            <div className="flex-1 py-6 px-8 overflow-y-auto">
              {data.groups.map((group, gi) => (
                <div key={gi} className={gi > 0 ? 'mt-6' : ''}>
                  {group.heading && (
                    <p className="font-['Google_Sans',sans-serif] font-semibold text-[11px] text-[#06c7f2] tracking-[1.5px] uppercase mb-3">
                      {group.heading}
                    </p>
                  )}
                  {!group.heading && gi === 0 && (
                    <p className="font-['Google_Sans',sans-serif] font-semibold text-[11px] text-[#06c7f2] tracking-[1.5px] uppercase mb-3">
                      {data.label}
                    </p>
                  )}
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.path}
                        className="group flex flex-col gap-0.5 py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors no-underline"
                        onClick={onClose}
                      >
                        <span className="font-['Google_Sans',sans-serif] font-semibold text-[18px] text-[#181818] group-hover:text-[#056bf1] transition-colors">
                          {item.title}
                        </span>
                        <span className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-gray-500">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: CTA card */}
            <div className="w-[260px] shrink-0 p-6 flex items-start">
              <div className="bg-[#f8f9fa] rounded-[16px] border border-gray-100 p-5 flex flex-col gap-4 w-full">
                <div className="bg-[#06c7f2]/10 w-10 h-10 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L12.09 7.26L18 8.27L13.82 12.14L14.94 18L10 15.27L5.06 18L6.18 12.14L2 8.27L7.91 7.26L10 2Z" fill="#06c7f2" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] text-[#181818] mb-1.5">
                    Ready to Get Started?
                  </h4>
                  <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] text-gray-500 leading-relaxed">
                    Discover how CleanStart can transform your container security and eliminate vulnerabilities at the source.
                  </p>
                </div>
                <CallToActionButton label="Book a Demo" variant="dark" size="sm" href="/book-demo" fullWidth />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- MobileNavigationDrawer (renamed from MobileMenu) ---
function MobileNavigationDrawer({ onClose }: { onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <motion.div
      className="lg:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[80vh]"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <div className="px-4 py-4 flex flex-col">
        {Object.keys(megaMenuData).map((label) => (
          <div key={label} className="border-b border-gray-50">
            <button
              className="flex items-center justify-between w-full py-3.5 font-['Google_Sans',sans-serif] font-semibold text-[15px] text-[#0f1924] cursor-pointer"
              onClick={() => setExpandedItem(expandedItem === label ? null : label)}
            >
              {label}
              <ChevronDown dark open={expandedItem === label} />
            </button>
            <AnimatePresence>
              {expandedItem === label && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pb-3 pl-2 flex flex-col gap-1">
                    {megaMenuData[label].groups.map((group, gi) => (
                      <div key={gi}>
                        {group.heading && (
                          <p className="font-['Google_Sans',sans-serif] font-semibold text-[11px] text-[#06c7f2] tracking-[1.5px] uppercase mt-2 mb-1 px-3">
                            {group.heading}
                          </p>
                        )}
                        {group.items.map((item) => (
                          <Link key={item.title} href={item.path} className="py-2 px-3 rounded-lg hover:bg-gray-50 block no-underline" onClick={onClose}>
                            <p className="font-['Google_Sans',sans-serif] font-semibold text-[14px] text-[#181818]">{item.title}</p>
                            <p className="font-['Google_Sans',sans-serif] text-[12px] text-gray-500">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {[
          { label: 'Pricing', path: '/pricing' },
          { label: 'Partners', path: '/partners' },
        ].map((item) => (
          <Link key={item.label} href={item.path} className="py-3.5 font-['Google_Sans',sans-serif] font-semibold text-[15px] text-[#0f1924] border-b border-gray-50 no-underline" onClick={onClose}>
            {item.label}
          </Link>
        ))}
        <div className="mt-4">
          <CallToActionButton label="Book a Demo" variant="mobile-dark" size="md" href="/book-demo" fullWidth />
        </div>
      </div>
    </motion.div>
  );
}

// --- SiteHeader (renamed from Navbar) ---
export function SiteHeader({ forceWhite = false }: { forceWhite?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoveredItem(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWhite = forceWhite || scrolled;
  const dark = isWhite;

  const handleItemEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoveredItem(label);
  }, []);

  const handleItemLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
  }, []);

  const handleMenuClose = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const dropdownLabels = ['Products', 'Solutions', 'Resources', 'Company'];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
        isWhite
          ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onMouseLeave={() => {
        handleItemLeave();
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-[50px] py-4 md:py-[20px] max-w-[1440px] mx-auto">
        <Link href="/">
          {dark ? (
            <div className="w-[126px] h-[26px] shrink-0">
              <WhiteBgLogoH />
            </div>
          ) : (
            <NavLogo dark={false} />
          )}
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {dropdownLabels.map((label) => (
            <button
              key={label}
              className={`flex items-center gap-1.5 px-3.5 py-[7px] rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[13px] tracking-[-0.3px] transition-colors cursor-pointer ${
                dark
                  ? hoveredItem === label
                    ? 'text-[#056bf1] bg-blue-50'
                    : 'text-[#0f1924] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              onMouseEnter={() => handleItemEnter(label)}
            >
              {label}
              <ChevronDown dark={dark} open={hoveredItem === label} />
            </button>
          ))}
          {[
            { label: 'Pricing', path: '/pricing' },
            { label: 'Partners', path: '/partners' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className={`px-3.5 py-[7px] rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[13px] tracking-[-0.3px] transition-colors cursor-pointer no-underline ${
                dark ? 'text-[#0f1924] hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onMouseEnter={() => {
                if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                setHoveredItem(null);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <CallToActionButton label="Book a Demo" variant="dark" size="md" href="/book-demo" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${dark ? 'bg-[#0f1924]' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${dark ? 'bg-[#0f1924]' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${dark ? 'bg-[#0f1924]' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {hoveredItem && megaMenuData[hoveredItem] && (
          <NavigationMegaMenu
            key={hoveredItem}
            activeItem={hoveredItem}
            onClose={handleMenuClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileNavigationDrawer onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
