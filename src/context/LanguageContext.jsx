import { createContext, useContext, useState, useEffect } from "react";

const translations = {
    id: {
        // Navbar
        navProjects: "Proyek",
        navAbout: "Tentang",
        navProcess: "Proses",
        navContact: "Kontak",
        navHireMe: "Hire Me",

        // Hero
        heroEyebrow: "Mahasiswa Pendidikan Teknologi Informasi · UNESA",
        heroTitle1: "Menciptakan",
        heroTitle2: "Inovasi Digital",
        heroTitle3: "Berdampak.",
        heroDesc: "Saya membantu mengubah ide menjadi produk web, mobile, Web3, dan AI agent yang benar-benar dipakai orang — dari sketsa awal sampai aplikasi siap rilis. Buat saya, kode yang baik adalah yang menyelesaikan masalah nyata, bukan sekadar berjalan.",
        heroCtaProj: "Lihat Proyek",
        heroCtaContact: "Mari Ngobrol",
        heroBadge: "Terbuka untuk proyek baru",
        heroStat1: "Tahun Exp",
        heroStat2: "Semester",
        heroStat3: "Hackathon",
        heroExplore: "Explore Projects",

        // About
        aboutLabel: "Tentang",
        aboutTitle1: "Kode yang",
        aboutTitle2: "bicara sendiri.",
        aboutP1: `<strong style="color: #14120e; font-weight: 600">Indra Bachtiar Zakaria</strong> — Mahasiswa aktif Program Studi Pendidikan Teknologi Informasi di <strong style="color: #14120e; font-weight: 600">Universitas Negeri Surabaya (UNESA)</strong>, saat ini menempuh semester 4. Dengan latar belakang di IT, saya memiliki ketertarikan kuat dalam pengembangan solusi teknologi inovatif dan berdampak nyata.`,
        aboutP2: `Selama setahun terakhir, saya aktif berpartisipasi dalam berbagai kompetisi <strong style="color: #14120e; font-weight: 600">hackathon</strong>. Pengalaman ini telah mempertajam pikiran kritis saya, keterampilan kolaborasi tim, serta kemampuan merancang dan mengeksekusi ide secara cepat di bawah tekanan waktu.`,
        aboutP3: `Kompetisi tersebut memperkuat tidak hanya keterampilan teknis saya, tetapi juga <strong style="color: #14120e; font-weight: 600">soft skills</strong> seperti problem-solving, komunikasi, dan adaptabilitas. Saya berkomitmen penuh untuk terus berkembang dan siap berkontribusi unggul di dunia teknologi melalui jalur akademik maupun kompetitif.`,
        aboutRole: "Mahasiswa PTI",
        aboutAvailable: "Siap Belajar",
        aboutSkills: "Skills & Tools",

        // Process
        processLabel: "Cara Kerja",
        processTitle1: "Dari Ide Menjadi",
        processTitle2: "Solusi Nyata.",
        processDesc: "Setiap proyek saya kerjakan dengan alur yang jelas — dari menggali akar masalah sampai menguji solusinya langsung ke pengguna. Cara kerja inilah yang membuat saya tetap bisa diandalkan, bahkan di bawah tekanan deadline hackathon.",

        // Projects
        projectsLabel: "Portofolio",
        projectsTitle1: "Kerja",
        projectsTitle2: "Nyata.",
        filterAll: "Semua",
        filterWeb: "Web",
        filterMobile: "Mobile",
        filterDesktop: "Desktop",
        caseStudy: "Lihat Studi Kasus",
        visitApp: "Kunjungi WENWORK App",
        visitPonyin: "Kunjungi PONYIN",
        visitGithub: "Lihat Repository GitHub",
        techStack: "Tech Stack",
        payment: "Pembayaran",
        platform: "Platform",

        // Testimonials
        testiLabel: "Klien",
        testiTitle1: "Dipercaya untuk",
        testiTitle2: "membangun yang nyata.",
        testiClientName: "Komunitas Ponyin",
        testiClientRole: "Trading Intel Hub · ponyin.id",
        testiClientQuote: "Indra berhasil menerjemahkan kebutuhan komunitas kami yang cukup kompleks menjadi platform yang benar-benar enak dipakai. Desainnya bersih, navigasinya intuitif, dan AI assistant-nya jadi nilai lebih yang tidak kami sangka sebelumnya. Kerja sama yang menyenangkan.",

        // Contact
        contactLabel: "Kontak",
        contactTitle1: "Ada proyek",
        contactTitle2: "menarik?",
        contactDesc: "Punya ide atau proyek yang ingin diwujudkan? Ceritakan saja — saya senang mendengar hal baru dan biasanya membalas dalam 24 jam. Tidak ada ide yang terlalu kecil untuk didiskusikan.",
        contactEmail: "Email",
        contactLocation: "Lokasi",
        contactLocationVal: "Kediri, Indonesia",
        contactAvailability: "Availability",
        contactAvailabilityVal: "Open for work",
        formName: "Nama",
        formEmail: "Email",
        formProject: "Jenis Proyek",
        formSelect: "Pilih jenis...",
        formOther: "Lainnya",
        formMessage: "Pesan",
        formMessagePlaceholder: "Ceritakan tentang proyek Anda...",
        formSubmit: "Kirim Pesan",
        contactSuccess: "Pesan Terkirim!",
        contactSuccessMsg: "Saya akan menghubungi Anda dalam 24 jam.",

        // WhatsApp Template
        waGreeting: "Halo Indra, saya tertarik untuk berdiskusi lebih lanjut.",
        waName: "Nama",
        waEmail: "Email",
        waProject: "Jenis Proyek",
        waMessage: "Pesan",

        // Footer
        footerCrafted: "Crafted with precision.",
        footerBack: "Back to Top ↑",
    },
    en: {
        // Navbar
        navProjects: "Projects",
        navAbout: "About",
        navProcess: "Process",
        navContact: "Contact",
        navHireMe: "Hire Me",

        // Hero
        heroEyebrow: "Information Technology Education Student · UNESA",
        heroTitle1: "Creating",
        heroTitle2: "Impactful",
        heroTitle3: "Digital Innovations.",
        heroDesc: "I help turn ideas into web, mobile, Web3, and AI agent products that people genuinely use — from first sketch to launch-ready app. To me, good code is code that solves a real problem, not just code that runs.",
        heroCtaProj: "View Projects",
        heroCtaContact: "Let's Talk",
        heroBadge: "Open for new projects",
        heroStat1: "Years Exp",
        heroStat2: "Semesters",
        heroStat3: "Hackathons",
        heroExplore: "Explore Projects",

        // About
        aboutLabel: "About",
        aboutTitle1: "Code that",
        aboutTitle2: "speaks for itself.",
        aboutP1: `<strong style="color: #14120e; font-weight: 600">Indra Bachtiar Zakaria</strong> — Active Information Technology Education student at <strong style="color: #14120e; font-weight: 600">Universitas Negeri Surabaya (UNESA)</strong>, currently in my 4th semester. With an IT background, I have a profound interest in developing innovative and impactful tech solutions.`,
        aboutP2: `Over the past year, I have actively participated in various <strong style="color: #14120e; font-weight: 600">hackathons</strong>. This experience has sharpened my critical thinking, team collaboration, and ability to quickly design and execute ideas under time pressure.`,
        aboutP3: `These competitions strengthened not only my technical skills but also my <strong style="color: #14120e; font-weight: 600">soft skills</strong> such as problem-solving, communication, and adaptability. I am fully committed to growing continuously and making exceptional contributions to the tech world.`,
        aboutRole: "IT Student",
        aboutAvailable: "Ready to Learn",
        aboutSkills: "Skills & Tools",

        // Process
        processLabel: "Process",
        processTitle1: "From Idea to",
        processTitle2: "Working Solution.",
        processDesc: "I work through every project with a clear rhythm — from digging into the root problem to testing the solution with real users. It's the way of working that keeps me dependable, even under hackathon-deadline pressure.",

        // Projects
        projectsLabel: "Portfolio",
        projectsTitle1: "Real",
        projectsTitle2: "Work.",
        filterAll: "All",
        filterWeb: "Web",
        filterMobile: "Mobile",
        filterDesktop: "Desktop",
        caseStudy: "View Case Study",
        visitApp: "Visit WENWORK App",
        visitPonyin: "Visit PONYIN",
        visitGithub: "View GitHub Repository",
        techStack: "Tech Stack",
        payment: "Payment",
        platform: "Platform",

        // Testimonials
        testiLabel: "Clients",
        testiTitle1: "Trusted to",
        testiTitle2: "build something real.",
        testiClientName: "Ponyin Community",
        testiClientRole: "Trading Intel Hub · ponyin.id",
        testiClientQuote: "Indra managed to translate our fairly complex community needs into a platform that's genuinely enjoyable to use. The design is clean, the navigation is intuitive, and the AI assistant turned out to be an unexpected highlight. A great collaboration overall.",

        // Contact
        contactLabel: "Contact",
        contactTitle1: "Got an interesting",
        contactTitle2: "project?",
        contactDesc: "Have an idea or project you'd like to bring to life? Just tell me about it — I love hearing new ideas and usually reply within 24 hours. No idea is too small to talk through.",
        contactEmail: "Email",
        contactLocation: "Location",
        contactLocationVal: "Kediri, Indonesia",
        contactAvailability: "Availability",
        contactAvailabilityVal: "Open for work",
        formName: "Name",
        formEmail: "Email",
        formProject: "Project Type",
        formSelect: "Select type...",
        formOther: "Other",
        formMessage: "Message",
        formMessagePlaceholder: "Tell me about your project...",
        formSubmit: "Send Message",
        contactSuccess: "Message Sent!",
        contactSuccessMsg: "I will get back to you within 24 hours.",

        // WhatsApp Template
        waGreeting: "Hello Indra, I am interested in discussing further.",
        waName: "Name",
        waEmail: "Email",
        waProject: "Project Type",
        waMessage: "Message",

        // Footer
        footerCrafted: "Crafted with precision.",
        footerBack: "Back to Top ↑",
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState("id");

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) setLang(savedLang);
    }, []);

    const toggleLang = () => {
        const newLang = lang === "id" ? "en" : "id";
        setLang(newLang);
        localStorage.setItem("lang", newLang);
    };

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
