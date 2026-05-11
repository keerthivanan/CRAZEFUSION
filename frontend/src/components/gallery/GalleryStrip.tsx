"use client";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/reactbits/CircularGallery"), { ssr: false });

const ITEMS = [
  { image: "/dome-images/np-cars/0001_bugatti.webp",                         text: "Bugatti" },
  { image: "/dome-images/kc-movies/3333_iron_man_3_poster.webp",             text: "Iron Man" },
  { image: "/dome-images/kc-anime/2969_naruto_poster.webp",                  text: "Naruto" },
  { image: "/dome-images/kc-music/3898_the_weeknd_poster.webp",              text: "The Weeknd" },
  { image: "/dome-images/np-cars/0065_lamborghini_aventado.webp",            text: "Lamborghini" },
  { image: "/dome-images/kc-football-posters/3193_messi_world_cup_champion_poster.webp", text: "Messi" },
  { image: "/dome-images/kc-gaming/4257_half_life_2_poster.webp",            text: "Half-Life 2" },
  { image: "/dome-images/kc-trippy/3947_psychedelic_trippy_aesthetic_wall_poster.webp", text: "Psychedelic" },
  { image: "/dome-images/kc-tv-shows/930_peaky_blinders_poster_tv_show_poster.webp", text: "Peaky Blinders" },
  { image: "/dome-images/np-cars/0073_ferrari_sports_car.webp",              text: "Ferrari" },
  { image: "/dome-images/kc-music/3578_beyonce_poster.webp",                 text: "Beyoncé" },
  { image: "/dome-images/kc-movies/3229_deadpool_2_poster_1.webp",           text: "Deadpool" },
  { image: "/dome-images/kc-anime/194_demon_slayer_poster_anime_poster.webp",text: "Demon Slayer" },
  { image: "/dome-images/kc-wanderlust/1081_big_ben_london_poster.webp",     text: "London" },
  { image: "/dome-images/kc-football-posters/3169_kylian_mbappe_1998_forward_poster.webp", text: "Mbappé" },
  { image: "/dome-images/np-cars/0081_porsche_911_car.webp",                 text: "Porsche 911" },
  { image: "/dome-images/kc-tv-shows/932_game_of_thrones_poster_tv_show_poster.webp", text: "Game of Thrones" },
  { image: "/dome-images/kc-music/619_kendrick_lamar_poster_music_poster.webp", text: "Kendrick Lamar" },
];

export default function GalleryStrip() {
  return (
    <section style={{ background: "#080808", padding: "60px 0 0" }}>
      <div style={{ height: 500, position: "relative" }}>
        <CircularGallery
          items={ITEMS}
          bend={2}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={3}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
}
