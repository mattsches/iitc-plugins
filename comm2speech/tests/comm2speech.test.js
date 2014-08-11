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
    var result = window.plugin.comm2speech.cleanMsg("TestAgent deployed an L8 Resonator on An der Kanone (Czernyweg, 55131 Mainz, Germany)", 1);
    assert.equal(result, "TestAgent deployed an L8 Resonator on An der Kanone", "Address should be removed from message");

    result = window.plugin.comm2speech.cleanMsg("TestAgent destroyed an L5 Resonator on Hypocaustum (Schillerstraße 30, 55116 Mainz, Germany)", 2);
    assert.equal(result, "TestAgent destroyed an L5 Resonator on Hypocaustum", "Address should be removed from message");

    result = window.plugin.comm2speech.cleanMsg("TestAgent captured An der Kanone (Czernyweg, 55131 Mainz, Germany)", 16);
    assert.equal(result, "TestAgent captured An der Kanone", "Address should be removed from message");

    result = window.plugin.comm2speech.cleanMsg("TestAgent linked reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany) to Childguard (Wörthstraße 8, 65185 Wiesbaden, Germany)", 8);
    assert.equal(result, "TestAgent linked reizBar to Childguard", "Address should be removed from message");

    //var result = window.plugin.comm2speech.cleanMsg("TestAgent linked reizBar (2) Portal (Goebenstraße 7, 65195 Wiesbaden, Germany) to Childguard (Wörthstraße 8, 65185 Wiesbaden, Germany)", 8);
    //assert.equal(result, "TestAgent linked reizBar (2) Portal to Childguard", "Address should be removed from message");

    result = window.plugin.comm2speech.cleanMsg("TestAgent created a Control Field @reizBar (Goebenstraße 7, 65195 Wiesbaden, Germany) +8 MUs", 128);
    assert.equal(result, "TestAgent created a Control Field @reizBar", "Address should be removed from message");
});

QUnit.test("translate msg", function (assert) {
    window.plugin.comm2speech.lang = 'de-DE';
    window.plugin.comm2speech.customNames = {'TestAgent': 'Test Agent'};
    var result = window.plugin.comm2speech.translateMsg("TestAgent deployed an L8 Resonator on An der Kanone");
    assert.equal(result, "Test Agent setzte einen L8 Resonator an An der Kanone", "Message should be translated.");
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
