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
}

var lastObjSortBy = "name";
var lastObjSortDir = "asc";

function objSortList()
{
	var by = this.getValue();
	var dir = "asc";
	var as = "string";
	
	if(by == "price")
	{
		as = "int";
	}
	
	//on selection of the same type
	if(by == lastObjSortBy)
	{
		//swap direction
		if(lastObjSortDir == "asc")
		{
			dir = "desc";
		}
		else
		{
			dir = "asc";
		}
	}
	
	$$("olist").sort(by, dir, as);
	
	lastObjSortBy = by;
	lastObjSortDir = dir;
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
}

var lastUsrSortBy = "name";
var lastUsrSortDir = "asc";

function usrSortList()
{
	var by = this.getValue();
	var dir = "asc";
	var as = "string";
	
	if(by == "price")
	{
		as = "int";
	}
	
	//on selection of the same type
	if(by == lastUsrSortBy)
	{
		//swap direction
		if(lastUsrSortDir == "asc")
		{
			dir = "desc";
		}
		else
		{
			dir = "asc";
		}
	}
	
	$$("ulist").sort(by, dir, as);
	
	lastUsrSortBy = by;
	lastUsrSortDir = dir;
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
});
