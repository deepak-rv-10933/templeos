/**
 * Central image registry (real photos from Wikimedia Commons, CC-licensed).
 * Kept in one place so a future Catalyst migration can point these at Stratus
 * URLs without touching db.ts. <SmartImage> renders any URL as a lazy <img>.
 */

/** Home-page cover: aerial view of the Srirangam Rajagopuram over the temple
 *  town (Wikimedia Commons, CC-licensed). */
export const homeCover =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Aerial_view_of_Sri_Rangam_temple_near_Tiruchirapalli_1.jpg/1920px-Aerial_view_of_Sri_Rangam_temple_near_Tiruchirapalli_1.jpg';

export const heroes: Record<string, string> = {
  "t-meenakshi": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg",
  "t-brihadeeswarar": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg",
  "t-ramanathaswamy": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ramanathaswamy_temple7.JPG/1280px-Ramanathaswamy_temple7.JPG",
  "t-ranganathaswamy": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Ranganathaswamy_temple_tiruchirappalli.jpg/1280px-Ranganathaswamy_temple_tiruchirappalli.jpg",
  "t-palani": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Palanihills.JPG/1280px-Palanihills.JPG",
  "t-kapaleeshwarar": "https://upload.wikimedia.org/wikipedia/commons/9/99/Kapaleeswarar1.jpg",
  "t-ekambareswarar": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ekambareswarar5.jpg/1280px-Ekambareswarar5.jpg",
  "t-nataraja": "https://upload.wikimedia.org/wikipedia/commons/4/44/Le_temple_de_Shiva_Nataraja_%28Chidambaram%2C_Inde%29_%2814037020332%29.jpg",
  "t-thiruchendur": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Thiruchendur11.jpg/1280px-Thiruchendur11.jpg",
  "t-suryanar": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Suryanar_Koil_in_Tamil_Nadu_JEG6875.jpg/1280px-Suryanar_Koil_in_Tamil_Nadu_JEG6875.jpg",
  "t-swamimalai": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Swamimalai_Murugan_Temple.jpg/1280px-Swamimalai_Murugan_Temple.jpg",
  "t-thiruthani": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Tiruttani_Murugan_temple.jpg/1280px-Tiruttani_Murugan_temple.jpg",
  "t-pazhamudircholai": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Pazhamuthir_solai_Murugan_1.JPG/1280px-Pazhamuthir_solai_Murugan_1.JPG",
  "t-thiruparankundram": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Thiruparamkundram_%281%29.jpg/1280px-Thiruparamkundram_%281%29.jpg"
};

