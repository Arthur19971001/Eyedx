export const InitDataModel = {
    _id: "",
    aiSupport: false,
    birthday: "",
    interpretationDate: "",
    race: "",
    remainCount: 0,
    comment: "",
    basalDisease: null,
    isVote: false,
    shot: {
        od: "init",
        os: "init"
    },
    status: "",
    items: [
        {
            code: "edp",
            name: "Eye Disease Presence",
            parts: {
                od: [
                    {
                        ai: [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        ai_temp: [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        checked: [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            true
                        ],
                        code: "retinal_abnormality",
                        name: "Retinal abnormalities",
                        vals: [
                            {
                                code: "retinal_drusen_observation",
                                name: "Retinal drusen observation"
                            },
                            {
                                code: "retinal_degeneration_myopia",
                                name: "Retinal degeneration(myopia)"
                            },
                            {
                                code: "retinal_degeneration_geriatric",
                                name: "Retinal degeneration(geriatric)"
                            },
                            {
                                code: "retinal_disease_front",
                                name: "Retinal desease - Front"
                            },
                            {
                                code: "retinal_disease_posterior_pole",
                                name: "Retinal desease - Posterior Pole"
                            },
                            {
                                code: "retinal_disease_other_major",
                                name: "Retinal desease - Other major"
                            },
                            {
                                code: "retinal_disease_unusual",
                                name: "Retinal desease - Unusual"
                            },
                            {
                                code: "normal",
                                name: "Normal"
                            }
                        ]
                    },
                    {
                        ai: [
                            false,
                            false,
                        ],
                        ai_temp: [
                            false,
                            false,
                        ],
                        checked: [
                            false,
                            true
                        ],
                        code: "media_abnormality",
                        name: "Media abnormality",
                        vals: [
                            {
                                code: "suspicious_media_confusion",
                                name: "Suspicious media confusion"
                            },
                            {
                                code: "normal",
                                name: "Normal"
                            }
                        ]
                    },
                    {
                        ai: [
                            false,
                            false,
                        ],
                        ai_temp: [
                            false,
                            false,
                        ],
                        checked: [
                            false,
                            true
                        ],
                        code: "optic_nerve_abnormality",
                        name: "Optic nerve abnormality",
                        vals: [
                            {
                                code: "optic_nerve_abnormality",
                                name: "Optic nerve abnormality"
                            },
                            {
                                code: "normal",
                                name: "Normal"
                            }
                        ]
                    }
                ],
                os: [
                    {
                        ai: [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        ai_temp: [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        checked: [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            true
                        ],
                        code: "retinal_abnormality",
                        name: "Retinal abnormalities",
                        vals: [
                            {
                                code: "retinal_drusen_observation",
                                name: "Retinal drusen observation"
                            },
                            {
                                code: "retinal_degeneration_myopia",
                                name: "Retinal degeneration(myopia)"
                            },
                            {
                                code: "retinal_degeneration_geriatric",
                                name: "Retinal degeneration(geriatric)"
                            },
                            {
                                code: "retinal_disease_front",
                                name: "Retinal desease - Front"
                            },
                            {
                                code: "retinal_disease_posterior_pole",
                                name: "Retinal desease - Posterior Pole"
                            },
                            {
                                code: "retinal_disease_other_major",
                                name: "Retinal desease - Other major"
                            },
                            {
                                code: "retinal_disease_unusual",
                                name: "Retinal desease - Unusual"
                            },
                            {
                                code: "normal",
                                name: "Normal"
                            }
                        ]
                    },
                    {
                        ai: [
                            false,
                            false
                        ],
                        ai_temp: [
                            false,
                            false
                        ],
                        checked: [
                            false,
                            true
                        ],
                        code: "media_abnormality",
                        name: "Media abnormality",
                        vals: [
                            {
                                code: "suspicious_media_confusion",
                                name: "Suspicious media confusion"
                            },
                            {
                                code: "normal",
                                name: "Normal"
                            }
                        ]
                    },
                    {
                        ai: [
                            false,
                            false
                        ],
                        ai_temp: [
                            false,
                            false
                        ],
                        checked: [
                            false,
                            true
                        ],
                        code: "optic_nerve_abnormality",
                        name: "Optic nerve abnormality",
                        vals: [
                            {
                                code: "optic_nerve_abnormality",
                                name: "Optic nerve abnormality"
                            },
                            {
                                code: "normal",
                                name: "Normal"
                            }
                        ]
                    }
                ]
            }
        },
        {
            code: "dr",
            name: "Diabetic Retinopathy",
            parts: {
                od: [
                    {
                        ai: [
                            false,
                            false,
                            false,
                            false,
                            false,
                        ],
                        ai_temp: [
                            false,
                            false,
                            false,
                            false,
                            false,
                        ],
                        checked: [
                            true,
                            false,
                            false,
                            false,
                            false,
                        ],
                        code: "diabetic_retinopathy",
                        name: "Diabetic retinopathy",
                        vals: [
                            {
                                code: "no_dr",
                                name: "No DR"
                            },
                            {
                                code: "mild_npdr",
                                name: "mild NPDR"
                            },
                            {
                                code: "moderate_npdr",
                                name: "moderate NPDR"
                            },
                            {
                                code: "serve_npdr",
                                name: "serve NPDR"
                            },
                            {
                                code: "proliferative_dr",
                                name: "proliferative DR"
                            }
                        ]
                    },
                    {
                        ai: [
                            false,
                        ],
                        ai_temp: [
                            false,
                        ],
                        checked: [
                            false
                        ],
                        code: "csme_suspicion",
                        name: "CSME suspicion",
                        vals: [
                            {
                                code: "csme_suspicion",
                                name: "CSME suspicion"
                            }
                        ]
                    }
                ],
                os: [
                    {
                        ai: [
                            false,
                            false,
                            false,
                            false,
                            false,
                        ],
                        ai_temp: [
                            false,
                            false,
                            false,
                            false,
                            false,
                        ],
                        checked: [
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        code: "diabetic_retinopathy",
                        name: "Diabetic retinopathy",
                        vals: [
                            {
                                code: "no_dr",
                                name: "No DR"
                            },
                            {
                                code: "mild_npdr",
                                name: "mild NPDR"
                            },
                            {
                                code: "moderate_npdr",
                                name: "moderate NPDR"
                            },
                            {
                                code: "serve_npdr",
                                name: "serve NPDR"
                            },
                            {
                                code: "proliferative_dr",
                                name: "proliferative DR"
                            }
                        ]
                    },
                    {
                        ai: [
                            false,
                        ],
                        ai_temp: [
                            false,
                        ],
                        checked: [
                            false
                        ],
                        code: "csme_suspicion",
                        name: "CSME suspicion",
                        vals: [
                            {
                                code: "csme_suspicion",
                                name: "CSME suspicion"
                            }
                        ]
                    }
                ]
            }
        }
    ],
    program: [
        {
            code: "edp",
            name: "Eye Disease Presence",
            parts: [
                {
                    ai: [
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                    ],
                    ai_temp: [
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                    ],
                    checked: [
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        true
                    ],
                    code: "retinal_abnormality",
                    name: "Retinal abnormalities",
                    vals: [
                        {
                            code: "retinal_drusen_observation",
                            name: "Retinal drusen observation"
                        },
                        {
                            code: "retinal_degeneration_myopia",
                            name: "Retinal degeneration(myopia)"
                        },
                        {
                            code: "retinal_degeneration_geriatric",
                            name: "Retinal degeneration(geriatric)"
                        },
                        {
                            code: "retinal_disease_front",
                            name: "Retinal desease - Front"
                        },
                        {
                            code: "retinal_disease_posterior_pole",
                            name: "Retinal desease - Posterior Pole"
                        },
                        {
                            code: "retinal_disease_other_major",
                            name: "Retinal desease - Other major"
                        },
                        {
                            code: "retinal_disease_unusual",
                            name: "Retinal desease - Unusual"
                        },
                        {
                            code: "normal",
                            name: "Normal"
                        }
                    ]
                },
                {
                    ai: [
                        false,
                        false,
                    ],
                    ai_temp: [
                        false,
                        false,
                    ],
                    checked: [
                        false,
                        true
                    ],
                    code: "media_abnormality",
                    name: "Media abnormality",
                    vals: [
                        {
                            code: "suspicious_media_confusion",
                            name: "Suspicious media confusion"
                        },
                        {
                            code: "normal",
                            name: "Normal"
                        }
                    ]
                },
                {
                    ai: [
                        false,
                        false,
                    ],
                    ai_temp: [
                        false,
                        false,
                    ],
                    checked: [
                        false,
                        true
                    ],
                    code: "optic_nerve_abnormality",
                    name: "Optic nerve abnormality",
                    vals: [
                        {
                            code: "optic_nerve_abnormality",
                            name: "Optic nerve abnormality"
                        },
                        {
                            code: "normal",
                            name: "Normal"
                        }
                    ]
                }
            ]
        },
        {
            code: "dr",
            name: "Diabetic Retinopathy",
            parts: [
                {
                    ai: [
                        false,
                        false,
                        false,
                        false,
                        false
                    ],
                    ai_temp: [
                        false,
                        false,
                        false,
                        false,
                        false
                    ],
                    checked: [
                        false,
                        false,
                        false,
                        false,
                        false
                    ],
                    code: "diabetic_retinopathy",
                    name: "Diabetic retinopathy",
                    vals: [
                        {
                            code: "no_dr",
                            name: "No DR"
                        },
                        {
                            code: "mild_npdr",
                            name: "mild NPDR"
                        },
                        {
                            code: "moderate_npdr",
                            name: "moderate NPDR"
                        },
                        {
                            code: "serve_npdr",
                            name: "serve NPDR"
                        },
                        {
                            code: "proliferative_dr",
                            name: "proliferative DR"
                        }
                    ]
                },
                {
                    ai: [
                        false,
                    ],
                    ai_temp: [
                        false,
                    ],
                    checked: [
                        false
                    ],
                    code: "csme_suspicion",
                    name: "CSME suspicion",
                    vals: [
                        {
                            code: "csme_suspicion",
                            name: "CSME suspicion"
                        }
                    ]
                }
            ]
        }
    ],
}