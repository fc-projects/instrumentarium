function objHistFilterList()
{
	var startDate = $$("obj_hist_start_date").getValue().getTime();
	var endDate = $$("obj_hist_end_date").getValue().getTime() + 86399999;
	
	$$("obj_hist_list").filter(
		function(obj)
		{
			return (((new Date(obj.out_date)).getTime() >= startDate) &&
					((new Date(obj.out_date)).getTime() <= endDate));
		})
}

function templateObjectHistory(obj)
{
	var ret;
	
	//retrieve user from the user list
	var user = $$("ulist").getItem(obj.usrid);
	var out_date_str = (new Date(obj.out_date)).toLocaleString();
	
	var return_date_str = "Pas encore rendu";
	if(obj.return_date != null)
	{
		return_date_str = (new Date(obj.return_date)).toLocaleString();
	}
	
	//add an entry with user pic and name for the out event
	ret = 							"<div>";
	ret +=								"<div class='histlinetext'>";
	ret +=									"<div class='histtextdate'>" + out_date_str + "</div>";
	ret +=									"<div class='webix_icon fa-share'></div>";
	ret +=									"<img class='histlineimg' height='30' src='" + user.pic + "'>";
	ret +=									"<div class='histtextname'>" + user.name + "</div>";
	ret +=								"</div>";
	ret +=								"<div class='histlinetext'>";
	if(obj.return_date != null) ret +=		"<div class='histtextdate'>" + return_date_str + "</div>";
	if(obj.return_date == null) ret +=		"<div class='histtextred'>" + return_date_str + "</div>";
	if(obj.return_date != null)	ret+=		"<div class='webix_icon fa-share fa-rotate-180'></div>";
	ret +=								"</div>";
	ret +=							"</div>";
	
	return ret;
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_hist_popup",
		hidden: true,
		width: 1200,
		height: 600,
		position:"center",
		modal: true,
		body:
		{
			type:"line",
			rows: [
			{
				view:"toolbar", id:"obj_hist_bar", elements:[
					{ view:"datepicker", id: "obj_hist_start_date", label: "Date de début", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 120 },
					{width: 100 }, //spacer of 100px
					{ view:"datepicker", id: "obj_hist_end_date", label: "Date de fin", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 120 },
					{ }, //spacer that takes the rest of available space
					{ view:"icon", icon:"times-circle", css:"alter", click:"$$('obj_hist_popup').hide();"}]
			},
			{
				view:"list",
				id:"obj_hist_list",
				template: templateObjectHistory,
				type:
				{
					height: "auto"
				},
				select:false
			}]
		}
	});

	$$("obj_hist_start_date").attachEvent("onChange", objHistFilterList);
	$$("obj_hist_end_date").attachEvent("onChange", objHistFilterList);
});
