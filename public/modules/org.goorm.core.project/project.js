/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the AGPL v3 License:
 * http://www.goorm.io/intro/License
 * project_name : goormIDE
 * version: 1.0.0
 **/

/*jshint newcap:false, debug:true, unused: true, evil: true, devel: true, plusplus: false, browser: true, jquery: true, undef:false */
/*clientside jslint comment for global */
/*global org: false, core: false, YAHOO: false */
/*jshint unused: false */



org.goorm.core.project = {
	treeview: null,

	make_treeview: function (target) {

		this.treeview = new YAHOO.widget.TreeView(target, this.get_directories_and_files("type", "url"));

		this.treeview.render();
		this.treeview.expandAll();
	},

	refresh_treeview: function () {
		this.treeview.refresh();

	},

	get_directories_and_files: function (type, url) {

		var postdata = {
			type: type,
			url: url,
			kind: "directoriesAndFiles"
		};

		var result = null;

		$.get("file/get_contents", postdata, function (data) {

			var sort_function = function (x, y) {
				return ((x.cls > y.cls) ? -1 : ((x.cls < y.cls) ? 1 : 0));
			};

			var quick_sort = function (data) {
				data.sort(sort_function);

				for (i = 0; i < data.length; i++) {
					if (data[i].children) {
						quick_sort(data[i].children);
					}
				}
			};

			result = eval(data);
			quick_sort(result);
		});

		return result;
	},

	display_error_message: function (result, type) {

		function display_message(message) {
			if (type == 'toast') {
				core.module.toast.show(message);
			} else if (type == 'alert') {
				alert.show(message);
			}
		}

		switch (result.code) {
		case 0:
			display_message(core.module.localization.msg.alert_cannot_project_run);
			break;
		case 1:
			display_message(core.module.localization.msg.alert_cannot_project_remote_run);
			break;
		case 2:
			display_message(core.module.localization.msg.alert_cannot_project_generate);
			break;
		case 3:
			display_message(core.module.localization.msg.alert_cannot_project_build);
			break;
		case 4:
			display_message(core.module.localization.msg.alert_select_project_item);
			break;
		case 5:
			display_message(core.module.localization.msg.alert_project_not_opened);
			break;
		case 6:
			display_message(core.module.localization.msg.alert_cannot_project_debug);
			break;
		case 7 :
			display_message(core.module.localization.msg.alert_plugin_not_while_running);
			break;
		default:
			break;
		}
	}
};
