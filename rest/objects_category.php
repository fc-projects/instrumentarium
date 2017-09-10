<?php

	dispatch('^/objects/categories/(\d*)', 'object_category_get');
	dispatch_put('^/objects/categories/(\d*)', 'object_category_put');
	dispatch_delete('^/objects/categories/(\d*)', 'object_category_delete');
	
	function object_category_get()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	id,
							name,
							is_deleted
					FROM	ObjectCategory
					WHERE 	id = '" . params(0) . "';	";
		
		$results = $db->query($query);
		
		if($results)
		{
			if($results->numColumns() > 0)
			{
				$obj = $results->fetchArray(SQLITE3_ASSOC);
				if(!$obj)
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
		
		return json_encode($obj);
	}
	
	function object_category_put()
	{
		//put params are not handled directly by PHP
		//we need to parse input
		parse_str(file_get_contents("php://input"), $put_vars);
		
		if(isset($put_vars['name'])	)
		{
			$db = new SQLite3('../db/biblio.db');
			$query = "UPDATE ObjectCategory SET name = '" . SQLite3::escapeString($put_vars['name']) . "'
									WHERE id = '" . params(0) . " ';	";
									
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to update object in database");
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
	
	function object_category_delete()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "UPDATE ObjectCategory SET is_deleted = '1'
								WHERE id = '" . params(0) . " ';	";
								
		$res = $db->query($query);
		if(!$res)
		{
			halt(SERVER_ERROR, "unable to update object in database");
		}
		else
		{
			return "ok";
		}
	}
	
?>
