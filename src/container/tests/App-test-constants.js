export const getPackOptionsReturnValue = [
    {
        "name": "Vegemite Scroll",
        "code": "VS5",
        "packs": [
            {
                "qty": 3,
                "price": 6.99
            },
            {
                "qty": 5,
                "price": 8.99
            }
        ]
    },
    {
        "name": "Blueberry Muffin",
        "code": "MB11",
        "packs": [
            {
                "qty": 2,
                "price": 9.95
            },
            {
                "qty": 5,
                "price": 16.95
            },
            {
                "qty": 8,
                "price": 24.95
            }
        ]
    },
    {
        "name": "Croissant",
        "code": "CF",
        "packs": [
            {
                "qty": 3,
                "price": 5.95
            },
            {
                "qty": 5,
                "price": 9.95
            },
            {
                "qty": 9,
                "price": 16.99
            }
        ]
    }
];

export const neatlyPackTotalQtyValidPackOption = {
    "qty": 5,
    "price": 8.99
};

export const neatlyPackTotalQtyValidLeftoverPacks = [
    {
        "qty": 3,
        "price": 6.99
    }
];

export const neatlyPackTotalQtyValidReturnValue = [
    {
        "packType": 5,
        "packCount": 3,
        "pricePerPack": 8.99
    },
    {
        "packType": 3,
        "packCount": 1,
        "pricePerPack": 6.99
    }
];

export const calculateBestPackComboBakeItem = {
    "code": "VS5",
    "itemQty": 10
};

export const calculateBestPackComboInvalidBakeItem = {
    "code": "VS5",
    "itemQty": 2
};

export const calculateBestPackComboPackOptions = [
    {
        "qty": 5,
        "price": 8.99
    },
    {
        "qty": 3,
        "price": 6.99
    }
];

export const calculateBestPackComboReturnValue = {
    "code": "VS5",
    "totalQty": 10,
    "packDetails": [
        {
            "packType": 5,
            "packCount": 2,
            "pricePerPack": 8.99
        }
    ]
};

export const getFullOrderBestPackCombosBakeList = [
    {
        "code": "VS5",
        "itemQty": 10
    },
    {
        "code": "MB11",
        "itemQty": 14
    },
    {
        "code": "CF",
        "itemQty": 13
    }
];

export const getFullOrderBestPackCombosDescOpts = [
    {
        "name": "Vegemite Scroll",
        "code": "VS5",
        "packs": [
            {
                "qty": 5,
                "price": 8.99
            },
            {
                "qty": 3,
                "price": 6.99
            }
        ]
    },
    {
        "name": "Blueberry Muffin",
        "code": "MB11",
        "packs": [
            {
                "qty": 8,
                "price": 24.95
            },
            {
                "qty": 5,
                "price": 16.95
            },
            {
                "qty": 2,
                "price": 9.95
            }
        ]
    },
    {
        "name": "Croissant",
        "code": "CF",
        "packs": [
            {
                "qty": 9,
                "price": 16.99
            },
            {
                "qty": 5,
                "price": 9.95
            },
            {
                "qty": 3,
                "price": 5.95
            }
        ]
    }
];

export const getFullOrderBestPackCombosReturnValue = [
    {
        "code": "VS5",
        "totalQty": 10,
        "packDetails": [
            {
                "packType": 5,
                "packCount": 2,
                "pricePerPack": 8.99
            }
        ]
    },
    {
        "code": "MB11",
        "totalQty": 14,
        "packDetails": [
            {
                "packType": 8,
                "packCount": 1,
                "pricePerPack": 24.95
            },
            {
                "packType": 2,
                "packCount": 3,
                "pricePerPack": 9.95
            }
        ]
    },
    {
        "code": "CF",
        "totalQty": 13,
        "packDetails": [
            {
                "packType": 5,
                "packCount": 2,
                "pricePerPack": 9.95
            },
            {
                "packType": 3,
                "packCount": 1,
                "pricePerPack": 5.95
            }
        ]
    }
];

export const getFullOrderBestPackCombosInvalidBakeList = [
    {
        "code": "VS5",
        "itemQty": 1
    },
    {
        "code": "MB11",
        "itemQty": 1
    },
    {
        "code": "CF",
        "itemQty": 1
    }
];
