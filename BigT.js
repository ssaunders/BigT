(function(window, undefined) {
	var BigT = function() {
		/*** PRIVATE VARS ***/
		var q = 93325423084;

		/*** PRIVATE FUNCTIONS ***/

		/*** PUBLIC VARS ***/
		this.markers = {};

		/*** PUBLIC FUNCTIONS ***/

	};

	BigT.prototype.addMark = function(key, time, txt) {
		if(this.markers[key] === undefined) {
			this.markers[key] = [];
		}

		this.markers[key].push({
			time: time,
			message: txt
		});
	};

	BigT.prototype.outputMark = function(mark) {
		console.log(this.toPrettyTime(mark.time)," ",mark.message);
	};

	BigT.prototype.start = function(key, txt) {
		this.addMark(key, performance.now(), "Start - "+txt);
	};

	BigT.prototype.mark = function(key, txt) {
		this.addMark(key, performance.now(), ""+txt);
	};

	BigT.prototype.end = function(key, txt) {
		this.addMark(key, performance.now(), "Finish - "+txt);
	};


//TODO 
	BigT.prototype.timeFn = function(fnName, parent) {
		parent["_"+fnName] = parent[fnName];
		parent[fnName] = function() {
			T.start(fnName, performance.now());
			parent["_"+fnName]();
			T.end(fnName, performance.now());
		};

	};

	BigT.prototype.unTimeFn = function(fnName,parent) {
		parent[fnName] = parent["_"+fnName];
		delete parent["_"+fnName];
	};

	BigT.prototype.toPrettyTime = function(milis) {
		var hours = Math.floor( milis / (1000*60 *60) ),
			mins  = Math.floor( milis / (60*1000) % 60 ),
			secs  = Math.floor( milis % (60*1000) ) / 1000,
			prettyT = (hours > 0 ? hours+":" : "");

		mins = (mins < 10 ? "0"+mins : mins + "");
		prettyT = prettyT + mins + ":" + secs;

		return prettyT;
	};

	BigT.prototype.getLengthInMs = function(key) {
		var item = this.markers[key],
			start = item[0].time,
			end = item[item.length-1].time;
		return end - start;
	};

	BigT.prototype.calcLength = function(key) {
		return this.toPrettyTime(this.getLengthInMs(key));
	};

	BigT.prototype.display = function() {
		var css = 'color:green',
			mkrs = this.markers;

		console.group("Current timings");
		for (var keySet in mkrs) {
			if(mkrs.hasOwnProperty(keySet)) {
				var timeAry = mkrs[keySet];
				if(timeAry.length >= 2) {
					console.log( ("%c"+keySet),css," "," time elapsed: ",this.calcLength(keySet) );
					if(timeAry.length > 2) {
						console.groupCollapsed("Associated markers");
						timeAry.forEach(function(el, idx, ary) {
							el.prettyTime = T.toPrettyTime(el.time);
						});
						console.table(timeAry,["prettyTime","message"]);
						console.groupEnd();
					}
				} else if(timeAry.length === 1) {
					console.log( ("%c"+keySet),css," "," time marked: ",this.prettyTime(timeAry[0]) );
				} else {
					console.log( ("%c"+keySet),css," "," no time marked");
				}
			}
		}
		console.groupEnd();
	};

	window.BigT = window.T = new BigT();
})(window);
