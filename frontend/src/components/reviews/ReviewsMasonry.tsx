"use client";
import dynamic from "next/dynamic";
import type { MasonryItem } from "@/components/reactbits/Masonry";

const Masonry = dynamic(() => import("@/components/reactbits/Masonry"), { ssr: false });

// Compact heights → desktop ~220–280px tall, all 28 images visible without scrolling through huge cards
const ITEMS: MasonryItem[] = [
  { id:"1",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp", url:"/product/2811", height:560 },
  { id:"2",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973792/crazefusion/originals/movies/1107_Joker_Why_so_Serious_Poster.webp",                   url:"/product/1107", height:500 },
  { id:"3",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973794/crazefusion/originals/movies/2795_The_Batman_in_the_Rain_Poster.webp",                   url:"/product/2795", height:600 },
  { id:"4",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973741/crazefusion/originals/car-posters/2971_Aston_Martin_DB11_Roadster_Poster.webp",           url:"/product/2971", height:520 },
  { id:"5",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973792/crazefusion/originals/movies/1106_John_Wick_GTA_Poster.webp",                           url:"/product/1106", height:480 },
  { id:"6",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973741/crazefusion/originals/car-posters/2972_Aston_Martin_DBS_Superleggera_Poster.webp",       url:"/product/2972", height:580 },
  { id:"7",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973794/crazefusion/originals/movies/2794_The_Amazing_Spider-Man_Collage_Poster.webp",           url:"/product/2794", height:520 },
  { id:"8",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973740/crazefusion/originals/car-posters/2876_2005_Ford_GT_Supercar_Poster.webp",               url:"/product/2876", height:540 },
  { id:"9",  img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973792/crazefusion/originals/movies/2792_Joker_Put_on_a_Happy_Face_Poster.webp",               url:"/product/2792", height:480 },
  { id:"10", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973741/crazefusion/originals/car-posters/2970_Aspark_Owl_Sports_Car_Poster.webp",               url:"/product/2970", height:560 },
  { id:"11", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973790/crazefusion/originals/movies/1105_Baby_Groot_Working_Out_Poster.webp",                   url:"/product/1105", height:500 },
  { id:"12", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973739/crazefusion/originals/car-posters/2812_Porsche_911_Turbo_S_Collage_Poster.webp",         url:"/product/2812", height:560 },
  { id:"13", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973794/crazefusion/originals/movies/2796_John_Wick_It_Wasn_t_Just_a_Dog_Poster.webp",           url:"/product/2796", height:520 },
  { id:"14", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973740/crazefusion/originals/car-posters/2963_Acura_NSX_Coastal_Drive_Poster.webp",             url:"/product/2963", height:480 },
  { id:"15", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973796/crazefusion/originals/movies/2797_Rocky_A_Million-To-One_Shot_Poster.webp",              url:"/product/2797", height:580 },
  { id:"16", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973743/crazefusion/originals/car-posters/2973_Aston_Martin_One-77_Roadster_Poster.webp",         url:"/product/2973", height:540 },
  { id:"17", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973794/crazefusion/originals/movies/2793_Scream_Everybody_s_a_Suspect_Poster.webp",             url:"/product/2793", height:500 },
  { id:"18", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973739/crazefusion/originals/car-posters/2813_Porsche_918_Spyder_Poster.webp",                   url:"/product/2813", height:560 },
  { id:"19", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973796/crazefusion/originals/movies/2802_Hunter_Games_Poster.webp",                             url:"/product/2802", height:520 },
  { id:"20", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973741/crazefusion/originals/car-posters/2968_Arash_AF10_Supercar_Poster.webp",                 url:"/product/2968", height:600 },
  { id:"21", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973796/crazefusion/originals/movies/3127_2_Guns_Movie_Poster.webp",                             url:"/product/3127", height:480 },
  { id:"22", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973739/crazefusion/originals/car-posters/2814_Porsche_911_Vintage_Car_Poster.webp",             url:"/product/2814", height:540 },
  { id:"23", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973796/crazefusion/originals/movies/3128_2_Hearts_Movie_Poster.webp",                           url:"/product/3128", height:560 },
  { id:"24", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973792/crazefusion/originals/movies/2783_The_End_of_The_Fucking_World_Poster.webp",             url:"/product/2783", height:500 },
  { id:"25", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973741/crazefusion/originals/car-posters/2966_Apollo_Intensa_Emozione_Poster.webp",             url:"/product/2966", height:520 },
  { id:"26", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973743/crazefusion/originals/car-posters/2976_Aston_Martin_V12_Vantage_Poster.webp",             url:"/product/2976", height:560 },
  { id:"27", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973796/crazefusion/originals/movies/3129_6_Underground_Poster.webp",                             url:"/product/3129", height:480 },
  { id:"28", img:"https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973740/crazefusion/originals/car-posters/2964_Acura_NSX_Sports_Car_Poster.webp",               url:"/product/2964", height:580 },
];

export default function ReviewsMasonry() {
  return (
    <section style={{ background: "var(--c-bg)", padding: "80px 0 100px", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom: 52, flexWrap:"wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--c-text-muted)", marginBottom:12, fontFamily:"'Poppins',sans-serif" }}>
              Our Collection
            </p>
            <h2 style={{ fontSize:"clamp(40px, 5vw, 80px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--c-text)", margin:0, fontFamily:"'Epilogue',sans-serif" }}>
              609+<br/>
              <span>Designs</span>
            </h2>
          </div>
          <div style={{ textAlign:"right", paddingBottom:8 }}>
            <div style={{ fontSize:60, fontWeight:900, letterSpacing:"-0.04em", color:"var(--c-text)", lineHeight:1, fontFamily:"'Epilogue',sans-serif" }}>4.8</div>
            <div style={{ display:"flex", gap:3, justifyContent:"flex-end", margin:"6px 0 4px" }}>
              {[...Array(5)].map((_,i) => <span key={i} style={{ color:"var(--c-text)", fontSize:18 }}>★</span>)}
            </div>
            <div style={{ fontSize:11, color:"var(--c-text-muted)", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif" }}>2,400+ Reviews</div>
          </div>
        </div>

        {/* Masonry */}
        <Masonry
          items={ITEMS}
          ease="power3.out"
          duration={0.6}
          stagger={0.025}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
          colorShiftOnHover={false}
        />

        {/* CTA */}
        <div style={{ textAlign:"center", marginTop:64 }}>
          <a href="/collection" style={{
            display:"inline-flex", alignItems:"center", gap:8,
            padding:"16px 44px",
            background:"var(--c-btn-bg)", color:"var(--c-btn-text)",
            fontSize:12, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
            textDecoration:"none", borderRadius:50,
            boxShadow:"0 8px 32px rgba(0,0,0,0.15)",
            transition:"transform 0.2s, box-shadow 0.2s",
            fontFamily:"'Poppins',sans-serif",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.25)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.15)"; }}>
            Browse Full Collection →
          </a>
        </div>

      </div>
    </section>
  );
}
