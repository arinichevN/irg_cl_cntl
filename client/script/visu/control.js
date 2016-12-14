function SimpleControl() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
    this.valve = [];
    this.prog = [];
    this.arch = [
        [12, 11, 10],
        [9, 8, 7],
        [4, 5, 6],
        [1, 2, 3],
        [13, 14],
        [28]
    ];
    this.irgB = [];
    this.CATCH = {TIME: 1, IRGB: 2};
    this.initialized = false;
    this.update = true; //editor will make it false
    this.visible = false;
    this.updateB = null;
    this.stateB = null;
    this.valveOnB = null;
    this.valveOffB = null;
    this.progStartB = null;
    this.progStopB = null;
    this.progMturnB = null;
    this.progResetB = null;
    this.prog_fs = null;
    this.valve_fs = null;
    this.btimer = null;
    this.btimer1 = null;
    this.ttimer=null;
    this.helpB = null;
    this.time_cont = null;
    this.time_s1 = null;
    this.time_s2 = null;
    this.init = function () {
        try {
            var self = this;
            this.container = cvis();
            this.updateB = cb("");
            this.stateB = cb("");
            this.valveOnB = cb("");
            this.valveOffB = cb("");
            this.progStartB = cb("");
            this.progStopB = cb("");
            this.progMturnB = cb("");
            this.progResetB = cb("");
            this.time_cont = cd();
            this.time_s1 = cd();
            this.time_s2 = cd();
            this.helpB = new NavigationButton(vhelp);
            this.valveOnB.onclick = function () {
                self.valveTurnOn();
            };
            this.valveOffB.onclick = function () {
                self.valveTurnOff();
            };
            this.progStartB.onclick = function () {
                self.valveProgStart();
            };
            this.progStopB.onclick = function () {
                self.valveProgStop();
            };
            this.progMturnB.onclick = function () {
                self.valveProgMturn();
            };
            this.progResetB.onclick = function () {
                self.valveProgReset();
            };
            this.updateB.onclick = function () {
                self.getValve();
            };
            this.stateB.onclick = function () {
                self.getControllerState();
            };
            this.updateB.title = "получить данные из базы данных";
            this.prog_fs = new Fieldset();
            this.valve_fs = new Fieldset();
            var b1cont = cd();
            var b2cont = cd();
            var bcont = cd();
            a(this.prog_fs, [this.progStartB, this.progStopB, this.progMturnB, this.progResetB]);
            a(this.valve_fs, [this.valveOnB, this.valveOffB]);
            a(b2cont, [this.prog_fs, this.valve_fs]);
            a(b1cont, [this.updateB, this.stateB, this.helpB]);
            a(bcont, [b2cont, b1cont]);
            a(this.time_cont,[this.time_s1,this.time_s2]);
            var tbl = cd();

            for (var i = 0; i < this.arch.length; i++) {
                var tr = cd();
                this.irgB.push([]);
                for (var j = 0; j < this.arch[i].length; j++) {
                    var name = "";
                    var valve = this.getValveById(this.arch[i][j]);
                    if (valve !== null) {
                        name = valve.name;
                    }

                    var elem = new IrgButton(this.arch[i][j], name, self, this.CATCH.IRGB);

                    this.irgB[i].push(elem);
                    a(tr, elem);
                }
                a(tbl, tr);
                cla(tr, ["cn_cont1"]);
            }

            a(this.container, [bcont,this.time_cont, tbl]);
            cla(tbl, ["cn_cont"]);
            cla([this.valveOnB, this.valveOffB, this.progStartB, this.progStopB, this.progMturnB, this.progResetB], ["f1", "cn_button"]);
            cla([this.updateB, this.stateB, this.helpB], "cn_button2");
            cla([this.prog_fs, this.valve_fs], "cn_fs");
            cla(b1cont, "cn_b1");
            cla(b2cont, "cn_b2");
            cla(this.time_cont,["cn_time_cont"]);
            cla([this.time_s1,this.time_s2],["cn_time"]);
            //cla([this.prog_head, this.valve_head], "block_head");
            this.valveOnB.disabled = true;
            this.valveOffB.disabled = true;
            this.progStartB.disabled = true;
            this.progStopB.disabled = true;
            this.progMturnB.disabled = true;
            this.progResetB.disabled = true;
            this.initialized = true;
        } catch (e) {
            alert(e.message);
        }
    };
    this.getName = function () {
        return trans.get(401);
    };
    this.updateStr = function () {
        try {
            this.prog_fs.updateStr(trans.get(304));
            this.valve_fs.updateStr(trans.get(303));
            this.valveOffB.innerHTML = trans.get(306);
            this.valveOnB.innerHTML = trans.get(305);
            this.progStopB.innerHTML = trans.get(310);
            this.progStartB.innerHTML = trans.get(309);
            this.progMturnB.innerHTML = trans.get(312);
            this.progResetB.innerHTML = trans.get(311);
            this.updateB.innerHTML = trans.get(307);
            this.stateB.innerHTML = trans.get(308);
            this.time_s1.innerHTML=trans.get(313);
            this.helpB.updateStr();
        } catch (e) {
            alert(e.message);
        }
    };
    this.catchEdit = function (d, k) {
        try {
            switch (k) {
                case this.CATCH.IRGB:
                    var valve_ids = this.getSelectedValveIds();
                    if (valve_ids.length) {
                        this.valveOnB.disabled = false;
                        this.valveOffB.disabled = false;
                        this.progStartB.disabled = false;
                        this.progStopB.disabled = false;
                        this.progMturnB.disabled = false;
                        this.progResetB.disabled = false;
                    } else {
                        this.valveOnB.disabled = true;
                        this.valveOffB.disabled = true;
                        this.progStartB.disabled = true;
                        this.progStopB.disabled = true;
                        this.progMturnB.disabled = true;
                        this.progResetB.disabled = true;
                    }
                    break;
                default:
                    console.log("catchEdit: bad k");
                    break;
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.getValve = function () {
        try {
            var self = this;
            cursor_blocker.enable();
            app.sendValveGeta(self);
        } catch (e) {
            alert(e.message);
        }
    };
    this.getControllerState = function () {
        try {
            var self = this;
            cursor_blocker.enable();
            app.sendControllerGetState(self);
        } catch (e) {
            alert(e.message);
        }
    };
    this.valveTurnOn = function () {
        try {
            var valve_ids = this.getSelectedValveIds();
            if (valve_ids.length) {
                cursor_blocker.enable();
                var self = this;
                app.sendValveTurnOn(self, valve_ids);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.valveTurnOff = function () {
        try {
            var valve_ids = this.getSelectedValveIds();
            if (valve_ids.length) {
                cursor_blocker.enable();
                var self = this;
                app.sendValveTurnOff(self, valve_ids);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.valveProgStart = function () {
        try {
            var valve_ids = this.getSelectedValveIds();
            if (valve_ids.length) {
                cursor_blocker.enable();
                var self = this;
                app.sendValveProgStart(self, valve_ids);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.valveProgStop = function () {
        try {
            var valve_ids = this.getSelectedValveIds();
            if (valve_ids.length) {
                cursor_blocker.enable();
                var self = this;
                app.sendValveProgStop(self, valve_ids);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.valveProgMturn = function () {
        try {
            var valve_ids = this.getSelectedValveIds();
            if (valve_ids.length) {
                cursor_blocker.enable();
                var self = this;
                app.sendValveProgMturn(self, valve_ids);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.valveProgReset = function () {
        try {
            var valve_ids = this.getSelectedValveIds();
            if (valve_ids.length) {
                cursor_blocker.enable();
                var self = this;
                app.sendValveProgReset(self, valve_ids);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.getSelectedValveIds = function () {
        try {
            var valve = [];
            for (var i = 0; i < this.irgB.length; i++) {
                for (var j = 0; j < this.irgB[i].length; j++) {
                    if (this.irgB[i][j].isSelected()) {
                        valve.push(this.arch[i][j]);
                    }
                }
            }
            return valve;
        } catch (e) {
            alert(e.message);
        }
    };
    this.getSelectedProgBusyTimes = function (busy_time) {
        try {
            var valve_ids = this.getSelectedValveIds();
            var prog_ids = [];
            for (var i = 0; i < valve_ids.length; i++) {
                var valve = this.getValveById(valve_ids[i]);
                if (valve !== null) {
                    if (prog_ids.indexOf(valve.prog_id) === -1 && valve.prog_id !== -1) {
                        prog_ids.push(valve.prog_id);
                    }
                }
            }
            var out = [];
            for (var i = 0; i < prog_ids.length; i++) {
                out.push({id: prog_ids[i], busy_time: busy_time});
            }
            return out;
        } catch (e) {
            alert(e.message);
        }
    };
    this.getValveWithMinSelectionDate = function () {
        try {
            var date = null;
            var valve_id = null;
            for (var i = 0; i < this.irgB.length; i++) {
                for (var j = 0; j < this.irgB[i].length; j++) {
                    if (this.irgB[i][j].selection_date < date) {
                        date = this.irgB[i][j].selection_date;
                        valve_id = this.irgB[i][j].id;
                    }
                }
            }
            return this.getValveById(valve_id);
        } catch (e) {
            alert(e.message);
        }
    };
    this.getValveById = function (id) {
        try {
            for (var i = 0; i < this.valve.length; i++) {
                if (this.valve[i].id === id) {
                    return this.valve[i];
                }
            }
            return null;
        } catch (e) {
            alert(e.message);
        }
    };
    this.updateIrgB = function () {
        try {
            for (var i = 0; i < this.irgB.length; i++) {
                for (var j = 0; j < this.irgB[i].length; j++) {
                    var valve = this.getValveById(this.irgB[i][j].id);
                    if (valve !== null) {
                        this.irgB[i][j].setName(valve.name);
                    }
                }
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.getStateById = function (id, arr) {
        try {
            if (arr instanceof Array) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === id) {
                        return arr[i];
                    }
                }
            }
            return null;
        } catch (e) {
            alert(e.message);
        }
    };
    this.getIrgbById = function (id) {
        for (var i = 0; i < this.irgB.length; i++) {
            for (var j = 0; j < this.irgB[i].length; j++) {
                if (this.irgB[i][j].id === id) {
                    return this.irgB[i][j];
                }
            }
        }
        return null;
    };
    this.getIrgbNotDoneIds = function (limit) {
        var arr = [];
        for (var i = 0; i < this.irgB.length; i++) {
            for (var j = 0; j < this.irgB[i].length; j++) {
                if (this.irgB[i][j].done === false) {
                    arr.push(this.irgB[i][j].id);
                    if (arr.length === limit) {
                        return arr;
                    }
                }
            }
        }
        return arr;
    };
    this.irgbSetDone = function (v) {
        for (var i = 0; i < this.irgB.length; i++) {
            for (var j = 0; j < this.irgB[i].length; j++) {
                this.irgB[i][j].done = v;
            }
        }
    };
    this.getProgById = function (id) {
        try {
            for (var i = 0; i < this.prog.length; i++) {
                if (this.prog[i].id === id) {
                    return this.prog[i];
                }
            }
            return null;
        } catch (e) {
            alert(e.message);
        }
    };
    this.sendU = function () {
        try {
            var self = this;
            app.sendControllerGetValveDataa(self);
        } catch (e) {
            alert(e.message);
        }
    };
    this.sendStateD = function (arr) {
        try {
            var self = this;
            app.sendControllerGetValveData(self, arr);
        } catch (e) {
            alert(e.message);
        }
    };
    this.sendStateT = function () {
        try {
            var self = this;
            app.sendControllerGetDate(self);
        } catch (e) {
            alert(e.message);
        }
    };
    this.delaySendState = function () {
        try {
            if (this.visible) {
                var self = this;
                this.btimer = window.setTimeout(function () {
                    self.sendU();
                }, 800);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.delaySendStateD = function (arr) {
        try {
            if (this.visible) {
                var self = this;
                this.btimer1 = window.setTimeout(function () {
                    self.sendStateD(arr);
                }, 1000);
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.delaySendTime = function () {
        if (this.visible) {
            var self = this;
            this.ttimer = window.setTimeout(function () {
                app.sendControllerGetDate(self);
            }, 3500);
        }
    };
    this.confirm = function (action, d, n) {
        try {
            switch (action) {
                case app.ACTION.CONTROLLER.VALVE.GET_DATAA:
                    for (var i = 0; i < this.irgB.length; i++) {
                        for (var j = 0; j < this.irgB[i].length; j++) {
                            var state = this.getStateById(this.irgB[i][j].id, d);
                            var rain = "UN";
                            var time_passed = -1;
                            var time_specified = -1;
                            var state = "UN";
                            var is_master = -1;
                            var prog_name = "";
                            if (state !== null) {
                                rain = state.rain;
                                time_passed = state.time_passed;
                                time_specified = state.time_specified;
                                state = state.state;
                                is_master = state.is_master;
                                var prog = this.getProgById(state.running_prog_id);
                                if (prog !== null) {
                                    prog_name = prog.name;
                                } else {
                                    prog_name = null;
                                }
                            }
                            this.irgB[i][j].update(rain, time_passed, time_specified, state, is_master, prog_name);
                        }
                    }
                    this.delaySendState();
                    break;
                case app.ACTION.CONTROLLER.VALVE.GET_DATA:
                    if (d instanceof Array) {
                        for (var i = 0; i < d.length; i++) {
                            var irgb = this.getIrgbById(parseInt(d[i].id));
                            if (irgb === null) {
                                break;
                            }
                            var rain = d[i].rain;
                            var time_passed = parseInt(d[i].time_passed);
                            var time_specified = parseInt(d[i].time_specified);
                            var state = parseFloat(d[i].output);
                            var is_master = parseInt(d[i].is_master);
                            var prog_name = "";
                            var prog_loaded = parseInt(d[i].prog_loaded);
                            if (prog_loaded === 0) {
                                prog_name = "NULL";
                            } else {
                                var prog = this.getProgById(parseInt(d[i].running_prog_id));
                                if (prog !== null) {
                                    prog_name = prog.name;
                                } else {
                                    prog_name = "NULL";
                                }
                            }
                            var state_main = d[i].state_main;
                            var state_rain = d[i].state_rn;
                            var state_wp = d[i].state_wp;
                            var state_ch = d[i].state_tc;
                            var crepeat = parseInt(d[i].crepeat);
                            var tcrest = parseInt(d[i].time_rest_tc);
                            var rnblock = parseInt(d[i].blocked_rn);
                            var master_count = parseInt(d[i].master_count);
                           if(parseInt(d[i].em_peer_active)===0){
                                logger.wrn(256);
                            }
                            irgb.update(rain, time_passed, time_specified, state, is_master, prog_name, state_main, state_rain, state_wp, state_ch, crepeat, tcrest, rnblock, master_count);
                            irgb.done = true;
                        }
                    }
                    var not_dones = this.getIrgbNotDoneIds(app.LIMIT.VALVE_GET_DATA);
                    if (not_dones.length) {
                        if (d instanceof Array) {
                            this.sendStateD(not_dones);
                        } else {
                            this.delaySendStateD(not_dones);
                        }
                    } else {
                        this.irgbSetDone(false);
                        var not_dones1 = this.getIrgbNotDoneIds(app.LIMIT.VALVE_GET_DATA);
                        this.delaySendStateD(not_dones1);
                    }
                    break;
                case app.ACTION.VALVE.GETA:
                    cleara(this.valve);
                    for (var i = 0; i < d.valve.length; i++) {
                        this.valve.push({
                            id: parseInt(d.valve[i].id),
                            name: d.valve[i].name,
                            prev_id: parseInt(d.valve[i].prev_id),
                            prog_id: parseInt(d.valve[i].prog_id),
                            rain_sensitive: parseInt(d.valve[i].rain_sensitive),
                            master_id: parseInt(d.valve[i].master_id),
                            is_master: parseInt(d.valve[i].is_master)
                        });
                    }
                    cleara(this.prog);
                    for (var i = 0; i < d.prog.length; i++) {
                        this.prog.push({
                            id: parseInt(d.prog[i].id),
                            name: d.prog[i].name,
                            busy_time: parseInt(d.prog[i].busy_time)
                        });
                    }
                    this.updateIrgB();
                    cursor_blocker.disable();
                    break;
                case app.ACTION.CONTROLLER.VALVE.TURN_ON:
                case app.ACTION.CONTROLLER.VALVE.TURN_OFF:
                case app.ACTION.CONTROLLER.VALVE.PROG_START:
                case app.ACTION.CONTROLLER.VALVE.PROG_STOP:
                case app.ACTION.CONTROLLER.VALVE.PROG_RESET:
                case app.ACTION.CONTROLLER.VALVE.PROG_MTURN:
                    cursor_blocker.disable();
                    break;
                case app.ACTION.CONTROLLER.GET_STATE:
                    cursor_blocker.disable();
                    switch (d) {
                        case ACP.RESP.APP_BUSY:
                            logger.ntf(252);
                            break;
                        case ACP.RESP.APP_IDLE:
                            logger.ntf(253);
                            break;
                        default:
                            logger.err(255);
                            break;
                    }
                    break;
                case app.ACTION.CONTROLLER.GET_DATE:
                    var year = parseInt(d.year) + 1900;
                    var mon = trans.getMon(parseInt(d.month), 0);
                    var h = intTo2str(parseInt(d.hour));
                    var m = intTo2str(parseInt(d.min));
                    var s = intTo2str(parseInt(d.sec));
                    this.time_s2.innerHTML = d.day + " " + mon + " " + year + "  " + h + ":" + m + ":" + s;
                    this.delaySendTime();
                    break;
                default:
                    console.log("confirm: unknown action: ", action);
                    break;
            }

        } catch (e) {
            alert(e.message);
        }
    };
    this.abort = function (action, m, n) {
        try {
            switch (action) {
                case app.ACTION.CONTROLLER.VALVE.GET_DATAA:
                    for (var i = 0; i < this.irgB.length; i++) {
                        for (var j = 0; j < this.irgB[i].length; j++) {
                            this.irgB[i][j].update(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                        }
                    }
                    this.delaySendState();
                    break;
                case app.ACTION.CONTROLLER.VALVE.GET_DATA:
                    for (var i = 0; i < this.irgB.length; i++) {
                        for (var j = 0; j < this.irgB[i].length; j++) {
                            this.irgB[i][j].update(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                            this.irgB[i][j].done = false;
                        }
                    }
                    var not_dones = this.getIrgbNotDoneIds(app.LIMIT.VALVE_GET_DATA);
                    this.delaySendStateD(not_dones);
                    break;
                case app.ACTION.VALVE.GETA:
                    cursor_blocker.disable();
                    logger.err(250);
                    break;
                case app.ACTION.CONTROLLER.VALVE.TURN_ON:
                case app.ACTION.CONTROLLER.VALVE.TURN_OFF:
                case app.ACTION.CONTROLLER.VALVE.PROG_START:
                case app.ACTION.CONTROLLER.VALVE.PROG_STOP:
                case app.ACTION.CONTROLLER.VALVE.PROG_RESET:
                case app.ACTION.CONTROLLER.VALVE.PROG_MTURN:
                    cursor_blocker.disable();
                    logger.err(251);
                    break;
                case app.ACTION.CONTROLLER.GET_STATE:
                    cursor_blocker.disable();
                    logger.err(254);
                    break;
                case app.ACTION.CONTROLLER.GET_DATE:
                    this.time_s2.innerHTML = '?';
                    this.delaySendTime();
                    break;
                default:
                    console.log("abort: unknown action: ", action);
                    break;
            }
        } catch (e) {
            alert(e.message);
        }
    };
    this.show = function () {
        try {
            clr(this.container, "hdn");
            this.visible = true;
            // this.delaySendState();
            var not_dones = this.getIrgbNotDoneIds(app.LIMIT.VALVE_GET_DATA);
            this.sendStateD(not_dones);
            this.sendStateT();
        } catch (e) {
            alert(e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, "hdn");
            if (this.btimer !== null) {
                window.clearTimeout(this.btimer);
                this.btimer = null;
            }
            if (this.btimer1 !== null) {
                window.clearTimeout(this.btimer1);
                this.btimer1 = null;
            }
            if (this.ttimer !== null) {
                window.clearTimeout(this.ttimer);
                this.ttimer = null;
            }
            this.visible = false;
        } catch (e) {
            alert(e.message);
        }
    };
}
var vsimple_control = new SimpleControl();
visu.push(vsimple_control);
