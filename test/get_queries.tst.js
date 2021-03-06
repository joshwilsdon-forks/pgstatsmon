/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2019 Joyent, Inc.
 */

var mod_assertplus = require('assert-plus');
var mod_bunyan = require('bunyan');

var lib_queries = require('../lib/queries');

var tests = [ {
    'args': {
	'interval': 100,
	'pg_version': 90200
    },
    'expected': {
	'nqueries': 8
    }
}, {
    'args': {
	'interval': 100,
	'pg_version': 90500
    },
    'expected': {
	'nqueries': 10
    }
}, {
    'args': {
	'interval': 100,
	'pg_version': 110000
    },
    'expected': {
	'nqueries': 11
    }
} ];

var log = mod_bunyan.createLogger({ 'name': 'test.get_queries' });

tests.forEach(function (t) {
	t.args.log = log;
	var q = lib_queries.getQueries(t.args);

	mod_assertplus.equal(q.length, t.expected.nqueries);
});
