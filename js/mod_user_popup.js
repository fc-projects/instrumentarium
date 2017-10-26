function ModifUserPopupPrepare()
{
	var ret = true;
	var item_to_modif = $$("ulist").getSelectedItem();
	
	if(item_to_modif)
	{
		//populate popup with data from the list item
		cam4.setImg(item_to_modif.pic);
		$$("usr_mod_form_name").setValue(item_to_modif.name);
		$$("usr_mod_form_type").setValue(item_to_modif.type);
		$$("usr_mod_form_phone").setValue(item_to_modif.phone);
		$$("usr_mod_form_email").setValue(item_to_modif.email);
	}
	else
	{
		//no selection, no popup
		ret = false;
	}
	
	return ret;
}

function ModifUser()
{
	var to_modif =  $$("ulist").getSelectedId();
	if(to_modif > 0)
	{
		var dataToPut =
		{
			pic: cam4.imgData,
			name: $$("usr_mod_form_name").getValue(),
			type: $$("usr_mod_form_type").getValue(),
			phone: $$("usr_mod_form_phone").getValue(),
			email: $$("usr_mod_form_email").getValue()
		};
		
		$$("loading_popup").show();
		webix.ajax().put("rest/index.php?/users/" + to_modif, dataToPut, ModifUserDone);
	}
}

function ModifUserDone(text, data)
{
	//update list and close popup
	$$("ulist").load("rest/index.php?/users/" + data.json().usrid, ModifUserReloadingDone);
}

function ModifUserReloadingDone()
{
	$$("ulist").refresh();
	$$("loading_popup").hide();
	$$("usr_mod_popup").hide();
}

function ModifUserCancel()
{
	$$("usr_mod_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"usr_mod_popup",
		width: 500,
		hidden: true,
		body:
		{
			view:"form", 
			id:"usr_mod_form",
			borderless: true,
			elements:
			[{
				rows:
				[
					{ view: "template", id: "usr_mod_form_pic", height: "150", borderless: true, src: "html/cam4.html" },
					{ view:"text", id: "usr_mod_form_name", label:"Nom", labelWidth: 150 },
					{
						view:"combo", id: "usr_mod_form_type", label:"Type", value: "1", labelWidth: 150,
						options: "rest/index.php?/users/types"
					},
					{ view:"text", id: "usr_mod_form_phone", label:"Tel", labelWidth: 150 },
					{ view:"text", id: "usr_mod_form_email", label:"E-mail", labelWidth: 150 },
					{
						cols:
						[
							{ view:"button", label:"Modifier", click: "ModifUser" },
							{ view:"button", label:"Annuler", click: "ModifUserCancel" }
						]
					}
				]
			}]
		}
	});
	
	cam4 = new Cam("#videoElement4", "#canvasItem4");
	
	$$("usr_mod_popup").attachEvent("onBeforeShow", ModifUserPopupPrepare);
	$$("usr_mod_popup").attachEvent("onShow", cam4.initCapture.bind(cam4));
	$$("usr_mod_popup").attachEvent("onHide", cam4.closeCapture.bind(cam4));
});
