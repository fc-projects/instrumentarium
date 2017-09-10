function DeleteObjectPopupPrepare()
{
	var ret = true;
	
	if(!$$("olist").getSelectedItem())
	{
		//no selection, no popup
		ret = false;
	}
	
	return ret;
}

function DeleteObject()
{
	var to_delete =  $$("olist").getSelectedId();
	if(to_delete > 0)
	{
		webix.ajax().del("rest/index.php?/objects/" + to_delete, DeleteObjectDone);
	}
}

function DeleteObjectDone()
{
	var to_delete = $$("olist").getSelectedId();
	var to_select = $$("olist").getNextId(to_delete);
	
	if(to_delete > 0)
	{
		$$("olist").remove(to_delete);
		
		if(to_select)
		{
			$$("olist").select(to_select);
		}
	}
	$$("obj_del_popup").hide();
}

function DeleteObjectCancel()
{
	$$("obj_del_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_del_popup",
		hidden: true,
		body:
		{
			rows:
			[
				{ view:"label", label: "Confirmez la suppression:" },
				{
					cols:
					[
						{ view:"button", label:"Supprimer", click: "DeleteObject" },
						{ view:"button", label:"Annuler", click: "DeleteObjectCancel" }
					]
				}
			]
		},
	});
	
	$$("obj_del_popup").attachEvent("onBeforeShow", DeleteObjectPopupPrepare);
});
