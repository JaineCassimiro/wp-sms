(()=>{jQuery(document).ready((function(){e.init(),jQuery(".wpsms-sendSmsForm").each((function(){s.init(this)}))}));var e={init:function(){this.info=Array(),this.setFields(),this.setEventListener()},getGroupId:function(e){for(var s=[],t=e.find('input[name="group_id_checkbox"]'),n=e.find('select[name="group_id_select"]'),i=0;i<t.length;++i)t[i].checked&&s.push(t[i].value);if(n&&n.val()&&s.push(n.val()),s.length)return s},setFields:function(){this.wpSmsGdprCheckbox=jQuery(".js-wpSmsGdprConfirmation"),this.wpSmsEventType=jQuery(".js-wpSmsSubscribeType"),this.wpSmsSubmitTypeButton=jQuery(".js-wpSmsSubmitTypeButton"),this.mandatoryVerify=jQuery(".js-wpSmsMandatoryVerify").val()},sendSubscriptionForm:function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this,t=e.children().find(".js-wpSmsSubmitButton"),n=e.children().find(".js-wpSmsSubscribeMessage"),i=e.children().find(".js-wpSmsSubscribeOverlay"),r=e.children().find(".js-wpSmsSubscribeStepOne"),a=e.children().find(".js-wpSmsSubmitButton"),u=e.children().find(".js-wpSmsSubscribeStepTwo"),o=e.children().find(".js-wpSmsSubscriberCustomFields");t.prop("disabled",!0),n.hide(),i.css("display","flex");var d={name:e.children().find(".js-wpSmsSubscriberName input").val(),mobile:e.children().find(".js-wpSmsSubscriberMobile input").val(),group_id:this.getGroupId(e),type:e.children().find(".js-wpSmsSubscribeType:checked").val()};if(o.length){var p={};o.each((function(e,s){var t=jQuery(s).data("field-name"),n=jQuery(s).find("input").val();p[t]=n})),d.custom_fields=p}if(e.ajaxStart((function(){t.attr("disabled","disabled"),t.text(wpsms_ajax_object.loading_text)})),e.ajaxComplete((function(){t.prop("disabled",!0),t.text(wpsms_ajax_object.subscribe_text)})),"subscribe"===d.type)var c=wpsms_ajax_object.newsletter_endpoint_url;else c=wpsms_ajax_object.newsletter_endpoint_url+"/unsubscribe";var l=jQuery.ajax({type:"POST",url:c,contentType:"application/json",data:JSON.stringify(d)});l.fail((function(e){var s=JSON.parse(e.responseText),r=null;t.prop("disabled",!1),i.css("display","none"),void 0!==s.error&&null!==s.error?r=s.error.message:null!==s.data.status?Object.keys(s.data.params).forEach((function(e){r=s.data.params[e]})):r=wpsms_ajax_object.unknown_error,n.fadeIn(),n.html('<span class="wpsms-subscribe__message wpsms-subscribe__message--error">'+r+"</div>")})),l.done((function(e){var o=e.message;t.prop("disabled",!1),i.css("display","none"),n.fadeIn(),r.hide(),n.html('<span class="wpsms-subscribe__message wpsms-subscribe__message--success">'+o+"</div>"),"subscribe"===d.type&&"1"===s.mandatoryVerify&&(a.prop("disabled",!0),u.show())})),s.info=d},sendActivationCode:function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this,t=e.children().find(".js-wpSmsActivationButton"),n=e.parents(".js-wpSmsSubscribeFormContainer"),i=e.children().find(".js-wpSmsSubscribeMessage"),r=e.children().find(".js-wpSmsSubscribeOverlay"),a=e.children().find(".js-wpSmsSubscribeStepTwo");t.prop("disabled",!0),i.hide(),r.css("display","flex"),s.info.activation=e.children().find(".js-wpSmsActivationCode").val(),n.ajaxStart((function(){t.prop("disabled",!0),t.text(wpsms_ajax_object.loading_text)})),n.ajaxComplete((function(){t.prop("disabled",!1),t.text(wpsms_ajax_object.activation_text)}));var u=jQuery.ajax({type:"POST",url:wpsms_ajax_object.newsletter_endpoint_url+"/verify",contentType:"application/json",data:JSON.stringify(s.info)});u.fail((function(e){var s=JSON.parse(e.responseText),n=null;t.prop("disabled",!1),r.css("display","none"),n=void 0!==s.error&&null!==s.error?s.error.message:wpsms_ajax_object.unknown_error,i.fadeIn(),i.html('<span class="wpsms-subscribe__message wpsms-subscribe__message--error">'+n+"</div>")})),u.done((function(e){var s=e.message;t.prop("disabled",!1),r.css("display","none"),i.fadeIn(),a.hide(),i.html('<span class="wpsms-subscribe__message wpsms-subscribe__message--success">'+s+"</div>")}))},setEventListener:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this;this.wpSmsGdprCheckbox.on("change",(function(){this.checked?jQuery(this).parents(".js-wpSmsSubscribeFormField").nextAll(".js-wpSmsSubmitButton").first().prop("disabled",!1):jQuery(this).parents(".js-wpSmsSubscribeFormField").nextAll(".js-wpSmsSubmitButton").first().prop("disabled",!0)})),this.wpSmsEventType.on("click",(function(){jQuery(this).parents(".js-wpSmsSubscribeFormField").nextAll(".js-wpSmsSubmitButton").first().text(jQuery(this).data("label"))})),this.wpSmsSubmitTypeButton.on("click",(function(s){s.preventDefault(),jQuery(this).hasClass("js-wpSmsSubmitButton")&&e.sendSubscriptionForm(jQuery(this).parents(".js-wpSmsSubscribeForm")),jQuery(this).hasClass("js-wpSmsActivationButton")&&e.sendActivationCode(jQuery(this).parents(".js-wpSmsSubscribeForm"))}))}},s={init:function(e){e=jQuery(e),this.setSendSmsBlockFields(e)},setSendSmsBlockFields:function(e){SBSubscriberGroup=e.find("input[name=subscriberGroup]"),SBSubmit=e.find("input[type=submit]"),SBMessage=e.find("textarea.wpsms-sendSmsForm__messageField"),SBReceiver=e.find("input[name=receiver]"),SBPhoneNumber=e.find("input.wpsms-sendSmsForm__receiverField"),SBMessageAlert=e.find("p.wpsms-sendSmsForm__messageField__alert"),SBResult=e.find("div.wpsms-sendSmsForm__resultMessage"),SBOverlay=e.find("div.wpsms-sendSmsForm__overlay"),SBMaxCount=SBMessage.data("max");var s={SBSubscriberGroup,SBSubmit,SBMessage,SBReceiver,SBPhoneNumber,SBMessageAlert,SBResult,SBOverlay,SBMaxCount};this.setSendSmsBlockEventListeners(s)},setSendSmsBlockEventListeners:function(e){jQuery(e.SBSubmit).on("click",(function(s){s.preventDefault();var t=new FormData;t.append("sender",wpsms_ajax_object.sender),t.append("recipients",e.SBReceiver.val()),t.append("message",e.SBMessage.val()),t.append("group_ids",e.SBSubscriberGroup.val()),t.append("numbers",e.SBPhoneNumber.val()),t.append("maxCount",e.SBMaxCount),jQuery.ajax({url:wpsms_ajax_object.front_sms_endpoint_url,method:"POST",contentType:!1,cache:!1,processData:!1,data:t,beforeSend:function(){jQuery(e.SBResult).text("").fadeOut().removeClass("failed success"),jQuery(e.SBOverlay).fadeIn()},success:function(s,t,n){jQuery(e.SBResult).text(s.data).fadeIn().addClass("success"),jQuery(e.SBMessage).val("").trigger("input"),jQuery(e.SBOverlay).fadeOut()},error:function(s,t,n){var i;jQuery(e.SBResult).text(null!==(i=s.responseJSON.data)&&void 0!==i&&i.message?s.responseJSON.data.message:s.responseJSON.data).fadeIn().addClass("failed"),jQuery(e.SBOverlay).fadeOut()}})})),jQuery(e.SBMessage).on("input",(function(){var s=jQuery(this).val().length,t=e.SBMaxCount-s;s>=e.SBMaxCount-8?(jQuery(e.SBMessageAlert).fadeIn(),jQuery(e.SBMessageAlert).find("span").text(t)):jQuery(e.SBMessageAlert).fadeOut()}))}}})();