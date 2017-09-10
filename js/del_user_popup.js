function DeleteUserPopupPrepare()
{
	var ret = true;
	
	if(!$$("ulist").getSelectedItem())
	{
		//no selection, no popup
		ret = false;
	}
	
	return ret;
}

function DeleteUser()
{
	var to_delete =  $$("ulist").getSelectedId();
	if(to_delete > 0)
	{
		webix.ajax().del("rest/index.php?/users/" + to_delete, DeleteUserDone);
	}
}

function DeleteUserDone()
{
	var to_delete = $$("ulist").getSelectedId();
	var to_select = $$("ulist").getNextId(to_delete);
	
	if(to_delete > 0)
	{
		$$("ulist").remove(to_delete);
		
		if(to_select)
		{
			$$("ulist").select(to_select);
		}
	}
	$$("usr_del_popup").hide();
}

function DeleteUserCancel()
{
	$$("usr_del_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"usr_del_popup",
		hidden: true,
		body:
		{
			rows:
			[
				{ view:"label", label: "Confirmez la suppression:" },
				{
					cols:
					[
						{ view:"button", label:"Supprimer", click: "DeleteUser" },
						{ view:"button", label:"Annuler", click: "DeleteUserCancel" }
					]
				}
			]
		},
	});
	
	$$("usr_del_popup").attachEvent("onBeforeShow", DeleteUserPopupPrepare);
});
