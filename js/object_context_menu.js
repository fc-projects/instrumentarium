function configureObjCtxMenu()
{
	if($$("olist").getItem(this.getContext().id).borrower == "")
	{
		this.hideItem("2");
	}
	else
	{
		this.showItem("2");
	}
}

function handleObjCtxMenuClick(id, e, node)
{
	var objId = this.getContext().id;
	
	if(id == "1") //"History" entry in the context menu
	{
		$$("obj_hist_start_date").setValue(new Date(Date.now() - 604800000)); //now - 1 week
		$$("obj_hist_end_date").setValue(new Date());
		$$("obj_hist_list").clearAll();
		$$("obj_hist_list").load("rest/index.php?/objects/" + objId + "/history", objectHistoryDataLoaded);
		$$("obj_hist_popup").show();
	}
	
	if(id == "2") //"Return" entry in the context menu
	{
		if($$("olist").getItem(objId).borrower != "")
		{
			webix.ajax().put("rest/index.php?/objects/" + objId + "/return", null, borrowActionDone);
		}
	}
}

function objectHistoryDataLoaded(text, data, http_request)
{
	objHistFilterList();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"contextmenu",
		id:"obj_item_menu",
		data:
		[
			{id: "1", value: "Historique d'emprunts"},
			{id: "2", value: "Rendre"}
		],
		autowidth: true,
		master: $$("olist")
	});

	$$("obj_item_menu").attachEvent("onBeforeShow", configureObjCtxMenu);
	$$("obj_item_menu").attachEvent("onItemClick", handleObjCtxMenuClick);
});
