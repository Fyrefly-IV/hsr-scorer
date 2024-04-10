import { permutations } from "@/lib/arrays";
import uniq from "lodash.uniq";

export interface Character {
  name: string;
  portraitPath?: string | null;
}

export const STELLARON_HUNTERS: Character[] = [
  {
    name: "Firefly",
    portraitPath: "/img/v2/portraits/firefly.webp",
  },
  {
    name: "Kafka",
  },
  {
    name: "Silver Wolf",
    portraitPath: "/img/v2/portraits/silver_wolf.webp",
  },
  {
    name: "Blade",
  },
];

export const ASTRAL_EXPRESS: Character[] = [
  {
    name: "March 7th",
  },
  {
    name: "Stelle",
  },
  {
    name: "Caelus",
  },
  {
    name: "Dan Heng",
  },
  {
    name: "Himeko",
    portraitPath: "/img/v2/portraits/himeko.webp",
  },
  {
    name: "Welt",
  },
];

export const BELOBOG: Character[] = [
  {
    name: "Bronya",
    portraitPath: "/img/v2/portraits/bronya.webp",
  },
  {
    name: "Seele",
    portraitPath: "/img/v2/portraits/seele.webp",
  },
  {
    name: "Clara",
  },
  {
    name: "Pela",
  },
  {
    name: "Gepard",
  },
  {
    name: "Luka",
  },
  {
    name: "Lynx",
  },
  {
    name: "Natasha",
  },
  {
    name: "Hook",
  },
  {
    name: "Sampo",
  },
  {
    name: "Serval",
  },
];

export const HERTA_SPACE_STATION: Character[] = [
  {
    name: "Arlan",
    portraitPath: "/img/v2/portraits/arlan.webp",
  },
  {
    name: "Asta",
    portraitPath: "/img/v2/portraits/asta.webp",
  },
];

export const TEN_STONEHEARTS: Character[] = [
  {
    name: "Aventurine",
  },
  {
    name: "Topaz",
  },
];

export const LUOFU_XIANZHOU: Character[] = [
  {
    name: "Bailu",
  },
  {
    name: "Fu Xuan",
  },
  {
    name: "Guinaifen",
  },
  {
    name: "Hanya",
  },
  {
    name: "Huohuo",
  },
  {
    name: "Jing Yuan",
  },
  {
    name: "Jingliu",
  },
  {
    name: "Qingque",
  },
  {
    name: "Sushang",
  },
  {
    name: "Tingyun",
  },
  {
    name: "Xueyi",
  },
  {
    name: "Yanqing",
  },
  {
    name: "Yukong",
  },
];

export const PENACONY: Character[] = [
  {
    name: "Robin",
  },
  {
    name: "Gallagher",
  },
  {
    name: "Misha",
  },
];

export const GARDEN_OF_RECOLLECTION: Character[] = [
  {
    name: "Black Swan",
  },
];

export const GENIUS_SOCIETY: Character[] = [
  {
    name: "Herta",
  },
  {
    name: "Dr. Ratio",
  },
  {
    name: "Ruan Mei",
  },
];

export const MASKED_FOOLS: Character[] = [
  {
    name: "Sparkle",
  },
];

export const GALAXY_RANGERS: Character[] = [
  {
    name: "Boothill",
  },
];

export const SELF_ANNIHILATORS: Character[] = [
  {
    name: "Acheron",
    portraitPath: "/img/v2/portraits/acheron.webp",
  },
];

export const OTHER: Character[] = [
  {
    name: "Argenti",
    portraitPath: "/img/v2/portraits/argenti.webp",
  },
  {
    name: "Luocha",
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
    for (let idx = 0; idx < CHARACTERS.length; idx++) {
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
