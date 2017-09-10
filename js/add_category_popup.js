function AddObjectCategory()
{
	var dataToPost =
	{
		name: $$("obj_cat_add_form_name").getValue()
	};
	
	webix.ajax().post("rest/index.php?/objects/categories", dataToPost, AddObjectCategoryDone);
}

function AddObjectCategoryDone()
{
	//update list and close popup
	$$("obj_add_form_category").getList().load("rest/index.php?/objects/categories");
	$$("obj_mod_form_category").getList().load("rest/index.php?/objects/categories");
	$$("oclist").load("rest/index.php?/objects/categories");
	$$("oclist").refresh();
	$$("obj_cat_add_popup").hide();
}

function AddObjectCategoryCancel()
{
	$$("obj_cat_add_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_cat_add_popup",
		width: 500,
		hidden: true,
		body:
		{
			view:"form",
			id:"obj_cat_add_form",
			borderless: true,
			elements:
			[{
				rows:
				[
					{ view:"text", id: "obj_cat_add_form_name", label:"Nom", labelWidth: 150 },
					{
						cols:
						[
							{ view:"button", label:"Créer", click: "AddObjectCategory" },
							{ view:"button", label:"Annuler", click: "AddObjectCategoryCancel" }
						]
					}
				]
			}]
		}
	});
});
