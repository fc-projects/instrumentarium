function ModifObjectCategoryPopupPrepare()
{
	var ret = true;
	var item_to_modif = $$("oclist").getSelectedItem();
	
	if(item_to_modif)
	{
		//populate popup with data from the list item
		$$("obj_cat_mod_form_name").setValue(item_to_modif.value);
	}
	else
	{
		//no selection, no popup
		ret = false;
	}
	
	return ret;
}

function ModifObjectCategory()
{
	var to_modif =  $$("oclist").getSelectedId();
	if(to_modif > 0)
	{
		var dataToPut =
		{
			name: $$("obj_cat_mod_form_name").getValue(),
		};
		
		webix.ajax().put("rest/index.php?/objects/categories/" + to_modif, dataToPut, ModifObjectCategoryDone);
	}
}

function ModifObjectCategoryDone()
{
	//update list and close popup
	$$("obj_add_form_category").getList().load("rest/index.php?/objects/categories");
	$$("obj_mod_form_category").getList().load("rest/index.php?/objects/categories");
	$$("oclist").load("rest/index.php?/objects/categories");
	$$("oclist").refresh();
	$$("obj_cat_mod_popup").hide();
}

function ModifObjectCategoryCancel()
{
	$$("obj_cat_mod_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_cat_mod_popup",
		width: 500,
		hidden: true,
		body:
		{
			view:"form", 
			id:"obj_cat_mod_form",
			borderless: true,
			elements:
			[{
				rows:
				[
					{ view:"text", id: "obj_cat_mod_form_name", label:"Nom", labelWidth: 150 },
					{
						cols:
						[
							{ view:"button", label:"Modifier", click: "ModifObjectCategory" },
							{ view:"button", label:"Annuler", click: "ModifObjectCategoryCancel" }
						]
					}
				]
			}]
		}
	});
	
	$$("obj_cat_mod_popup").attachEvent("onBeforeShow", ModifObjectCategoryPopupPrepare);
});
