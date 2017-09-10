
webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"loading_popup",
		width: 500,
		hidden: true,
		modal: true,
		body:
		{
			view: "template",
			template: "<dev>Chargement en cours...</dev><dev class='webix_icon fa-refresh fa-spin fa-3x'></dev>"
		}
	});
});