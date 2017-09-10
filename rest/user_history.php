<?php
	
	dispatch('^/users/(\d*)/history', 'user_history_get');
	
	function user_history_get()
	{
		$brwList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT		id, objid, out_date, return_date
					FROM		Borrow
					WHERE 		usrid = '" . params(0) . "';";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$brwList[] = $row;
		}
		
		return json_encode($brwList);
	}

?>
