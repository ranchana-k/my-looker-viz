import type { Config, Option } from "./types"

export const staticOptions: Record<string, Option> = {
    num_rules: {
        type: "number",
        label: "Number of Rules",
        section: "Conditional Formatting",
        default: 3,
        order: 1,
    }
}
export const buildDynamicOptions = (config: Config) : Record<string, Option> => {
    // Start with your static options
	const options = { ...staticOptions };
    const numRules = Number(config.num_rules) || 0

    // loop thrugh the number of rules and add dynamic options 
    // for example, for rule 1 we will add options like rule_1_value and rule_1_color
    for (let i = 1; i <= numRules; i++) {
        options[`rule_${i}_value`] = {
            section: "Conditional Formatting",
            type: "string",
            label: `Rule ${i} Value`,
            default: "",
            order: i * 10 + 1,
            display_size: "half"
        };
        options[`rule_${i}_color`] = {
            type: "string",
            section: "Conditional Formatting",
            label: `Color`,
            default: "#CCCCCC",
            order: i * 10 + 2,
            display: "color",
            display_size: "half"
        };
    }
    return options;
}
