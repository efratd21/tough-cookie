'use strict';
const assert = require('assert');
const tough = require('../lib/cookie');
const vows = require("vows");

vows.describe('MemoryCookieStore Prototype Pollution Security Test').addBatch({
  'When testing prototype pollution vulnerability': {
    topic: function() {
      // יצירת CookieJar
      const jar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });
      
      // הגדרת cookie זדוני
      jar.setCookie(
        "Slonser=polluted; Domain=__proto__; Path=/notauth",
        "https://__proto__/admin",
        { loose: true },
        (err) => {
          if (err) return this.callback(err);
          
          // בדיקה אם יש זיהום
          try {
            const testObj = {};
            const polluted = testObj["/notauth"] && testObj["/notauth"]["Slonser"];
            this.callback(null, polluted);
          } catch (error) {
            this.callback(error);
          }
        }
      );
    },
    'should not pollute Object prototype': function(err, polluted) {
      assert.ifError(err);
      assert.strictEqual(polluted, undefined, 'Object prototype should not be polluted');
    }
  },
  
  'When testing normal cookie functionality after patch': {
    topic: function() {
      const jar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });
      const normalCookie = tough.Cookie.parse('sessionId=abc123; domain=example.com; path=/');
      
      jar.setCookie(normalCookie, 'http://example.com', (err) => {
        if (err) return this.callback(err);
        jar.getCookies('http://example.com', this.callback);
      });
    },
    'should still work correctly': function(err, cookies) {
      assert.ifError(err);
      assert.strictEqual(cookies.length, 1, 'Should store one normal cookie');
      assert.strictEqual(cookies[0].key, 'sessionId', 'Should store correct cookie key');
      assert.strictEqual(cookies[0].value, 'abc123', 'Should store correct cookie value');
    }
  },
  
  'When checking internal store initialization': {
    topic: function() {
      const store = new tough.MemoryCookieStore();
      return store;
    },
    'should use Object.create(null)': function(store) {
      // בדיקה שה-idx מאותחל עם Object.create(null)
      assert.strictEqual(Object.getPrototypeOf(store.idx), null, 
        'Store idx should be initialized with Object.create(null)');
    }
  }
}).export(module);