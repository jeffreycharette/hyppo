var moment = require('moment');
	
_isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

Handlebars.registerHelper('uc', function (str) {
    return encodeURIComponent(str);
});

var head = function (arr, fn) {
    if (_isFunction(fn)) {
        // block helper
        return fn(arr[0]);
    }
    else {
        return arr[0];
    }
};

Handlebars.registerHelper('first', head);
Handlebars.registerHelper('head', head);

Handlebars.registerHelper('tail', function (arr, fn) {
    if (_isFunction(fn)) {
        // block helper
        var out = '';
        for (var i = 1, len = arr.length; i < len; i++) {
            out += fn(arr[i]);
        }
        return out;
    }
    else {
        return arr.slice(1);
    }
});

// TODO: add optional context argument?
Handlebars.registerHelper('include', function (name) {
    if (!exports.templates[name]) {
        throw new Error('Template Not Found: ' + name);
    }
    return exports.templates[name](this, {});
});


Handlebars.registerHelper('ifCond', function(val1, val2, options) {
  if(val1 == val2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// {{#each_with_index records}}
// 	<li class="legend_item{{index}}"><span></span>{{Name}}</li>
// {{/each_with_index}}

Handlebars.registerHelper("each_with_index", function(array, fn) {
	var buffer = "";
	for (var i = 0, j = array.length; i < j; i++) {
		var item = array[i];

		// stick an index property onto the item, starting with 1, may make configurable later
		item.index = i+1;

		// show the inside of the block
		buffer += fn(item);
	}

	// return the finished buffer
	return buffer;

});

//does the same as above with {{i}}
Handlebars.registerHelper('iter', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});


// HELPER: #key_value
//
// Usage: {{#key_value obj}} Key: {{key}} // Value: {{value}} {{/key_value}}
//
// Iterate over an object, setting 'key' and 'value' for each property in
// the object.
Handlebars.registerHelper("key_value", function(obj, options) {
    var buffer = "",
        key;
 
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            buffer += options.fn({key: key, value: obj[key]});
        }
    }
 
    return buffer;
});
 
// HELPER: #each_with_key
//
// Usage: {{#each_with_key container key="myKey"}}...{{/each_with_key}}
//
// Iterate over an object containing other objects. Each
// inner object will be used in turn, with an added key ("myKey")
// set to the value of the inner object's key in the container.
Handlebars.registerHelper("each_with_key", function(obj, options) {
    var context,
        buffer = "",
        key,
        keyName = options.fn.hash.key;
 
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            context = obj[key];
 
            if (keyName) {
                context[keyName] = key;
            }
 
            buffer += options.fn(context);
        }
    }
 
    return buffer;
});

/*
    Handlebars "join" block helper that supports arrays of objects or strings.
    (implementation found here: https://github.com/wycats/handlebars.js/issues/133)
    
    If "delimiter" is not speficified, then it defaults to ",".
    You can use "start", and "end" to do a "slice" of the array.

    Use with objects:
    {{#join people delimiter=" and "}}{{name}}, {{age}}{{/join}}
    
    Use with arrays:
    {{join jobs delimiter=", " start="1" end="2"}}
*/

Handlebars.registerHelper('join', function(items, block) {
    var delimiter = block.hash.delimiter || ",", 
        start = start = block.hash.start || 0, 
        len = items ? items.length : 0,
        end = block.hash.end || len,
        out = "";
    
        if(end > len) end = len;
    
    if ('function' === typeof block) {
        for (i = start; i < end; i++) {
            if (i > start) out += delimiter;
            if('string' === typeof items[i])
                out += items[i];
            else
                out += block(items[i]);
        }
        return out;
    } else { 
        return [].concat(items).slice(start, end).join(delimiter);
    }
});

// debug helper
// usage: {{debug}} or {{debug someValue}}
// from: @commondream (http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/)
Handlebars.registerHelper("debug2", function(optionalValue) {
  log("Current Context");
  log("====================");
  log(this);
 
  if (optionalValue > 1) {
    log("Value");
    log("====================");
    log(optionalValue);
  }
});
 
// a iterate over a specific portion of a list.
// usage: {{#slice items offset="1" limit="5"}}{{name}}{{/slice}} : items 1 thru 6
// usage: {{#slice items limit="10"}}{{name}}{{/slice}} : items 0 thru 9
// usage: {{#slice items offset="3"}}{{name}}{{/slice}} : items 3 thru context.length
// defaults are offset=0, limit=5
// todo: combine parameters into single string like python or ruby slice ("start:length" or "start,length")
Handlebars.registerHelper('slice', function(context, block) {
  var ret = "",
      offset = parseInt(block.hash.offset) || 0,
      limit = parseInt(block.hash.limit) || 5,
      i = (offset < context.length) ? offset : 0,
      j = ((limit + offset) < context.length) ? (limit + offset) : context.length;
 
  for(i,j; i<j; i++) {
    ret += block(context[i]);
  }
 
  return ret;
});
 
//  return a comma-serperated list from an iterable object
// usage: {{#toSentance tags}}{{name}}{{/toSentance}}
Handlebars.registerHelper('toSentance', function(context, block) {
  var ret = "";
  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + block(context[i]);
    if (i<j-1) {
      ret = ret + ", ";
    };
  }
  return ret;
});

Handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});
 
 
 
//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
Handlebars.registerHelper('dateFormat', function(context, block) {
  if (moment) {
    var f = block.hash.format || "MMM Mo, YYYY";
    return moment(Date(context)).format(f);
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});

 // usage: {{toLowerCase someString}}
 Handlebars.registerHelper('toLowerCase', function(value) {
   return (value && _.isString(value)) ? value.toLowerCase() : '';
 });
 
 // usage: {{pluralize collection.length 'quiz' 'quizzes'}}
 Handlebars.registerHelper('pluralize', function(number, single, plural) {
   return (number === 1) ? single : plural;
 });

// usage: {{fromNow date}}
Handlebars.registerHelper('fromNow', function(date) {
  moment = new Moment(date);
  return moment.fromNow();
});
