function configureUsrCtxMenu()
{
	var iUsr = $$("ulist").getItem(this.getContext().id);

	if(iUsr.borrowed.length > 0)
	{
		//Fill the content of the menu with borrowed objects
		var borrowSubmenu = this.getSubMenu("2");
		if(borrowSubmenu)
		{
			borrowSubmenu.clearAll();
			
			var i;
			for(i=0; i<iUsr.borrowed.length; i++)
			{
				var iObj = $$("olist").getItem(iUsr.borrowed[i].objid);
				borrowSubmenu.add({id: iObj.id, value: iObj.name + " " + iObj.ref + " " + iObj.serial});
			}
			
			this.showItem("2");
		}
	}
	else
	{
		this.hideItem("2");
	}
}

function handleUsrCtxMenuClick(id, e, node)
{
	var usrId = this.getContext().id;
	
	if(id == "1") //"History" entry in the context menu
	{
		$$("usr_hist_start_date").setValue(new Date(Date.now() - 604800000)); //now - 1 week
		$$("usr_hist_end_date").setValue(new Date());
		$$("usr_hist_list").clearAll();
		$$("usr_hist_list").load("rest/index.php?/users/" + usrId + "/history", userHistoryDataLoaded);
		$$("usr_hist_popup").show();
	}
	
	
}

function handleUsrCtxSubmenuClick(id, e, node)
{
	if($$("olist").getItem(id).borrower != "")
	{
		$$("loading_popup").show();
		webix.ajax().put("rest/index.php?/objects/" + id + "/return", null, borrowActionDone);
	}
}

function userHistoryDataLoaded(text, data, http_request)
{
	usrHistFilterList();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"contextmenu",
		id:"usr_item_menu",
		data:
		[
			{id: "1", value: "Historique d'emprunts"},
			{id: "2", value: "Rendre", submenu: []}
		],
		autowidth: true,
		master: $$("ulist")
	});

	$$("usr_item_menu").attachEvent("onBeforeShow", configureUsrCtxMenu);
	$$("usr_item_menu").attachEvent("onItemClick", handleUsrCtxMenuClick);
	//$$("usr_item_menu").attachEvent("onMenuItemClick", handleUsrCtxMenuClick);
	$$("usr_item_menu").getSubMenu("2").attachEvent("onItemClick", handleUsrCtxSubmenuClick);
});
