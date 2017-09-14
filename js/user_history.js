function usrHistFilterList()
{
	var startDate = $$("usr_hist_start_date").getValue().getTime();
	var endDate = $$("usr_hist_end_date").getValue().getTime() + 86399999;
	
	$$("usr_hist_list").filter(
		function(obj)
		{
			return (((new Date(obj.out_date)).getTime() >= startDate) &&
					((new Date(obj.out_date)).getTime() <= endDate));
		})
}

function templateUserHistory(obj)
{
	var ret;
	
	//retrieve object from the object list
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
	ret +=									"<img class='histlineimg' height='30' src='" + obj.pic + "'>";
	ret +=									"<div class='histtextname'>" + obj.name + "</div>";
	if(obj.ref != "") ret +=				"<div class='histtextelt'>" + obj.ref + "</div>";
	if(obj.serial != "") ret +=			"<div class='histtextelt'>" + obj.serial + "</div>";
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
		id:"usr_hist_popup",
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
				view:"toolbar", id:"usr_hist_bar", elements:[
					{ view:"datepicker", id: "usr_hist_start_date", label: "Date de début", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 120 },
					{width: 100 }, //spacer of 100px
					{ view:"datepicker", id: "usr_hist_end_date", label: "Date de fin", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 120 },
					{ }, //spacer that takes the rest of available space
					{ view:"icon", icon:"times-circle", css:"alter", click:"$$('usr_hist_popup').hide();"}]
			},
			{
				view:"list",
				id:"usr_hist_list",
				template: templateUserHistory,
				type:
				{
					height: "auto"
				},
				select:false
			}]
		}
	});

	$$("usr_hist_start_date").attachEvent("onChange", usrHistFilterList);
	$$("usr_hist_end_date").attachEvent("onChange", usrHistFilterList);
});
