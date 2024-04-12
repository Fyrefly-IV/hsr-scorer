import { permutations } from "@/lib/arrays";
import uniq from "lodash.uniq";

export interface Character {
  id?: string;
  name: string;
  portraitPath?: string | null;
}

export const STELLARON_HUNTERS: Character[] = [
  {
    name: "Firefly",
    portraitPath: "/img/v4/portraits/Firefly.webp",
  },
  {
    id: "1005",
    name: "Kafka",
    portraitPath: "/img/v4/portraits/1005.webp",
  },
  {
    id: "1006",
    name: "Silver Wolf",
    portraitPath: "/img/v4/portraits/1006.webp",
  },
  {
    id: "1205",
    name: "Blade",
    portraitPath: "/img/v4/portraits/1205.webp",
  },
];

export const ASTRAL_EXPRESS: Character[] = [
  {
    id: "1001",
    name: "March 7th",
    portraitPath: "/img/v4/portraits/1001.webp",
  },
  {
    id: "8002",
    name: "Stelle",
    portraitPath: "/img/v4/portraits/8002.webp"
  },
  {
    id: "8001",
    name: "Caelus",
    portraitPath: "/img/v4/portraits/8001.webp"
  },
  {
    id: "1002",
    name: "Dan Heng",
    portraitPath: "/img/v4/portraits/1002.webp",
  },
  {
    id: "1003",
    name: "Himeko",
    portraitPath: "/img/v4/portraits/1003.webp",
  },
  {
    id: "1004",
    name: "Welt",
    portraitPath: "/img/v4/portraits/1004.webp",
  },
];

export const BELOBOG: Character[] = [
  {
    id: "1101",
    name: "Bronya",
    portraitPath: "/img/v4/portraits/1101.webp",
  },
  {
    id: "1102",
    name: "Seele",
    portraitPath: "/img/v4/portraits/1102.webp",
  },
  {
    id: "1107",
    name: "Clara",
    portraitPath: "/img/v4/portraits/1107.webp",
  },
  {
    id: "1106",
    name: "Pela",
    portraitPath: "/img/v4/portraits/1106.webp",
  },
  {
    id: "1104",
    name: "Gepard",
    portraitPath: "/img/v4/portraits/1104.webp",
  },
  {
    id: "1111",
    name: "Luka",
    portraitPath: "/img/v4/portraits/1111.webp",
  },
  {
    id: '1110',
    name: "Lynx",
    portraitPath: "/img/v4/portraits/1110.webp",
  },
  {
    id: "1105",
    name: "Natasha",
    portraitPath: "/img/v4/portraits/1105.webp",
  },
  {
    id: "1109",
    name: "Hook",
    portraitPath: "/img/v4/portraits/1109.webp",
  },
  {
    id: "1108",
    name: "Sampo",
    portraitPath: "/img/v4/portraits/1108.webp",
  },
  {
    id: "1103",
    name: "Serval",
    portraitPath: "/img/v4/portraits/1103.webp",
  },
];

export const HERTA_SPACE_STATION: Character[] = [
  {
    id: "1008",
    name: "Arlan",
    portraitPath: "/img/v4/portraits/1008.webp",
  },
  {
    id: "1009",
    name: "Asta",
    portraitPath: "/img/v4/portraits/1009.webp",
  },
];

export const TEN_STONEHEARTS: Character[] = [
  {
    id: "1304",
    name: "Aventurine",
    portraitPath: "/img/v4/portraits/1304.webp"
  },
  {
    id: "1112",
    name: "Topaz",
    portraitPath: "/img/v4/portraits/1112.webp",
  },
];

export const LUOFU_XIANZHOU: Character[] = [
  {
    id: "1211",
    name: "Bailu",
    portraitPath: "/img/v4/portraits/1211.webp"
  },
  {
    id: '1208',
    name: "Fu Xuan",
    portraitPath: "/img/v4/portraits/1208.webp",
  },
  {
    id: "1210",
    name: "Guinaifen",
    portraitPath: "/img/v4/portraits/1210.webp",
  },
  {
    id: "1215",
    name: "Hanya",
    portraitPath: "/img/v4/portraits/1215.webp",
  },
  {
    id: "1217",
    name: "Huohuo",
    portraitPath: "/img/v4/portraits/1217.webp",
  },
  {
    id: "1204",
    name: "Jing Yuan",
    portraitPath: "/img/v4/portraits/1204.webp",
  },
  {
    id: "1212",
    name: "Jingliu",
    portraitPath: "/img/v4/portraits/1212.webp",
  },
  {
    id: "1201",
    name: "Qingque",
    portraitPath: "/img/v4/portraits/1201.webp",
  },
  {
    id: "1206",
    name: "Sushang",
    portraitPath: "/img/v4/portraits/1206.webp",
  },
  {
    id: "1202",
    name: "Tingyun",
    portraitPath: "/img/v4/portraits/1202.webp",
  },
  {
    id: "1214",
    name: "Xueyi",
    portraitPath: "/img/v4/portraits/1214.webp",
  },
  {
    id: "1209",
    name: "Yanqing",
    portraitPath: "/img/v4/portraits/1209.webp",
  },
  {
    id: "1207",
    name: "Yukong",
    portraitPath: "/img/v4/portraits/1207.webp",
  },
];