export const galleries: Record<string, string[]> = {
  "t-meenakshi": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Mariage_of_Shiva_and_Parvati_%28Meenakshi%29_witnessed_by_Vishnu%2C_Meenakshi_Temple%2C_Madurai_%282%29_%2836857653813%29.jpg/1280px-Mariage_of_Shiva_and_Parvati_%28Meenakshi%29_witnessed_by_Vishnu%2C_Meenakshi_Temple%2C_Madurai_%282%29_%2836857653813%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madurai_Meenakshi_Temple_painting.JPG/500px-Madurai_Meenakshi_Temple_painting.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Figures_with_Pigeons_-_Ivory_Sculpture_-_Sri_Meenakshi-Sundareshwarar_Temple_-_Madurai_-_India.JPG/1280px-Figures_with_Pigeons_-_Ivory_Sculpture_-_Sri_Meenakshi-Sundareshwarar_Temple_-_Madurai_-_India.JPG"
  ],
  "t-brihadeeswarar": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Brihadisvara_Temple_-_Thanjavur_peruvudaiyar_kovil_ttkcvrvb122k23iph_%28747%29.jpg/1280px-Brihadisvara_Temple_-_Thanjavur_peruvudaiyar_kovil_ttkcvrvb122k23iph_%28747%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Raraja_detail.png/330px-Raraja_detail.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Brihadisvara_Temple%2C_Thanjavur_by_William_Hodges.jpg/500px-Brihadisvara_Temple%2C_Thanjavur_by_William_Hodges.jpg"
  ],
  "t-ramanathaswamy": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/East_Gopura_of_Rameswaram_Temple.jpg/1280px-East_Gopura_of_Rameswaram_Temple.jpg"
  ],
  "t-ranganathaswamy": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Aerial_view_of_Sri_Rangam_temple_near_Tiruchirapalli_1.jpg/1280px-Aerial_view_of_Sri_Rangam_temple_near_Tiruchirapalli_1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Sri_Ranganathaswamy_Temple%2C_dedicated_to_Vishnu%2C_in_Srirangam%2C_near_Tiruchirappali_%2859%29_%2823660014378%29.jpg/1280px-Sri_Ranganathaswamy_Temple%2C_dedicated_to_Vishnu%2C_in_Srirangam%2C_near_Tiruchirappali_%2859%29_%2823660014378%29.jpg"
  ],
  "t-palani": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Palani_temple_%281%29.jpg/1280px-Palani_temple_%281%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tamil_Inscriptions_Pazhani.jpg/1280px-Tamil_Inscriptions_Pazhani.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Pazhani_Pillar1.jpg/1280px-Pazhani_Pillar1.jpg"
  ],
  "t-kapaleeshwarar": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mylapore_Kapaleeshwarar_temple_facade.jpg/1280px-Mylapore_Kapaleeshwarar_temple_facade.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kapalisvar_temple_festival_in_mayilai_circa_1940.jpg/330px-Kapalisvar_temple_festival_in_mayilai_circa_1940.jpg"
  ],
  "t-ekambareswarar": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ekambareswarar4.jpg/1280px-Ekambareswarar4.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ekambareswarar15.jpg/1280px-Ekambareswarar15.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ekambareswarar11.jpg/1280px-Ekambareswarar11.jpg"
  ],
  "t-nataraja": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Natarajartemple1.jpg/1280px-Natarajartemple1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/1800-1850_photograph_of_Chidambaram_Nataraja_temple%2C_Sivaganga_pool_and_northern_gopuram.jpg/500px-1800-1850_photograph_of_Chidambaram_Nataraja_temple%2C_Sivaganga_pool_and_northern_gopuram.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Nataraja01.jpg/1280px-Nataraja01.jpg"
  ],
  "t-thiruchendur": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Muruga_defeats_Surapadman.jpg/330px-Muruga_defeats_Surapadman.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Tiruchendur-Temple-Painting-Panel-1.jpg/1280px-Tiruchendur-Temple-Painting-Panel-1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Thiruchendur_Temple_Rajagopuram.JPG/1280px-Thiruchendur_Temple_Rajagopuram.JPG"
  ],
  "t-suryanar": [],
  "t-swamimalai": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Swamymalai_tirukovil.jpg/1280px-Swamymalai_tirukovil.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Swamimalaimuruga2.jpg/1280px-Swamimalaimuruga2.jpg"
  ],
  "t-thiruthani": [],
  "t-pazhamudircholai": [],
  "t-thiruparankundram": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Muruga_defeats_Surapadman.jpg/330px-Muruga_defeats_Surapadman.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Tirupparamkundram_Murugan_temple_gopuram.jpg/1280px-Tirupparamkundram_Murugan_temple_gopuram.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Thiruparamkundram_%2829%29.jpg/1280px-Thiruparamkundram_%2829%29.jpg"
  ]
};

export const festivalImages: Record<string, string> = {
  "fes-chithirai": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg",
  "fes-panguni": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Palanihills.JPG/1280px-Palanihills.JPG",
  "fes-arudra": "https://upload.wikimedia.org/wikipedia/commons/4/44/Le_temple_de_Shiva_Nataraja_%28Chidambaram%2C_Inde%29_%2814037020332%29.jpg",
  "fes-vaikunta": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Ranganathaswamy_temple_tiruchirappalli.jpg/1280px-Ranganathaswamy_temple_tiruchirappalli.jpg"
};

export const routeImages: Record<string, string> = {
  "r-arupadai": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Palanihills.JPG/1280px-Palanihills.JPG",
  "r-navagraha": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Suryanar_Koil_in_Tamil_Nadu_JEG6875.jpg/1280px-Suryanar_Koil_in_Tamil_Nadu_JEG6875.jpg",
  "r-chola": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg"
};

export const renovationImages: Record<string, string> = {
  "rp-nataraja": "https://upload.wikimedia.org/wikipedia/commons/4/44/Le_temple_de_Shiva_Nataraja_%28Chidambaram%2C_Inde%29_%2814037020332%29.jpg",
  "rp-ekambareswarar": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ekambareswarar5.jpg/1280px-Ekambareswarar5.jpg"
};

export const feedMedia: Record<string, string[]> = {
  "u1": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg"
  ],
  "u4": [
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Le_temple_de_Shiva_Nataraja_%28Chidambaram%2C_Inde%29_%2814037020332%29.jpg"
  ],
  "u6": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Mariage_of_Shiva_and_Parvati_%28Meenakshi%29_witnessed_by_Vishnu%2C_Meenakshi_Temple%2C_Madurai_%282%29_%2836857653813%29.jpg/1280px-Mariage_of_Shiva_and_Parvati_%28Meenakshi%29_witnessed_by_Vishnu%2C_Meenakshi_Temple%2C_Madurai_%282%29_%2836857653813%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madurai_Meenakshi_Temple_painting.JPG/500px-Madurai_Meenakshi_Temple_painting.JPG"
  ]
};
