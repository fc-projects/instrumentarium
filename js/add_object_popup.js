function AddObjectPopupPrepare()
{
	cam1.setImg(imgNoData);
}

function AddObject()
{
	var buyDateStr = $$("obj_add_form_date").getValue().toISOString();
	
	var dataToPost =
	{
		pic: cam1.imgData,
		name: $$("obj_add_form_name").getValue(),
		category: $$("obj_add_form_category").getValue(),
		buy_date: buyDateStr.substr(0, 10),
		price: $$("obj_add_form_price").getValue(),
		ref: $$("obj_add_form_ref").getValue(),
		serial: $$("obj_add_form_serial").getValue(),
		can_out: $$("obj_add_form_can_out").getValue()
	};
	
	$$("loading_popup").show();
	webix.ajax().post("rest/index.php?/objects", dataToPost, AddObjectDone);
}

function AddObjectDone(text, data)
{
	//update list and close popup
	$$("olist").load("rest/index.php?/objects/" + data.json().objid, AddObjectReloadingDone);
}

function AddObjectReloadingDone()
{
	$$("olist").refresh();
	$$("loading_popup").hide();
	$$("obj_add_popup").hide();
}

function AddObjectCancel()
{
	$$("obj_add_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_add_popup",
		width: 500,
		hidden: true,
		body:
		{
			view:"form", 
			id:"obj_add_form",
			borderless: true,
			elements:
			[{
				rows:
				[
					{ view: "template", id: "obj_add_form_pic", height: "150", borderless: true, src: "html/cam1.html" },
					{ view:"text", id: "obj_add_form_name", label:"Nom", labelWidth: 150 },
					{
						view:"combo", id: "obj_add_form_category", label:"Categorie", value: "1", labelWidth: 150,
						options: "rest/index.php?/objects/categories"
					},
					{ view:"datepicker", id: "obj_add_form_date", label: "Date d'achat", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 150 },
					{ view:"text", id: "obj_add_form_price", label:"Prix", labelWidth: 150 },
					{ view:"text", id: "obj_add_form_ref", label:"Référence", labelWidth: 150 },
					{ view:"text", id: "obj_add_form_serial", label:"N° de série", labelWidth: 150 },
					{ view:"checkbox", id: "obj_add_form_can_out", label:"Empruntable", labelWidth: 150, value: true },
					{
						cols:
						[
							{ view:"button", label:"Créer", click: "AddObject" },
							{ view:"button", label:"Annuler", click: "AddObjectCancel" }
						]
					}
				]
			}]
		}
	});
	
	cam1 = new Cam("#videoElement1", "#canvasItem1");
	
	$$("obj_add_popup").attachEvent("onBeforeShow", AddObjectPopupPrepare);
	$$("obj_add_popup").attachEvent("onShow", cam1.initCapture.bind(cam1));
	$$("obj_add_popup").attachEvent("onHide", cam1.closeCapture.bind(cam1));
});
