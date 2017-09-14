<?php
	
	dispatch('^/objects/(\d*)/history', 'object_history_get');
	
	function object_history_get()
	{
		$brwList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT		Borrow.id, User.name, User.pic, out_date, return_date
					FROM		Borrow, User
					WHERE		User.id = usrid
					AND 		objid = '" . params(0) . "';";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$brwList[] = $row;
		}
		
		return json_encode($brwList);
	}

?>
