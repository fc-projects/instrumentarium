<?php
	
	dispatch('/users/types', 'users_types_get');
	
	function users_types_get()
	{
		$usrList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	id,
							name as value
					FROM	UserType;	";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$usrList[] = $row;
		}
		
		return json_encode($usrList);
	}

?>