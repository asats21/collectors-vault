export const rarities = [
    // {
    //     "tags": [],
    //     "total": 0,
    //     "found": 0,
    // }
    {
        "tags": ["uncommon"],
        "total": "6,9M",
        "found": "170K",
    },
    {
        "tags": ["uncommon", "alpha"],
        "total": "628,419",
        "found": "73K",
    },
    {
        "tags": ["uncommon", "alpha", "epoch0"],
        "total": "210,000",
        "found": "16K",
    },
    {
        "tags": ["black_uncommon"],
        "total": "6,9M",
        "found": "87K",
    },
    {
        "tags": ["black_uncommon", "omega"],
        "total": "628,419",
        "found": "46K",
    },
    {
        "tags": ["palindrome", "uniform_palinception", "perfect_palinception"],
        "total": 13305,
        "found": 335,
    },
    {
        "tags": ["palindrome", "uniform_palinception", "perfect_palinception", "nova"],
        "total": "1K",
    }
];

const exception_tags = ['3-3-3-3-3', '4-4-4-4', '5-5-5', '7-7', '8-8'];

export function getSupply(tags) {
    // Filter out exception tags
    const filteredTags = tags.filter(tag => !exception_tags.includes(tag)).sort();
    
    for (const rarity of rarities) {
        const sortedRarityTags = [...rarity.tags].sort();
        
        if (JSON.stringify(sortedRarityTags) === JSON.stringify(filteredTags)) {
            return rarity;
        }
    }
    return null;
}