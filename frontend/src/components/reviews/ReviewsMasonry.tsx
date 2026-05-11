"use client";
import dynamic from "next/dynamic";
import type { MasonryItem } from "@/components/reactbits/Masonry";

const Masonry = dynamic(() => import("@/components/reactbits/Masonry"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

// 40 posters spread across categories — varied heights for natural masonry look
const ITEMS: MasonryItem[] = [
  { id: "1",  img: "/dome-images/np-cars/0001_bugatti.webp",                          url: "/collection/car-posters",    height: 580 },
  { id: "2",  img: "/dome-images/kc-movies/3333_iron_man_3_poster.webp",              url: "/collection/movies",         height: 480 },
  { id: "3",  img: "/dome-images/kc-anime/2969_naruto_poster.webp",                   url: "/collection/anime",          height: 560 },
  { id: "4",  img: "/dome-images/kc-music/3898_the_weeknd_poster.webp",               url: "/collection/music",          height: 500 },
  { id: "5",  img: "/dome-images/np-cars/0065_lamborghini_aventado.webp",             url: "/collection/car-posters",    height: 520 },
  { id: "6",  img: "/dome-images/kc-football-posters/3193_messi_world_cup_champion_poster.webp", url: "/collection/football", height: 560 },
  { id: "7",  img: "/dome-images/kc-gaming/4257_half_life_2_poster.webp",             url: "/collection/gaming",         height: 480 },
  { id: "8",  img: "/dome-images/kc-trippy/3947_psychedelic_trippy_aesthetic_wall_poster.webp",  url: "/collection/trippy", height: 540 },
  { id: "9",  img: "/dome-images/kc-tv-shows/930_peaky_blinders_poster_tv_show_poster.webp", url: "/collection/tv-shows", height: 500 },
  { id: "10", img: "/dome-images/np-cars/0073_ferrari_sports_car.webp",               url: "/collection/car-posters",    height: 520 },
  { id: "11", img: "/dome-images/kc-music/3578_beyonce_poster.webp",                  url: "/collection/music",          height: 560 },
  { id: "12", img: "/dome-images/kc-movies/3229_deadpool_2_poster_1.webp",            url: "/collection/movies",         height: 480 },
  { id: "13", img: "/dome-images/kc-anime/194_demon_slayer_poster_anime_poster.webp", url: "/collection/anime",          height: 540 },
  { id: "14", img: "/dome-images/kc-wanderlust/1081_big_ben_london_poster.webp",      url: "/collection/wanderlust",     height: 500 },
  { id: "15", img: "/dome-images/kc-football-posters/3169_kylian_mbappe_1998_forward_poster.webp", url: "/collection/football", height: 560 },
  { id: "16", img: "/dome-images/np-cars/0081_porsche_911_car.webp",                  url: "/collection/car-posters",    height: 480 },
  { id: "17", img: "/dome-images/kc-tv-shows/932_game_of_thrones_poster_tv_show_poster.webp", url: "/collection/tv-shows", height: 520 },
  { id: "18", img: "/dome-images/kc-music/619_kendrick_lamar_poster_music_poster.webp", url: "/collection/music",        height: 560 },
  { id: "19", img: "/dome-images/kc-gaming/4272_shadow_of_the_colossus_poster.webp",  url: "/collection/gaming",         height: 500 },
  { id: "20", img: "/dome-images/kc-art/249_caf_terrace_at_night_vincent_van_gogh_art_poster.webp", url: "/collection/art", height: 540 },
  { id: "21", img: "/dome-images/kc-movies/3504_thor_the_dark_world_poster.webp",     url: "/collection/movies",         height: 480 },
  { id: "22", img: "/dome-images/kc-sneakerhead/661_sneakerhead_art_poster.webp",     url: "/collection/sneakerhead",    height: 520 },
  { id: "23", img: "/dome-images/np-anime/0001.webp",                                 url: "/collection/anime",          height: 560 },
  { id: "24", img: "/dome-images/kc-football-posters/3147_erling_haaland_2000_poster.webp", url: "/collection/football", height: 500 },
  { id: "25", img: "/dome-images/np-cars/0097_mclaren_supercar.webp",                 url: "/collection/car-posters",    height: 540 },
  { id: "26", img: "/dome-images/kc-cyberpunk-vaporwave/1047_vaporwave_city_poster.webp", url: "/collection/cyberpunk",  height: 480 },
  { id: "27", img: "/dome-images/kc-music/3684_green_day_poster.webp",                url: "/collection/music",          height: 560 },
  { id: "28", img: "/dome-images/kc-tv-shows/912_breaking_bad_poster_tv_show_poster.webp", url: "/collection/tv-shows", height: 520 },
  { id: "29", img: "/dome-images/kc-vintage/1077_vintage_cinema_poster.webp",         url: "/collection/vintage",        height: 500 },
  { id: "30", img: "/dome-images/kc-anime/200_death_note_anime_poster.webp",          url: "/collection/anime",          height: 540 },
  { id: "31", img: "/dome-images/kc-gaming/453_gta_gaming_poster.webp",               url: "/collection/gaming",         height: 480 },
  { id: "32", img: "/dome-images/kc-movies/3462_the_gray_man_poster.webp",            url: "/collection/movies",         height: 520 },
  { id: "33", img: "/dome-images/np-cars/0161_koenigsegg_car.webp",                   url: "/collection/car-posters",    height: 560 },
  { id: "34", img: "/dome-images/kc-k-pop/464_bts_wall_poster_k_pop_poster_bts_poster.webp", url: "/collection/k-pop", height: 500 },
  { id: "35", img: "/dome-images/kc-football-posters/3209_ronaldinho_football_icon_poster.webp", url: "/collection/football", height: 540 },
  { id: "36", img: "/dome-images/kc-music/3855_roddy_ricch_poster.webp",              url: "/collection/music",          height: 480 },
  { id: "37", img: "/dome-images/kc-trippy/902_trippy_art_poster_neon_green.webp",    url: "/collection/trippy",         height: 520 },
  { id: "38", img: "/dome-images/kc-tv-shows/918_friends_poster_tv_show_poster.webp", url: "/collection/tv-shows",       height: 560 },
  { id: "39", img: "/dome-images/np-cars/0185_ford_mustang_car.webp",                 url: "/collection/car-posters",    height: 500 },
  { id: "40", img: "/dome-images/kc-movies/3271_friends_1994_6_poster.webp",          url: "/collection/movies",         height: 540 },
];

export default function ReviewsMasonry() {
  return (
    <section style={{ background: "var(--c-bg)", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 12 }}>
              Our Collection
            </p>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--c-text)", margin: 0 }}>
              609+<br />
              <span style={{ color: "#7c3aed" }}>Designs</span>
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32, paddingBottom: 8 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FH, fontSize: 56, fontWeight: 900, letterSpacing: "-0.04em", color: "var(--c-text)", lineHeight: 1 }}>4.8</div>
              <div style={{ display: "flex", gap: 3, justifyContent: "flex-end", margin: "6px 0 4px" }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#7c3aed", fontSize: 18 }}>★</span>)}
              </div>
              <div style={{ fontFamily: FB, fontSize: 11, color: "var(--c-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>2,400+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Masonry grid */}
        <Masonry
          items={ITEMS}
          ease="power3.out"
          duration={0.6}
          stagger={0.04}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
          colorShiftOnHover={false}
        />

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <a href="/collection" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "16px 40px",
            background: "var(--c-btn-bg)", color: "var(--c-btn-text)",
            fontFamily: FB, fontSize: 12, fontWeight: 800,
            letterSpacing: "0.14em", textTransform: "uppercase",
            textDecoration: "none", borderRadius: 50,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; }}>
            Browse Full Collection →
          </a>
        </div>

      </div>
    </section>
  );
}
