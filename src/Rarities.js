export const rarities = [
    // {
    //     "tags": [],
    //     "total": 0,
    //     "found": 0,
    // }

    // * Uncommon
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
        "tags": ["uncommon", "2009"],
        "total": "32,474",
    },
    {
        "tags": ["paliblock", "uncommon"],
        "total": "7,925",
    },
    {
        "tags": ["paliblock", "uncommon", "alpha"],
        "total": "1,602",
    },

    // * Black Uncommon
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
        "tags": ["black_uncommon", "omega", "epoch0"],
        "total": "210K",
        "found": "13K",
    },
    {
        "tags": ["paliblock", "black_uncommon", "omega"],
        "total": "1,602",
    },

    // * Palindrome
    {
        "tags": ["palindrome", "3_digits"],
        "total": "1,2M",
        "found": "24K",
    },
    {
        "tags": ["palindrome", "paliblock", "3_digits"],
        "total": "126,465",
    },

    // * Uniform Palinception
    {
        "tags": [ "uniform_palinception", "3_digits"],
        "total": "139,616",
    },
    {
        "tags": [ "uniform_palinception", "3_digits", "paliblock"],
        "total": "25,173",
    },
    {
        "tags": ["uniform_palinception", "nova"],
        "total": "2,040",
        "found": "135",
    },

    // * Perfect Palinception
    {
        "tags": ["perfect_palinception"],
        "total": "13,305",
        "found": 335,
    },
    {
        "tags": ["perfect_palinception", "nova"],
        "total": "1,050",
    },
    {
        "tags": ["perfect_palinception", "2_digits"],
        "total": "1,768",
    },

    // * Pizza
    {
        "tags": ["pizza", "palindrome"],
        "total": "100,016",
    },
    {
        "tags": ["palindrome", "pizza", "pizza_4/20"],
        "total": "1,600",
    },
    {
        "tags": ["alpha", "pizza"],
        "total": "10,002",
    },
    {
        "tags": ["alpha", "pizza", "2009"],
        "total": "300",
    },

    // * Jpeg
    {
        "tags": ["jpeg", "palindrome"],
        "total": "5,000",
    },
    {
        "tags": ["jpeg", "palindrome", "jpeg_2010"],
        "total": "500",
    },
    {
        "tags": ["alpha", "jpeg"],
        "total": "500",
    },

    // * Hitman

    // * Vintage
    {
        "tags": ["vintage", "palindrome"],
        "total": "6M",
        "found": "21K",
    },
    {
        "tags": ["vintage", "palindrome", "paliblock"],
        "total": "1,1M",
        "found": "2K",
    },
    {
        "tags": ["vintage", "palindrome", "3_digits"],
        "total": "244,800",
    },

    // * B9
    {
        "tags": ["block_9", "palindrome"],
        "total": 50000,
        "found": 28,
    },
    {
        "tags": ["450x", "palindrome"],
        "total": 1000,
        "found": 23,
    },

    // * Alpha / Omega
    {
        "tags": ["2009", "alpha"],
        "total": "1,6M",
        "found": "8K",
    },

    // * Other
    {
        "tags": ["rodarmor_name"],
        "total": "12,450",
        "found": "1K",
    },

];

const exception_tags = ['3-3-3-3-3', '4-4-4-4', '5-5-5', '7-7', '8-8'];

const mandatory_subtags = {
    'perfect_palinception': ['palindrome', 'uniform_palinception'],
    'uniform_palinception': ['palindrome'],
    'vintage': ['2009'],
    'block_9': ['vintage', '2009', 'nakamoto'],
    '450x': ['block_9', 'vintage', '2009', 'nakamoto'],
};

export function getSupply(tags) {
  // Create a Set to avoid duplicates
  let expandedTags = new Set(tags);

  // --- Expansion Step ---
  // For each tag that has mandatory subtags, add those subtags.
  tags.forEach(tag => {
    if (mandatory_subtags[tag]) {
      mandatory_subtags[tag].forEach(subtag => expandedTags.add(subtag));
    }
  });

  // --- Collapse Step ---
  // If a parent tag is present, remove its mandatory subtags so that the canonical form is used.
  Object.keys(mandatory_subtags).forEach(parent => {
    if (expandedTags.has(parent)) {
      mandatory_subtags[parent].forEach(subtag => expandedTags.delete(subtag));
    }
  });

  // Convert the Set back to an array, filter out any exception tags, and sort the result.
  const filteredTags = [...expandedTags]
    .filter(tag => !exception_tags.includes(tag))
    .sort();

  // Compare the resulting sorted tags with each rarity’s tags (which should also be in canonical form)
  for (const rarity of rarities) {
    const sortedRarityTags = [...rarity.tags].sort();
    if (JSON.stringify(sortedRarityTags) === JSON.stringify(filteredTags)) {
      return rarity;
    }
  }

  return null;
}