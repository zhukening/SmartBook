function ode(){
  var $wnd_0 = window;
  var $doc_0 = document;
  sendStats('bootstrap', 'begin');
  function isHostedMode(){
    var query = $wnd_0.location.search;
    return query.indexOf('gwt.codesvr.ode=') != -1 || query.indexOf('gwt.codesvr=') != -1;
  }

  function sendStats(evtGroupString, typeString){
    if ($wnd_0.__gwtStatsEvent) {
      $wnd_0.__gwtStatsEvent({moduleName:'ode', sessionId:$wnd_0.__gwtStatsSessionId, subSystem:'startup', evtGroup:evtGroupString, millis:(new Date).getTime(), type:typeString});
    }
  }

  ode.__sendStats = sendStats;
  ode.__moduleName = 'ode';
  ode.__errFn = null;
  ode.__moduleBase = 'DUMMY';
  ode.__softPermutationId = 0;
  ode.__computePropValue = null;
  ode.__getPropMap = null;
  ode.__installRunAsyncCode = function(){
  }
  ;
  ode.__gwtStartLoadingFragment = function(){
    return null;
  }
  ;
  ode.__gwt_isKnownPropertyValue = function(){
    return false;
  }
  ;
  ode.__gwt_getMetaProperty = function(){
    return null;
  }
  ;
  var __propertyErrorFunction = null;
  var activeModules = $wnd_0.__gwt_activeModules = $wnd_0.__gwt_activeModules || {};
  activeModules['ode'] = {moduleName:'ode'};
  ode.__moduleStartupDone = function(permProps){
    var oldBindings = activeModules['ode'].bindings;
    activeModules['ode'].bindings = function(){
      var props = oldBindings?oldBindings():{};
      var embeddedProps = permProps[ode.__softPermutationId];
      for (var i = 0; i < embeddedProps.length; i++) {
        var pair = embeddedProps[i];
        props[pair[0]] = pair[1];
      }
      return props;
    }
    ;
  }
  ;
  var frameDoc;
  function getInstallLocationDoc(){
    setupInstallLocation();
    return frameDoc;
  }

  function setupInstallLocation(){
    if (frameDoc) {
      return;
    }
    var scriptFrame = $doc_0.createElement('iframe');
    scriptFrame.src = 'javascript:""';
    scriptFrame.id = 'ode';
    scriptFrame.style.cssText = 'position:absolute; width:0; height:0; border:none; left: -1000px;' + ' top: -1000px;';
    scriptFrame.tabIndex = -1;
    $doc_0.body.appendChild(scriptFrame);
    frameDoc = scriptFrame.contentDocument;
    if (!frameDoc) {
      frameDoc = scriptFrame.contentWindow.document;
    }
    frameDoc.open();
    var doctype = document.compatMode == 'CSS1Compat'?'<!doctype html>':'';
    frameDoc.write(doctype + '<html><head><\/head><body><\/body><\/html>');
    frameDoc.close();
  }

  function installScript(filename){
    function setupWaitForBodyLoad(callback){
      function isBodyLoaded(){
        if (typeof $doc_0.readyState == 'undefined') {
          return typeof $doc_0.body != 'undefined' && $doc_0.body != null;
        }
        return /loaded|complete/.test($doc_0.readyState);
      }

      var bodyDone = isBodyLoaded();
      if (bodyDone) {
        callback();
        return;
      }
      function onBodyDone(){
        if (!bodyDone) {
          bodyDone = true;
          callback();
          if ($doc_0.removeEventListener) {
            $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
          }
          if (onBodyDoneTimerId) {
            clearInterval(onBodyDoneTimerId);
          }
        }
      }

      if ($doc_0.addEventListener) {
        $doc_0.addEventListener('DOMContentLoaded', onBodyDone, false);
      }
      var onBodyDoneTimerId = setInterval(function(){
        if (isBodyLoaded()) {
          onBodyDone();
        }
      }
      , 50);
    }

    function installCode(code_0){
      var doc = getInstallLocationDoc();
      var docbody = doc.body;
      var script = doc.createElement('script');
      script.language = 'javascript';
      script.src = code_0;
      if (ode.__errFn) {
        script.onerror = function(){
          ode.__errFn('ode', new Error('Failed to load ' + code_0));
        }
        ;
      }
      docbody.appendChild(script);
      sendStats('moduleStartup', 'scriptTagAdded');
    }

    sendStats('moduleStartup', 'moduleRequested');
    setupWaitForBodyLoad(function(){
      installCode(filename);
    }
    );
  }

  ode.__startLoadingFragment = function(fragmentFile){
    return computeUrlForResource(fragmentFile);
  }
  ;
  ode.__installRunAsyncCode = function(code_0){
    var doc = getInstallLocationDoc();
    var docbody = doc.body;
    var script = doc.createElement('script');
    script.language = 'javascript';
    script.text = code_0;
    docbody.appendChild(script);
  }
  ;
  function processMetas(){
    var metaProps = {};
    var propertyErrorFunc;
    var onLoadErrorFunc;
    var metas = $doc_0.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_1 = meta.getAttribute('name'), content_0;
      if (name_1) {
        name_1 = name_1.replace('ode::', '');
        if (name_1.indexOf('::') >= 0) {
          continue;
        }
        if (name_1 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value_1, eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_1 = content_0.substring(0, eq);
              value_1 = content_0.substring(eq + 1);
            }
             else {
              name_1 = content_0;
              value_1 = '';
            }
            metaProps[name_1] = value_1;
          }
        }
         else if (name_1 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              propertyErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_1 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              onLoadErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
    __gwt_getMetaProperty = function(name_0){
      var value_0 = metaProps[name_0];
      return value_0 == null?null:value_0;
    }
    ;
    __propertyErrorFunction = propertyErrorFunc;
    ode.__errFn = onLoadErrorFunc;
  }

  function computeScriptBase(){
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    function ensureAbsoluteUrl(url_0){
      if (url_0.match(/^\w+:\/\//)) {
      }
       else {
        var img = $doc_0.createElement('img');
        img.src = url_0 + 'clear.cache.gif';
        url_0 = getDirectoryOfFile(img.src);
      }
      return url_0;
    }

    function tryMetaTag(){
      var metaVal = __gwt_getMetaProperty('baseUrl');
      if (metaVal != null) {
        return metaVal;
      }
      return '';
    }

    function tryNocacheJsTag(){
      var scriptTags = $doc_0.getElementsByTagName('script');
      for (var i = 0; i < scriptTags.length; ++i) {
        if (scriptTags[i].src.indexOf('ode.nocache.js') != -1) {
          return getDirectoryOfFile(scriptTags[i].src);
        }
      }
      return '';
    }

    function tryBaseTag(){
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        return baseElements[baseElements.length - 1].href;
      }
      return '';
    }

    function isLocationOk(){
      var loc = $doc_0.location;
      return loc.href == loc.protocol + '//' + loc.host + loc.pathname + loc.search + loc.hash;
    }

    var tempBase = tryMetaTag();
    if (tempBase == '') {
      tempBase = tryNocacheJsTag();
    }
    if (tempBase == '') {
      tempBase = tryBaseTag();
    }
    if (tempBase == '' && isLocationOk()) {
      tempBase = getDirectoryOfFile($doc_0.location.href);
    }
    tempBase = ensureAbsoluteUrl(tempBase);
    return tempBase;
  }

  function computeUrlForResource(resource){
    if (resource.match(/^\//)) {
      return resource;
    }
    if (resource.match(/^[a-zA-Z]+:\/\//)) {
      return resource;
    }
    return ode.__moduleBase + resource;
  }

  function getCompiledCodeFilename(){
    var answers = [];
    var softPermutationId = 0;
    function unflattenKeylistIntoAnswers(propValArray, value_0){
      var answer = answers;
      for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
        answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
      }
      answer[propValArray[n]] = value_0;
    }

    var values = [];
    var providers = [];
    function computePropValue(propName){
      var value_0 = providers[propName](), allowedValuesMap = values[propName];
      if (value_0 in allowedValuesMap) {
        return value_0;
      }
      var allowedValuesList = [];
      for (var k in allowedValuesMap) {
        allowedValuesList[allowedValuesMap[k]] = k;
      }
      if (__propertyErrorFunction) {
        __propertyErrorFunction(propName, allowedValuesList, value_0);
      }
      throw null;
    }

    providers['locale'] = function(){
      var locale = null;
      var rtlocale = 'en';
      try {
        if (!locale) {
          var queryParam = location.search;
          var qpStart = queryParam.indexOf('locale=');
          if (qpStart >= 0) {
            var value_0 = queryParam.substring(qpStart + 7);
            var end = queryParam.indexOf('&', qpStart);
            if (end < 0) {
              end = queryParam.length;
            }
            locale = queryParam.substring(qpStart + 7, end);
          }
        }
        if (!locale) {
          locale = __gwt_getMetaProperty('locale');
        }
        if (!locale) {
          locale = $wnd_0['__gwt_Locale'];
        }
        if (locale) {
          rtlocale = locale;
        }
        while (locale && !__gwt_isKnownPropertyValue('locale', locale)) {
          var lastIndex = locale.lastIndexOf('_');
          if (lastIndex < 0) {
            locale = null;
            break;
          }
          locale = locale.substring(0, lastIndex);
        }
      }
       catch (e) {
        alert('Unexpected exception in locale detection, using default: ' + e);
      }
      $wnd_0['__gwt_Locale'] = rtlocale;
      return locale || 'en';
    }
    ;
    values['locale'] = {'default':0, en:1, es_ES:2, fr_FR:3, it_IT:4, ko_KR:5, pt_BR:6, ru:7, sv:8, zh_CN:9, zh_TW:10};
    providers['user.agent'] = function(){
      var ua = navigator.userAgent.toLowerCase();
      var docMode = $doc_0.documentMode;
      if (function(){
        return ua.indexOf('webkit') != -1;
      }
      ())
        return 'safari';
      if (function(){
        return ua.indexOf('msie') != -1 && (docMode >= 10 && docMode < 11);
      }
      ())
        return 'ie10';
      if (function(){
        return ua.indexOf('msie') != -1 && (docMode >= 9 && docMode < 11);
      }
      ())
        return 'ie9';
      if (function(){
        return ua.indexOf('msie') != -1 && (docMode >= 8 && docMode < 11);
      }
      ())
        return 'ie8';
      if (function(){
        return ua.indexOf('gecko') != -1 || docMode >= 11;
      }
      ())
        return 'gecko1_8';
      return '';
    }
    ;
    values['user.agent'] = {gecko1_8:0, ie10:1, ie8:2, ie9:3, safari:4};
    __gwt_isKnownPropertyValue = function(propName, propValue){
      return propValue in values[propName];
    }
    ;
    ode.__getPropMap = function(){
      var result = {};
      for (var key in values) {
        if (values.hasOwnProperty(key)) {
          result[key] = computePropValue(key);
        }
      }
      return result;
    }
    ;
    ode.__computePropValue = computePropValue;
    $wnd_0.__gwt_activeModules['ode'].bindings = ode.__getPropMap;
    sendStats('bootstrap', 'selectingPermutation');
    if (isHostedMode()) {
      return computeUrlForResource('ode.devmode.js');
    }
    var strongName;
    try {
      unflattenKeylistIntoAnswers(['zh_CN', 'gecko1_8'], '0444F54A926B8EC448F1108AC178B0D2');
      unflattenKeylistIntoAnswers(['it_IT', 'safari'], '15B6DA6C4B69484FA05205C6201F169B');
      unflattenKeylistIntoAnswers(['sv', 'safari'], '28883C5BA54D161690329128243507DA');
      unflattenKeylistIntoAnswers(['zh_TW', 'gecko1_8'], '2F4337A2248CB227FA0F034A3BFBD269');
      unflattenKeylistIntoAnswers(['es_ES', 'gecko1_8'], '4178F3C8F20E02A991AECD81B9C05482');
      unflattenKeylistIntoAnswers(['fr_FR', 'gecko1_8'], '4439E218ADD13EF2737E751A9DF48E6D');
      unflattenKeylistIntoAnswers(['ru', 'gecko1_8'], '4A69360F1D53DC9887471D7391BB1D0E');
      unflattenKeylistIntoAnswers(['zh_TW', 'safari'], '5C1A32FB93E4F3954F2C49522AF5D9F4');
      unflattenKeylistIntoAnswers(['fr_FR', 'safari'], '774223B4C978CD8A5FECBE6AF0A9F6F4');
      unflattenKeylistIntoAnswers(['it_IT', 'gecko1_8'], '8364FB46D287DDE1B72F8835DDD30575');
      unflattenKeylistIntoAnswers(['ko_KR', 'gecko1_8'], '8C739A7469887A61D3A6AC33D84C94B8');
      unflattenKeylistIntoAnswers(['default', 'safari'], 'C3A0F51795953DEB1DDB27FE7A77B426');
      unflattenKeylistIntoAnswers(['zh_CN', 'safari'], 'C99F01FD39ED550E8F088E4C2A037A49');
      unflattenKeylistIntoAnswers(['pt_BR', 'safari'], 'D29D74B43356D507654B46BA2912C41E');
      unflattenKeylistIntoAnswers(['pt_BR', 'gecko1_8'], 'D81A0D4784590721BCCB655638AA09F1');
      unflattenKeylistIntoAnswers(['sv', 'gecko1_8'], 'DB347112058172D72D7C0898CBA3C591');
      unflattenKeylistIntoAnswers(['es_ES', 'safari'], 'DEA1FF7C8813612541D820DEB9A1CDAA');
      unflattenKeylistIntoAnswers(['default', 'gecko1_8'], 'E33F1E93DFC99E9C56844601AA8015DA');
      unflattenKeylistIntoAnswers(['en', 'gecko1_8'], 'E6E5E4CC211D85AFA904C96154AC019D');
      unflattenKeylistIntoAnswers(['ko_KR', 'safari'], 'F74702C4ACAE5DD4C01985AD5B6D086A');
      unflattenKeylistIntoAnswers(['ru', 'safari'], 'FA2222DF62FC67555E7F57E48C142F28');
      unflattenKeylistIntoAnswers(['en', 'safari'], 'FC04EC4E5602ABB5E33341893E908EEB');
      strongName = answers[computePropValue('locale')][computePropValue('user.agent')];
      var idx = strongName.indexOf(':');
      if (idx != -1) {
        softPermutationId = parseInt(strongName.substring(idx + 1), 10);
        strongName = strongName.substring(0, idx);
      }
    }
     catch (e) {
    }
    ode.__softPermutationId = softPermutationId;
    return computeUrlForResource(strongName + '.cache.js');
  }

  function loadExternalStylesheets(){
    if (!$wnd_0.__gwt_stylesLoaded) {
      $wnd_0.__gwt_stylesLoaded = {};
    }
    sendStats('loadExternalRefs', 'begin');
    sendStats('loadExternalRefs', 'end');
  }

  processMetas();
  ode.__moduleBase = computeScriptBase();
  activeModules['ode'].moduleBase = ode.__moduleBase;
  var filename_0 = getCompiledCodeFilename();
  if ($wnd_0) {
    var devModePermitted = !!($wnd_0.location.protocol == 'http:' || $wnd_0.location.protocol == 'file:');
    $wnd_0.__gwt_activeModules['ode'].canRedirect = devModePermitted;
    function supportsSessionStorage(){
      var key = '_gwt_dummy_';
      try {
        $wnd_0.sessionStorage.setItem(key, key);
        $wnd_0.sessionStorage.removeItem(key);
        return true;
      }
       catch (e) {
        return false;
      }
    }

    if (devModePermitted && supportsSessionStorage()) {
      var devModeKey = '__gwtDevModeHook:ode';
      var devModeUrl = $wnd_0.sessionStorage[devModeKey];
      if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(devModeUrl)) {
        if (devModeUrl && (window.console && console.log)) {
          console.log('Ignoring non-whitelisted Dev Mode URL: ' + devModeUrl);
        }
        devModeUrl = '';
      }
      if (devModeUrl && !$wnd_0[devModeKey]) {
        $wnd_0[devModeKey] = true;
        $wnd_0[devModeKey + ':moduleBase'] = computeScriptBase();
        var devModeScript = $doc_0.createElement('script');
        devModeScript.src = devModeUrl;
        var head = $doc_0.getElementsByTagName('head')[0];
        head.insertBefore(devModeScript, head.firstElementChild || head.children[0]);
        return false;
      }
    }
  }
  loadExternalStylesheets();
  sendStats('bootstrap', 'end');
  installScript(filename_0);
  return true;
}

ode.succeeded = ode();
