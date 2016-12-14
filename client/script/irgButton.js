function IrgButton(id, name, slave, kind) {
    this.WORK = {
        ON: "BUSY",
        OFF: "IDLE",
        UN: "NULL"
    };
    this.RAIN = {
        OFF: "OFF",
        YES: "YES",
        NO: "NO",
        UN: "NULL"
    };
    this.slave = slave;
    this.kind = kind;
    this.id = id;
    this.container = cd();
    this.selection_date = null;
    this.rainE = c("img");
    this.workE = c("img");
    s(this.rainE, "src", "client/image/rain_un.png");
    s(this.workE, "src", "client/image/work_un.png");
    this.ucont = cd();
    this.tcont = cd();
    this.scont = cd();
    this.dcont = cd();
    this.tpE = cd();//time passed
    this.tsE = cd();//specified time 
    this.n_cont = cd();//name
    this.pn_cont = cd();//prog_name
    this.smE = cd();//state main
    this.spE = cd();//state parent
    this.srE = cd();//state rain
    this.scE = cd();//state busy time change
    this.rpE = cd();//cycle repetition
    this.tcrE = cd();//time rest before busy time change
    this.n_cont.innerHTML = name;
    this.pn_cont.innerHTML = " ";
    this.tpE.innerHTML = "";
    this.tsE.innerHTML = "";
    this.smE.innerHTML = "";
    this.spE.innerHTML = "";
    this.srE.innerHTML = "";
    this.scE.innerHTML = "";
    this.rpE.innerHTML = "";
    this.tcrE.innerHTML = "";
    this.done = false;
    this.setName = function (value) {
        this.n_cont.innerHTML = value;
    };
    this.setTC = function (value) {
        this.tsE.innerHTML = intToTimeStr(value);
    };
    this.updateStr = function () {
        cla([this.n_cont, this.tcont], ["nvis"]);
    };
    this.isSelected = function () {
        if (clc(this.container, "irgb_selected")) {
            return true;
        }
        return false;
    };
    this.click = function () {
        if (clc(this.container, "irgb_selected")) {
            clr(this.container, "irgb_selected");
        } else {
            this.selection_date = new Date();
            cla(this.container, "irgb_selected");
        }
        this.slave.catchEdit(this.id, this.kind);
    };
    this.update = function (rain, time_passed, time_specified, state, is_master, prog_name, state_main, state_rain, state_wp, state_ch, crepeat, tcrest, rnblock, master_count) {
        switch (rain) {
            case this.RAIN.YES:
                s(this.rainE, "src", "client/image/rain_yes.png");
                break;
            case this.RAIN.NO:
                s(this.rainE, "src", "client/image/rain_no.png");
                break;
            case this.RAIN.OFF:
                s(this.rainE, "src", "client/image/rain_off.png");
                break;
            default:
                s(this.rainE, "src", "client/image/rain_un.png");
                break;
        }
        if (state > 0) {
            if (rnblock === 1) {
                s(this.workE, "src", "client/image/work_no_rb.png");
            } else {
                s(this.workE, "src", "client/image/work_no.png");
            }
        } else if (state === 0.0) {
            s(this.workE, "src", "client/image/work_yes.png");
        } else {
            s(this.workE, "src", "client/image/work_un.png");
        }

        var time_p = "";
        if (time_passed === null) {
            cla(this.tpE, "irgb_dis");
            time_p = "";
        } else if (time_passed >= 0) {
            time_p = intToTimeStr(time_passed);
            clr(this.tpE, "irgb_dis");
        } else {
            cla(this.tpE, "irgb_dis");
            time_p = "&empty;";
        }
        this.tpE.innerHTML = time_p;

        var time_s = "";
        if (time_specified === null) {
            cla(this.tsE, "irgb_dis");
            time_s = "";
        } else if (time_specified >= 0) {
            time_s = intToTimeStr(time_specified);
            clr(this.tsE, "irgb_dis");
        } else {
            cla(this.tsE, "irgb_dis");
            time_s = "&empty;";
        }
        this.tsE.innerHTML = time_s;

        if (is_master === 1) {
            cla([this.rainE, this.tcont, this.scont, this.tcrE], 'nvis');
        } else {
            clr([this.rainE, this.tcont, this.scont, this.tcrE], 'nvis');
        }

        var name = "";
        if (prog_name === null) {
            cla(this.pn_cont, "irgb_dis");
        } else if (prog_name === "NULL") {
            cla(this.pn_cont, "irgb_dis");
            st_ch = "&empty;";
        } else {
            name = prog_name;
            clr(this.pn_cont, "irgb_dis");
        }
        this.pn_cont.innerHTML = name;

        var st_main = "";
        if (state_main === null) {
            cla(this.smE, "irgb_dis");
        } else if (state_main === "NULL") {
            cla(this.smE, "irgb_dis");
            st_main = "&empty;";
        } else {
            st_main = state_main;
            clr(this.smE, "irgb_dis");
        }
        this.smE.innerHTML = st_main;

        var st_rain = "";
        if (state_rain === null) {
            cla(this.srE, "irgb_dis");
        } else if (state_rain === "NULL") {
            cla(this.srE, "irgb_dis");
            st_rain = "&empty;";
        } else {
            st_rain = state_rain;
            clr(this.srE, "irgb_dis");
        }
        this.srE.innerHTML = st_rain;

        var st_wp = "";
        if (state_wp === null) {
            cla(this.spE, "irgb_dis");
        } else if (state_wp === "NULL") {
            cla(this.spE, "irgb_dis");
            st_wp = "&empty;";
        } else {
            st_wp = state_wp;
            clr(this.spE, "irgb_dis");
        }
        this.spE.innerHTML = st_wp;

        var st_ch = "";
        if (state_ch === null) {
            cla(this.scE, "irgb_dis");
        } else if (state_ch === "NULL") {
            cla(this.scE, "irgb_dis");
            st_ch = "&empty;";
        } else {
            st_ch = state_ch;
            clr(this.scE, "irgb_dis");
        }
        this.scE.innerHTML = st_ch;

        var crep = "";
        if (crepeat === null) {
            cla(this.rpE, "irgb_dis");
        } else {
            if (is_master === 1) {
                if (master_count >= 0) {
                    crep = master_count;
                    clr(this.rpE, "irgb_dis");
                } else {
                    crep = "&empty;";
                    cla(this.rpE, "irgb_dis");
                }
            } else {
                if (crepeat >= 0) {
                    crep = crepeat;
                    clr(this.rpE, "irgb_dis");
                } else {
                    crep = "&empty;";
                    cla(this.rpE, "irgb_dis");
                }
            }
        }
        this.rpE.innerHTML = crep;

        var time_r = "";
        if (tcrest === null) {
            cla(this.tcrE, "irgb_dis");
            time_r = "";
        } else if (tcrest >= 0) {
            time_r = intToTimeStr(tcrest);
            clr(this.tcrE, "irgb_dis");
        } else {
            cla(this.tcrE, "irgb_dis");
            time_r = "&empty;";
        }
        this.tcrE.innerHTML = time_r;
    };

    a(this.tcont, [this.tpE, this.tsE]);
    a(this.ucont, [this.workE, this.rainE, this.tcont]);
    a(this.scont, [this.smE, this.spE, this.srE, this.scE]);
    a(this.dcont, [this.rpE, this.tcrE]);
    a(this.container, [this.ucont, this.n_cont, this.pn_cont, this.scont, this.dcont]);
    cla([this.rainE, this.workE], ["irgb_img"]);
    cla(this.tcont, ["irgb_tm_cont"]);
    cla(this.scont, ["irgb_s_cont"]);
    cla(this.dcont, ["irgb_d_cont"]);
    cla([this.smE, this.spE, this.srE, this.scE, this.rpE, this.tcrE], ["irgb_d", "irgb_dis"]);
    cla([this.tpE, this.tsE], ["irgb_tm", "irgb_dis"]);
    cla(this.ucont, "irgb_cont_info");
    cla(this.pn_cont, ["irgb_pname"]);
    cla(this.n_cont, ["irgb_vname"]);
    cla(this.container, ["irgb_block", "irgb_interactive"]);
    var self = this;
    this.container.onclick = function () {
        self.click();
    };
}