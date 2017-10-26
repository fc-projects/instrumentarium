<?php
	
	dispatch('^/borrows/(\d*)', 'borrow_get');
	dispatch_put('^/borrows/(\d*)', 'borrow_put');
	
	function borrow_get()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	id,
							objid,
							usrid,
							out_date,
							return_date
					FROM	Borrow
					WHERE 	id = '" . params(0) . " ';	";
		
		$results = $db->query($query);
		
		if($results)
		{
			if($results->numColumns() > 0)
			{
				$brw = $results->fetchArray(SQLITE3_ASSOC);
				if(!$brw)
				{
					halt(NOT_FOUND, "provide an existing id");
				}
			}
			else
			{
				halt(SERVER_ERROR, "unconsistent result from the database");
			}
		}
		else
		{
			halt(SERVER_ERROR, "unable to query database");
		}
		
		return json_encode($brw);
	}
	
	function borrow_put()
	{
		//no parameter for this case
		$curDateTime = date(DateTime::ATOM);
		
		$db = new SQLite3('../db/biblio.db');
		$query = "UPDATE Borrow SET return_date = '" . $curDateTime . "'
								WHERE id = '" . params(0) . " ';	";
								
		$res = $db->query($query);
		if(!$res)
		{
			halt(SERVER_ERROR, "unable to update borrow in database");
		}
		else
		{
			$query2 = "	SELECT 	objid,
								usrid
						FROM Borrow
						WHERE id = '" . params(0) . " ';	";
			
			$results2 = $db->query($query2);
			$row2 = $results2->fetchArray(SQLITE3_ASSOC);
			
			return json_encode($row2);
		}
	}

?>
