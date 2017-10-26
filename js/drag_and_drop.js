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
		
		$$("loading_popup").show();
		webix.ajax().post("rest/index.php?/borrows", dataToPost, borrowActionDone);
	}
	
	return false; //prevent the original action which tries to copy the element inside the list
}

var borrowObjAndUsrDataLoaded = 0;

function borrowActionDone(text, data)
{
	borrowObjAndUsrDataLoaded = 0;
	$$("olist").load("rest/index.php?/objects/" + data.json().objid, borrowReloadingObjectDone);
	$$("ulist").load("rest/index.php?/users/" + data.json().usrid, borrowReloadingUserDone);
}

function borrowReloadingObjectDone()
{
	borrowObjAndUsrDataLoaded++;
	if(borrowObjAndUsrDataLoaded == 2)
	{
		borrowRealoadingDone();
	}
}

function borrowReloadingUserDone()
{
	borrowObjAndUsrDataLoaded++;
	if(borrowObjAndUsrDataLoaded == 2)
	{
		borrowRealoadingDone();
	}
}

function borrowRealoadingDone()
{
	$$("loading_popup").hide();
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
