var app = {
    ACTION: {
        CONTROLLER: {
            START: 1,
            STOP: 2,
            RESET: 3,
            EXIT: 4,
            PRINT: 5,
            GET_HELP: 6,
            GET_DATE: 7,
            GET_STATE: 8,
            VALVE: {
                GET_DATAA: 9,
                GET_DATA: 10,
                PROG_RESET: 11,
                PROG_START: 12,
                PROG_STOP: 13,
                TURN_ON: 14,
                TURN_OFF: 15,
                PROG_MTURN:26
            }
        },
        VALVE: {
            GETAA: 16,
            GETAN: 17,
            SAVE: 18

        },
        PROGRAM: {
            GETA: 19,
            SAVE_BUSY_TIME: 20
        },
        TIME_PLAN: {
            GETA: 21,
            SAVE: 22
        },
        CHANGE_PLAN: {
            GETA: 23,
            SAVE: 24
        },
        VALVE_PROG_GETA: 25
    },//last :                  26 !!!!!
    LIMIT: {
        VALVE_GET_DATA: 3
    },
    NAME_SIZE: 32,
    controller_state: null,
    version: 1,
    controller_version: null,
    version_acceptable: {
        controller: [1],
        f_php: [2],
        f_js: [2]
    },
    init: function () {
        //   a(document.body, logger);
        //  this.checkJsVersion();
        trans.setLang(1, ["english", "русский"]);
        //    logger.enableDate();
        //   logger.dtHide();

        vsimple_control.getValve();
        //alert("Hello")
        // this.sendCV();
    },
    update: function () {
        this.sendU();
    },
    checkJsVersion: function () {
        var found = false;
        for (var i = 0; i < this.version_acceptable.f_js.length; i++) {
            if (this.version_acceptable.f_js[i] === f_js_version) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current f_js version: " + f_js_version + "\n";
            var s2 = "acceptable f_js versions: " + this.version_acceptable.f_js.join(" ") + "\n";
            alert("incompatible f_js version!\n" + s1 + s2);
        }
    },
    checkControllerVersion: function (v) {
        this.controller_version = v;
        var found = false;
        for (var i = 0; i < this.version_acceptable.controller.length; i++) {
            if (this.version_acceptable.controller[i] === v) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current controller version: " + this.controller_version + "\n";
            var s2 = "acceptable controller versions: " + this.version_acceptable.controller.join(" ") + "\n";
            alert("incompatible controller version!\n" + s1 + s2);
        }
    },
    sendControllerGetDate: function (slave) {
        var data = [
            {
                action: ['controller', 'get_date']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_DATE, 'json_udp_acp');
    },
    sendControllerGetState: function (slave) {
        var data = [
            {
                action: ['controller', 'get_state']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_STATE, 'json_udp_acp');
    },
    sendControllerGetValveDataa: function (slave) {
        var data = [
            {
                action: ['controller', 'valve', 'get_dataa']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.GET_DATAA, 'json_udp_acp');
    },
    sendControllerGetValveData: function (slave, data) {
        var data = [
            {
                action: ['controller', 'valve', 'get_data'],
                param: data
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.GET_DATA, 'json_udp_acp');
    },
    sendGetValveDatan: function (slave) {
        var data = [
            {
                action: ['valve', 'geta_n']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE.GETAN, 'json_db');
    },
    sendValveGeta: function (slave) {
        var data = [
            {
                action: ['valve', 'geta']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE.GETA, 'json_db');
    },
    sendProgSaveBusyTime: function (slave, d) {
        var data = [
            {
                action: ['program', 'save_busy_time'],
                param: d
            }
        ];
        sendTo(slave, data, this.ACTION.PROGRAM.SAVE_BUSY_TIME, 'json_db');
    },
    sendValveProgStart: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_start'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_START, 'json_udp_acp');
    },
    sendValveProgStop: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_stop'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_STOP, 'json_udp_acp');
    },
    sendValveProgReset: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_reset'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_RESET, 'json_udp_acp');
    },
    sendValveProgMturn: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_mturn'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_MTURN, 'json_udp_acp');
    },
    sendValveTurnOn: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'turn_on'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.TURN_ON, 'json_udp_acp');
    },
    sendValveTurnOff: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'turn_off'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.TURN_OFF, 'json_udp_acp');
    },
    sendValveProgGeta: function (slave) {
        var data = [
            {
                action: ['valve_prog_geta']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE_PROG_GETA, 'json_db');
    }
};
elem.push(app);
