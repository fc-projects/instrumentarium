function configureUsrCtxMenu()
{
	/*if($$("ulist").getItem(this.getContext().id).borrowed == "")
	{
		this.hideItem("2");
	}
	else
	{
		this.showItem("2");
	}*/
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
	
	/*if(id == "2") //"Return" entry in the context menu
	{
		if($$("olist").getItem(objId).borrower != "")
		{
			webix.ajax().put("rest/index.php?/objects/" + objId + "/return", null, borrowActionDone);
		}
	}*/
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
			{id: "1", value: "Historique d'emprunts"}
		],
		autowidth: true,
		master: $$("ulist")
	});

	$$("usr_item_menu").attachEvent("onBeforeShow", configureUsrCtxMenu);
	$$("usr_item_menu").attachEvent("onItemClick", handleUsrCtxMenuClick);
});
