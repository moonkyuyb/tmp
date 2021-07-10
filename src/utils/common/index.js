export const hangeulNumber = (param) => {
	//!16자리 이상 숫자 사용 시 정밀도 보장 할 수 없음(~javascriptNumber)
	const numbers = ['영','일','이','삼','사','오','육','칠','팔','구']
	const unit = ['', '만', '억', '조', '경', '해']
	const smallUnits = ['천','백','십','']

	function _makeHan(text) {
	var str = ''
	for(var i = 0; i < text.length; i++) {
	if(text[i] === '0') continue;

	if(text[i] === '1' && i !== 3) str += smallUnits[i] //'일'처리
		else str += numbers[text[i]] + smallUnits[i]
	}
		return str;
	}

	const num = parseInt((param + '').replace(/[^0-9]/g, ''), 10) + ''
	if(num == 'NaN') return ''
	if(num === '0') return '영'

	const unitCnt = Math.ceil(num.length / 4)
	const numStr = num.padStart(unitCnt * 4,'0')
	const arr = numStr.match(/[\w\W]{4}/g)

	const resultArr = []

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const str = (item !== '0000') ? _makeHan(item) + unit[(arr.length-1)-i] : '';
		resultArr.push(str)
	}

	return resultArr.join(' ')
}

export const numberWithCommas = function(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const checkParams = (obj, keyArr) => {
	const keyList = Object.assign([],keyArr)
	for (let i = 0; i < keyList.length; i++) {
		const item = keyList[i];
		if(!obj[''+item]){
			return false
		}
	}
	return true
}

export const encryptWithSHA256 = ( str ) => {  return CryptoJS.SHA256(str).toString() }
const CryptoJS=CryptoJS||function(t,n){var i={},r=i.lib={},e=r.Base=function(){function t(){}return{extend:function(n){t.prototype=this;var i=new t;return n&&i.mixIn(n),i.hasOwnProperty("init")||(i.init=function(){i.$super.init.apply(this,arguments)}),i.init.prototype=i,i.$super=this,i},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),s=r.WordArray=e.extend({init:function(t,i){t=this.words=t||[],i!=n?this.sigBytes=i:this.sigBytes=4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var n=this.words,i=t.words,r=this.sigBytes,e=t.sigBytes;if(this.clamp(),r%4)for(var s=0;e>s;s++){var o=i[s>>>2]>>>24-s%4*8&255;n[r+s>>>2]|=o<<24-(r+s)%4*8}else if(i.length>65535)for(var s=0;e>s;s+=4)n[r+s>>>2]=i[s>>>2];else n.push.apply(n,i);return this.sigBytes+=e,this},clamp:function(){var n=this.words,i=this.sigBytes;n[i>>>2]&=4294967295<<32-i%4*8,n.length=t.ceil(i/4)},clone:function(){var t=e.clone.call(this);return t.words=this.words.slice(0),t},random:function(n){for(var i=[],r=0;n>r;r+=4)i.push(4294967296*t.random()|0);return new s.init(i,n)}}),o=i.enc={},a=o.Hex={stringify:function(t){for(var n=t.words,i=t.sigBytes,r=[],e=0;i>e;e++){var s=n[e>>>2]>>>24-e%4*8&255;r.push((s>>>4).toString(16)),r.push((15&s).toString(16))}return r.join("")},parse:function(t){for(var n=t.length,i=[],r=0;n>r;r+=2)i[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new s.init(i,n/2)}},c=o.Latin1={stringify:function(t){for(var n=t.words,i=t.sigBytes,r=[],e=0;i>e;e++){var s=n[e>>>2]>>>24-e%4*8&255;r.push(String.fromCharCode(s))}return r.join("")},parse:function(t){for(var n=t.length,i=[],r=0;n>r;r++)i[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new s.init(i,n)}},u=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},f=r.BufferedBlockAlgorithm=e.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=u.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(n){var i=this._data,r=i.words,e=i.sigBytes,o=this.blockSize,a=4*o,c=e/a;c=n?t.ceil(c):t.max((0|c)-this._minBufferSize,0);var u=c*o,f=t.min(4*u,e);if(u){for(var h=0;u>h;h+=o)this._doProcessBlock(r,h);var p=r.splice(0,u);i.sigBytes-=f}return new s.init(p,f)},clone:function(){var t=e.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),h=(r.Hasher=f.extend({cfg:e.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var n=this._doFinalize();return n},blockSize:16,_createHelper:function(t){return function(n,i){return new t.init(i).finalize(n)}},_createHmacHelper:function(t){return function(n,i){return new h.HMAC.init(t,i).finalize(n)}}}),i.algo={});return i}(Math);
(function (Math) {
	// Shortcuts
	var C = CryptoJS;
	var C_lib = C.lib;
	var WordArray = C_lib.WordArray;
	var Hasher = C_lib.Hasher;
	var C_algo = C.algo;

	// Initialization and round constants tables
	var H = [];
	var K = [];

	// Compute constants
	(function () {
		function isPrime(n) {
			var sqrtN = Math.sqrt(n);
			for (var factor = 2; factor <= sqrtN; factor++) {
				if (!(n % factor)) {
					return false;
				}
			}

			return true;
		}

		function getFractionalBits(n) {
			return ((n - (n | 0)) * 0x100000000) | 0;
		}

		var n = 2;
		var nPrime = 0;
		while (nPrime < 64) {
			if (isPrime(n)) {
				if (nPrime < 8) {
					H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
				}
				K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

				nPrime++;
			}

			n++;
		}
	}());

	// Reusable object
	var W = [];

	/**
	* SHA-256 hash algorithm.
	*/
	var SHA256 = C_algo.SHA256 = Hasher.extend({
		_doReset: function () {
			this._hash = new WordArray.init(H.slice(0));
		},

		_doProcessBlock: function (M, offset) {
			// Shortcut
			var H = this._hash.words;

			// Working variables
			var a = H[0];
			var b = H[1];
			var c = H[2];
			var d = H[3];
			var e = H[4];
			var f = H[5];
			var g = H[6];
			var h = H[7];

			// Computation
			for (var i = 0; i < 64; i++) {
				if (i < 16) {
					W[i] = M[offset + i] | 0;
				} else {
					var gamma0x = W[i - 15];
					var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
					((gamma0x << 14) | (gamma0x >>> 18)) ^
					(gamma0x >>> 3);

					var gamma1x = W[i - 2];
					var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
					((gamma1x << 13) | (gamma1x >>> 19)) ^
					(gamma1x >>> 10);

					W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
				}

				var ch  = (e & f) ^ (~e & g);
				var maj = (a & b) ^ (a & c) ^ (b & c);

				var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
				var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

				var t1 = h + sigma1 + ch + K[i] + W[i];
				var t2 = sigma0 + maj;

				h = g;
				g = f;
				f = e;
				e = (d + t1) | 0;
				d = c;
				c = b;
				b = a;
				a = (t1 + t2) | 0;
			}

			// Intermediate hash value
			H[0] = (H[0] + a) | 0;
			H[1] = (H[1] + b) | 0;
			H[2] = (H[2] + c) | 0;
			H[3] = (H[3] + d) | 0;
			H[4] = (H[4] + e) | 0;
			H[5] = (H[5] + f) | 0;
			H[6] = (H[6] + g) | 0;
			H[7] = (H[7] + h) | 0;
		},

		_doFinalize: function () {
			// Shortcuts
			var data = this._data;
			var dataWords = data.words;

			var nBitsTotal = this._nDataBytes * 8;
			var nBitsLeft = data.sigBytes * 8;

			// Add padding
			dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
			dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
			data.sigBytes = dataWords.length * 4;

			// Hash final blocks
			this._process();

			// Return final computed hash
			return this._hash;
		},

		clone: function () {
			var clone = Hasher.clone.call(this);
			clone._hash = this._hash.clone();

			return clone;
		}
	});

	/**
	* Shortcut function to the hasher's object interface.
	*
	* @param {WordArray|string} message The message to hash.
	*
	* @return {WordArray} The hash.
	*
	* @static
	*
	* @example
	*
	*     var hash = CryptoJS.SHA256('message');
	*     var hash = CryptoJS.SHA256(wordArray);
	*/
	C.SHA256 = Hasher._createHelper(SHA256);

	/**
	* Shortcut function to the HMAC's object interface.
	*
	* @param {WordArray|string} message The message to hash.
	* @param {WordArray|string} key The secret key.
	*
	* @return {WordArray} The HMAC.
	*
	* @static
	*
	* @example
	*
	*     var hmac = CryptoJS.HmacSHA256(message, key);
	*/
	C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
}(Math));