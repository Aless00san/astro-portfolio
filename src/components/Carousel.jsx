import { useEffect, useRef, useState } from 'preact/hooks';

const logos = [
  {
    name: 'JavaScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Spring',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  },
  {
    name: 'Java',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express.js',
    src: 'https://expressjs.com/images/brand/logo-dark.svg',
  },
  {
    name: 'MongoDB',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'MySQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'Git',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Docker',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Astro',
    src: 'https://astro.build/assets/press/astro-icon-light.svg',
  },
];

export default function Carousel({
  speed = 100 /* px/s, ajustar si quieres más rápido/lento */,
}) {
  const trackRef = useRef(null);
  const styleIdRef = useRef(null); // id para la regla dinámica
  const resizeObsRef = useRef(null);

  // helper: espera a que todas las imágenes del track estén cargadas (o fallen)
  const waitImagesLoaded = container => {
    if (!container) return Promise.resolve();
    const imgs = Array.from(container.querySelectorAll('img'));
    if (imgs.length === 0) return Promise.resolve();

    return Promise.all(
      imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => {
          img.addEventListener('load', res, { once: true });
          img.addEventListener('error', res, { once: true });
        });
      })
    );
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // create unique style element
    const styleEl = document.createElement('style');
    const uniqueId = `carousel-dyn-${Math.random().toString(36).slice(2, 9)}`;
    styleEl.id = uniqueId;
    document.head.appendChild(styleEl);
    styleIdRef.current = uniqueId;

    let raf = null;

    const recalc = async () => {
      await waitImagesLoaded(track);
      const fullWidth = track.scrollWidth;
      const distance = fullWidth / 3;

      const duration = Math.max(4, distance / speed); // mínimo 4s para que no sea demasiado rápido

      styleEl.innerHTML = `
        @keyframes ${uniqueId}-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${Math.round(distance)}px); }
        }
      `;

      track.style.animation = `${uniqueId}-scroll ${duration}s linear infinite`;
      track.style.willChange = 'transform';
    };

    const ro = new ResizeObserver(() => {
      // use RAF to debounce bursts
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => recalc());
    });
    ro.observe(track);
    resizeObsRef.current = ro;

    recalc();
    const onWinResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => recalc());
    };
    window.addEventListener('resize', onWinResize);

    // cleanup
    return () => {
      window.removeEventListener('resize', onWinResize);
      if (resizeObsRef.current) resizeObsRef.current.disconnect();
      if (styleEl && styleEl.parentNode)
        styleEl.parentNode.removeChild(styleEl);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      className='carousel-wrapper'
      onMouseEnter={() => {
        if (trackRef.current)
          trackRef.current.style.animationPlayState = 'paused';
      }}
      onMouseLeave={() => {
        if (trackRef.current)
          trackRef.current.style.animationPlayState = 'running';
      }}
    >
      <div
        className='carousel-track'
        ref={trackRef}
      >
        {[...logos, ...logos].map((tech, i) => (
          <div
            className='carousel-item'
            key={i}
          >
            <img
              src={tech.src}
              alt={tech.name}
            />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .carousel-wrapper { overflow: hidden; width: 100%; }
        .carousel-track { display: flex; gap: 3rem; width: max-content; align-items: center; }
        .carousel-item { flex: 0 0 auto; text-align: center; }
        .carousel-item img { width: 64px; height: 64px; object-fit: contain; transition: transform 0.3s; display: block; }
        .carousel-item span { display: block; margin-top: 0.5rem; font-size: 0.9rem; color: white; font-weight: 500; user-select: none; }
      `}</style>
    </div>
  );
}
