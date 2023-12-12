/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
export function isDefined(arg) {
    return typeof arg !== 'undefined';
}
export function isPresent(arg) {
    return arg !== null && typeof arg !== 'undefined';
}
