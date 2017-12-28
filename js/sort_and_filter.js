function objFilterList()
{
	var token = this.getValue().toLowerCase();
	$$("olist").filter(
		function(obj)
		{
			return (obj.name.toLowerCase().includes(token) ||
					obj.buy_date.toLowerCase().includes(token) ||
					obj.price.toString().includes(token) ||
					obj.ref.toLowerCase().includes(token) ||
					obj.serial.toLowerCase().includes(token));
		})

		$$("obj_sort_input").callEvent("onChange");
}

function objSortList()
{
	var selection = this.getValue();
	var by = "name";
	var dir = "asc";
	var as = "string";

	if(selection == "name_asc")
	{
		by = "name";
		dir = "asc";
		as = "string";
	}
	else if(selection == "name_desc")
	{
		by = "name";
		dir = "desc";
		as = "string";
	}
	else if(selection == "price_asc")
	{
		by = "price";
		dir = "asc";
		as = "int";
	}
	else if(selection == "price_desc")
	{
		by = "price";
		dir = "desc";
		as = "int";
	}
	else if(selection == "buy_date_asc")
	{
		by = "buy_date";
		dir = "asc";
		as = "string";
	}
	else if(selection == "buy_date_desc")
	{
		by = "buy_date";
		dir = "desc";
		as = "string";
	}
	else
	{
		//default case
	}

	$$("olist").sort(by, dir, as);
}

function usrFilterList()
{
	var token = this.getValue().toLowerCase();
	$$("ulist").filter(
		function(obj)
		{
			return (obj.name.toLowerCase().includes(token) ||
					obj.phone.toLowerCase().includes(token) ||
					obj.email.toString().includes(token));
		})

		$$("usr_sort_input").callEvent("onChange");
}

function usrSortList()
{
	var selection = this.getValue();
	var by = "name";
	var dir = "asc";
	var as = "string";

	if(selection == "name_asc")
	{
		by = "name";
		dir = "asc";
		as = "string";
	}
	else if(selection == "name_desc")
	{
		by = "name";
		dir = "desc";
		as = "string";
	}
	else if(selection == "type_asc")
	{
		by = "type";
		dir = "asc";
		as = "string";
	}
	else if(selection == "type_desc")
	{
		by = "type";
		dir = "desc";
		as = "string";
	}
	else
	{
		//default case
	}

	$$("ulist").sort(by, dir, as);
}

function histFilterList()
{
	var startDate = $$("hist_start_date").getValue().getTime();
	var endDate = $$("hist_end_date").getValue().getTime() + 86399999;

	$$("hlist").filter(
		function(obj)
		{
			return (((new Date(obj.out_date)).getTime() >= startDate) &&
					((new Date(obj.out_date)).getTime() <= endDate));
		})
}

webix.ready(function()
{
	$$("obj_filter_input").attachEvent("onTimedKeyPress", objFilterList);
	$$("obj_sort_input").attachEvent("onChange", objSortList);

	$$("usr_filter_input").attachEvent("onTimedKeyPress", usrFilterList);
	$$("usr_sort_input").attachEvent("onChange", usrSortList);

	//automatic reapply filter after lists loading
	$$("olist").attachEvent("onAfterLoad", function() { $$("obj_filter_input").callEvent("onTimedKeyPress"); });
	$$("ulist").attachEvent("onAfterLoad", function() { $$("usr_filter_input").callEvent("onTimedKeyPress"); });
});
