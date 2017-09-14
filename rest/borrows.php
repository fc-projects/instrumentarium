<?php
	
	dispatch('/borrows', 'borrows_get');
	dispatch_post('/borrows', 'borrows_post');
	
	function borrows_get()
	{
		$brwList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	Borrow.id,
							Object.name as objname,
							Object.ref as objref,
							Object.serial as objserial,
							Object.pic as objpic,
							User.name as usrname,
							User.pic as usrpic,
							out_date,
							return_date
					FROM	Borrow, Object, User
					WHERE	Object.id = objid
					AND		User.id = usrid;	";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$brwList[] = $row;
		}
		
		return json_encode($brwList);
	}
	
	function borrows_post()
	{
		if(isset(	$_POST['objid'],
					$_POST['usrid'])	)
		{
			$curDateTime = date(DateTime::ATOM);
			$db = new SQLite3('../db/biblio.db');
			$query = "INSERT INTO Borrow (objid,usrid,out_date)
										VALUES(	'" . $_POST['objid'] . "'," .
												"'" . $_POST['usrid'] . "'," .
												"'" . $curDateTime . "');";
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to insert borrow in database: " . $db->lastErrorMsg());
			}
			else
			{
				return "ok";
			}
		}
		else
		{
			halt(SERVER_ERROR, "not enough arguments");
		}
	}

?>