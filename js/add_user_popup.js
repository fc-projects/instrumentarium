function AddUserPopupPrepare()
{
	cam3.setImg(imgNoData);
}

function AddUser()
{
	var dataToPost =
	{
		pic: cam3.imgData,
		name: $$("usr_add_form_name").getValue(),
		type: $$("usr_add_form_type").getValue(),
		phone: $$("usr_add_form_phone").getValue(),
		email: $$("usr_add_form_email").getValue()
	};
	
	$$("loading_popup").show();
	webix.ajax().post("rest/index.php?/users", dataToPost, AddUserDone);
}

function AddUserDone(text, data)
{
	//update list and close popup
	$$("ulist").load("rest/index.php?/users/" + data.json().usrid, AddUserReloadingDone);
}

function AddUserReloadingDone()
{
	$$("ulist").refresh();
	$$("loading_popup").hide();
	$$("usr_add_popup").hide();
}

function AddUserCancel()
{
	$$("usr_add_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"usr_add_popup",
		width: 500,
		hidden: true,
		body:
		{
			view:"form", 
			id:"usr_add_form",
			borderless: true,
			elements:
			[{
				rows:
				[
					{ view: "template", id: "usr_add_form_pic", height: "150", borderless: true, src: "html/cam3.html" },
					{ view:"text", id: "usr_add_form_name", label:"Nom", labelWidth: 150 },
					{
						view:"combo", id: "usr_add_form_type", label:"Type", value: "1", labelWidth: 150,
						options: "rest/index.php?/users/types"
					},
					{ view:"text", id: "usr_add_form_phone", label:"Tel", labelWidth: 150 },
					{ view:"text", id: "usr_add_form_email", label:"E-mail", labelWidth: 150 },
					{
						cols:
						[
							{ view:"button", label:"Créer", click: "AddUser" },
							{ view:"button", label:"Annuler", click: "AddUserCancel" }
						]
					}
				]
			}]
		}
	});
	
	cam3 = new Cam("#videoElement3", "#canvasItem3");
	
	$$("usr_add_popup").attachEvent("onBeforeShow", AddUserPopupPrepare);
	$$("usr_add_popup").attachEvent("onShow", cam3.initCapture.bind(cam3));
	$$("usr_add_popup").attachEvent("onHide", cam3.closeCapture.bind(cam3));
});
