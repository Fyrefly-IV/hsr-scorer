/**
 * Despite TypeScript thinking that returned value from access is never undefined,
 * it actually can an undefined value if the key is not present in the object.
 *
 * This function provides type safety for this use-case.
 */
export const getObjectValue = <K extends string | number | symbol, V>(
	o: { [Key in K]: V },
	key: K,
): V | null => {
	const value = o[key];
	if (typeof value === "undefined") {
		return null;
	}

	return value;
};
