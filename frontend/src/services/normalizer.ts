
export function normalizeFormData<T extends Record<string, any>>(data: T): T {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            if (typeof value === "string") {
                const trimmed = value.trim();
                return [key, trimmed === "" ? null : trimmed];
            } else {
                return [key, value];
            }
        })
    ) as T;
}