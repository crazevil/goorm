/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v3 License:
 * http://www.goorm.io/intro/License
 * project_name : goormIDE
 * version: 1.0.0
 **/

org.goorm.core.collaboration.workspace = function () {
	this.socket = null;
};

org.goorm.core.collaboration.workspace.prototype = {
	init: function() {
		var self = this;
		
		this.socket = io.connect();
		
		this.socket.on("workspace_message", function (data) {
 			data = JSON.parse(data);
 			 
 			if (data.workspace == core.status.current_project_name && data.user != core.user.id) {
	 			core.module.layout.project_explorer.refresh(false);
 			}
		});
		
		
		$(core).bind("project_explorer_refreshed", function () {
			self.socket.emit("message", '{"channel": "workspace", "action":"project_explorer_refresh", "user":"' + core.user.id + '", "nick":"'+core.user.nick+'", "workspace": "'+ core.status.current_project_name + '"}');
		});
		
	}
};