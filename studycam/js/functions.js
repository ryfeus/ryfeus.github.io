/*
 * jQuery The Final Countdown plugin v1.0.0 beta
 * http://github.com/hilios/jquery.countdown
 *
 * Copyright (c) 2011 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(h){h.fn.countdown=function(a,l){function m(a,d){return function(){return d.call(a)}}var k="seconds minutes hours days weeks daysLeft".split(" ");return this.each(function(){function j(){if(0===e.closest("html").length)clearInterval(f),d("removed");else{c--;0>c&&(c=0);g={seconds:c%60,minutes:Math.floor(c/60)%60,hours:Math.floor(c/60/60)%24,days:Math.floor(c/60/60/24),weeks:Math.floor(c/60/60/24/7),daysLeft:Math.floor(c/60/60/24)%7};for(var a=0;a<k.length;a++){var b=k[a];i[b]!=g[b]&&(i[b]=g[b],d(b))}0==c&&(clearInterval(f),d("finished"))}}function d(d){var b=h.Event(d);b.date=new Date((new Date).valueOf()+c);b.value=i[d]||"0";b.toDate=a;b.lasting=g;switch(d){case "seconds":case "minutes":case "hours":b.value=10>b.value?"0"+b.value.toString():b.value.toString();break;default:b.value&&(b.value=b.value.toString())}l.call(e,b)}if(!(a instanceof Date))if(String(a).match(/^[0-9]*$/))a=new Date(a);else if(a.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/)||a.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/))a=new Date(a);else if(a.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/)||a.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})/))a=new Date(a);else throw Error("Doesn't seen to be a valid date object or string");var e=h(this),i={},g={},f=e.data("countdownInterval"),c=Math.floor((a.valueOf()-(new Date).valueOf())/1E3);j();f&&clearInterval(f);e.data("countdownInterval",setInterval(m(e,j),1E3));f=e.data("countdownInterval")})}})(jQuery);


/*---------------------------
LeadPages Custom Functions
----------------------------*/
var leadpages_input_data = {
  'toDate': "2013/12/3 18:00:00 GMT-0400", //Countdown Timer End - (Format: YYYY/MM/DD HH:MM:SS GMT-0400). 24 hour time format. GMT time format required. See greenwichmeantime.com to convert for your timezone.
  'facebooklikeurl': "", //Facebook Like URL for Like Button (Leave blank to share current page)
  'googleurl': "", //Google Plus URL for Share Button (Leave blank to share current page)
  'twitterurl': "", //Twitter URL for Tweet Button (Leave blank to share current page)
  'twitterid': "your_twitter_id", //Twitter ID for Sharing
  'twittertext': "Excited for the upcoming webinar!", //Default Twitter Message
  'twitterlang': "en", //Twitter Language
  'facebookcomments': "http://leadpages.net", //Facebook Comments URL
  'facebookcommentsposts': "5" //# of Facebook Comments to Display
};
  

$(function() {
	$('ul#countdown').countdown(leadpages_input_data['toDate'], function(event) {
    var $this = $(this);
    switch(event.type) {
      case "seconds":
      case "minutes":
      case "hours":
      case "days":
      case "weeks":
      case "daysLeft":
        $this.find('span#'+event.type).html(event.value);
        break;
      case "finished":
        
        break;
    }
  });
	  $('.fb-like').attr('data-href',"" + leadpages_input_data['facebooklikeurl']);
	  $('.g-plusone').attr('data-href',"" + leadpages_input_data['googleurl']);
	  $('.twitter-share-button').attr('data-url',"" + leadpages_input_data['twitterurl']);
	  $('.twitter-share-button').attr('data-via',"" + leadpages_input_data['twitterid']);
	  $('.twitter-share-button').attr('data-text',"" + leadpages_input_data['twittertext']);
	  $('.twitter-share-button').attr('data-lang',"" + leadpages_input_data['twitterlang']);
	  $('.fb-comments').attr('data-href',"" + leadpages_input_data['facebookcomments']);
	  $('.fb-comments').attr('data-num-posts',"" + leadpages_input_data['facebookcommentsposts']);
});

/* Share bar load*/
jQuery(document).ready(function($) { $('.sharebar').sharebar({horizontal:'false',swidth:'71',minwidth:1000,position:'left',leftOffset:20,rightOffset:10}); });

/*
 *  ShareBar - Creates a dynamic, vertical sharing bar to the left of a WordPress post and hides it if browser window is too small
 *  Copyright 2010 Monjurul Dolon, http://mdolon.com/
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://devgrow.com/sharebar
 */
