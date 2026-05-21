"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { useTheme } from "@/context/ThemeContext";

const DomeGallery = dynamic(() => import("@/components/reactbits/DomeGallery"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

// 357 images — keerthicollections aesthetic (no zodiac) + newposters cars & anime only
const IMAGES = [
  { src: "/dome-images/kc-art/1024_the_mona_lisa_art_poster_leonardo_da_vinci.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/1032_claude_monet_s_water_lilies_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/208_william_morris_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/216_william_morris_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/224_william_morris_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/233_cherry_blossom_set_of_12_photocards.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/241_leonardo_da_vinci_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/249_caf_terrace_at_night_vincent_van_gogh_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/257_vincent_van_gogh_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/265_vincent_van_gogh_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/274_vincent_van_gogh_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/282_pablo_picasso_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/290_pablo_picasso_art_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/298_gustav_klimt_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/306_flower_market_paris_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/314_claude_monet_inspired_painting_art_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/323_the_parc_monceau_1878_by_claude_monet_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/3978_leonardo_da_vinci_lady_with_an_ermine_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/3987_pablo_picasso_the_old_guitarist_poster.webp", alt: "Fine Art" },
  { src: "/dome-images/kc-art/3995_vincent_van_gogh_portrait_of_dr_gachet_poster.webp", alt: "Fine Art" },
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
  { src: "/dome-images/kc-trippy/2921_purple_and_gold_optical_illusion_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/2930_meditating_under_the_earth_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/3947_psychedelic_trippy_aesthetic_wall_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/3960_psychedelic_trippy_aesthetic_wall_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/3982_psychedelic_trippy_aesthetic_wall_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/718_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/727_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/736_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/744_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/753_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/762_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/771_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/779_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/788_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/797_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/806_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/814_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/823_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/832_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/841_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/849_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/858_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/867_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/876_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/884_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/893_trippy_art_poster.webp", alt: "Trippy" },
  { src: "/dome-images/kc-trippy/902_trippy_art_poster_neon_green.webp", alt: "Trippy" },
  { src: "/dome-images/kc-car-posters/2811_porsche_911_turbo_marlboro_edition_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/2963_acura_nsx_coastal_drive_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/2971_aston_martin_db11_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/2981_audi_r8_v10_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3015_bugatti_veyron_supercar_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3040_dodge_viper_acr_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3045_ferrari_812_superfast_car_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3052_ferrari_sf90_stradale_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3057_hennessey_venom_gt_car_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3063_koenigsegg_one1_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3068_lamborghini_diablo_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3074_lamborghini_sesto_elemento_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3079_lykan_hypersport_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3085_mclaren_artura_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3092_mclaren_speedtail_hypercar_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3097_noble_m600_sports_car_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3103_pagani_zonda_r_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3108_porsche_911_turbo_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3114_porsche_cayman_gt4_rs_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-car-posters/3119_tvr_sagaris_roadster_poster.webp", alt: "Cars" },
  { src: "/dome-images/kc-wanderlust/1000_the_mount_everest_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/1081_big_ben_london_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4025_beirut_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4040_bucharest_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4056_cusco_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4072_ghent_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4087_innsbruck_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4104_la_paz_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4122_maputo_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4139_naples_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4155_queenstown_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4172_san_juan_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4190_tartu_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/4206_venice_travel_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-wanderlust/984_machu_picchu_poster.webp", alt: "Wanderlust" },
  { src: "/dome-images/kc-vintage/1063_vintage_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/1066_vintage_poster_to_mars_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/1070_vintage_poster_car_service_sign_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/1074_vintage_poster_classic_cars_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/1077_vintage_cinema_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/943_vintage_fight_for_space_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/947_vintage_phone_booth_london_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/950_ice_cream_sign_vintage_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/954_vintage_drink_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/958_vintage_circus_sign_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/961_when_life_gives_you_lemons_vintage_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/965_vintage_movie_thriller_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/969_vintage_advertisement_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/972_vintage_advertisement_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-vintage/976_vintage_advertisement_poster.webp", alt: "Vintage" },
  { src: "/dome-images/kc-botanical/408_butterflies_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/409_butterflies_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/411_butterflies_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/413_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/415_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/416_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/418_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/420_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/422_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/423_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/425_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-botanical/427_flower_poster_botanical_poster.webp", alt: "Botanical" },
  { src: "/dome-images/kc-sneakerhead/1111_sneakerhead_moodboard_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/2786_kiss_my_airs_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/661_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/665_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/669_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/673_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/677_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/681_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/685_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/689_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/693_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/697_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/701_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/705_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-sneakerhead/709_sneakerhead_art_poster.webp", alt: "Sneakerhead" },
  { src: "/dome-images/kc-k-pop/1058_bts_face_yourself_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/1062_bt21_bts_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/2894_bangtan_june_2011_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4306_moonlight_babe_in_korean_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4311_euphoria_definition_in_korean_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4316_korean_drama_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4321_k_pop_aesthetic_moodboard_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4326_i_m_army_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4331_hey_you_don_t_give_up_korean_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/4336_suga_constellation_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/464_bts_wall_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/468_bts_black_swan_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/473_bts_suga_inspired_art_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/477_bts_your_eyes_tell_inspired_poster_k_pop_poster_bts_post.webp", alt: "K-Pop" },
  { src: "/dome-images/kc-k-pop/482_kim_namjoon_poster_k_pop_poster_bts_poster.webp", alt: "K-Pop" },
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
  { src: "/dome-images/kc-football-posters/3139_bukayo_saka_2001_arsenal_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3141_david_beckham_portrait_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3147_erling_haaland_2000_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3156_joshua_kimmich_1995_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3160_karim_benzema_1987_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3169_kylian_mbappe_1998_forward_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3180_marc_andre_ter_stegen_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3189_marquinhos_1994_profile_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3193_messi_world_cup_champion_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3202_neymar_brazilian_footballer_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3205_robert_lewandowski_1988_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3209_ronaldinho_football_icon_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3213_vinicius_jr_2022_portrait_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-football-posters/3222_yamal_fc_barcelona_forward_poster.webp", alt: "Football" },
  { src: "/dome-images/kc-movies/1105_baby_groot_working_out_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3137_300_rise_of_an_empire_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3168_astronaut_in_field_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3196_black_beauty_rider_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3229_deadpool_2_poster_1.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3250_escape_plan_movie_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3271_friends_1994_6_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3291_greenland_family_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3312_hotel_transylvania_2_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3333_iron_man_3_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3354_karate_kid_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3377_mib_international_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3400_secrets_of_dumbledore_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3421_spy_kids_all_the_time_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3442_the_equalizer_ii_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3462_the_gray_man_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3483_the_office_2005_5_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3504_thor_the_dark_world_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/3527_xxx_return_of_xander_cage_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/527_san_andreas_movie_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/547_ant_man_movie_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-movies/567_the_wolverine_poster_movie_poster.webp", alt: "Movies" },
  { src: "/dome-images/kc-music/1108_music_nirvana_moodboard_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3557_alicia_keys_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3578_beyonce_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3599_childish_gambino_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3620_demi_lovato_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3642_ed_sheeran_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3663_foo_fighters_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3684_green_day_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3705_janet_jackson_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3726_justin_timberlake_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3749_kehlani_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3770_lil_nas_x_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3791_macklemore_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3812_nas_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3834_post_malone_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3855_roddy_ricch_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3876_t_i_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3898_the_weeknd_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/3919_usher_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/598_nothing_bruno_major_poster_music_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/619_kendrick_lamar_poster_music_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-music/640_adore_you_harry_styles_poster_music_poster.webp", alt: "Music" },
  { src: "/dome-images/kc-random-aesthetics/2815_abstract_art_with_checkered_patterns_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2818_you_are_stronger_than_you_think_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2822_believe_in_yourself_darling_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2825_i_do_what_i_want_cat_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2829_checkmate_i_couldn_t_lose_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2832_i_just_want_to_feel_good_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2836_bam_pow_yeah_and_ha_ha_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2839_888_balance_everything_is_falling_into_place_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2843_don_t_touch_my_phone_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/2846_flaming_heart_with_an_eye_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4089_random_aesthetics_wall_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4123_random_aesthetics_wall_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4167_random_aesthetics_wall_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4200_random_aesthetics_wall_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4221_purple_aesthetic_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4225_aesthetic_colourful_dust_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4230_red_flower_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-random-aesthetics/4233_spring_moodboard_poster.webp", alt: "Aesthetic" },
  { src: "/dome-images/kc-gaming/2849_bowling_pins_and_ball_strike_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4237_age_of_empires_ii_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4241_bioshock_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4245_civilization_v_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4249_doom_1993_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4253_final_fantasy_vii_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4257_half_life_2_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4260_horizon_zero_dawn_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4264_minecraft_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4268_portal_2_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4272_shadow_of_the_colossus_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4276_super_mario_64_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4280_the_legend_of_zelda_breath_of_the_wild_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/4284_uncharted_4_a_thief_s_end_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/437_it_s_game_time_gaming_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/441_no_game_no_life_gaming_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/445_sorry_i_m_late_i_had_to_save_a_checkpoint_gaming_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/449_play_gaming_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/453_gta_gaming_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-gaming/457_kratos_gaming_poster.webp", alt: "Gaming" },
  { src: "/dome-images/kc-cute/1044_you_are_my_cup_of_tea_cute_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/1045_follow_your_dreams_cute_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/2790_gudetama_the_lazy_egg_yolk_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3020_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3023_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3025_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3027_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3029_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3030_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3033_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3035_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3037_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/3039_kawaii_aesthetics_wall_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/430_it_s_a_perfect_day_cute_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-cute/432_you_re_a_magical_unicone_cute_poster.webp", alt: "Cute" },
  { src: "/dome-images/kc-tv-shows/911_money_heist_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/912_breaking_bad_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/914_brooklyn_99_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/916_himym_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/918_friends_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/920_mean_girls_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/922_grey_s_anatomy_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/924_gilmore_girls_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/926_13_reasons_why_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/928_the_office_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/930_peaky_blinders_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/932_game_of_thrones_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/934_how_i_met_your_mother_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/936_how_i_met_your_mother_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-tv-shows/938_himym_the_playbook_poster_tv_show_poster.webp", alt: "TV Shows" },
  { src: "/dome-images/kc-polaroids/1529_eiffel_tower_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1533_dubai_skyline_prints_set_of_10.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1537_yellow_abstract_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1541_white_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1545_retro_aesthetics_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1549_vaporwave_statue_aesthetic_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1553_chromatic_aesthetic_prints_set_of_10.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1557_supercars_prints_set_of_13.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1562_dark_night_prints_set_of_10.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1566_cats_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1570_dogs_prints_set_of_13.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1574_lotus_prints_set_of_13.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1578_lightning_prints_set_of_15.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1582_northern_lights_prints_set_of_12.webp", alt: "Polaroid" },
  { src: "/dome-images/kc-polaroids/1586_beach_prints_set_of_12.webp", alt: "Polaroid" },
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
];

const STATS = [
  { val: "10K+", label: "Customers" },
  { val: "609+", label: "Designs" },
  { val: "48hr", label: "Delivery" },
  { val: "4.8★", label: "Rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [segments, setSegments] = useState(36);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Colour scheme switches with theme
  const bg       = isDark ? "#080808" : "#f5f5f5";
  const domeOverlayColor = isDark ? "#080808" : "rgba(245,245,245,0.35)";
  const fade     = isDark ? "8,8,8"   : "245,245,245";
  const textCol  = isDark ? "#fff"    : "#111";
  const textMut  = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)";
  const outlineStroke = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const btnBg    = isDark ? "#fff"    : "#111";
  const btnText  = isDark ? "#080808" : "#fff";
  const outlineBtnColor  = isDark ? "#fff"    : "#111";
  const outlineBtnBorder = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
  const outlineBtnBg     = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";

  useEffect(() => {
    setMounted(true);
    const updateSegments = () => setSegments(window.innerWidth >= 1024 ? 44 : 36);
    updateSegments();
    window.addEventListener('resize', updateSegments);
    // Kick off all image fetches in parallel so the dome is fully populated on first spin
    IMAGES.forEach(img => {
      const i = new Image();
      i.src = img.src;
    });
    return () => window.removeEventListener('resize', updateSegments);
  }, []);

  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      background: bg,
      transition: "background 0.3s",
    }} className="hero-section">

      <div style={{ position: "absolute", inset: 0 }}>
        <DomeGallery
          images={IMAGES}
          fit={0.72}
          fitBasis="width"
          minRadius={640}
          maxRadius={2400}
          maxVerticalRotationDeg={30}
          segments={segments}
          dragDampening={1.8}
          grayscale={false}
          autoRotate={true}
          autoRotateSpeed={5}
          overlayBlurColor={domeOverlayColor}
          imageBorderRadius="8px"
          openedImageBorderRadius="12px"
          openedImageWidth="320px"
          openedImageHeight="460px"
        />
      </div>

      {/* Edge fades — soft in light, stronger in dark */}
      {segments === 44 && <>
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"14%", zIndex:5, background:`linear-gradient(to right, rgba(${fade},${isDark?0.88:0.55}) 0%, transparent 100%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"14%", zIndex:5, background:`linear-gradient(to left, rgba(${fade},${isDark?0.88:0.55}) 0%, transparent 100%)`, pointerEvents:"none" }} />
      </>}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"12%", zIndex:5, background:`linear-gradient(to bottom, rgba(${fade},${isDark?0.88:0.55}) 0%, transparent 100%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"8%", zIndex:5, background:`linear-gradient(to top, rgba(${fade},${isDark?0.55:0.3}) 0%, transparent 100%)`, pointerEvents:"none" }} />

      {/* Bottom overlay — headline + CTAs + stats */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        zIndex: 10,
        padding: "0 64px 52px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        background: `linear-gradient(to top, rgba(${fade},${isDark?0.96:0.82}) 0%, rgba(${fade},${isDark?0.6:0.3}) 42%, transparent 100%)`,
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.8s 0.4s",
        pointerEvents: mounted ? "auto" : "none",
      }} className="hero-bottom">

        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: 50, padding: "5px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: isDark ? "#fff" : "#111", display: "inline-block" }} />
            <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>
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
            color: textCol,
            margin: "0 0 28px",
            transition: "color 0.3s",
          }}>
            Your Walls<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${outlineStroke}` }}>Deserve</span><br />
            The Best
          </h1>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <ClickSpark sparkColor="#fff" sparkCount={10} sparkRadius={24}>
              <Link href="/collection" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "15px 34px",
                background: btnBg, color: btnText,
                fontFamily: FB, fontSize: 12, fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 50,
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"; }}>
                Shop Collection →
              </Link>
            </ClickSpark>

            <Link href="/create" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: FB, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: outlineBtnColor, textDecoration: "none",
              padding: "14px 26px",
              border: `1.5px solid ${outlineBtnBorder}`,
              borderRadius: 50,
              background: outlineBtnBg,
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = outlineBtnBg; e.currentTarget.style.borderColor = outlineBtnBorder; }}>
              ✦ AI Studio
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "flex-end", paddingBottom: 4 }} className="hero-stats">
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FH, fontSize: 26, fontWeight: 900, color: textCol, letterSpacing: "-0.03em", lineHeight: 1, transition: "color 0.3s" }}>{s.val}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: textMut, marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: "absolute", top: 126, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center",
        opacity: mounted ? 0.45 : 0, transition: "opacity 1s 1.2s",
        pointerEvents: "none",
      }}>
        <div style={{ fontFamily: FB, fontSize: 10, color: textCol, letterSpacing: "0.22em", textTransform: "uppercase" }}>Drag to Explore</div>
      </div>

      <style>{`
        .hero-section { height: 100svh; }
        @supports not (height: 100svh) { .hero-section { height: 100vh; } }
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
