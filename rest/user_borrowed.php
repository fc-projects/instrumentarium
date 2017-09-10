<?php
	
	dispatch('^/users/(\d*)/borrowed', 'user_borrowed_get');
	
	function user_borrowed_get()
	{
		$brwList = [];
		
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	objid
					FROM	Borrow,
					WHERE	return_date IS NULL
					AND		usrid = '" . params(0) . "'; ";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$brwList[] = $row;
		}
		
		return json_encode($brwList);
	}

?>
