export function isString<T extends string>(value: T | unknown): value is string {
	return Object.prototype.toString.call(value) === '[object String]';
}

export function isNonEmptyString<T extends string>(value: T | unknown): value is string {
	return isString(value) && value.length > 0;
}
