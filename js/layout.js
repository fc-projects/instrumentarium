function updateListsTemplates()
{
	$$("olist").define("template", templateObjectsList);
	$$("ulist").define("template", templateUsersList);
	
	//apply default sorting
	$$("olist").sort("name", "asc", "string");
	$$("ulist").sort("name", "asc", "string");
}

var allDataLoaded = 0;

function objectsListLoaded()
{
	allDataLoaded++;
	
	if(allDataLoaded == 2)
	{
		updateListsTemplates();
		allDataLoaded = 0;
	}
}

function usersListLoaded()
{
	allDataLoaded++;
	
	if(allDataLoaded == 2)
	{
		updateListsTemplates();
		allDataLoaded = 0;
	}
}

function templateObjectsList(obj)
{
	var ret;
	
	ret =  					"<div>";
	ret += 						"<div class='objlineimg'>";
	ret += 							"<img height='130' src='" + obj.pic + "'>";
	ret += 						"</div>";
	ret += 						"<div class='objlinetext'>";
	ret += 							"<div class='objtextname'>" + obj.name + "</div>";
	if(obj.ref != "") ret += 		"<div class='objtextelt'>Référence : " + obj.ref + "</div>";
	if(obj.serial != "") ret += 	"<div class='objtextelt'>N° de série : " + obj.serial + "</div>";
	if(obj.buy_date != "") ret += 	"<div class='objtextelt'>Acheté le : " + (new Date(obj.buy_date)).toLocaleDateString() + "</div>";
	if(obj.price != "") ret += 		"<div class='objtextelt'>Prix d'achat : " + obj.price + " €</div>";
	if(obj.can_out == false) ret +=	"<div class='objtexteltwarn'>Non empruntable</div>";
	ret += 						"</div>";
	ret += 					"</div>";
	
	if(obj.borrower != "")
	{
		var item = $$("ulist").getItem(obj.borrower);
		ret += 	"<table><tr><th class='objborrowheader' colspan='2'>Emprunté par :</th></tr><tr><td><img class='objborrowpic' height='30' src='" + item.pic + "'></td><td class='objborrowname'>" + item.name + "</td></tr></table>";
	}
	
	return ret;
}

function templateUsersList(obj)
{
	var ret;
	var borrowSection = "";
	
	for(i=0; i<obj.borrowed.length; i++)
	{
		var item = $$("olist").getItem(obj.borrowed[i].objid);
		borrowSection += "<tr><td><img class='usrborrowpic' height='30' src='" + item.pic + "'></td><td class='usrborrowname'>" + item.name + "</td><td class='usrborrowtxtelt'>" + item.ref + "</td><td class='usrborrowtxtelt'>" + item.serial + "</td></tr>";
	}
	
	ret = 				"<div>";
	ret += 					"<div class='usrlineimg'>";
	ret +=						"<img height='130' src='" + obj.pic + "'>";
	ret +=					"</div>";
	ret +=					"<div class='usrlinetext'>";
	ret +=						"<div class='usrtextname'>" + obj.name + "</div>";
	ret +=						"<div class='usrtextelt'>" + obj.typeStr + "</div>";
	if(obj.phone != "") ret +=	"<div class='usrtextelt'>Tel : " + obj.phone + "</div>";
	if(obj.email != "") ret +=	"<div class='usrtextelt'>E-mail : " + obj.email + "</div>";
	ret +=					"</div>";
	ret +=				"</div>";
	if(borrowSection != "") ret += "<table><tr><th class='usrborrowheader' colspan='3'>Emprunts en cours :</th></tr>" + borrowSection + "</table>";
	
	return ret;
}

function templateHistory(obj)
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
	ret +=								"<div class='histlinetext2'>";
	ret +=									"<div class='histlinetext2'>";
	ret +=										"<div>";
	ret +=											"<div class='histlinetext2'>";
	ret +=												"<div class='histtextdate2'>" + out_date_str + "</div>";
	ret +=											"</div>";
	ret +=											"<div class='webix_icon fa-share'></div>";
	ret +=										"</div>";
	ret +=										"<div>";
	ret +=											"<div class='histlinetext2'>";
	if(obj.return_date != null) ret +=					"<div class='histtextdate2'>" + return_date_str + "</div>";
	if(obj.return_date == null) ret +=					"<div class='histtextred2'>" + return_date_str + "</div>";
	ret +=											"</div>";
	if(obj.return_date != null)	ret+=				"<div class='webix_icon fa-share fa-rotate-180'></div>";
	ret +=										"</div>";
	ret +=									"</div>";
	ret +=									"<img class='histlineimg2' height='65' src='" + obj.objpic + "'>";
	ret +=									"<div class='histlinetext2'>";
	ret +=										"<div class='histtextname2'>" + obj.objname + "</div>";
	if(obj.objref != "") ret +=					"<div class='histtextelt2'>" + obj.objref + "</div>";
	if(obj.objserial != "") ret +=				"<div class='histtextelt2'>" + obj.objserial + "</div>";
	ret +=									"</div>";
	ret +=									"<div class='webix_icon fa-exchange'></div>";
	ret +=									"<img class='histlineimg2' height='65' src='" + obj.usrpic + "'>";
	ret +=									"<div class='histlinetext2'>";
	ret +=										"<div class='histtextname2'>" + obj.usrname + "</div>";
	ret +=									"</div>";
	
	ret +=								"</div>";
	ret +=							"</div>";
	
	return ret;
}

