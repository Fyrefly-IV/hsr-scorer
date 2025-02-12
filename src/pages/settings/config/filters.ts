import {
	PATH_ABUNDANCE,
	PATH_DESTRUCTION,
	PATH_ERUDITION,
	PATH_HARMONY,
	PATH_HUNT,
	PATH_NIHILITY,
	PATH_PRESERVATION,
	PATH_REMEMBRANCE,
	TYPE_FIRE,
	TYPE_ICE,
	TYPE_IMAGINARY,
	TYPE_LIGHTNING,
	TYPE_PHYSICAL,
	TYPE_QUANTUM,
	TYPE_WIND,
} from "@/entities/character/config/constants";
import type { Filter } from "../model/types";

export const FILTERS: Filter[] = [
	{
		id: "filter:type:fire",
		field: "type",
		value: TYPE_FIRE,
	},
	{
		id: "filter:type:ice",
		field: "type",
		value: TYPE_ICE,
	},
	{
		id: "filter:type:wind",
		field: "type",
		value: TYPE_WIND,
	},
	{
		id: "filter:type:lightning",
		field: "type",
		value: TYPE_LIGHTNING,
	},
	{
		id: "filter:type:physical",
		field: "type",
		value: TYPE_PHYSICAL,
	},
	{
		id: "filter:type:quantum",
		field: "type",
		value: TYPE_QUANTUM,
	},
	{
		id: "filter:type:imaginary",
		field: "type",
		value: TYPE_IMAGINARY,
	},
	{
		id: "filter:path:destruction",
		field: "path",
		value: PATH_DESTRUCTION,
	},
	{
		id: "filter:path:hunt",
		field: "path",
		value: PATH_HUNT,
	},
	{
		id: "filter:path:abundance",
		field: "path",
		value: PATH_ABUNDANCE,
	},
	{
		id: "filter:path:erudition",
		field: "path",
		value: PATH_ERUDITION,
	},
	{
		id: "filter:path:harmony",
		field: "path",
		value: PATH_HARMONY,
	},
	{
		id: "filter:path:nihility",
		field: "path",
		value: PATH_NIHILITY,
	},
	{
		id: "filter:path:preservation",
		field: "path",
		value: PATH_PRESERVATION,
	},
	{
		id: "filter:path:remembrance",
		field: "path",
		value: PATH_REMEMBRANCE,
	},
];
