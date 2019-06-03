var configdata = require('../config/config');
var dbmodel = require('../lib/dbquery');


/*--------------------------------------------------------------------------------------------------------*/

exports.getUser = function (req, conn, cb) {
    var uid = (typeof req.params.id !== 'undefined') ? req.params.id : 0;

    if (uid > 0) {
        var sql_usr = "select * from slot_booking_bmtc.bmtc_userlogin where id ='" + uid + "' ";
        conn.query(sql_usr, function (err, result) {
            console.log(err);
            cb(result);
        });
    }
}

exports.getPlace = function (req, conn, cb) {
    var sql_loc = "select * from slot_booking_bmtc.bmtc_location";
    conn.query(sql_loc, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.getTRIP = function (req, conn, cb) {
    var sql_trip = "select * from slot_booking_bmtc.bmtc_trip";
    conn.query(sql_trip, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.getBUS = function (req, conn, cb) {
    var uniqid = req.query.fromtoloc.split("_");
    var fromloc = (typeof (uniqid[0]) !== 'undefined') ? uniqid[0] : 0;
    var toloc = (typeof (uniqid[1]) !== 'undefined') ? uniqid[1] : 0;

    var whr = "";
    if (fromloc < toloc) {
        whr = " and " + fromloc + ">=bbtl.from_loc and " + toloc + "<=bbtl.to_loc  ";
    } else {
        whr = " and " + fromloc + "<=bbtl.from_loc and " + toloc + ">=bbtl.to_loc  ";
    }

    var sql_bus = "SELECT *, (SELECT bus_num from slot_booking_bmtc.bmtc_bus where bus_id=bbtl.bus_id) bus_name, (SELECT bus_time from slot_booking_bmtc.bmtc_bus where bus_id=bbtl.bus_id) b_time, (SELECT bus_class from slot_booking_bmtc.bmtc_bus where bus_id=bbtl.bus_id) b_class, (SELECT trip_id from slot_booking_bmtc.bmtc_trip where trip_id=bbtl.trip_id) trip_name FROM slot_booking_bmtc.bmtc_bus_trip_locn_map bbtl where 1=1  " + whr + " GROUP BY bbtl.trip_id, bbtl.bus_id";
    conn.query(sql_bus, function (err, result) {
        console.log(err);
        cb(result);
    });
}


exports.getbusticketdetails = function (req, conn, cb) {

    var uniqid = req.query.bustrip_id.split("_");
    var bus_id = uniqid[0];
    var trip_id = uniqid[1];

    var sql_tickdetls = "select * from slot_booking_bmtc.bmtc_seat_book where bus_id='" + bus_id + "'  and trip_id='" + trip_id + "' ";

    conn.query(sql_tickdetls, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.readandinsertseats = function (req, conn, index, seats_data, cb) {
    if (seats_data.length > index) {
        var splitbusdt = seats_data[index].split("_");
        console.log(splitbusdt);
        var bus_id = splitbusdt[0];
        var trip_id = splitbusdt[1];
        var from_loc = splitbusdt[2];
        var to_loc = splitbusdt[3];
        var seat_num = splitbusdt[4];
        console.log(seat_num);

        var sql_in = "insert into slot_booking_bmtc.bmtc_seat_book(bus_id,trip_id,from_loc,to_loc,seat_num,book_status) values('" + bus_id + "','" + trip_id + "','" + from_loc + "','" + to_loc + "','" + seat_num + "',1)";

        conn.query(sql_in, function (err, result) {
            index = index + 1;
            dbmodel.readandinsertseats(req, conn, index, seats_data, function (resset) {
                cb(resset);
            });
        });

    } else {
        cb();
    }
}



exports.confirmseats = function (req, conn, cb) {
    var seats_data = req.query.seats.split(",");
    var index = 0;

    dbmodel.readandinsertseats(req, conn, index, seats_data, function (res) {

    });

}

exports.gettripBusDetails = function (req, conn, cb) {
    var sql_busdetls = "SELECT *, concat(bbtl.bus_id,'_',bbtl.trip_id,'_',bbtl.loc_id,'_',bbtl.from_loc,'_',bbtl.to_loc) bustrip_id FROM slot_booking_bmtc.bmtc_bus_trip_locn_map bbtl left join slot_booking_bmtc.bmtc_trip bt on bbtl.trip_id = bt.trip_id left join slot_booking_bmtc.bmtc_bus bb on bbtl.bus_id = bb.bus_id group by bbtl.trip_id, bbtl.bus_id";
    conn.query(sql_busdetls, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.getFromLocationDetails = function (req, conn, cb) {
    console.log(req.query.bustrip_id.split("_"))
    var uniqid = req.query.bustrip_id.split("_");
    var bus_id = (typeof (uniqid[0]) !== 'undefined') ? uniqid[0] : 0;
    var trip_id = (typeof (uniqid[1]) !== 'undefined') ? uniqid[1] : 0;
    var from_loc = (typeof (uniqid[2]) !== 'undefined') ? uniqid[2] : 0;
    var to_loc = (typeof (uniqid[3]) !== 'undefined') ? uniqid[3] : 0;

    var ordcls = '';
    if (from_loc < to_loc) {
        ordcls = " order by bbtl.loc_id asc ";
    }

    if (from_loc > to_loc) {
        ordcls = " order by bbtl.loc_id desc ";
    }


    var sql_frmtoloc = "SELECT *,(SELECT loc_name from slot_booking_bmtc.bmtc_location where loc_id=bbtl.loc_id) as location, concat(bbtl.bus_id,'_',bbtl.trip_id,'_',bbtl.loc_id,'_',bbtl.from_loc,'_',bbtl.to_loc) as bustriplocid FROM slot_booking_bmtc.bmtc_bus_trip_locn_map bbtl " + ordcls + " group by bbtl.loc_id ";
    /* where bbtl.bus_id='"+bus_id+"' and bbtl.trip_id='"+trip_id+"'*/
    conn.query(sql_frmtoloc, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.getToLocationDetails = function (req, conn, cb) {
    console.log(req.query.bustrip_id.split("_"))
    var uniqid = req.query.bustrip_id.split("_");
    var bus_id = (typeof (uniqid[0]) !== 'undefined') ? uniqid[0] : 0;
    var trip_id = (typeof (uniqid[1]) !== 'undefined') ? uniqid[1] : 0;
    var loc_id = (typeof (uniqid[2]) !== 'undefined') ? uniqid[2] : 0;
    var from_loc = (typeof (uniqid[3]) !== 'undefined') ? uniqid[3] : 0;
    var to_loc = (typeof (uniqid[4]) !== 'undefined') ? uniqid[4] : 0;

    var whr = '';
    if (from_loc < to_loc) {
        whr = " and bbtl.loc_id>'" + loc_id + "' ";
    }

    if (from_loc > to_loc) {
        whr = " and bbtl.loc_id<'" + loc_id + "' ";
    }


    var sql_toloc = "SELECT *,(SELECT loc_name from slot_booking_bmtc.bmtc_location where loc_id=bbtl.loc_id) as location, concat(bbtl.bus_id,'_',bbtl.trip_id,'_',bbtl.loc_id,'_',bbtl.from_loc,'_',bbtl.to_loc) as bustriplocid FROM slot_booking_bmtc.bmtc_bus_trip_locn_map bbtl where 1=1 and ('" + loc_id + "' BETWEEN bbtl.from_loc AND bbtl.to_loc ) AND bbtl.loc_id<>'" + loc_id + "' group by loc_id";
    /*bbtl.bus_id='"+bus_id+"'  and bbtl.trip_id='"+trip_id+"' */
    conn.query(sql_toloc, function (err, result) {
        console.log(err);
        cb(result);
    });
}

exports.doslotLogin = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);

    var uname = (typeof bdobj['uname'] !== undefined) ? bdobj['uname'] : "";
    var pwd = (typeof bdobj['pwd'] !== undefined) ? bdobj['pwd'] : "";

    var sql_slotlogin = "select * from slot_booking_bmtc.bmtc_userlogin where username='" + uname + "' and password='" + pwd + "' ";
    conn.query(sql_slotlogin, function (err, rows) {
        var result = [];
        if (rows.length > 0) {
            result.push({
                exist: '1',
                mesage: 'Successful Login',
                ur_id: rows[0].id,
                uname: rows[0].username,
                pwd: rows[0].password
            });

        } else {
            result.push({
                exist: '0',
                message: 'No user found!'
            });
        }
        cb(result);
    });
}

exports.signup = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);

    var fname = (typeof bdobj['fname'] !== undefined) ? bdobj['fname'] : "";
    var email = (typeof bdobj['email'] !== undefined) ? bdobj['email'] : "";
    var mobile = (typeof bdobj['mobile'] !== undefined) ? bdobj['mobile'] : "";
    var pwd = (typeof bdobj['pwd'] !== undefined) ? bdobj['pwd'] : "";
    var sql_usr = "insert into slot_booking_bmtc.bmtc_userlogin (name, username, mobile, password) values ('" + fname + "', '" + email + "', '" + mobile + "', '" + pwd + "')";

    conn.query(sql_usr, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}

exports.editProfile = function (req, conn, cb) {
    var bdobj = JSON.parse(Object.keys(req.body)[0]);

    var avatar = (typeof bdobj['avatar'] !== undefined) ? bdobj['avatar'] : "";
    var sql_usr = "insert into slot_booking_bmtc.bmtc_userlogin (photo) values ('" + avatar + "')";

    conn.query(sql_usr, function (err, result) {
        console.log(err);
        console.log("1 record inserted");
        cb(result);
    });
}