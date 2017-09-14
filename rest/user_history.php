<?php
	
	dispatch('^/users/(\d*)/history', 'user_history_get');
	
	function user_history_get()
	{
		$brwList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT		Borrow.id, Object.name, Object.pic, Object.ref, Object.serial, out_date, return_date
					FROM		Borrow, Object
					WHERE		Object.id = objid
					AND 		usrid = '" . params(0) . "';";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$brwList[] = $row;
		}
		
		return json_encode($brwList);
	}

?>
