<?php
	
	dispatch('/objects/categories', 'objects_categories_get');
	dispatch_post('/objects/categories', 'objects_categories_post');
	
	function objects_categories_get()
	{
		$objList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	id,
							name as value
					FROM	ObjectCategory
					WHERE 	is_deleted = '0';	";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$objList[] = $row;
		}
		
		return json_encode($objList);
	}

	function objects_categories_post()
	{
		if(isset($_POST['name']))
		{
			$db = new SQLite3('../db/biblio.db');
			$query = "INSERT INTO ObjectCategory (name)
										VALUES(	'" . SQLite3::escapeString($_POST['name']) . "');";
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to insert object in database: " . $db->lastErrorMsg());
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