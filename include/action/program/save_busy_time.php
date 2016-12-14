<?php

namespace program;

class save_busy_time {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        global $name;
        $r = true;
        foreach ($p as $v) {
            $q = "update $name.prog set busy_time='{$v['busy_time']}' where id={$v['id']}";
            $r = $r && \db\commandF($q);
        }
        if (!$r) {
            throw new \Exception('some of inserts failed');
        }
    }
}
