QUnit.test("Get event level for deployed resonator", function (assert) {
    var message = ["f8835387e5c341cfb1867384d1e627d3.d", 1407701851779, {
        "plext": {
            "text": "TestAgent deployed an L8 Resonator on An der Kanone (Czernyweg, 55131 Mainz, Germany)",
            "markup": [["PLAYER", {
                "plain": "TestAgent",
                "team": "ENLIGHTENED"
            }], ["TEXT", {"plain": " deployed an "}], ["TEXT", {"plain": "L8"}], ["TEXT", {"plain": " Resonator on "}], ["PORTAL", {
                "name": "An der Kanone",
                "plain": "An der Kanone (Czernyweg, 55131 Mainz, Germany)",
                "team": "ENLIGHTENED",
                "latE6": 49995535,
                "address": "Czernyweg, 55131 Mainz, Germany",
                "lngE6": 8256069,
                "guid": "d47edfdd82754be59d491a91e31db136.16"
            }]],
            "plextType": "SYSTEM_BROADCAST",
            "categories": 1,
            "team": "ENLIGHTENED"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 1, "Returns event level 1");
});

QUnit.test("Get event level for destroyed resonator", function (assert) {
    var message = ["6894744c62de412fa8c708d1c280e310.d", 1407701869652, {
        "plext": {
            "text": "TestAgent destroyed an L5 Resonator on Hypocaustum (Schillerstraße 30, 55116 Mainz, Germany)",
            "markup": [["PLAYER", {
                "plain": "TestAgent",
                "team": "ENLIGHTENED"
            }], ["TEXT", {"plain": " destroyed an "}], ["TEXT", {"plain": "L5"}], ["TEXT", {"plain": " Resonator on "}], ["PORTAL", {
                "name": "Hypocaustum",
                "plain": "Hypocaustum (Schillerstraße 30, 55116 Mainz, Germany)",
                "team": "RESISTANCE",
                "latE6": 49999126,
                "address": "Schillerstraße 30, 55116 Mainz, Germany",
                "lngE6": 8265757,
                "guid": "10f535a345ed4ab397b4df32bd89dbe0.16"
            }]],
            "plextType": "SYSTEM_BROADCAST",
            "categories": 1,
            "team": "ENLIGHTENED"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 2, "Returns event level 2");
});

QUnit.test("Get event level for destroyed YOUR resonator", function (assert) {
    var message = ["55bf8ab6d1ac45d39e61008ccb48a39b.d", 1407757273299, {
        "plext": {
            "text": "Your L6 Resonator on Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany) was destroyed by TestAgent",
            "markup": [
                ["TEXT", {
                    "plain": "Your "
                }],
                ["TEXT", {
                    "plain": "L6"
                }],
                ["TEXT", {
                    "plain": " Resonator on "
                }],
                ["PORTAL", {
                    "name": "Alzheimer Denkmal",
                    "plain": "Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany)",
                    "team": "ENLIGHTENED",
                    "latE6": 50126729,
                    "address": "Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany",
                    "lngE6": 8668004,
                    "guid": "ab0372b32db143cb9f64c32edcc617b6.16"
                }],
                ["TEXT", {
                    "plain": " was destroyed by "
                }],
                ["PLAYER", {
                    "plain": "TestAgent",
                    "team": "RESISTANCE"
                }]
            ],
            "plextType": "SYSTEM_NARROWCAST",
            "categories": 4,
            "team": "RESISTANCE"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 4, "Returns event level 4");
});

QUnit.test("Get event level for linked portals", function (assert) {
    var message = ["f2a2f3c9118344b28fc769db034ca13c.d",
        1407703384124,
        {
            "plext": {
                "categories": 1,
                "markup": [["PLAYER",
                    {
                        "plain": "TestAgent",
                        "team": "ENLIGHTENED"
                    }
                ],
                    ["TEXT",
                        {"plain": " linked "}
                    ],
                    ["PORTAL",
                        {
                            "address": "Goebenstraße 7, 65195 Wiesbaden, Germany",
                            "guid": "556f5eb3d14e4a5cb3c7e513ae083d8e.16",
                            "latE6": 50079452,
                            "lngE6": 8228370,
                            "name": "reizBar",
                            "plain": "reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany)",
                            "team": "ENLIGHTENED"
                        }
                    ],
                    ["TEXT",
                        {"plain": " to "}
                    ],
                    ["PORTAL",
                        {
                            "address": "Wörthstraße 8, 65185 Wiesbaden, Germany",
                            "guid": "96f5b484d34348b6ac784ac9f8b5e7ec.16",
                            "latE6": 50077640,
                            "lngE6": 8232695,
                            "name": "Childguard",
                            "plain": "Childguard (Wörthstraße 8, 65185 Wiesbaden, Germany)",
                            "team": "ENLIGHTENED"
                        }
                    ]
                ],
                "plextType": "SYSTEM_BROADCAST",
                "team": "ENLIGHTENED",
                "text": "TestAgent linked reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany) to Childguard (Wörthstraße 8, 65185 Wiesbaden, Germany)"
            }
        }
    ];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 8, "Returns event level 8");
});

QUnit.test("Get event level for captured portal", function (assert) {
    var message = ["795a3d5aabae40559d73d3d60d2669c9.d", 1407701851779, {
        "plext": {
            "text": "TestAgent captured An der Kanone (Czernyweg, 55131 Mainz, Germany)",
            "markup": [["PLAYER", {
                "plain": "TestAgent",
                "team": "ENLIGHTENED"
            }], ["TEXT", {"plain": " captured "}], ["PORTAL", {
                "name": "An der Kanone",
                "plain": "An der Kanone (Czernyweg, 55131 Mainz, Germany)",
                "team": "ENLIGHTENED",
                "latE6": 49995535,
                "address": "Czernyweg, 55131 Mainz, Germany",
                "lngE6": 8256069,
                "guid": "d47edfdd82754be59d491a91e31db136.16"
            }]],
            "plextType": "SYSTEM_BROADCAST",
            "categories": 1,
            "team": "ENLIGHTENED"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 16, "Returns event level 16");
});

QUnit.test("Get event level for YOUR portal under attack", function (assert) {
    var message = ["2392a94d21de4336986b533504f79717.d", 1407757271910, {
        "plext": {
            "text": "Your Portal Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany) is under attack by TestAgent",
            "markup": [
                ["TEXT", {
                    "plain": "Your Portal "
                }],
                ["PORTAL", {
                    "name": "Alzheimer Denkmal",
                    "plain": "Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany)",
                    "team": "ENLIGHTENED",
                    "latE6": 50126729,
                    "address": "Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany",
                    "lngE6": 8668004,
                    "guid": "ab0372b32db143cb9f64c32edcc617b6.16"
                }],
                ["TEXT", {
                    "plain": " is under attack by "
                }],
                ["PLAYER", {
                    "plain": "TestAgent",
                    "team": "RESISTANCE"
                }]
            ],
            "plextType": "SYSTEM_NARROWCAST",
            "categories": 4,
            "team": "RESISTANCE"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 32, "Returns event level 32");
});

QUnit.test("Get event level for YOUR portal neutralized", function (assert) {
    var message = ["80b500ee22ac4de4a587fed21ce184e7.d", 1407757309274, {
        "plext": {
            "text": "Your Portal Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany) neutralized by TestAgent",
            "markup": [
                ["TEXT", {
                    "plain": "Your Portal "
                }],
                ["PORTAL", {
                    "name": "Alzheimer Denkmal",
                    "plain": "Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany)",
                    "team": "NEUTRAL",
                    "latE6": 50126729,
                    "address": "Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany",
                    "lngE6": 8668004,
                    "guid": "ab0372b32db143cb9f64c32edcc617b6.16"
                }],
                ["TEXT", {
                    "plain": " neutralized by "
                }],
                ["PLAYER", {
                    "plain": "TestAgent",
                    "team": "RESISTANCE"
                }]
            ],
            "plextType": "SYSTEM_NARROWCAST",
            "categories": 4,
            "team": "RESISTANCE"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 64, "Returns event level 64");
});

QUnit.test("Get event level for control field created", function (assert) {
    var message = ["efc1ddb32d5748a8900815ea5dcb0ef3.d",
        1407703384124,
        {
            "plext": {
                "categories": 1,
                "markup": [["PLAYER",
                    {
                        "plain": "TestAgent",
                        "team": "ENLIGHTENED"
                    }
                ],
                    ["TEXT",
                        {"plain": " created a Control Field @"}
                    ],
                    ["PORTAL",
                        {
                            "address": "Goebenstraße 7, 65195 Wiesbaden, Germany",
                            "guid": "556f5eb3d14e4a5cb3c7e513ae083d8e.16",
                            "latE6": 50079452,
                            "lngE6": 8228370,
                            "name": "reizBar",
                            "plain": "reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany)",
                            "team": "ENLIGHTENED"
                        }
                    ],
                    ["TEXT",
                        {"plain": " +"}
                    ],
                    ["TEXT",
                        {"plain": "8"}
                    ],
                    ["TEXT",
                        {"plain": " MUs"}
                    ]
                ],
                "plextType": "SYSTEM_BROADCAST",
                "team": "ENLIGHTENED",
                "text": "TestAgent created a Control Field @reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany) +8 MUs"
            }
        }
    ];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 128, "Returns event level 128");
});

QUnit.test("Get event level for control field created", function (assert) {
    var message = ["5ac9bc50e7454662afe061aa5e2676f3.d", 1407838808344, {
        "plext": {
            "text": "TestAgent destroyed the Link Uyulala (Marktplatz 5, 65183 Wiesbaden, Germany) to Holy Words (Marktplatz 8, 65183 Wiesbaden, Germany)",
            "markup": [["PLAYER", {
                "plain": "TestAgent",
                "team": "ENLIGHTENED"
            }], ["TEXT", {
                "plain": " destroyed the Link "
            }], ["PORTAL", {
                "name": "Uyulala",
                "plain": "Uyulala (Marktplatz 5, 65183 Wiesbaden, Germany)",
                "team": "RESISTANCE",
                "latE6": 50081850,
                "address": "Marktplatz 5, 65183 Wiesbaden, Germany",
                "lngE6": 8243588,
                "guid": "e3083b1b7411400fbf2d74e135fcca40.16"
            }], ["TEXT", {
                "plain": " to "
            }], ["PORTAL", {
                "name": "Holy Words",
                "plain": "Holy Words (Marktplatz 8, 65183 Wiesbaden, Germany)",
                "team": "NEUTRAL",
                "latE6": 50082127,
                "address": "Marktplatz 8, 65183 Wiesbaden, Germany",
                "lngE6": 8242671,
                "guid": "bfce8b7084ca49a1b7f654d263003df8.16"
            }]],
            "plextType": "SYSTEM_BROADCAST",
            "categories": 1,
            "team": "RESISTANCE"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 256, "Returns event level 256");
});

QUnit.test("Get event level for mod destroyed", function (assert) {
    var message = ["5ac9bc50e7454662afe061aa5e2676f3.d", 1407838808344, {
        "plext": {
            "text": "Your Common Portal Shield on Spielplatz Blücher (Blücherstraße 13, 65195 Wiesbaden, Germany) was destroyed by TestAgent",
            "markup": [["TEXT", {
                "plain": "Your "
            }], ["TEXT", {
                "plain": "Common"
            }], ["TEXT", {
                "plain": " "
            }], ["TEXT", {
                "plain": "Portal Shield"
            }], ["TEXT", {
                "plain": " on "
            }], ["PORTAL", {
                "name": "Spielplatz Blücher",
                "plain": "Spielplatz Blücher (Blücherstraße 13, 65195 Wiesbaden, Germany)",
                "team": "ENLIGHTENED",
                "latE6": 50080609,
                "address": "Blücherstraße 13, 65195 Wiesbaden, Germany",
                "lngE6": 8226940,
                "guid": "6e556305b57042129dc44a7e04c0d7b7.16"
            }], ["TEXT", {
                "plain": " was destroyed by "
            }], ["PLAYER", {
                "plain": "TestAgent",
                "team": "RESISTANCE"
            }]],
            "plextType": "SYSTEM_NARROWCAST",
            "categories": 4,
            "team": "RESISTANCE"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 512, "Returns event level 512");

    message = ["5ac9bc50e7454662afe061aa5e2676f3.d", 1407838808344, {
        "plext": {
            "text": "Your Rare Force Amp on Offene Bibliothek Wiesbaden (Yorckstraße 19, 65195 Wiesbaden, Germany) was destroyed by TestAgent",
            "markup": [["TEXT", {
                "plain": "Your "
            }], ["TEXT", {
                "plain": "Rare"
            }], ["TEXT", {
                "plain": " "
            }], ["TEXT", {
                "plain": "Force Amp"
            }], ["TEXT", {
                "plain": " on "
            }], ["PORTAL", {
                "name": "Offene Bibliothek Wiesbaden",
                "plain": "Offene Bibliothek Wiesbaden (Yorckstraße 19, 65195 Wiesbaden, Germany)",
                "team": "ENLIGHTENED",
                "latE6": 50081506,
                "address": "Yorckstraße 19, 65195 Wiesbaden, Germany",
                "lngE6": 8226184,
                "guid": "f00f645b170a42669c36ee3aab7334e2.11"
            }], ["TEXT", {
                "plain": " was destroyed by "
            }], ["PLAYER", {
                "plain": "TestAgent",
                "team": "RESISTANCE"
            }]],
            "plextType": "SYSTEM_NARROWCAST",
            "categories": 4,
            "team": "RESISTANCE"
        }
    }];
    plext = message[2].plext;
    result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 512, "Returns event level 512");
});

QUnit.test("Get event level for control field destroyed", function (assert) {
    var message = ["5ac9bc50e7454662afe061aa5e2676f3.d", 1407838808344, {
        "plext": {
            "text": "TestAgent destroyed a Control Field @Tagblatt- Haus (Schloßplatz 5, 65183 Wiesbaden, Germany) -3 MUs",
            "markup": [["PLAYER", {
                "plain": "TestAgent",
                "team": "ENLIGHTENED"
            }], ["TEXT", {
                "plain": " destroyed a Control Field @"
            }], ["PORTAL", {
                "name": "Tagblatt- Haus",
                "plain": "Tagblatt- Haus (Schloßplatz 5, 65183 Wiesbaden, Germany)",
                "team": "RESISTANCE",
                "latE6": 50082822,
                "address": "Schloßplatz 5, 65183 Wiesbaden, Germany",
                "lngE6": 8243465,
                "guid": "e27b3f32d967423ea563a91f005b6623.16"
            }], ["TEXT", {
                "plain": " -"
            }], ["TEXT", {
                "plain": "3"
            }], ["TEXT", {
                "plain": " MUs"
            }]],
            "plextType": "SYSTEM_BROADCAST",
            "categories": 1,
            "team": "ENLIGHTENED"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.getEventLevel(plext);
    assert.equal(result, 1024, "Returns event level 1024");
});

QUnit.test("Get event level for portal on alarm list", function (assert) {
    window.plugin.comm2speech.portalAlarms["10f535a345ed4ab397b4df32bd89dbe0.16"] = "10f535a345ed4ab397b4df32bd89dbe0.16";
    var message = ["6894744c62de412fa8c708d1c280e310.d", 1407701869652, {
        "plext": {
            "text": "TestAgent destroyed an L5 Resonator on Hypocaustum (Schillerstraße 30, 55116 Mainz, Germany)",
            "markup": [["PLAYER", {
                "plain": "TestAgent",
                "team": "ENLIGHTENED"
            }], ["TEXT", {"plain": " destroyed an "}], ["TEXT", {"plain": "L5"}], ["TEXT", {"plain": " Resonator on "}], ["PORTAL", {
                "name": "Hypocaustum",
                "plain": "Hypocaustum (Schillerstraße 30, 55116 Mainz, Germany)",
                "team": "RESISTANCE",
                "latE6": 49999126,
                "address": "Schillerstraße 30, 55116 Mainz, Germany",
                "lngE6": 8265757,
                "guid": "10f535a345ed4ab397b4df32bd89dbe0.16"
            }]],
            "plextType": "SYSTEM_BROADCAST",
            "categories": 1,
            "team": "ENLIGHTENED"
        }
    }];
    var plext = message[2].plext;
    var result = window.plugin.comm2speech.isEventReportable(2, 1, plext);
    assert.equal(result, true, "Portal is on alarm list");
});

QUnit.test("event is reportable", function (assert) {
    var result = window.plugin.comm2speech.isEventReportable(32, 48);
    assert.strictEqual(result, true, "Event should be reportable");
    result = window.plugin.comm2speech.isEventReportable(2, 2);
    assert.strictEqual(result, true, "Event should be reportable");
});

QUnit.test("event is not reportable", function (assert) {
    var result = window.plugin.comm2speech.isEventReportable(32, 80);
    assert.strictEqual(result, false, "Event should not be reportable");
});

QUnit.test("test clean messages", function (assert) {
    // 1
    var result = window.plugin.comm2speech.cleanMsg("TestAgent deployed an L8 Resonator on An der Kanone (Czernyweg, 55131 Mainz, Germany)", 1);
    assert.equal(result, "TestAgent deployed an L8 Resonator on An der Kanone", "Address should be removed from message");

    // 2
    result = window.plugin.comm2speech.cleanMsg("TestAgent destroyed an L5 Resonator on Hypocaustum (Schillerstraße 30, 55116 Mainz, Germany)", 2);
    assert.equal(result, "TestAgent destroyed an L5 Resonator on Hypocaustum", "Address should be removed from message");

    // 4
    result = window.plugin.comm2speech.cleanMsg("Your L6 Resonator on Hessischer Landtag (Schloßplatz 3, 65183 Wiesbaden, Germany) was destroyed by TestAgent", 4);
    assert.equal(result, "Your L6 Resonator on Hessischer Landtag was destroyed by TestAgent", "Address should be removed from message");

    // 8
    result = window.plugin.comm2speech.cleanMsg("TestAgent linked reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany) to Childguard (Wörthstraße 8, 65185 Wiesbaden, Germany)", 8);
    assert.equal(result, "TestAgent linked reizBar to Childguard", "Address should be removed from message");
    //var result = window.plugin.comm2speech.cleanMsg("TestAgent linked reizBar (2) Portal (Goebenstraße 7, 65195 Wiesbaden, Germany) to Childguard (Wörthstraße 8, 65185 Wiesbaden, Germany)", 8);
    //assert.equal(result, "Test Agent linked reizBar (2) Portal to Childguard", "Address should be removed from message");

    // 16
    result = window.plugin.comm2speech.cleanMsg("TestAgent captured An der Kanone (Czernyweg, 55131 Mainz, Germany)", 16);
    assert.equal(result, "TestAgent captured An der Kanone", "Address should be removed from message");

    // 32
    result = window.plugin.comm2speech.cleanMsg("Your Portal Alzheimer Denkmal (Siolistraße 2, Johann Wolfgang Goethe University Frankfurt am Main, IG Farben Building, 60323 Frankfurt, Germany) is under attack by TestAgent", 32);
    assert.equal(result, "Your Portal Alzheimer Denkmal is under attack by TestAgent", "Address should be removed from message");

    // 64
    result = window.plugin.comm2speech.cleanMsg("Your Portal Schuhhaus (Bleichstraße 11, 65183 Wiesbaden, Germany) neutralized by TestAgent", 64);
    assert.equal(result, "Your Portal Schuhhaus neutralized by TestAgent", "Address should be removed from message");

    // 128
    result = window.plugin.comm2speech.cleanMsg("TestAgent created a Control Field @reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany) +8 MUs", 128);
    assert.equal(result, "TestAgent created a Control Field @reizBar", "Address should be removed from message");

    // 256
    result = window.plugin.comm2speech.cleanMsg("TestAgent destroyed the Link Uyulala (Marktplatz 5, 65183 Wiesbaden, Germany) to Holy Words (Marktplatz 8, 65183 Wiesbaden, Germany)", 256);
    assert.equal(result, "TestAgent destroyed the Link Uyulala to Holy Words", "Address should be removed from message");

    // 512
    result = window.plugin.comm2speech.cleanMsg("Your Rare Force Amp on Offene Bibliothek Wiesbaden (Yorckstraße 19, 65195 Wiesbaden, Germany) was destroyed by TestAgent", 512);
    assert.equal(result, "Your Rare Force Amp on Offene Bibliothek Wiesbaden was destroyed by TestAgent", "Address should be removed from message");

    // 1024
    result = window.plugin.comm2speech.cleanMsg("TestAgent destroyed a Control Field @Tagblatt- Haus (Schloßplatz 5, 65183 Wiesbaden, Germany) -3 MUs", 1024);
    assert.equal(result, "TestAgent destroyed a Control Field @Tagblatt- Haus", "Address should be removed from message");
});

QUnit.test("translate msg", function (assert) {
    window.plugin.comm2speech.lang = 'de-DE';
    window.plugin.comm2speech.customNames = {'TestAgent': 'Test Agent'};
    // 1
    var result = window.plugin.comm2speech.translateMsg("TestAgent deployed an L8 Resonator on An der Kanone");
    assert.equal(result, "Test Agent setzte einen L8 Resonator an An der Kanone", "Message should be translated.");

    // 2
    result = window.plugin.comm2speech.translateMsg("TestAgent destroyed the Link Uyulala to Holy Words");
    assert.equal(result, "Test Agent zerstörte den Link Uyulala zu Holy Words", "Message should be translated.");

    // 4
    result = window.plugin.comm2speech.translateMsg("Your L7 Resonator on Lilien und Löwen was destroyed by TestAgent");
    assert.equal(result, "Dein L7 Resonator an Lilien und Löwen wurde zerstört von Test Agent", "Message should be translated.");

    // 8
    result = window.plugin.comm2speech.translateMsg("TestAgent linked reizBar to Childguard");
    assert.equal(result, "Test Agent verlinkte reizBar zu Childguard", "Message should be translated.");

    // 16
    result = window.plugin.comm2speech.translateMsg("TestAgent captured An der Kanone");
    assert.equal(result, "Test Agent eroberte An der Kanone", "Message should be translated.");

    // 32
    result = window.plugin.comm2speech.translateMsg("Your Portal Alzheimer Denkmal is under attack by TestAgent");
    assert.equal(result, "Dein Portal Alzheimer Denkmal wird angegriffen von Test Agent", "Message should be translated.");

    // 64
    result = window.plugin.comm2speech.translateMsg("Your Portal Schuhhaus neutralized by TestAgent");
    assert.equal(result, "Dein Portal Schuhhaus wurde neutralisiert von Test Agent", "Message should be translated.");

    // 128
    result = window.plugin.comm2speech.translateMsg("TestAgent created a Control Field @reizBar");
    assert.equal(result, "Test Agent erstellte ein Feld @reizBar", "Message should be translated.");

    // 256
    result = window.plugin.comm2speech.translateMsg("TestAgent destroyed the Link Uyulala to Holy Words");
    assert.equal(result, "Test Agent zerstörte den Link Uyulala zu Holy Words", "Message should be translated.");

    // 512
    result = window.plugin.comm2speech.translateMsg("Your Rare Force Amp on Offene Bibliothek Wiesbaden was destroyed by TestAgent");
    assert.equal(result, "Dein Rare Force Amp an Offene Bibliothek Wiesbaden wurde zerstört von Test Agent", "Message should be translated.");

    // 1024
    result = window.plugin.comm2speech.translateMsg("TestAgent destroyed a Control Field @Tagblatt- Haus");
    assert.equal(result, "Test Agent zerstörte ein Feld @Tagblatt- Haus", "Message should be translated.");
});

QUnit.test("toggle portal alarm on", function (assert) {
    window.plugin.comm2speech.currentPortalGuid = "8cda1282216c4798a54be7675b2f5580.16";
    var data = '<a id="portalAlarm" onclick="window.plugin.comm2speech.togglePortalAlarm(this)" title="Turns the alarm for this portal ON">Portal alarm ON</a>';
    var result = window.plugin.comm2speech.togglePortalAlarm(data);
    assert.equal(result.hasOwnProperty("8cda1282216c4798a54be7675b2f5580.16"), true, "Portal alarm list should contain portal guid.");
    assert.equal(result["8cda1282216c4798a54be7675b2f5580.16"], "8cda1282216c4798a54be7675b2f5580.16", "Portal alarm list should contain portal guid.");

    window.plugin.comm2speech.currentPortalGuid = "8cda1282216c4798a54be7675b2f5580.16";
    data = '<a id="portalAlarm" onclick="window.plugin.comm2speech.togglePortalAlarm(this)" title="Turns the alarm for this portal OFF">Portal alarm OFF</a>';
    result = window.plugin.comm2speech.togglePortalAlarm(data);
    assert.equal(result.hasOwnProperty("8cda1282216c4798a54be7675b2f5580.16"), false, "Portal alarm list should not contain portal guid.");
});

QUnit.test("saving portal alarms to localStorage", function (assert) {
    var storageKey = 'plugin-comm2speech-qunit';
    localStorage.removeItem(storageKey);
    var portalAlarms = {"8cda1282216c4798a54be7675b2f5580.16": "8cda1282216c4798a54be7675b2f5580.16"};
    var storedAlarms = window.plugin.comm2speech.loadPortalAlarmsFromLocalStorage(storageKey);
    assert.deepEqual(storedAlarms, {}, "Portal alarm list should in localStorage should be empty.");

    window.plugin.comm2speech.savePortalAlarmsToLocalStorage(storageKey, portalAlarms);
    storedAlarms = window.plugin.comm2speech.loadPortalAlarmsFromLocalStorage(storageKey);
    assert.deepEqual(
        storedAlarms,
        {"8cda1282216c4798a54be7675b2f5580.16": "8cda1282216c4798a54be7675b2f5580.16"},
        "Portal alarm list should be as expected."
    );
});

QUnit.test("udpate portal alarm link", function (assert) {
    $('<div id="toolbox"></div>').appendTo('#qunit-fixture');
    var data = {
        selectedPortalGuid: "556f5eb3d14e4a5cb3c7e513ae083d8e.16",
        unselectedPortalGuid: "556f5eb3d14e4a5cb3c7e513ae083d8e.16"
    };
    window.plugin.comm2speech.updatePortalAlarmLink(data);
    assert.equal($('#toolbox a').length, 1, "Toolbox should have exactly one link");
    assert.equal($('a#portalAlarm').length, 1, "There should be exactly one link with the ID 'portalAlarm'");
    assert.equal($('a#portalAlarm').attr("title"), "Turns the alarm for this portal ON", "Portal alarm text should be 'ON'");

    window.plugin.comm2speech.portalAlarms["556f5eb3d14e4a5cb3c7e513ae083d8e.16"] = "foo";
    window.plugin.comm2speech.updatePortalAlarmLink(data);
    assert.equal($('#toolbox a').length, 1, "Toolbox should contain exactly one link, even if it had one before.");
    assert.equal($('a#portalAlarm').length, 1, "There should be exactly one link with the ID 'portalAlarm' (replacement)");
    assert.equal($('a#portalAlarm').attr("title"), "Turns the alarm for this portal OFF", "Portal alarm text should be 'OFF'");
});