export const PENACONY: Character[] = [
  {
    id: "1309",
    name: "Robin",
    portraitPath: "/img/v4/portraits/1309.webp",
  },
  {
    id: "1301",
    name: "Gallagher",
    portraitPath: "/img/v4/portraits/1301.webp",
  },
  {
    id: "1312",
    name: "Misha",
    portraitPath: "/img/v4/portraits/1312.webp",
  },
];

export const GARDEN_OF_RECOLLECTION: Character[] = [
  {
    id: "1307",
    name: "Black Swan",
    portraitPath: "/img/v4/portraits/1307.webp",
  },
];

export const GENIUS_SOCIETY: Character[] = [
  {
    id: "1013",
    name: "Herta",
    portraitPath: "/img/v4/portraits/1013.webp",
  },
  {
    id: "1305",
    name: "Dr. Ratio",
    portraitPath: "/img/v4/portraits/1305.webp",
  },
  {
    id: "1303",
    name: "Ruan Mei",
    portraitPath: "/img/v4/portraits/1303.webp",
  },
];

export const MASKED_FOOLS: Character[] = [
  {
    id: "1306",
    name: "Sparkle",
    portraitPath: "/img/v4/portraits/1306.webp",
  },
];

export const GALAXY_RANGERS: Character[] = [
  {
    id: "1315",
    name: "Boothill",
    portraitPath: "/img/v4/portraits/1315.webp",
  },
];

export const SELF_ANNIHILATORS: Character[] = [
  {
    id: "1308",
    name: "Acheron",
    portraitPath: "/img/v4/portraits/1308.webp",
  },
];

export const OTHER: Character[] = [
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

export const CHARACTERS: Character[] = [
  ...STELLARON_HUNTERS,
  ...ASTRAL_EXPRESS,
  ...BELOBOG,
  ...HERTA_SPACE_STATION,
  ...TEN_STONEHEARTS,
  ...LUOFU_XIANZHOU,
  ...PENACONY,
  ...GARDEN_OF_RECOLLECTION,
  ...GENIUS_SOCIETY,
  ...MASKED_FOOLS,
  ...GALAXY_RANGERS,
  ...SELF_ANNIHILATORS,
  ...OTHER,
];

export const characterByIndex = (idx: number): Character | null => {
  if (idx < 0 || idx >= CHARACTERS.length) {
    return null;
  }

  return CHARACTERS[idx];
};

export const characterByName = (name: string | undefined | null): Character | null => {
  if (name == null) {
    return null;
  }

  const idx = CHARACTERS.findIndex((ch) => ch.name === name);
  if (idx === -1) {
    return null;
  }

  return CHARACTERS[idx];
};

export class ComparisonGraph {
  public adjList: Record<string, string[]> = {};
  private keys: string[] = [];

  constructor(characters: Character[] = CHARACTERS) {
    for (let idx = 0; idx < characters.length; idx++) {
      this.adjList[characters[idx].name] = [];
      this.keys.push(characters[idx].name);
    }
  }

  public connectByName(a: string, b: string) {
    if (!(a in this.adjList) || !(b in this.adjList)) {
      throw Error(`${a} or ${b} are unknown nodes`);
    }

    this.adjList[a] = uniq([...this.adjList[a], b]);
    this.adjList[b] = uniq([...this.adjList[b], a]);
  }

  // this is probably some very shitty and unoptimized code
  public findNonAdjacentPairs(): string[][] {
    const nonAdjacentPairs: string[][] = [];

    const vertices = Object.keys(this.adjList);
    const allPairs = permutations(vertices, 2);

    for (const pair of allPairs) {
      const adjacentVertices = this.adjList[pair[0]];

      if (adjacentVertices.findIndex((adjVertex) => adjVertex === pair[1]) === -1) {
        nonAdjacentPairs.push(pair);
      }
    }

    console.debug("-----");
    console.debug(allPairs);
    console.debug(nonAdjacentPairs);
    console.debug("-----");

    return nonAdjacentPairs;
  }
}