jQuery.fn.sharebar = function(options) {
	var defaults = {horizontal: true, swidth: 65, minwidth: 1000, position: 'left', leftOffset: 20, rightOffset: 10};
	var opts = jQuery.extend(defaults, options); var o = jQuery.meta ? jQuery.extend({}, opts, jQueryjQuery.data()) : opts;

	var w = jQuery(window).width();
	var sharebar = jQuery('#sharebar');
	var sharebarx = jQuery('#sharebarx');
	var parent = jQuery(sharebar).parent().width();
	var start = sharebar_init();

	function sharebar_init(){
		jQuery(sharebar).css('width',o.swidth+'px');
		if (o.position == 'left') jQuery(sharebar).css('marginLeft',(0-o.swidth-o.leftOffset));
		else {
			jQuery(sharebar).css('marginLeft',(parent+o.rightOffset));
		}
		if(w < o.minwidth && o.horizontal) jQuery(sharebarx).slideDown();
		else jQuery(sharebar).fadeIn();
		jQuery.event.add(window, "scroll", sharebar_scroll);
		jQuery.event.add(window, "resize", sharebar_resize);
		return jQuery(sharebar).offset().top;
	}
	function sharebar_resize() {
		var w = jQuery(window).width();
		if(w<o.minwidth){
			jQuery(sharebar).fadeOut();
			if(o.horizontal) jQuery(sharebarx).slideDown();
		}else{
			jQuery(sharebar).fadeIn();
			if(o.horizontal) jQuery(sharebarx).slideUp();
		}
	}
	function sharebar_scroll() {
		var p = jQuery(window).scrollTop();
		var w = jQuery(window).width();
		//jQuery(sharebar).css('position',((p+10)>start) ? 'fixed' : '');
		//jQuery(sharebar).css('top',((p+10)>start) ? '10px' : '');
	}

};

/*---------------------------
Facebook HTML5 Data
----------------------------*/
	 
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* Twitter */
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

/* Google plus */
 (function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
 })();


(function($) {

/*---------------------------
 Defaults for Reveal
----------------------------*/
	 
/*---------------------------
 Listener for data-reveal-id attributes
----------------------------*/

	$('a[data-reveal-id]').live('click', function(e) {
		e.preventDefault();
		var modalLocation = $(this).attr('data-reveal-id');
		$('#'+modalLocation).reveal($(this).data());
	});

/*---------------------------
 Extend and Execute
----------------------------*/

    $.fn.reveal = function(options) {
        
        
        var defaults = {  
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
    	}; 
    	
        //Extend dem' options
        var options = $.extend({}, defaults, options); 
	
        return this.each(function() {
        
/*---------------------------
 Global Variables
----------------------------*/
        	var modal = $(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = $('.reveal-modal-bg');

/*---------------------------
 Create Modal BG
----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
			}		    
     
/*---------------------------
 Open & Close Animations
----------------------------*/
			//Entrance Animations
			modal.bind('reveal:open', function () {
			  modalBG.unbind('click.modalEvent');
				$('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": $(document).scrollTop()+topMeasure + 'px',
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					}
					if(options.animation == "fade") {
						modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
						modalBG.css({"display":"block"});	
						unlockModal()				
					}
				}
				modal.unbind('reveal:open');
			}); 	

			//Closing Animation
			modal.bind('reveal:close', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  $(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
							unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('reveal:close');
			});     
   	
/*---------------------------
 Open and add Closing Listeners
----------------------------*/
        	//Open Modal Immediately
    	modal.trigger('reveal:open')
			
			//Close Modal Listeners
			var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
			  modal.trigger('reveal:close')
			});
			
			if(options.closeonbackgroundclick) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
				  modal.trigger('reveal:close')
				});
			}
			$('body').keyup(function(e) {
        		if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
			});
			
			
/*---------------------------
 Animations Locks
----------------------------*/
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	
			
        });//each call
    }//orbit plugin call
})(jQuery);


//AddThis

