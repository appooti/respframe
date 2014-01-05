
  var dom={},macros,scannerRegExp;
  
  macros = {
    'nl':        '\n|\r\n|\r|\f',
    'w':         '[\s\r\n\f]*',
    'nonascii':  '[^\0-\177]',
    'num':       '-?([0-9]+|[0-9]*\.[0-9]+)',
    'unicode':   '\\[0-9A-Fa-f]{1,6}(\r\n|[\s\n\r\t\f])?',
    'escape':    '#{unicode}|\\[^\n\r\f0-9A-Fa-f]',
    'nmchar':    '[_A-Za-z0-9-]|#{nonascii}|#{escape}',
    'nmstart':   '[_A-Za-z]|#{nonascii}|#{escape}',
    'ident':     '[-@]?(#{nmstart})(#{nmchar})*',
    'name':      '(#{nmchar})+',
    'string1':   '"([^\n\r\f"]|#{nl}|#{nonascii}|#{escape})*"',
    'string2':   "'([^\n\r\f']|#{nl}|#{nonascii}|#{escape})*'",
    'string':    '#{string1}|#{string2}'
  };
  
  
  rules = {
    'name and id':    '(#{ident}##{ident})',
    'id':             '(##{ident})',
    'class':          '(\\.#{ident})',
    'name and class': '(#{ident}\\.#{ident})',
    'element':        '(#{ident})',
    'pseudo class':   '(:#{ident})'
  };
  
  
  function scanner(){
  	  function replacePattern(pattern, source){ 
	  	  var matched = true, match;
	  	  while(matched){
		  	  match = pattern.match(/#\{([^}]+)\}/);
		  	  if(match && match[1]){
			  	  pattern = pattern.replace(new RegExp('#\{'+match[1]+'\}','g'), source[match[1]]);
			  	  matched = true;
		  	  }else{
			  	  matched = false;
		  	  }
	  	  }
	  	 return pattern; 
  	  }
  	  
  	  function escapePattern(text) {
  	  //console.log(text+" replacing \/ with //")
      return text.replace(/\//g, '//');
    }
  	  
	  function convertPattern(){
		  var key, newpattern, pattern, source, result = {};
		  
		  if(arguments.length == 2){
			 source = arguments[0];
			 pattern = arguments[1];
		  } else{
			  source = arguments[0];
			  pattern = arguments[0];
		  }
		  
		  for( key in pattern){
			  newpattern = escapePattern(replacePattern(pattern[key], source));
			  result[key] = newpattern;
		  }
		  
		  return result;
	  }
	  
	  function joinPattern(patten){
		  var result = [], key;
		  for( key in patten ){
			  result.push(patten[key]);
		  }
		  
		  return new RegExp( result.join('|'),'g');
	  }
	  
	  return  joinPattern(convertPattern(convertPattern(macros), rules));
  
  }
  
  scannerCopy = scanner();

  function normalize(selector){
	return selector.replace(/^\s+|\s+$/g, '').replace(/[\t\r\n\f]+/g, ' ');	  
  }

  function Tokenizer(selector){
	  this.selector = normalize(selector);
	  this.tokens = [];
	  this.tokenizer();
  }
  
  function Token(identity, finder){
	  this.identity = identity;
	  this.finder = finder;
  }
  
  Tokenizer.prototype.tokenizer = function(){
	  var match, r, finder;
	  
	  r = scannerCopy;
	  r.lastIndex = 0;
	  
	  while(match = r.exec(this.selector)){
		  finder = null;
		  
		  if(match[10]){
		  	finder = 'id';
			  
		  }else if(match[1]){
		  	finder = 'name and id';
		  
		  }else if(match[29]){
		  	finder = 'name';
			  
		  }else if(match[15]){
		  	finder = 'class';
			  
		  }else if(match[20]){
		  	finder = 'name and class';
			  
		  }
		  
		this.tokens.push(new Token(match[0], finder));   
	  }
	  return this.tokens;
  };

function Searcher(root , tokens){
	this.root = root;
	this.key_selector = tokens.pop();
	this.tokens = tokens;
	this.result; 
}

Searcher.prototype.find = function(token){
	if(
}

Searcher.prototype.matchToken = function(element, token){
	if(!
}

Searcher.prototype.parse = function(){
	var i, element, elements = this.find(key_selector), result = [];
	
}
  
  
  
  
  
  
  
  