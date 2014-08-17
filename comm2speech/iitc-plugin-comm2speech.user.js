// ==UserScript==
// @id              iitc-plugin-comm2speech@mattsches
// @name            IITC plugin: Comm 2 Speech
// @description     Outputs messages from all comm as speech by using the Speech Synthesis API available in some browsers.
// @namespace       https://github.com/mattsches/iitc-plugins/
// @category        Misc
// @author          Matthias Gutjahr
// @version         0.3.1
// @updateURL       https://github.com/mattsches/iitc-plugins/raw/master/comm2speech/iitc-plugin-comm2speech.user.js
// @downloadURL     https://github.com/mattsches/iitc-plugins/raw/master/comm2speech/iitc-plugin-comm2speech.user.js
// @include         https://www.ingress.com/intel*
// @include         http://www.ingress.com/intel*
// @match           https://www.ingress.com/intel*
// @match           http://www.ingress.com/intel*
// @grant           none
// ==/UserScript==

function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') {
        window.plugin = function () {
        };
    }
// PLUGIN START ////////////////////////////////////////////////////////

    // use own namespace for plugin
    window.plugin.comm2speech = function () {
    };

    /**
     * Custom settings
     */
    window.plugin.comm2speech.customNames = {
        '-': ' '
    };
    window.plugin.comm2speech.lang = 'en-US';

    /**
     * DO NOT EDIT AFTER THIS LINE!
     */
    // Report levels:
    // @todo "Your L6 Resonator on FooPortal has decayed"
    window.plugin.comm2speech.REPORT_LEVEL_RESO_DEPLOYED = 1;
    window.plugin.comm2speech.REPORT_LEVEL_RESO_DESTROYED = 2;
    window.plugin.comm2speech.REPORT_LEVEL_YOUR_RESO_DESTROYED = 4;
    window.plugin.comm2speech.REPORT_LEVEL_PORTAL_LINKED = 8;
    window.plugin.comm2speech.REPORT_LEVEL_PORTAL_CAPTURED = 16;
    window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_UNDER_ATTACK = 32;
    window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_NEUTRALIZED = 64;
    window.plugin.comm2speech.REPORT_LEVEL_CONTROL_FIELD_CREATED = 128;
    window.plugin.comm2speech.REPORT_LEVEL_LINK_DESTROYED = 256;
    window.plugin.comm2speech.REPORT_LEVEL_YOUR_MOD_DESTROYED = 512;
    window.plugin.comm2speech.REPORT_LEVEL_CONTROL_FIELD_DESTROYED = 1024;

    // @todo add checkboxes for report levels
    window.plugin.comm2speech.reportLevel = 740;
    window.plugin.comm2speech.msgTimestamp = Date.now();
    window.plugin.comm2speech.portalAlarms = {};
    window.plugin.comm2speech.currentPortalGuid = null;
    window.plugin.comm2speech.LOCAL_STORAGE_KEY = "plugin-comm2speech";
    window.plugin.comm2speech.hasSpeechSynthesis = ('speechSynthesis' in window);
    window.plugin.comm2speech.hasLocalStorage = ('localStorage' in window && window['localStorage'] !== null);
    window.plugin.comm2speech.play = '&#128266;';
    window.plugin.comm2speech.mute = '&#128263;';
    window.plugin.comm2speech.isMuted = false;

    window.plugin.comm2speech.setupCallback = function () {
        if (window.plugin.comm2speech.hasSpeechSynthesis) {
            addHook('portalSelected', window.plugin.comm2speech.updatePortalAlarmLink);
            addHook('publicChatDataAvailable', window.plugin.comm2speech.extractChatData);
            window.plugin.comm2speech.portalAlarms = window.plugin.comm2speech.loadPortalAlarmsFromLocalStorage(window.plugin.comm2speech.LOCAL_STORAGE_KEY);
            window.plugin.comm2speech.buildControls();
        }
    };

    window.plugin.comm2speech.extractChatData = function (data) {
        data.raw.success.forEach(function (msg) {
            var utterance,
                msgText,
                plext = msg[2].plext,
                eventLevel = window.plugin.comm2speech.getEventLevel(plext),
                isReportable = window.plugin.comm2speech.isEventReportable(
                eventLevel,
                window.plugin.comm2speech.reportLevel,
                plext
            );
            if (isReportable === true) {
                if (window.plugin.comm2speech.msgTimestamp < msg[1]) {
                    window.plugin.comm2speech.msgTimestamp = msg[1];
                    msgText = window.plugin.comm2speech.cleanMsg(plext.text, eventLevel);
                    msgText = window.plugin.comm2speech.translateMsg(msgText);
                    console.debug(msgText);
                    if (window.plugin.comm2speech.isMuted !== true) {
                        utterance = new SpeechSynthesisUtterance(msgText);
                        utterance.lang = window.plugin.comm2speech.lang;
                        window.speechSynthesis.speak(utterance);
                    }
                }
            }
        });
        console.debug('comm2speech: ', data);
    };

    // portal alarm list override
    // @todo trigger alarm only if attack by other faction
    window.plugin.comm2speech.isEventReportable = function (eventLevel, reportLevel, plext) {
        if (plext) {
            for (var i = 0; i < plext.markup.length; i++) {
                if (plext.markup[i][0] == 'PORTAL') {
                    if (window.plugin.comm2speech.portalAlarms.hasOwnProperty(plext.markup[i][1].guid)
                        && (eventLevel == window.plugin.comm2speech.REPORT_LEVEL_RESO_DESTROYED
                        || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_RESO_DESTROYED
                        || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_NEUTRALIZED
                        || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_UNDER_ATTACK
                        || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_PORTAL_CAPTURED
                        )
                    ) {
                        return true;
                    }
                }
            }
        }
        if (eventLevel & reportLevel) {
            return true;
        }
        return false;
    };

    window.plugin.comm2speech.getEventLevel = function (plext) {
        if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 5
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == ' destroyed an '
            && plext.markup[2][0] == 'TEXT'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[3][1].plain == ' Resonator on '
            && plext.markup[4][0] == 'PORTAL'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_RESO_DESTROYED;
        } else if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 5
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == ' deployed an '
            && plext.markup[2][0] == 'TEXT'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[3][1].plain == ' Resonator on ') {
            return window.plugin.comm2speech.REPORT_LEVEL_RESO_DEPLOYED;
        } else if (plext.plextType == 'SYSTEM_NARROWCAST'
            && plext.markup.length == 4
            && plext.markup[0][0] == 'TEXT'
            && plext.markup[0][1].plain == 'Your Portal '
            && plext.markup[1][0] == 'PORTAL'
            && plext.markup[2][0] == 'TEXT'
            && plext.markup[2][1].plain == ' is under attack by '
            && plext.markup[3][0] == 'PLAYER') {
            return window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_UNDER_ATTACK;
        } else if (plext.plextType == 'SYSTEM_NARROWCAST'
            && plext.markup.length == 6
            && plext.markup[0][0] == 'TEXT'
            && plext.markup[0][1].plain == 'Your '
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[2][0] == 'TEXT'
            && plext.markup[2][1].plain == ' Resonator on '
            && plext.markup[3][0] == 'PORTAL'
            && plext.markup[4][0] == 'TEXT'
            && plext.markup[4][1].plain == ' was destroyed by '
            && plext.markup[5][0] == 'PLAYER') {
            return window.plugin.comm2speech.REPORT_LEVEL_YOUR_RESO_DESTROYED;
        } else if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 3
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == ' captured '
            && plext.markup[2][0] == 'PORTAL'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_PORTAL_CAPTURED;
        } else if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 5
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == " linked "
            && plext.markup[2][0] == 'PORTAL'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[3][1].plain == " to "
            && plext.markup[4][0] == 'PORTAL'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_PORTAL_LINKED;
        } else if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 6
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == " created a Control Field @"
            && plext.markup[2][0] == 'PORTAL'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[3][1].plain == " +"
            && plext.markup[4][0] == 'TEXT'
            && plext.markup[5][0] == 'TEXT'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_CONTROL_FIELD_CREATED;
        } else if (plext.plextType == 'SYSTEM_NARROWCAST'
            && plext.markup.length == 4
            && plext.markup[0][0] == 'TEXT'
            && plext.markup[0][1].plain == "Your Portal "
            && plext.markup[1][0] == 'PORTAL'
            && plext.markup[2][0] == 'TEXT'
            && plext.markup[2][1].plain == " neutralized by "
            && plext.markup[3][0] == 'PLAYER'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_NEUTRALIZED;
        } else if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 5
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == " destroyed the Link "
            && plext.markup[2][0] == 'PORTAL'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[3][1].plain == " to "
            && plext.markup[4][0] == 'PORTAL'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_LINK_DESTROYED;
        } else if (plext.plextType == 'SYSTEM_NARROWCAST'
            && plext.markup.length == 8
            && plext.markup[0][0] == 'TEXT'
            && plext.markup[0][1].plain == "Your "
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[2][0] == 'TEXT'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[4][0] == 'TEXT'
            && plext.markup[4][1].plain == " on "
            && plext.markup[5][0] == 'PORTAL'
            && plext.markup[6][0] == 'TEXT'
            && plext.markup[6][1].plain == " was destroyed by "
            && plext.markup[7][0] == 'PLAYER'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_YOUR_MOD_DESTROYED;
        } else if (plext.plextType == 'SYSTEM_BROADCAST'
            && plext.markup.length == 6
            && plext.markup[0][0] == 'PLAYER'
            && plext.markup[1][0] == 'TEXT'
            && plext.markup[1][1].plain == " destroyed a Control Field @"
            && plext.markup[2][0] == 'PORTAL'
            && plext.markup[3][0] == 'TEXT'
            && plext.markup[4][0] == 'TEXT'
            && plext.markup[5][0] == 'TEXT'
        ) {
            return window.plugin.comm2speech.REPORT_LEVEL_CONTROL_FIELD_DESTROYED;
        } else {
            console.debug('Unknown plext: ' + JSON.stringify(plext));
        }
        return null;
    };

    window.plugin.comm2speech.cleanMsg = function (msgText, eventLevel) {
        var msgTextParts,
            result = msgText;
        if (eventLevel == window.plugin.comm2speech.REPORT_LEVEL_RESO_DEPLOYED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_RESO_DESTROYED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_PORTAL_CAPTURED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_CONTROL_FIELD_CREATED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_CONTROL_FIELD_DESTROYED
        ) {
            msgTextParts = msgText.split(" (", 1);
            result = msgTextParts[0];
        } else if (eventLevel == window.plugin.comm2speech.REPORT_LEVEL_PORTAL_LINKED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_LINK_DESTROYED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_UNDER_ATTACK
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_MOD_DESTROYED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_PORTAL_NEUTRALIZED
            || eventLevel == window.plugin.comm2speech.REPORT_LEVEL_YOUR_RESO_DESTROYED
        ) {
            // @todo use regex
            msgTextParts = msgText.split(" (", 2);
            result = msgTextParts[0];
            msgTextParts = msgTextParts[1].split(") ", 2);
            result += ' ' + msgTextParts[1];
        }
        return result;
    };

    window.plugin.comm2speech.translateMsg = function (msgText) {
        for (var origName in window.plugin.comm2speech.customNames) {
            msgText = msgText.replace(origName, window.plugin.comm2speech.customNames[origName]);
        }
        if (window.plugin.comm2speech.lang == 'de-DE') {
            msgText = msgText.replace(" deployed an ", " setzte einen ");
            msgText = msgText.replace(" destroyed an ", " zerstörte einen ");
            msgText = msgText.replace(" on ", " an ");
            msgText = msgText.replace(" captured ", " eroberte ");
            msgText = msgText.replace(" created a Control Field ", " erstellte ein Feld ");
            msgText = msgText.replace(" linked ", " verlinkte ");
            msgText = msgText.replace(" destroyed the Link ", " zerstörte den Link ");
            msgText = msgText.replace(" destroyed a Control Field ", " zerstörte ein Feld ");
            msgText = msgText.replace(" to ", " zu ");
            msgText = msgText.replace("Your Portal ", "Dein Portal ");
            msgText = msgText.replace("Your ", "Dein ");
            msgText = msgText.replace(" is under attack by ", " wird angegriffen von ");
            msgText = msgText.replace(" was destroyed by ", " wurde zerstört von ");
            msgText = msgText.replace(" neutralized by ", " wurde neutralisiert von ");
        }
        return msgText;
    };

    window.plugin.comm2speech.togglePortalAlarm = function () {
        if (window.plugin.comm2speech.portalAlarms.hasOwnProperty(window.plugin.comm2speech.currentPortalGuid)) {
            window.plugin.comm2speech.addPortalAlarmLink('ON');
            delete window.plugin.comm2speech.portalAlarms[window.plugin.comm2speech.currentPortalGuid];
        } else {
            window.plugin.comm2speech.addPortalAlarmLink('OFF');
            window.plugin.comm2speech.portalAlarms[window.plugin.comm2speech.currentPortalGuid] = window.plugin.comm2speech.currentPortalGuid;
        }
        window.plugin.comm2speech.savePortalAlarmsToLocalStorage(window.plugin.comm2speech.LOCAL_STORAGE_KEY, window.plugin.comm2speech.portalAlarms);
        return window.plugin.comm2speech.portalAlarms;
    };

    window.plugin.comm2speech.updatePortalAlarmLink = function (data) {
        if (window.plugin.comm2speech.portalAlarms.hasOwnProperty(data.selectedPortalGuid)) {
            window.plugin.comm2speech.addPortalAlarmLink('OFF');
        } else {
            window.plugin.comm2speech.addPortalAlarmLink('ON');
        }
        window.plugin.comm2speech.currentPortalGuid = data.selectedPortalGuid;
        return window.plugin.comm2speech.currentPortalGuid;
    };

    window.plugin.comm2speech.addPortalAlarmLink = function (onoff) {
        if ($('a#portalAlarm').length < 1) {
            $('#toolbox').append(' <a id="portalAlarm" onclick="window.plugin.comm2speech.togglePortalAlarm()" title="Turns the alarm for this portal ' + onoff + '">Turn alarm ' + onoff + '</a>');
        } else {
            $('a#portalAlarm').replaceWith(' <a id="portalAlarm" onclick="window.plugin.comm2speech.togglePortalAlarm()" title="Turns the alarm for this portal ' + onoff + '">Turn alarm ' + onoff + '</a>');
        }
    };

    window.plugin.comm2speech.loadPortalAlarmsFromLocalStorage = function (storageKey) {
        var storageContents,
            portalAlarms = {};
        if (window.plugin.comm2speech.hasLocalStorage) {
            storageContents = localStorage[storageKey];
            if (typeof storageContents !== 'undefined') {
                portalAlarms = JSON.parse(storageContents);
            }
        }
        return portalAlarms;
    };

    window.plugin.comm2speech.savePortalAlarmsToLocalStorage = function (storageKey, portalAlarms) {
        if (window.plugin.comm2speech.hasLocalStorage) {
            localStorage[storageKey] = JSON.stringify(portalAlarms);
        }
    };

    window.plugin.comm2speech.buildControls = function () {
        window.plugin.comm2speech.mutePlayButton = '<div id="comm2speech-box" ><a id="comm2speech-muteplaybutton" class="open" title="TOGGLE MUTE/PLAY" onclick="window.plugin.comm2speech.togglePlay();">' + window.plugin.comm2speech.mute + '</a></div>';
        $('body').append(window.plugin.comm2speech.mutePlayButton);
        $('#comm2speech-box').css({
            'top': '250px',
            'left': '10px',
            'font-size': '28px',
            'background-color': '#fff',
            'height': '10px', //auto
            'width': '25px', //auto
            'display': 'block',
            'padding': '0 5px 30px',
            'position': 'absolute',
            'z-index': 1000,
            '-webkit-box-shadow': '0 1px 5px rgba(0,0,0,0.4)',
            '-moz-box-shadow': '0 1px 5px rgba(0,0,0,0.4)',
            'box-shadow': '0 1px 5px rgba(0,0,0,0.4)',
            'border-radius': '5px',
            'overflow' : 'hidden'
        }).on('mouseover', function () {
            $(this).css({
                'height': 'auto',
                'width': 'auto'
            });
        }).on('mouseout', function (){
            $(this).css({
                'height': '10px',
                'width': '25px'
            });
        });
        $('#comm2speech-muteplaybutton').css({
            'color': '#aaa',
            'text-decoration': 'none'
        });
        $('#comm2speech-box').append('<div id="comm2speech-selectors"></div>');
        $('#comm2speech-selectors')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-1" ><span>Resonator Deployed</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-8"><span>Portals Linked</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-128"><span>Control Field Created</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-16"><span>Portal Captured</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-2"><span>Resonator Destroyed</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-4"><span>Your Resonator Destroyed</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-512"><span>Your Mod Destroyed</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-256"><span>Link Destroyed</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-1024"><span>Control Field Destroyed</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-32"><span>Your Portal Under Attack</span></label>')
            .append('<label><input type="checkbox" id="comm2speech-reportlevel-selector-64"><span>Your Portal Neutralized</span></label>')
        ;
        $('#comm2speech-selectors').css({
            'display': 'block'
        });
        $('#comm2speech-selectors label').css({
            'font-size': '12px',
            'line-height': '18px',
            'display': 'block',
            'height': '18px'
        });
        $('#comm2speech-selectors input').css({
            'padding': 0,
            'margin-top': '2px',
            'position': 'relative',
            'top': '8px'
        });
        window.plugin.comm2speech.initSelectors();
    };

    window.plugin.comm2speech.initSelectors = function () {
        $('#comm2speech-selectors input').each(function () {
            var id = $(this).attr('id').split('comm2speech-reportlevel-selector-')[1];
            if (window.plugin.comm2speech.reportLevel & id) {
                $(this).prop('checked', 'checked');
            } else {
                $(this).removeProp('checked');
            }
        });
        $('#comm2speech-selectors input').on('click', function () {
            var id = $(this).attr('id').split('comm2speech-reportlevel-selector-')[1];
            if ($(this).is(':checked') == true) {
                window.plugin.comm2speech.reportLevel |= id;
            } else {
                window.plugin.comm2speech.reportLevel &= ~id;
            }
            console.debug(window.plugin.comm2speech.reportLevel);
        });
    };

    window.plugin.comm2speech.togglePlay = function () {
        if ($('#comm2speech-muteplaybutton').html() == '🔇') {
            console.debug('MUTE');
            window.speechSynthesis.cancel();
            window.plugin.comm2speech.isMuted = true;
            $('#comm2speech-muteplaybutton').html(window.plugin.comm2speech.play).attr('title', 'PLAY');
        } else {
            console.debug('PLAY');
            $('#comm2speech-muteplaybutton').html(window.plugin.comm2speech.mute).attr('title', 'MUTE');
            window.plugin.comm2speech.isMuted = false;
        }
    };

    var setup = function () {
        window.plugin.comm2speech.setupCallback();
    };

// PLUGIN END //////////////////////////////////////////////////////////

    setup.info = plugin_info; //add the script info data to the function as a property
    if (!window.bootPlugins) {
        window.bootPlugins = [];
    }

    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if (window.iitcLoaded && typeof setup === 'function') {
        setup();
    }
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = {
    version: GM_info.script.version,
    name: GM_info.script.name,
    description: GM_info.script.description
};
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
