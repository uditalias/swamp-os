define(["AppDispatcher","definitions/MenuItemsStore","actions/client","env","constants/SWAMP_MODE","constants/ACTION_SOURCE","constants/SERVER_ACTION_TYPE","constants/CLIENT_ACTION_TYPE","constants/WINDOW_OPEN_TRIGGER","constants/PROMPTS","constants/INTERNAL_PLUGINS","stores/swampPluginsStore"],function(a,b,c,d,e,f,g,h,i,j,k,l){function m(a){var b=a.action;switch(b.actionType){case g.FIRST_DATA_RECEIVED:}}function n(a){var b=a.action;switch(b.actionType){case h.OPEN_SERVICE_WINDOW:break;case h.CLOSE_WINDOW:}}var o={swamp:{items:{preferences:{lineAfter:!0,items:{appearance:{callback:function(){}},swamp_preferences:{callback:function(){}}}},contribute:{callback:function(){}},about:{lineAfter:!0,callback:function(){var a=l.getByName(k.ABOUT);a&&c.openPluginWindow(a,i.TOP_MENU)}},logout:{callback:function(){}}}},services:{items:{start_all:{callback:function(){d.info.mode==e.REMOTE?c.applicationPrompt(j.REMOTE_ALL_SERVICES_START,function(){c.startAllServices()}):c.startAllServices()}},stop_all_running:{callback:function(){d.info.mode==e.REMOTE?c.applicationPrompt(j.REMOTE_ALL_SERVICES_STOP,function(){c.stopAllRunningServices()}):c.stopAllRunningServices()}},restart_all_running:{lineAfter:!0,callback:function(){d.info.mode==e.REMOTE?c.applicationPrompt(j.REMOTE_ALL_SERVICES_RESTART,function(){c.restartAllRunningServices()}):c.restartAllRunningServices()}},manager:{callback:function(){}},environments_editor:{callback:function(){var a=l.getByName(k.ENVIRONMENTS_EDITOR);a&&c.openPluginWindow(a,i.TOP_MENU)}}}},logs:{items:{viewer:{callback:function(){}},"create_logs_bundle...":{lineAfter:!0,callback:function(){}},clear_all_logs:{callback:function(){}}}},plugins:{items:{"browse...":{callback:function(){}},installed:{callback:function(){}}}},window:{items:{minimize_all:{callback:function(){c.minimizeAllWindows()}},close_all:{callback:function(){c.closeAllWindows()}},arrange_windows:{callback:function(){c.arrangeAllWindows()}}}},help:{items:{docs:{callback:function(){}},change_log:{callback:function(){}}}}},p=new b(o);return a.register(function(a){var b=!1;a.source==f.SERVER_ACTION?b=m(a):a.source==f.CLIENT_ACTION&&(b=n(a)),b&&p.emitChange()}),p});