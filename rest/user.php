<?php
	
	dispatch('^/users/(\d*)', 'user_get');
	dispatch_put('^/users/(\d*)', 'user_put');
	dispatch_delete('^/users/(\d*)', 'user_delete');
	
	function user_get()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	User.id,
							User.name,
							User.pic,
							User.type,
							UserType.name AS typeStr,
							User.phone,
							User.email
					FROM	User,UserType
					WHERE	User.id = '" . params(0) . " '
					AND 	User.type = UserType.id;	";
		
		$results = $db->query($query);
		
		if($results)
		{
			if($results->numColumns() > 0)
			{
				$usr = $results->fetchArray(SQLITE3_ASSOC);
				if(!$usr)
				{
					halt(NOT_FOUND, "provide an existing id");
				}
				else
				{
					$usr["borrowed"] = [];
					$query2 = "	SELECT	objid
								FROM	Borrow
								WHERE	return_date IS NULL
								AND		usrid = '" . $usr["id"] . "'; ";
					
					$results2 = $db->query($query2);
					while ($brwo = $results2->fetchArray(SQLITE3_ASSOC))
					{
						$usr["borrowed"][] = $brwo;
					}
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
		
		return json_encode($usr);
	}
	
	function user_put()
	{
		//put params are not handled directly by PHP
		//we need to parse input
		parse_str(file_get_contents("php://input"), $put_vars);
		
		if(isset(	$put_vars['pic'],
					$put_vars['type'],
					$put_vars['name'],
					$put_vars['phone'],
					$put_vars['email'])	)
		{
			$db = new SQLite3('../db/biblio.db');
			$query = "UPDATE User SET pic = '" . SQLite3::escapeString($put_vars['pic']) . "',
										type = '" . SQLite3::escapeString($put_vars['type']) . "',
										name = '" . SQLite3::escapeString($put_vars['name']) . "',
										phone = '" . SQLite3::escapeString($put_vars['phone']) . "',
										email = '" . SQLite3::escapeString($put_vars['email']) . "'
									WHERE id = '" . params(0) . " ';	";
									
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to update user in database");
			}
			else
			{
				$retData['usrid'] = params(0);
				return json_encode($retData);
			}
		}
		else
		{
			halt(SERVER_ERROR, "not enough arguments");
		}
	}
	
	function user_delete()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "UPDATE User SET is_deleted = '1'
								WHERE id = '" . params(0) . " ';	";
								
		$res = $db->query($query);
		if(!$res)
		{
			halt(SERVER_ERROR, "unable to update user in database");
		}
		else
		{
			return "ok";
		}
	}

?>
