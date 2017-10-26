function ModifObjectPopupPrepare()
{
	var ret = true;
	var item_to_modif = $$("olist").getSelectedItem();
	
	if(item_to_modif)
	{
		//populate popup with data from the list item
		cam2.setImg(item_to_modif.pic);
		$$("obj_mod_form_name").setValue(item_to_modif.name);
		$$("obj_mod_form_category").setValue(item_to_modif.category);
		$$("obj_mod_form_date").setValue(item_to_modif.buy_date);
		$$("obj_mod_form_price").setValue(item_to_modif.price);
		$$("obj_mod_form_ref").setValue(item_to_modif.ref);
		$$("obj_mod_form_serial").setValue(item_to_modif.serial);
		$$("obj_mod_form_can_out").setValue(item_to_modif.can_out);
	}
	else
	{
		//no selection, no popup
		ret = false;
	}
	
	return ret;
}

function ModifObject()
{
	var to_modif =  $$("olist").getSelectedId();
	if(to_modif > 0)
	{
		var buyDateStr = $$("obj_mod_form_date").getValue().toISOString();
		
		var dataToPut =
		{
			pic: cam2.imgData,
			name: $$("obj_mod_form_name").getValue(),
			category: $$("obj_mod_form_category").getValue(),
			buy_date: buyDateStr.substr(0, 10),
			price: $$("obj_mod_form_price").getValue(),
			ref: $$("obj_mod_form_ref").getValue(),
			serial: $$("obj_mod_form_serial").getValue(),
			can_out: $$("obj_mod_form_can_out").getValue()
		};
		
		$$("loading_popup").show();
		webix.ajax().put("rest/index.php?/objects/" + to_modif, dataToPut, ModifObjectDone);
	}
}

function ModifObjectDone(text, data)
{
	//update list and close popup
	$$("olist").load("rest/index.php?/objects/" + data.json().objid, ModifObjectReloadingDone);
}

function ModifObjectReloadingDone()
{
	$$("olist").refresh();
	$$("loading_popup").hide();
	$$("obj_mod_popup").hide();
}

function ModifObjectCancel()
{
	$$("obj_mod_popup").hide();
}

webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"obj_mod_popup",
		width: 500,
		hidden: true,
		body:
		{
			view:"form", 
			id:"obj_mod_form",
			borderless: true,
			elements:
			[{
				rows:
				[
					{ view: "template", id: "obj_mod_form_pic", height: "150", borderless: true, src: "html/cam2.html" },
					{ view:"text", id: "obj_mod_form_name", label:"Nom", labelWidth: 150 },
					{
						view:"combo", id: "obj_mod_form_category", label:"Categorie", value: "1", labelWidth: 150,
						options: "rest/index.php?/objects/categories"
					},
					{ view:"datepicker", id: "obj_mod_form_date", label: "Date d'achat", format: "%d/%m/%Y",
						value: new Date(), labelWidth: 150 },
					{ view:"text", id: "obj_mod_form_price", label:"Prix", labelWidth: 150 },
					{ view:"text", id: "obj_mod_form_ref", label:"Référence", labelWidth: 150 },
					{ view:"text", id: "obj_mod_form_serial", label:"N° de série", labelWidth: 150 },
					{ view:"checkbox", id: "obj_mod_form_can_out", label:"Empruntable", labelWidth: 150, value: true },
					{
						cols:
						[
							{ view:"button", label:"Modifier", click: "ModifObject" },
							{ view:"button", label:"Annuler", click: "ModifObjectCancel" }
						]
					}
				]
			}]
		}
	});
	
	cam2 = new Cam("#videoElement2", "#canvasItem2");
	
	$$("obj_mod_popup").attachEvent("onBeforeShow", ModifObjectPopupPrepare);
	$$("obj_mod_popup").attachEvent("onShow", cam2.initCapture.bind(cam2));
	$$("obj_mod_popup").attachEvent("onHide", cam2.closeCapture.bind(cam2));
});
