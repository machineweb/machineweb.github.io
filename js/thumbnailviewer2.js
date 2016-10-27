/*Image Thumbnail Viewer II (May 19th, 2010)
 * This notice must stay intact for usage
 * Author: Dynamic Drive at http://www.dynamicdrive.com/
 * Visit http://www.dynamicdrive.com/ for full source code
 */

//Last updated: Sept 26th, 2010: http://www.dynamicdrive.com/forums/showthread.php?t=57892

jQuery.noConflict()

jQuery.thumbnailviewer2={
    loadmsg: '<img src="spinningred.gif" /><br />Loading Large Image...', //HTML for loading message. Make sure image paths are correct

    /////NO NEED TO EDIT BEYOND HERE////////////////

    dsetting: {trigger:'mouseover', preload:'yes', fx:'fade', fxduration:500, enabletitle:'yes'}, //default settings
    buildimage:function($, $anchor, setting){
        var imghtml='<img src="'+$anchor.attr('href')+'" style="border-width:0" />'
        if (setting.link)
            imghtml='<a href="'+setting.link+'">'+imghtml+'</a>'
        imghtml='<div>'+imghtml+((setting.enabletitle!='no' && $anchor.attr('title')!='')? '<br />'+$anchor.attr('title') : '')+'</div>'
        return $(imghtml)
    },

    showimage:function($image, setting){
        $image.stop()[setting.fxfunc](setting.fxduration, function(){
            if (this.style && this.style.removeAttribute)
                this.style.removeAttribute('filter') //fix IE clearType problem when animation is fade-in
        })
    }

}


jQuery.fn.addthumbnailviewer2=function(options){
    var $=jQuery

    return this.each(function(){ //return jQuery obj
        if (this.tagName!="A")
            return true //skip to next matched element

        var $anchor=$(this)
        var s=$.extend({}, $.thumbnailviewer2.dsetting, options) //merge user options with defaults
        s.fxfunc=(s.fx=="fade")? "fadeIn" : "show"
        s.fxduration=(s.fx=="none")? 0 : parseInt(s.fxduration)
        if (s.preload=="yes"){
            var hiddenimage=new Image()
            hiddenimage.src=this.href
        }
        var $loadarea=$('#'+s.targetdiv)
        var $hiddenimagediv=$('<div />').css({position:'absolute',visibility:'hidden',left:-10000,top:-10000}).appendTo(document.body) //hidden div to load enlarged image in
        var triggerevt=s.trigger+'.thumbevt' //"click" or "mouseover"
        $anchor.unbind(triggerevt).bind(triggerevt, function(){
            if ($loadarea.data('$curanchor')==$anchor) //if mouse moves over same element again
                return false
            $loadarea.data('$curanchor', $anchor)
            if ($loadarea.data('$queueimage')){ //if a large image is in the queue to be shown
                $loadarea.data('$queueimage').unbind('load') //stop it first before showing current image
            }
            $loadarea.html($.thumbnailviewer2.loadmsg)
            var $hiddenimage=$hiddenimagediv.find('img')
            if ($hiddenimage.length==0){ //if this is the first time moving over or clicking on the anchor link
                var $hiddenimage=$('<img src="'+this.href+'" />').appendTo($hiddenimagediv) //populate hidden div with enlarged image
                $hiddenimage.bind('loadevt', function(e){ //when enlarged image has fully loaded
                    var $targetimage=$.thumbnailviewer2.buildimage($, $anchor, s).hide() //create/reference actual enlarged image
                    $loadarea.empty().append($targetimage) //show enlarged image
                    $.thumbnailviewer2.showimage($targetimage, s)
                })
                $loadarea.data('$queueimage', $hiddenimage) //remember currently loading image as image being queued to load
            }

            if ($hiddenimage.get(0).complete)
                $hiddenimage.trigger('loadevt')
            else
                $hiddenimage.bind('load', function(){$hiddenimage.trigger('loadevt')})
            return false
        })
    })
}

jQuery(document).ready(function($){
    var $anchors=$('a[rel="enlargeimage"]') //look for links with rel="enlargeimage"
    $anchors.each(function(i){
        var options={}
        var rawopts=this.getAttribute('rev').split(',') //transform rev="x:value1,y:value2,etc" into a real object
        for (var i=0; i<rawopts.length; i++){
            var namevalpair=rawopts[i].split(/:(?!\/\/)/) //avoid spitting ":" inside "http://blabla"
            options[jQuery.trim(namevalpair[0])]=jQuery.trim(namevalpair[1])
        }
        $(this).addthumbnailviewer2(options)
    })
})