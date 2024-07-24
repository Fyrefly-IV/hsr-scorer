import { z } from "zod";

export const StarRailCharacterSchema = z.object({
  id: z.string(),
  portraitPath: z.string().optional(),
  name: z.string(),
  association: z.string().nullish(),
});

export type StarRailCharacter = z.infer<typeof StarRailCharacterSchema>;

export const CHARACTERS: StarRailCharacter[] = [
  {
    id: "firefly",
    name: "Firefly",
    association: "Stellaron Hunters",
    portraitPath: "/img/v4/portraits/1310.webp",
  },
  {
    id: "1005",
    name: "Kafka",
    association: "Stellaron Hunters",
    portraitPath: "/img/v4/portraits/1005.webp",
  },
  {
    id: "1006",
    name: "Silver Wolf",
    association: "Stellaron Hunters",
    portraitPath: "/img/v4/portraits/1006.webp",
  },
  {
    id: "1205",
    name: "Blade",
    association: "Stellaron Hunters",
    portraitPath: "/img/v4/portraits/1205.webp",
  },
  {
    id: "1001",
    name: "March 7th",
    association: "Astral Express",
    portraitPath: "/img/v4/portraits/1001.webp",
  },
  {
    id: "8002",
    name: "Stelle",
    association: "Astral Express",
    portraitPath: "/img/v4/portraits/8002.webp",
  },
  {
    id: "8001",
    name: "Caelus",
    association: "Astral Express",
    portraitPath: "/img/v4/portraits/8001.webp",
  },
  {
    id: "1002",
    name: "Dan Heng",
    association: "Astral Express",
    portraitPath: "/img/v4/portraits/1002.webp",
  },
  {
    id: "1003",
    name: "Himeko",
    association: "Astral Express",
    portraitPath: "/img/v4/portraits/1003.webp",
  },
  {
    id: "1004",
    name: "Welt",
    association: "Astral Express",
    portraitPath: "/img/v4/portraits/1004.webp",
  },
  {
    id: "1101",
    name: "Bronya",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1101.webp",
  },
  {
    id: "1102",
    name: "Seele",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1102.webp",
  },
  {
    id: "1107",
    name: "Clara",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1107.webp",
  },
  {
    id: "1106",
    name: "Pela",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1106.webp",
  },
  {
    id: "1104",
    name: "Gepard",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1104.webp",
  },
  {
    id: "1111",
    name: "Luka",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1111.webp",
  },
  {
    id: "1110",
    name: "Lynx",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1110.webp",
  },
  {
    id: "1105",
    name: "Natasha",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1105.webp",
  },
  {
    id: "1109",
    name: "Hook",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1109.webp",
  },
  {
    id: "1108",
    name: "Sampo",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1108.webp",
  },
  {
    id: "1103",
    name: "Serval",
    association: "Belobog",
    portraitPath: "/img/v4/portraits/1103.webp",
  },
  {
    id: "1008",
    name: "Arlan",
    association: "Herta Space Station",
    portraitPath: "/img/v4/portraits/1008.webp",
  },
  {
    id: "1009",
    name: "Asta",
    association: "Herta Space Station",
    portraitPath: "/img/v4/portraits/1009.webp",
  },
  {
    id: "1304",
    name: "Aventurine",
    association: "Ten Stonehearts",
    portraitPath: "/img/v4/portraits/1304.webp",
  },
  {
    id: "1112",
    name: "Topaz",
    association: "Ten Stonehearts",
    portraitPath: "/img/v4/portraits/1112.webp",
  },
  {
    id: "1314",
    name: "Jade",
    association: "Ten Stonehearts",
    portraitPath: "/img/v4/portraits/1314.webp",
  },
  {
    id: "1211",
    name: "Bailu",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1211.webp",
  },
  {
    id: "1208",
    name: "Fu Xuan",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1208.webp",
  },
  {
    id: "1210",
    name: "Guinaifen",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1210.webp",
  },
  {
    id: "1215",
    name: "Hanya",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1215.webp",
  },
  {
    id: "1217",
    name: "Huohuo",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1217.webp",
  },
  {
    id: "1204",
    name: "Jing Yuan",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1204.webp",
  },
  {
    id: "1212",
    name: "Jingliu",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1212.webp",
  },
  {
    id: "1201",
    name: "Qingque",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1201.webp",
  },
  {
    id: "1206",
    name: "Sushang",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1206.webp",
  },
  {
    id: "1202",
    name: "Tingyun",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1202.webp",
  },
  {
    id: "1214",
    name: "Xueyi",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1214.webp",
  },
  {
    id: "1209",
    name: "Yanqing",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1209.webp",
  },
  {
    id: "1207",
    name: "Yukong",
    association: "Luofu Xianzhou",
    portraitPath: "/img/v4/portraits/1207.webp",
  },
  {
    id: "1309",
    name: "Robin",
    association: "Penacony",
    portraitPath: "/img/v4/portraits/1309.webp",
  },
  {
    id: "1301",
    name: "Gallagher",
    association: "Penacony",
    portraitPath: "/img/v4/portraits/1301.webp",
  },
  {
    id: "1312",
    name: "Misha",
    association: "Penacony",
    portraitPath: "/img/v4/portraits/1312.webp",
  },
  {
    id: "1307",
    name: "Black Swan",
    association: "Garden of Recollection",
    portraitPath: "/img/v4/portraits/1307.webp",
  },
  {
    id: "1013",
    name: "Herta",
    association: "Genius Society",
    portraitPath: "/img/v4/portraits/1013.webp",
  },
  {
    id: "1305",
    name: "Dr. Ratio",
    association: "Genius Society",
    portraitPath: "/img/v4/portraits/1305.webp",
  },
  {
    id: "1303",
    name: "Ruan Mei",
    association: "Genius Society",
    portraitPath: "/img/v4/portraits/1303.webp",
  },
  {
    id: "1306",
    name: "Sparkle",
    association: "Masked Fools",
    portraitPath: "/img/v4/portraits/1306.webp",
  },
  {
    id: "1315",
    name: "Boothill",
    association: "Galaxy Rangers",
    portraitPath: "/img/v4/portraits/1315.webp",
  },
  {
    id: "1308",
    name: "Acheron",
    association: "Self-Annihilators",
    portraitPath: "/img/v4/portraits/1308.webp",
  },
  {
    id: "1302",
    name: "Argenti",
    portraitPath: "/img/v4/portraits/1302.webp",
  },
  {
    id: "1203",
    name: "Luocha",
    portraitPath: "/img/v4/portraits/1203.webp",
  },
];

export const characterById = (
  id: StarRailCharacter["id"] | undefined | null,
): StarRailCharacter | null => {
  if (id == null) {
    return null;
  }

  const index = CHARACTERS.findIndex((ch) => ch.id === id);
  if (index < 0) {
    return null;
  }

  return CHARACTERS[index];
};

export const characterByIndex = (idx: number): StarRailCharacter | null => {
  if (idx < 0 || idx >= CHARACTERS.length) {
    return null;
  }

  return CHARACTERS[idx];
};

export const characterByName = (name: string | undefined | null): StarRailCharacter | null => {
  if (name == null) {
    return null;
  }

  const idx = CHARACTERS.findIndex((ch) => ch.name === name);
  if (idx === -1) {
    return null;
  }

  return CHARACTERS[idx];
};