/* (c) 2008-2012 AddThis, Inc */
var addthis_conf={ver:300};if(!((window._atc||{}).ver)){var _atd="www.addthis.com/",_atr="//s7.addthis.com/",_atrc="//c.copyth.is/",_euc=encodeURIComponent,_duc=decodeURIComponent,_atc={dbg:0,rrev:119260,dr:0,ver:250,loc:0,enote:"",cwait:500,bamp:0.25,camp:1,csmp:0.0001,damp:0,famp:0.02,pamp:0.2,tamp:1,lamp:1,plmp:0.00001,vamp:1,vrmp:0,ohmp:0,ltj:1,xamp:1,abf:!!window.addthis_do_ab,qs:0,cdn:0,rsrcs:{bookmark:_atr+"static/r07/bookmark036.html",atimg:_atr+"static/r07/atimg036.html",countercss:_atr+"static/r07/counter011.css",counterIE67css:_atr+"static/r07/counterIE67004.css",counter:_atr+"static/r07/counter013.js",core:_atr+"static/r07/core063.js",wombat:_atr+"static/r07/bar020.js",wombatcss:_atr+"static/r07/bar008.css",qbarcss:_atr+"bannerQuirks.css",fltcss:_atr+"static/r07/floating010.css",barcss:_atr+"static/r07/banner005.css",barjs:_atr+"static/r07/banner003.js",contentcss:_atr+"static/r07/content007.css",contentjs:_atr+"static/r07/content009.js",copythis:_atrc+"static/r07/copythis00C.js",copythiscss:_atrc+"static/r07/copythis00C.css",ssojs:_atr+"static/r07/ssi004.js",ssocss:_atr+"static/r07/ssi004.css",authjs:_atr+"static/r07/auth011.js",peekaboocss:_atr+"static/r07/peekaboo002.css",overlayjs:_atr+"static/r07/overlay005.js",widget32css:_atr+"static/r07/widgetbig052.css",widget20css:_atr+"static/r07/widgetmed003.css",widgetcss:_atr+"static/r07/widget103.css",widgetIE67css:_atr+"static/r07/widgetIE67005.css",widgetpng:"//s7.addthis.com/static/r07/widget051.gif",embed:_atr+"static/r07/embed007.js",embedcss:_atr+"static/r07/embed002.css",link:_atr+"static/r07/link005.html",pinit:_atr+"static/r07/pinit011.html",linkedin:_atr+"static/r07/linkedin020.html",fbshare:_atr+"static/r07/fbshare004.html",tweet:_atr+"static/r07/tweet025.html",menujs:_atr+"static/r07/menu143.js",sh:_atr+"static/r07/sh112.html"}};}(function(){var h,q=window,E=document;var t=(window.location.protocol=="https:"),I,n,A,C=(navigator.userAgent||"unk").toLowerCase(),y=(/firefox/.test(C)),p=(/msie/.test(C)&&!(/opera/.test(C))),c={0:_atr,1:"//ct1.addthis.com/",2:"//ct2.addthis.com/",3:"//ct3.addthis.com/",4:"//ct4.addthis.com/",5:"//ct5.addthis.com/",10:"//ct6a.addthis.com/",11:"//ct6b.addthis.com/",100:"//ct0.addthis.com/"},H={au:"1",hk:"1",is:"1",id:"1",jp:"1",my:"1",ph:"1",sg:"1",kr:"1",ch:"1",tw:"1",th:"1",tr:"1",ru:"1",vn:"1"},J={de:"1",es:"1"},l={no:"1",pl:"1"},g={be:"1",ca:"1",fr:"1",mx:"1",nl:"1",no:"1",pl:"1",gb:"1",us:"1"},o={at:"1",cz:"1",dk:"1",fi:"1",gr:"1",hu:"1",it:"1",pt:"1",ro:"1",se:"1",ua:"1"};_atc.cdn=0;if(!window.addthis||window.addthis.nodeType!==h){try{I=window.navigator?(navigator.userLanguage||navigator.language):"";n=I.split("-").pop().toLowerCase();A=I.substring(0,2);if(n.length!=2){n="unk";}var G=Math.random();if(_atr.indexOf("-")>-1){}else{if(window.addthis_cdn!==h){_atc.cdn=window.addthis_cdn;}else{if(A=="en"&&G<0.01){_atc.cdn=10;}else{if(A=="en"&&G<0.02){_atc.cdn=11;}else{if(H[n]){_atc.cdn=5;}else{if(g[n]){_atc.cdn=(y||p)?5:1;}else{if(J[n]){_atc.cdn=(p||(/chrome/.test(C)))?5:1;}else{if(l[n]){_atc.cdn=y?5:1;}else{if(o[n]){_atc.cdn=(p)?5:1;}}}}}}}}}if(_atc.cdn){for(var B in _atc.rsrcs){if(_atc.rsrcs.hasOwnProperty(B)){_atc.rsrcs[B]=_atc.rsrcs[B].replace(_atr,typeof(window.addthis_cdn)==="string"?window.addthis_cdn:c[_atc.cdn]).replace(/live\/([a-z])07/,"live/$107");}}_atr=c[_atc.cdn];}}catch(D){}function b(k,e,d,a){return function(){if(!this.qs){this.qs=0;}_atc.qs++;if(!((this.qs++>0&&a)||_atc.qs>1000)&&window.addthis){window.addthis.plo.push({call:k,args:arguments,ns:e,ctx:d});}};}function z(e){var d=this,a=this.queue=[];this.name=e;this.call=function(){a.push(arguments);};this.call.queuer=this;this.flush=function(s,r){this.flushed=1;for(var k=0;k<a.length;k++){s.apply(r||d,a[k]);}return s;};}window.addthis={ost:0,cache:{},plo:[],links:[],ems:[],timer:{load:((new Date()).getTime())},_Queuer:z,_queueFor:b,data:{getShareCount:b("getShareCount","data")},bar:{show:b("show","bar"),initialize:b("initialize","bar")},login:{initialize:b("initialize","login"),connect:b("connect","login")},configure:function(e){if(!q.addthis_config){q.addthis_config={};}if(!q.addthis_share){q.addthis_share={};}for(var a in e){if(a=="share"&&typeof(e[a])=="object"){for(var d in e[a]){if(e[a].hasOwnProperty(d)){if(!addthis.ost){q.addthis_share[d]=e[a][d];}else{addthis.update("share",d,e[a][d]);}}}}else{if(e.hasOwnProperty(a)){if(!addthis.ost){q.addthis_config[a]=e[a];}else{addthis.update("config",a,e[a]);}}}}},box:b("box"),toaster:b("toaster"),button:b("button"),counter:b("counter"),count:b("count"),toolbox:b("toolbox"),update:b("update"),init:b("init"),ad:{menu:b("menu","ad","ad"),event:b("event","ad"),getPixels:b("getPixels","ad")},util:{getServiceName:b("getServiceName")},ready:b("ready"),addEventListener:b("addEventListener","ed","ed"),removeEventListener:b("removeEventListener","ed","ed"),user:{getID:b("getID","user"),getGeolocation:b("getGeolocation","user",null,true),getPreferredServices:b("getPreferredServices","user",null,true),getServiceShareHistory:b("getServiceShareHistory","user",null,true),ready:b("ready","user"),isReturning:b("isReturning","user"),isOptedOut:b("isOptedOut","user"),isUserOf:b("isUserOf","user"),hasInterest:b("hasInterest","user"),isLocatedIn:b("isLocatedIn","user"),interests:b("getInterests","user"),services:b("getServices","user"),location:b("getLocation","user")},session:{source:b("getSource","session"),isSocial:b("isSocial","session"),isSearch:b("isSearch","session")},_pmh:new z("pmh")};var v=document.getElementsByTagName("script")[0];function f(a){a.style.width=a.style.height="1px";a.style.position="absolute";a.style.zIndex=100000;}if(document.location.href.indexOf(_atr)==-1){var u=document.getElementById("_atssh");if(!u){u=document.createElement("div");u.style.visibility="hidden";u.id="_atssh";f(u);v.parentNode.appendChild(u);}function i(a){if(a&&!(a.data||{})["addthisxf"]){if(addthis._pmh.flushed){_ate.pmh(a);}else{addthis._pmh.call(a);}}}if(window.postMessage){if(window.attachEvent){window.attachEvent("onmessage",i);}else{if(window.addEventListener){window.addEventListener("message",i,false);}}}if(!u.firstChild){var j,C=navigator.userAgent.toLowerCase(),x=Math.floor(Math.random()*1000);j=document.createElement("iframe");j.id="_atssh"+x;j.title="AddThis utility frame";u.appendChild(j);f(j);j.frameborder=j.style.border=0;j.style.top=j.style.left=0;_atc._atf=j;}}var F=document.createElement("script");F.type="text/javascript";F.src=(t?"https:":"http:")+_atc.rsrcs.core;v.parentNode.appendChild(F);var m=10000;setTimeout(function(){if(!window.addthis.timer.core){if(Math.random()<_atc.ohmp){(new Image()).src="//m.addthisedge.com/live/t00/oh.gif?"+Math.floor(Math.random()*4294967295).toString(36)+"&cdn="+_atc.cdn+"&sr="+_atc.ohmp+"&rev="+_atc.rrev+"&to="+m;}if(_atc.cdn!==0){var d=document.createElement("script");d.type="text/javascript";d.src=(t?"https:":"http:")+_atr+"static/r07/core063.js";v.parentNode.appendChild(d);}}},m);}})();