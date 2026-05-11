"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const DomeGallery = dynamic(() => import("@/components/reactbits/DomeGallery"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

// 332 images — 50% keerthicollections (premium aesthetic) + 50% newposters
const IMAGES = [
  { src: "/dome-images/kc-art/1024_the_mona_lisa_art_poster_leonardo_da_vinci.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/202_the_mona_lisa_art_poster_leonardo_da_vinci.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/213_william_morris_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/224_william_morris_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/235_japanese_set_of_12_photocards.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/246_vase_with_fifteen_sunflowers_vincent_van_gogh_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/257_vincent_van_gogh_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/268_vincent_van_gogh_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/279_pablo_picasso_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/290_pablo_picasso_art_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/301_gustav_klimt_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/312_claude_monet_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/323_the_parc_monceau_1878_by_claude_monet_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/3981_leonardo_da_vinci_virgin_of_the_rocks_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/3993_vincent_van_gogh_church_at_auvers_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-anime/194_demon_slayer_poster_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/195_hunter_x_hunter_poster_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/196_tokyo_ghoul_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/197_my_neighbour_totoro_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/198_my_hero_academia_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/199_jojo_s_bizzare_adventure_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/200_death_note_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/201_kakegurui_anime_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/2959_goku_with_arms_crossed_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/2965_kawai_on_the_street_senpai_in_the_sheets_culture_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/2967_attack_on_titan_sasha_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-anime/2969_naruto_poster.webp", alt: "Anime" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1046_game_over_vaporwave_poster_cyberpunk_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1047_vaporwave_city_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1048_do_you_want_to_escape_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1049_vaporwave_japanese_wave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1050_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1051_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1052_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/1053_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/434_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-cyberpunk-vaporwave/435_vaporwave_poster.webp", alt: "Cyberpunk" },
  { src: "/dome-images/kc-trippy/1113_trippy_are_you_lost_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/2929_trippy_rick_and_morty_poster_art.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/3957_psychedelic_trippy_aesthetic_wall_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/715_psychedelic_optical_illustion_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/731_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/747_psychedelic_optical_illustion_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/764_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/780_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/796_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/813_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/829_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/845_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/862_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/878_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/894_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-astronomy/1034_space_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/1103_astronomy_moodboard_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/2808_saturn_and_its_rings_december_1874_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/329_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/340_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/352_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/363_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/374_orrery_with_a_view_of_the_solar_system_in_the_back_groun.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/385_the_seasons_1850_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-astronomy/396_astronomy_poster.webp", alt: "Astronomy" },
  { src: "/dome-images/kc-car-posters/2811_porsche_911_turbo_marlboro_edition_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/2968_arash_af10_supercar_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/2992_bugatti_chiron_super_sport_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3040_dodge_viper_acr_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3050_ferrari_f8_tributo_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3059_koenigsegg_agera_rs_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3068_lamborghini_diablo_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3078_lotus_evora_gt_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3087_mclaren_f1_supercar_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3097_noble_m600_sports_car_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3106_porsche_911_sport_classic_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3116_ssc_tuatara_supercar_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-wanderlust/1000_the_mount_everest_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4017_amsterdam_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4040_bucharest_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4063_dubai_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4087_innsbruck_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4114_luxembourg_city_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4139_naples_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4164_saint_barthelemy_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4190_tartu_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4215_yogyakarta_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-vintage/1063_vintage_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/1068_vintage_poster_have_a_nice_weekend.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/1074_vintage_poster_classic_cars_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/941_vintage_diner_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/947_vintage_phone_booth_london_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/952_vintage_astronaut_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/958_vintage_circus_sign_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/963_vintage_retro_party_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/969_vintage_advertisement_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/974_vintage_advertisement_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-botanical/408_butterflies_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/410_butterflies_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/412_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/414_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/416_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/418_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/420_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/422_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/424_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/426_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-sneakerhead/1111_sneakerhead_moodboard_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/2788_air_jordan_1_chicago_off_white_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/665_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/671_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/677_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/683_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/689_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/695_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/701_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/707_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-zodiac/1012_aries_zodiac_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1013_taurus_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1014_gemini_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1015_cancer_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1016_leo_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1017_virgo_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1018_scorpio_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1019_sagittarius_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1020_capricorn_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1021_aquarius_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1022_pisces_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-zodiac/1023_libra_zodiac_sign_poster.webp", alt: "Zodiac" },
  { src: "/dome-images/kc-k-pop/1058_bts_face_yourself_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/2891_love_yourself_and_dream_big_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4306_moonlight_babe_in_korean_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4313_saranghae_korean_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4321_k_pop_aesthetic_moodboard_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4329_i_want_ramen_korean_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4336_suga_constellation_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/466_bts_bangtan_ot7_inspired_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/473_bts_suga_inspired_art_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/480_j_hope_bts_inspired_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-indie-aesthetics/3890_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-indie-aesthetics/3929_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-indie-aesthetics/3930_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-indie-aesthetics/3931_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-indie-aesthetics/3933_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-indie-aesthetics/3935_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-indie-aesthetics/3936_indie_aesthetic_wall_poster.webp", alt: "Indie" },
  { src: "/dome-images/kc-moodboard-aesthetics/4298_blue_sea_aesthetic_moodboard_poster.webp", alt: "Moodboard" },
  { src: "/dome-images/kc-moodboard-aesthetics/4299_brown_quotes_aesthetic_moodboard_poster.webp", alt: "Moodboard" },
  { src: "/dome-images/kc-moodboard-aesthetics/4301_pink_pastel_aesthetic_moodboard_poster.webp", alt: "Moodboard" },
  { src: "/dome-images/kc-football-posters/3136_achraf_hakimi_1998_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3140_cristiano_ronaldo_1985_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3147_erling_haaland_2000_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3157_jude_bellingham_2023_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3169_kylian_mbappe_1998_forward_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3183_marcus_rashford_1997_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3193_messi_world_cup_champion_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3203_phil_foden_2000_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3209_ronaldinho_football_icon_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3218_virgil_van_dijk_portrait_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-movies/1105_baby_groot_working_out_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3174_avengers_endgame_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3237_doctor_strange_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3283_godzilla_king_of_monsters_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3329_insurgent_movie_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3377_mib_international_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3425_star_wars_the_rise_of_skywalker_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3471_the_lost_city_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3519_wonder_woman_1984_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/543_ready_player_one_poster_movie_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-music/1108_music_nirvana_moodboard_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3582_beyonce_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3628_drake_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3675_future_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3721_juice_wrld_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3770_lil_nas_x_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3816_nas_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3863_selena_gomez_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3910_travis_scott_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/614_astro_world_poster_music_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-random-aesthetics/2815_abstract_art_with_checkered_patterns_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2822_believe_in_yourself_darling_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2830_yellow_smiley_face_pattern_background_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2838_red_hearts_and_black_rays_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2846_flaming_heart_with_an_eye_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4134_random_aesthetics_wall_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4219_random_aesthetics_wall_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4228_yellow_aesthetic_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/np-cars/0001_bugatti.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0009_lamborghini.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0017_porsche.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0025_mercedes_slr.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0033_audi_rs6.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0041_toyota_supra.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0050_bugatti_chiron_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0057_bugatti_chiron_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0065_lamborghini_aventado.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0073_ferrari_sports_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0081_porsche_911_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0089_porsche_911_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0097_mclaren_supercar.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0105_aston_martin_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0113_rolls_royce_luxury_c.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0121_bentley_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0129_bentley_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0137_mercedes_amg_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0145_bmw_m_series_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0153_audi_r8_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0161_koenigsegg_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0169_koenigsegg_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0177_dodge_challenger_mus.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0185_ford_mustang_car.webp", alt: "Cars" },
  { src: "/dome-images/np-cars/0193_chevrolet_corvette_c.webp", alt: "Cars" },
  { src: "/dome-images/np-anime/0001.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0010.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0018.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0027.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0037.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0045.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0052.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0062.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0073.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0084.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0094.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0104.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0114.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/0126.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/from_aesthetic_002.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/from_artists_0077_drake.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/from_artists_0087_drake.webp", alt: "Anime" },
  { src: "/dome-images/np-anime/from_artists_0106_prince.webp", alt: "Anime" },
  { src: "/dome-images/np-movies/0001.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0006.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0013.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0019.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0024.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0030.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0036.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0042.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0047.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0053.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0059.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0064.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0071.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0077.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0083.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0088.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0094.webp", alt: "Movies" },
  { src: "/dome-images/np-movies/0100.webp", alt: "Movies" },
  { src: "/dome-images/np-music/0002.webp", alt: "Music" },
  { src: "/dome-images/np-music/0009.webp", alt: "Music" },
  { src: "/dome-images/np-music/0017.webp", alt: "Music" },
  { src: "/dome-images/np-music/0026.webp", alt: "Music" },
  { src: "/dome-images/np-music/0034.webp", alt: "Music" },
  { src: "/dome-images/np-music/0043.webp", alt: "Music" },
  { src: "/dome-images/np-music/0051.webp", alt: "Music" },
  { src: "/dome-images/np-music/0059.webp", alt: "Music" },
  { src: "/dome-images/np-music/0068.webp", alt: "Music" },
  { src: "/dome-images/np-music/0077.webp", alt: "Music" },
  { src: "/dome-images/np-music/0085.webp", alt: "Music" },
  { src: "/dome-images/np-music/0093.webp", alt: "Music" },
  { src: "/dome-images/np-music/0102.webp", alt: "Music" },
  { src: "/dome-images/np-music/0111.webp", alt: "Music" },
  { src: "/dome-images/np-music/0121.webp", alt: "Music" },
  { src: "/dome-images/np-astronomy/0002.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0011.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0021.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0031.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0040.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0052.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0062.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0071.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0081.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0091.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0101.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0111.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0121.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0130.webp", alt: "Astronomy" },
  { src: "/dome-images/np-astronomy/0141.webp", alt: "Astronomy" },
  { src: "/dome-images/np-nature/0002.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0006.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0011.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0016.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0022.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0027.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0031.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0036.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0041.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0046.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0052.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0056.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0061.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0066.webp", alt: "Nature" },
  { src: "/dome-images/np-nature/0071.webp", alt: "Nature" },
  { src: "/dome-images/np-real-artists/from_artists_0002_billie_eilish.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0009_taylor_swift.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0016_taylor_swift.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0023_travis_scott.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0029_tupac.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0044_ariana_grande.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0051_kurt_cobain.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0058_dua_lipa.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0064_tyler_creator.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0075_kendrick_lamar.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0094_bob_marley.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0112_tyler_the_creator.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0133_rolling_stones.webp", alt: "Artists" },
  { src: "/dome-images/np-real-artists/from_artists_0160_camila_cabello.webp", alt: "Artists" },
  { src: "/dome-images/np-gaming/0002.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0007.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0013.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0018.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0023.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0028_gta_6.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0033_cyberpunk_2077.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0038_elden_ring.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0044_elden_ring.webp", alt: "Gaming" },
  { src: "/dome-images/np-gaming/0050.webp", alt: "Gaming" },
  { src: "/dome-images/np-wanderlust/0001.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0011.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0022.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0032.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0043.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0054.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0064.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0075.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0085.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-wanderlust/0096.webp", alt: "Wanderlust" },
  { src: "/dome-images/np-f1/0001.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0018_mercedes_amg_f1.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0025_racing_car_speed_blu.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0032_formula_1.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0044_formula_art.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0051_formula_1_racing_c.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0058_f1_car_close_up.webp", alt: "F1" },
  { src: "/dome-images/np-f1/0073_formula_one_car_sp.webp", alt: "F1" },
];

const STATS = [
  { val: "10K+", label: "Customers" },
  { val: "609+", label: "Designs" },
  { val: "48hr", label: "Delivery" },
  { val: "4.8★", label: "Rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      background: "#080808",
    }}>

      <div style={{ position: "absolute", inset: 0 }}>
        <DomeGallery
          images={IMAGES}
          fit={1.05}
          fitBasis="max"
          minRadius={700}
          maxVerticalRotationDeg={40}
          segments={36}
          dragDampening={1.8}
          grayscale={false}
          autoRotate={true}
          autoRotateSpeed={5}
          overlayBlurColor="#080808"
          imageBorderRadius="16px"
          openedImageBorderRadius="16px"
          openedImageWidth="320px"
          openedImageHeight="460px"
        />
      </div>

      {/* Bottom overlay — headline + CTAs + stats */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        zIndex: 10,
        padding: "0 64px 52px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 45%, transparent 100%)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.8s 0.4s",
        pointerEvents: mounted ? "auto" : "none",
      }} className="hero-bottom">

        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.25)",
            borderRadius: 50, padding: "5px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c084fc", display: "inline-block" }} />
            <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
              Premium Wall Art · UK Delivery
            </span>
          </div>

          <h1 style={{
            fontFamily: FH,
            fontSize: "clamp(44px, 5.5vw, 88px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#fff",
            margin: "0 0 28px",
          }}>
            Your Walls<br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>Deserve</span><br />
            The Best
          </h1>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <ClickSpark sparkColor="#c084fc" sparkCount={10} sparkRadius={24}>
              <Link href="/collection" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "15px 34px",
                background: "#fff", color: "#080808",
                fontFamily: FB, fontSize: 12, fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 50,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)"; }}>
                Shop Collection →
              </Link>
            </ClickSpark>

            <Link href="/create" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: FB, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#fff", textDecoration: "none",
              padding: "14px 26px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 50,
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>
              ✦ AI Studio
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "flex-end", paddingBottom: 4 }} className="hero-stats">
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FH, fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: "absolute", top: 90, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center",
        opacity: mounted ? 0.45 : 0, transition: "opacity 1s 1.2s",
        pointerEvents: "none",
      }}>
        <div style={{ fontFamily: FB, fontSize: 10, color: "#fff", letterSpacing: "0.22em", textTransform: "uppercase" }}>Drag to Explore</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-bottom {
            padding: 0 18px 32px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .hero-bottom h1 { font-size: clamp(32px, 8vw, 56px) !important; margin-bottom: 16px !important; }
          .hero-stats { gap: 16px !important; }
          .hero-stats > div > div:first-child { font-size: 20px !important; }
          .hero-stats > div > div:last-child { font-size: 9px !important; }
        }
        @media (max-width: 480px) {
          .hero-bottom { padding: 0 14px 24px !important; }
          .hero-stats { gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