webix.ready(function()
{
	webix.ui(
	{
		view:"multiview",
		id:"views",
		cells: [
		{
			view:"layout",
			id:"adminlayout",
			type:"line",
			cols: [
			{
				rows: [
				{
					view:"toolbar", id:"obar", elements:[
						{ view:"label", label:"Objets", autowidth: true },
						{ width: 30 }, //spacer
						{ view:"button", type:"icon", icon:"plus", width: 30, popup: "obj_add_popup" },
						{ view:"button", type:"icon", icon:"edit", width: 30, popup: "obj_mod_popup" },
						{ view:"button", type:"icon", icon:"times", width: 30, popup: "obj_del_popup" },
						{ width: 30 }, //spacer
						{ view:"combo", id: "obj_sort_input", value: "name", width: 150,
							options: [
								{id:"name", value:"Trier par nom"},
								{id:"price", value:"Trier par prix"},
								{id:"buy_date", value:"Trier par date"}]
						},
						{ view:"text", id:"obj_filter_input", width: 180, placeholder: "Filtrer..." }]
				},
				{
					view:"list",
					id:"olist",
					template: "...",
					type:
					{
						height: 'auto'
					},
					select:true,
					url: "rest/index.php?/objects",
					drag: "source",
					multiselect: false,
					onContext:{}
				}]
			},
			{
				rows: [
				{
					view:"toolbar", id:"ubar", elements:[
						{ view:"label", label:"Utilisateurs", autowidth: true },
						{ width: 30 }, //spacer
						{ view:"button", type:"icon", icon:"plus", width: 30, popup: "usr_add_popup" },
						{ view:"button", type:"icon", icon:"edit", width: 30, popup: "usr_mod_popup" },
						{ view:"button", type:"icon", icon:"times", width: 30, popup: "usr_del_popup" },
						{ width: 30 }, //spacer
						{ view:"combo", id: "usr_sort_input", value: "name", width: 150,
							options: [
								{"id":"name", "value":"Trier par nom"},
								{"id":"type", "value":"Trier par type"}]
						},
						{ view:"text", id:"usr_filter_input", width: 180, placeholder: "Filtrer..." },
						{},
						{ view: "icon", icon: "bars", click: function(){ if( $$("mainmenu").config.hidden) $$("mainmenu").show(); else $$("mainmenu").hide();} }]
				},
				{
					view:"list",
					id:"ulist",
					template: "...",
					type:
					{
						height: 'auto'
					},
					select:true,
					url: "rest/index.php?/users",
					drag: "target",
					multiselect: false,
					onContext:{}
				}]
			}]
		},
		{
			view:"layout",
			id:"historylayout",
			type:"line",
			rows: [
			{
				view:"toolbar", id:"hbar", elements:[
					{ view:"label", label:"Historique", autowidth: true },
					{width: 100 }, //spacer of 100px
					{ view:"datepicker", id: "hist_start_date", label: "Date de début", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 120, width: 400 },
					{width: 100 }, //spacer of 100px
					{ view:"datepicker", id: "hist_end_date", label: "Date de fin", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 120, width: 400 },
					{},
					{ view: "icon", icon: "bars", click: function(){ if( $$("mainmenu").config.hidden) $$("mainmenu").show(); else $$("mainmenu").hide();} }]
			},
			{
				view:"list",
				id:"hlist",
				template: templateHistory,
				type:
				{
					height: 'auto'
				},
				select:false
			}]
		},
		{
			view:"layout",
			id:"configlayout",
			type:"line",
			rows: [
			{
				view:"toolbar", id:"ocbar", elements:[
					{ view:"label", label:"Catégories", autowidth: true },
					{ width: 30 }, //spacer
					{ view:"button", type:"icon", icon:"plus", width: 30, popup: "obj_cat_add_popup" },
					{ view:"button", type:"icon", icon:"edit", width: 30, popup: "obj_cat_mod_popup" },
					{ view:"button", type:"icon", icon:"times", width: 30, popup: "obj_cat_del_popup" },
					{},
					{ view: "icon", icon: "bars", click: function(){ if( $$("mainmenu").config.hidden) $$("mainmenu").show(); else $$("mainmenu").hide();} }]
			},
			{
				view:"list",
				id:"oclist",
				template: "#value#",
				type:
				{
					height: 'auto'
				},
				select:true,
				multiselect: false
			}]
		}]
	});
	
	$$("olist").attachEvent("onAfterLoad", objectsListLoaded);
	$$("ulist").attachEvent("onAfterLoad", usersListLoaded);
	
	$$("hist_start_date").attachEvent("onChange", histFilterList);
	$$("hist_end_date").attachEvent("onChange", histFilterList);
});
