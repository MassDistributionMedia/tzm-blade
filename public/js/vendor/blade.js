/** Blade Public API and Middleware
	(c) Copyright 2012. Blake Miner. All rights reserved.	
	https://github.com/bminer/node-blade
	http://www.blakeminer.com/
	
	See the full license here:
		https://raw.github.com/bminer/node-blade/master/LICENSE.txt
*/
var fs = require("fs"),
	path = require("path"),
	url = require("url"),
	Compiler = require("./compiler"),
	bladeutil = require("./util");

try {
	exports.version = require("../package.json").version;
} catch(e) {}
exports.compile = compile;
exports.compileFile = compileFile;
exports.Compiler = Compiler;
exports.renderFile = exports.__express = renderFile;
exports.middleware = middleware;

//Cache of compiled template functions
var cache = {};

function compile(string, options, cb) {
	if(typeof options == "function")
		cb = options, options = {};
	
	if(options.filename)
		options.filename = path.resolve(options.filename);
	if(options.cache && !options.filename)
		cb(new Error("The `filename` option is required for caching"));
	else if(options.cache && cache[options.filename])
		cb(null, cache[options.filename]);
	else
	{
		var compiler = new Compiler(string, options);
		compiler.compile(function(err, tmpl) {
			if(err) return cb(err);
			if(options.cache)
				cache[options.filename] = tmpl;
			cb(null, tmpl);
		});
	}
}

function compileFile(filename, opts, cb) {
	if(typeof opts == "function")
		cb = opts, opts = {};
	//make shallow copy of opts and add `filename` property
	var options = {};
	for(var i in opts)
		options[i] = opts[i];
	options.filename = path.resolve(filename);
	//Check cache first
	if(options.cache && cache[options.filename])
		cb(null, cache[options.filename]);
	else if(options.synchronous)
	{
		try {
			var data = fs.readFileSync(filename);
		} catch(err) {return cb(err);}
		compile(data.toString(), options, cb);
	}
	else
		fs.readFile(filename, function(err, data) {
			if(err) return cb(err);
			compile(data.toString(), options, cb);
		});
}

function renderFile(filename, options, cb) {
	compileFile(filename, options, function(err, tmpl) {
		if(err) return cb(err);
		//Make a copy of the options to be passed to the view, excluding reserved variables
		var locals = {};
		var reserved = ["locals", "cb", options.templateNamespace || "__"];
		for(var i in options)
			if(reserved.indexOf(i) < 0)
				locals[i] = options[i];
		tmpl(locals, cb);
	});
}

/* Provides a nice Express middleware for compiling client-side templates
	and delivering them to the client. Weak caching is used by default.
*/
function middleware(sourcePath, options) {
	options = options || {};
	options.mount = options.mount || "/views/";
	if(typeof options.runtimeMount == "undefined")
		options.runtimeMount = "/blade/blade.js";
	if(typeof options.pluginsMount == "undefined")
		options.pluginsMount = "/blade/plugins/";
	if(options.compileOptions == null)
		options.compileOptions = {
			"cache": process.env.NODE_ENV == "production",
			"minify": process.env.NODE_ENV == "production",
			"includeSource": process.env.NODE_ENV == "development",
			"middleware": true
		};
	sourcePath = path.resolve(sourcePath);
	options.compileOptions.basedir = sourcePath;
	var fileCache = {}, pluginPath = path.resolve(__dirname + "/../plugins/");
	function staticAsset(req, path) {
		//support for node-static-asset
		if(typeof req.assetFingerprint == "function" && exports.version)
		{
			var expires = new Date();
			expires.setFullYear(expires.getFullYear() + 1);
			req.assetFingerprint(path, path + "?v=" + exports.version,
				{"etag": exports.version, "expires": expires});
		}
	}
	return function(req, res, next) {
		var pathname = url.parse(req.url).pathname;
		if(options.runtimeMount && pathname == options.runtimeMount)
		{
			if(fileCache["runtime"])
				res.type("application/javascript").send(fileCache["runtime"]);
			else
				fs.readFile(__dirname + "/../lib/runtime.js", function(err, data) {
					if(err) return next(err);
					data = bladeutil.uglify(data.toString(), true);
					fileCache["runtime"] = data;
					staticAsset(req, pathname);
					res.type("application/javascript").send(data);
				});
		}
		else if(options.pluginsMount &&
			pathname.substr(0, options.pluginsMount.length) == options.pluginsMount)
		{
			var filename = path.normalize(pathname.substr(options.pluginsMount.length) );
			var fullPath = path.join(pluginPath, filename);
			//fullPath may contain /../../../etc/passwd ... no good
			if(fullPath.indexOf(pluginPath) != 0)
				res.type("text/plain").send("403 Forbidden", 403); //malicious filename
			else if(fileCache[fullPath])
				res.type("application/javascript").send(fileCache[fullPath]);
			else
				fs.readFile(fullPath, function(err, data) {
					if(err) return next(err);
					data = bladeutil.uglify(data.toString(), true);
					fileCache[fullPath] = data;
					staticAsset(req, pathname);
					res.type("application/javascript").send(data);
				});
		}
		else if(pathname.substr(0, options.mount.length) == options.mount)
		{
			var filename = path.normalize(pathname.substr(options.mount.length) );
			var fullPath = path.join(sourcePath, filename);
			//fullPath may contain /../../../etc/passwd ... no good
			if(fullPath.indexOf(sourcePath) != 0)
				return res.type("text/plain").send("403 Forbidden", 403); //malicious filename
			compileFile(fullPath, options.compileOptions, function(err, tmpl) {
				if(err) return next(err);
				res.type("application/javascript");
				res.send("blade._cachedViews[" + JSON.stringify(filename) + "]=" + tmpl.toString() +
					";if(blade._cb[" + JSON.stringify(filename) + "])blade._cb[" +
					JSON.stringify(filename) + "](" + JSON.stringify(tmpl.reldir) + "," +
					JSON.stringify(tmpl.dependencies) + "," + tmpl.unknownDependencies + ");");
			});
		}
		else next();
	};
}
