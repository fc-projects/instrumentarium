function objectDroppedOnUser(context, evt)
{
	if((context.start != null) && (context.target != null))
	{
		//user (target) borrow object (start)
		var dataToPost =
		{
			objid: context.start,
			usrid: context.target
		};
		
		webix.ajax().post("rest/index.php?/borrows", dataToPost, borrowActionDone);
	}
	
	return false; //prevent the original action which tries to copy the element inside the list
}

function borrowActionDone()
{
	$$("olist").load("rest/index.php?/objects");
	$$("olist").refresh();
	$$("ulist").load("rest/index.php?/users");
	$$("ulist").refresh();
}

function objectStartDragging(context, evt)
{
	//check wether this object is already borrowed or not
	//check also if we have the right to borrow it
	if(	(context.from.getItem(context.start).borrower != "") ||
		(context.from.getItem(context.start).can_out == false)	)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	
	return ret;
}

webix.ready(function()
{
	$$("olist").attachEvent("onBeforeDrag", objectStartDragging);
	$$("ulist").attachEvent("onBeforeDrop", objectDroppedOnUser);
});
