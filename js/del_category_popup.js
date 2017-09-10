function DeleteObjectCategoryPopupPrepare()
{
	var ret = true;
	
	if(!$$("oclist").getSelectedItem())
	{
		//no selection, no popup
		ret = false;
	}
	
	return ret;
}

function DeleteObjectCategory()
{
	var to_delete =  $$("oclist").getSelectedId();
	if(to_delete > 0)
	{
		webix.ajax().del("rest/index.php?/objects/categories/" + to_delete, DeleteObjectCategoryDone);
	}
}

function DeleteObjectCategoryDone()
{
	var to_delete = $$("oclist").getSelectedId();
	var to_select = $$("oclist").getNextId(to_delete);
	
	if(to_delete > 0)
	{
		$$("oclist").remove(to_delete);
		
		if(to_select)
		{
			$$("oclist").select(to_select);
		}
	}
	
	$$("obj_add_form_category").getList().clearAll();
	$$("obj_mod_form_category").getList().clearAll();
	$$("obj_add_form_category").getList().load("rest/index.php?/objects/categories");
	$$("obj_mod_form_category").getList().load("rest/index.php?/objects/categories");
	$$("obj_cat_del_popup").hide();
}

function DeleteObjectCategoryCancel()
{
	$$("obj_cat_del_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_cat_del_popup",
		hidden: true,
		body:
		{
			rows:
			[
				{ view:"label", label: "Confirmez la suppression:" },
				{
					cols:
					[
						{ view:"button", label:"Supprimer", click: "DeleteObjectCategory" },
						{ view:"button", label:"Annuler", click: "DeleteObjectCategoryCancel" }
					]
				}
			]
		},
	});
	
	$$("obj_cat_del_popup").attachEvent("onBeforeShow", DeleteObjectCategoryPopupPrepare);
});
