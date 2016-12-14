<?php

namespace controller\valve;

class prog_mturn {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \acp\sendPackI1(ACP_CMD_IRG_PROG_MTURN, $p);
    }

}
