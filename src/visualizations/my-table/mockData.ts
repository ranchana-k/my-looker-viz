import type { Row, QueryResponse, Config } from './types'

export const mockData: Row[] = [
    {
        "incidents.health": { value: "Warning", rendered: "Warning" },
        "incidents.count": { value: 8, rendered: "8" },
    },
    {
        "incidents.health": { value: "Healthy", rendered: "Healthy" },
        "incidents.count": { value: 25, rendered: "25" },
    },
    {
        "incidents.health": { value: "Critical", rendered: "Critical" },
        "incidents.count": { value: 2, rendered: "2" },
    },
]

export const mockQueryResponse: QueryResponse = {
    fields: {
        dimensions: [
            { name: "incidents.health", label: "Health", type: "string" },
        ],
        measures: [
            { name: "incidents.count", label: "Incident Count", type: "count" },
        ],
    },
    pivots: [],
}

export const mockConfig: Config = {
    num_rules: 3,
    rule_1_value: "Healthy",
    rule_1_color: "#0ab348",
    rule_2_value: "Warning",
    rule_2_color: "#ffee54",
    rule_3_value: "Critical",
    rule_3_color: "#fb8702"
}

