import { permutations } from "@/lib/arrays";
import uniq from "lodash.uniq";

export interface Character {
  name: string;
  portraitPath?: string | null;
}

export const STELLARON_HUNTERS: Character[] = [
  {
    name: "Firefly",
    portraitPath: "/img/v3/portraits/firefly.webp",
  },
  {
    name: "Kafka",
    portraitPath: "/img/v2/portraits/kafka.webp",
  },
  {
    name: "Silver Wolf",
    portraitPath: "/img/v2/portraits/silver_wolf.webp",
  },
  {
    name: "Blade",
    portraitPath: "/img/v2/portraits/blade.webp",
  },
];

export const ASTRAL_EXPRESS: Character[] = [
  {
    name: "March 7th",
    portraitPath: "/img/v2/portraits/march_7th.webp",
  },
  {
    name: "Stelle",
  },
  {
    name: "Caelus",
  },
  {
    name: "Dan Heng",
    portraitPath: "/img/v2/portraits/dan_heng.webp",
  },
  {
    name: "Himeko",
    portraitPath: "/img/v2/portraits/himeko.webp",
  },
  {
    name: "Welt",
    portraitPath: "/img/v2/portraits/welt.webp",
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
    portraitPath: "/img/v2/portraits/clara.webp",
  },
  {
    name: "Pela",
    portraitPath: "/img/v2/portraits/pela.webp",
  },
  {
    name: "Gepard",
    portraitPath: "/img/v2/portraits/gepard.webp",
  },
  {
    name: "Luka",
    portraitPath: "/img/v2/portraits/luka.webp",
  },
  {
    name: "Lynx",
    portraitPath: "/img/v2/portraits/lynx.webp",
  },
  {
    name: "Natasha",
    portraitPath: "/img/v2/portraits/natasha.webp",
  },
  {
    name: "Hook",
    portraitPath: "/img/v2/portraits/hook.webp",
  },
  {
    name: "Sampo",
    portraitPath: "/img/v2/portraits/sampo.webp",
  },
  {
    name: "Serval",
    portraitPath: "/img/v2/portraits/serval.webp",
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
    portraitPath: "/img/v2/portraits/aventurine.webp"
  },
  {
    name: "Topaz",
    portraitPath: "/img/v2/portraits/topaz.webp",
  },
];

export const LUOFU_XIANZHOU: Character[] = [
  {
    name: "Bailu",
    portraitPath: "/img/v2/portraits/bailu.webp"
  },
  {
    name: "Fu Xuan",
    portraitPath: "/img/v2/portraits/fu_xuan.webp",
  },
  {
    name: "Guinaifen",
    portraitPath: "/img/v2/portraits/guinaifen.webp",
  },
  {
    name: "Hanya",
    portraitPath: "/img/v2/portraits/hanya.webp",
  },
  {
    name: "Huohuo",
    portraitPath: "/img/v2/portraits/huohuo.webp",
  },
  {
    name: "Jing Yuan",
    portraitPath: "/img/v2/portraits/jing_yuan.webp",
  },
  {
    name: "Jingliu",
    portraitPath: "/img/v2/portraits/jingliu.webp",
  },
  {
    name: "Qingque",
    portraitPath: "/img/v2/portraits/qingque.webp",
  },
  {
    name: "Sushang",
    portraitPath: "/img/v2/portraits/sushang.webp",
  },
  {
    name: "Tingyun",
    portraitPath: "/img/v2/portraits/tingyun.webp",
  },
  {
    name: "Xueyi",
    portraitPath: "/img/v2/portraits/xueyi.webp",
  },
  {
    name: "Yanqing",
    portraitPath: "/img/v2/portraits/yanqing.webp",
  },
  {
    name: "Yukong",
    portraitPath: "/img/v2/portraits/yukong.webp",
  },
];

export const PENACONY: Character[] = [
  {
    name: "Robin",
    portraitPath: "/img/v2/portraits/robin.webp",
  },
  {
    name: "Gallagher",
  },
  {
    name: "Misha",
    portraitPath: "/img/v2/portraits/misha.webp",
  },
];

export const GARDEN_OF_RECOLLECTION: Character[] = [
  {
    name: "Black Swan",
    portraitPath: "/img/v2/portraits/black_swan.webp",
  },
];

export const GENIUS_SOCIETY: Character[] = [
  {
    name: "Herta",
    portraitPath: "/img/v2/portraits/herta.webp",
  },
  {
    name: "Dr. Ratio",
    portraitPath: "/img/v2/portraits/ratio.webp",
  },
  {
    name: "Ruan Mei",
    portraitPath: "/img/v2/portraits/ruan_mei.webp",
  },
];

export const MASKED_FOOLS: Character[] = [
  {
    name: "Sparkle",
    portraitPath: "/img/v2/portraits/sparkle.webp",
  },
];

export const GALAXY_RANGERS: Character[] = [
  {
    name: "Boothill",
    portraitPath: "/img/v2/portraits/boothill.webp",
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
    portraitPath: "/img/v2/portraits/luocha.webp",
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
