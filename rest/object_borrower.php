<?php
	
	dispatch('^/objects/(\d*)/borrower', 'object_borrower_get');
	dispatch_put('^/objects/(\d*)/return', 'object_return');
	
	function object_borrower_get()
	{
		$ret = [];
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT		usrid
					FROM		Borrow
					WHERE 		objid = '" . params(0) . " '
					AND			return_date IS NULL
					ORDER BY 	id DESC
					LIMIT		1;";
		
		$results = $db->query($query);
		
		if($results)
		{
			if($results->numColumns() > 0)
			{
				$brw = $results->fetchArray(SQLITE3_ASSOC);
				if($brw)
				{
					$ret = $brw;
				}
			}
		}
		else
		{
			halt(SERVER_ERROR, "unable to query database");
		}
		
		return json_encode($ret);
	}
	
	function object_return()
	{
		//no parameter for this case
		$curDateTime = date(DateTime::ATOM);
		
		$db = new SQLite3('../db/biblio.db');
		$query = "UPDATE Borrow SET		return_date = '" . $curDateTime . "'
								WHERE	Borrow.objid = '" . params(0) . " '
								AND		return_date IS NULL;";
								
		$res = $db->query($query);
		if(!$res)
		{
			halt(SERVER_ERROR, "unable to update borrow in database");
		}
		else
		{
			return "ok";
		}
	}

?>
