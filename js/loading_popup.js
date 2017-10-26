
webix.ready(function()
{
	webix.ui(
	{
		view:"popup",
		id:"loading_popup",
		width: 200,
		height: 150,
		hidden: false,
		modal: true,
		position:"center",
		body:
		{
			view: "template",
			template: "<p class='loadingpopup1'>Veuillez patienter...</p><div class='loadingpopup2 webix_icon fa-refresh fa-spin'></div>"
		}
	});
});