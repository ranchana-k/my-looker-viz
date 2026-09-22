import type { Row } from './types'

export const transformedData = (data: Row[]): Record<string, unknown>[] => {
    if (!data) return [];
    return data.map(row => {
        const newRow: Record<string, unknown> = {};
        for (const key in row) {
            newRow[key] = row[key].value;
        }
        return newRow;
    });
};