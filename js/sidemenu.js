function handleMainMenuClick(id, e, node)
{
	if(id == 1)
	{
		$$("adminlayout").show();
	}
	else if(id == 2)
	{
		$$("hist_start_date").setValue(new Date(Date.now() - 604800000)); //now - 1 week
		$$("hist_end_date").setValue(new Date());
		$$("hlist").load("rest/index.php?/borrows", histLoaded);
		$$("historylayout").show();
	}
	else if(id == 3)
	{
		$$("oclist").load("rest/index.php?/objects/categories", objCatLoaded);
		$$("configlayout").show();
	}
	else
	{
	
	}
	
	$$("mainmenu").hide();
}

function objCatLoaded(text, data, http_request)
{
	
}

function histLoaded(text, data, http_request)
{
	histFilterList();
}

webix.ready(function()
{
	webix.ui(
	{
		view: "sidemenu",
		id: "mainmenu",
		width: 230,
		position: "right",
		body:{
			view:"list",
			id: "mainmenulist",
			borderless:true,
			scroll: false,
			template: "<span class='webix_icon fa-#icon#'></span> #value#",
			data:[
				{id: 1, value: "Administration", icon: "user"},
				{id: 2, value: "Historique des emprunts", icon: "database"},
				{id: 3, value: "Configuration", icon: "cog"}
			]
		}
	});
	
	$$("mainmenulist").attachEvent("onItemClick", handleMainMenuClick);
});
