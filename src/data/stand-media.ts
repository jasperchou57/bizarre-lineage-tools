// Stand card image file extensions (some are jpg, most are png)
export const STAND_IMAGE_EXT: Record<string, string> = {
    "whitesnake": "png",
    "made-in-heaven": "jpg",
    "star-platinum": "png",
    "the-world": "png",
    "killer-queen": "png",
    "crazy-diamond": "png",
    "king-crimson": "png",
    "c-moon": "jpg",
    "weather-report": "jpg",
    "anubis": "png",
    "golden-experience": "png",
    "magicians-red": "png",
    "purple-haze": "png",
    "the-hand": "png",
    "stone-free": "jpg",
    "the-world-high-voltage": "png",
    "red-hot-chili-pepper": "png",
};

export function getStandImagePath(standId: string): string {
    const ext = STAND_IMAGE_EXT[standId] || "png";
    return `/images/stands/${standId}.${ext}`;
}

// YouTube showcase video IDs per Stand
export const STAND_VIDEOS: Record<string, string> = {
    "whitesnake": "tl-zn1n4_24",
    "made-in-heaven": "uFkWhapHJGc",
    "star-platinum": "qxMnxHvZCJg",
    "the-world": "rwZfQ0fe7e8",
    "king-crimson": "y39osBjgFD4",
    "c-moon": "cZgduKBZGH0",
    "weather-report": "N0bhlrp3G8A",
    "the-world-high-voltage": "DwOzrtMP8Qo",
    "killer-queen": "nm9fC6C9huw",
    "anubis": "glIeSvu2_AU",
    "golden-experience": "K0ApVFqNKQE",
    "stone-free": "vVS6tiEdCU4",
    "magicians-red": "yJRA-co7jrk",
    "crazy-diamond": "X9JWWbF5tNg",
    "purple-haze": "UJ6t4lkPdpY",
    "the-hand": "AGjrKb14DPk",
    "red-hot-chili-pepper": "_4wVP1LjESc",
};
