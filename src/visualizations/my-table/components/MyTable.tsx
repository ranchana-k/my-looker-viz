import type { Row, QueryResponse, Config } from '../types'
import { transformedData } from '../data-transformer'

type Props = {
    data: Row[]
    queryResponse: QueryResponse,
    config: Config
}

const getColorRules = (config: Config) => {
    const numRules = Number(config.num_rules) || 0
    const rules: Record<string, string> = {}

    for (let i = 1; i <= numRules; i++) {
        const valKey = `rule_${i}_value`
        const colKey = `rule_${i}_color`
        const value = config[valKey]
        const color = config[colKey]

        if (value !== undefined && value !== null && String(value).length > 0) {
            rules[String(value).toLowerCase()] = String(color ?? '#CCCCCC')
        }
    }

    return rules
}

const getColor = (val: unknown, rules: Record<string, string>) => {
    if (val == null) return '#CCCCCC'
    const key = String(val).toLowerCase()
    return rules[key] ?? '#CCCCCC'
}

const getContrastingTextColor = (hex: string) => {
    try {
        const c = hex.replace('#', '')
        const r = parseInt(c.substring(0, 2), 16)
        const g = parseInt(c.substring(2, 4), 16)
        const b = parseInt(c.substring(4, 6), 16)
        // Perceived luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        return luminance > 0.6 ? '#000' : '#fff'
    } catch (e) {
        return '#000'
    }
}

export const MyTable = ({ data = [], queryResponse, config }: Props) => {

    const dimensions = queryResponse.fields.dimensions || [];
    const measures = queryResponse.fields.measures || [];
    const colorRules = getColorRules(config || {})
    // use transformed data (optionally sorted) as the source of truth for rendering
    const rows = transformedData(data)
    // Compute per-measure max values for relative bar scaling from transformed rows
    const maxValues: Record<string, number> = {}
    for (const measure of measures) {
        maxValues[measure.name] = Math.max(
            ...rows.map(r => Number(r[measure.name] ?? 0) || 0)
        )
    }

    return (
        <div style={{ borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', color: '#111' }}>
            <thead>
                <tr>
                    {/* Dimension headers */}
                    {dimensions.map(dim => (
                        <th
                            key={dim.name}
                            style={{
                                textAlign: 'left',
                                padding: '8px',
                                borderBottom: '2px solid #e6e6e6',
                                background: '#fafafa',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                color: '#111'
                            }}
                        >
                            {dim.label_short ?? dim.label ?? dim.name}
                        </th>
                    ))}

                    {/* Measure headers */}
                    {measures.map(measure => (
                        <th
                            key={measure.name}
                            style={{
                                textAlign: 'left',
                                padding: '8px',
                                borderBottom: '2px solid #e6e6e6',
                                background: '#fafafa',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                color: '#111'
                            }}
                        >
                            {measure.label_short ?? measure.label ?? measure.name}
                        </th>
                    ))}
                </tr>
            </thead>

                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {/* Dimension cells */}
                        {dimensions.map(dim => {
                            const val = row[dim.name]
                            const displayValue = String(val ?? '')
                            return (
                                <td
                                    key={dim.name}
                                    style={{ padding: '8px', borderBottom: '1px solid #eee' }}
                                >
                                    {displayValue}
                                </td>
                            )
                        })}

                        {/* Measure cells — each renders a horizontal bar */}
                        {measures.map(measure => {
                            const raw = row[measure.name]
                            const numValue = Number(raw ?? 0) || 0
                            const displayValue = String(raw ?? numValue)

                            // choose color based on first dimension value for this row (if exists)
                            const dimVal = dimensions[0] ? row[dimensions[0].name] : undefined
                            const color = getColor(dimVal, colorRules)

                            const maxVal = maxValues[measure.name] || 1

                            const safeMax = maxVal || 1
                            const pct = Math.max(0, Math.min(100, Math.round((numValue / safeMax) * 100)))
                            const barWidth = 240
                            const textColor = getContrastingTextColor(color)
                            const insideThreshold = 18 // percent threshold to keep label inside bar

                            return (
                                <td
                                    key={measure.name}
                                    style={{ padding: '8px', borderBottom: '1px solid #eee', overflow: 'visible', whiteSpace: 'nowrap' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: barWidth, height: 28, background: 'transparent', borderRadius: 6, overflow: 'visible', position: 'relative' }}>
                                            <div style={{ width: `${pct}%`, height: '100%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 12px 0 8px', boxSizing: 'border-box', borderRadius: 6 }}>
                                                {pct >= insideThreshold && (
                                                    <span style={{ color: textColor, fontSize: 12, marginRight: 4 }}>{displayValue}</span>
                                                )}
                                            </div>
                                            {pct < insideThreshold && (
                                                <div style={{ position: 'absolute', left: Math.max(barWidth * (pct / 100) + 8, 8), top: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
                                                    <span style={{ color: '#111', fontSize: 12 }}>{displayValue}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default MyTable;