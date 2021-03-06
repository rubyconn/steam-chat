var assert = require('assert');

var helpers = require('../lib/helpers')
  , doc = require('../lib/doc.json');

describe('Helper', function() {

    describe('safeGet()', function() {

        const clanState = { 
            name_info: { 
                clan_name: "foo",
                other: { 
                    secret: "value"
                },
                members: [ "bar" ],
                nothing: [],
                deep: {
                    sea: "foobar"
                }
            },
            user_counts: {
                chatting: 5
            }
        };

        const emptyState = {
            user_counts: {
                chatting: 5
            }
        };

        it('should return value on valid keys', function() {
            const res = helpers.safeGet(clanState, 'name_info', 'clan_name');
            assert.strictEqual(res, "foo");
        });

        it('should return nested objects', function() {
            const res = helpers.safeGet(clanState, 'name_info', 'other');
            assert.deepStrictEqual(res, { secret: "value" });
        });

        it('should return arrays', function() {
            const res = helpers.safeGet(clanState, 'name_info', 'members');
            assert.deepStrictEqual(res, [ "bar" ]);
        });

        it('should return empty arrays', function() {
            const res = helpers.safeGet(clanState, 'name_info', 'nothing');
            assert.deepStrictEqual(res, []);
        });

        it('should return deeply nested values', function() {
            const res = helpers.safeGet(clanState, 'name_info', 'deep', 'sea');
            assert.strictEqual(res, "foobar");
        });

        it('should return undefined on invalid key', function() {
            const res = helpers.safeGet(emptyState, 'name_info', 'clan_name');
            assert.strictEqual(res, undefined);
        });

        it('should return undefined when object is undefined', function() {
            const res = helpers.safeGet(undefined, 'name_info', 'clan_name');
            assert.strictEqual(res, undefined);
        });

    });

    describe('replaceString()', function() {

        it('should replace string with one argument', function() {
            const res = helpers.replaceString(doc.act.youKicked, "foo");
            assert.strictEqual(res, doc.act.youKicked.replace("%s", "foo"));
        });

        it('should replace string with two arguments', function() {
            const res = helpers.replaceString(doc.act.userBanned, "foo", "bar");
            assert.strictEqual(res, doc.act.userBanned
                .replace("%s", "foo").replace("%s", "bar"));
        });

    });

});
