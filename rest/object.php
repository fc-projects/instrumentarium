<?php
	
	dispatch('^/objects/(\d*)', 'object_get');
	dispatch_put('^/objects/(\d*)', 'object_put');
	dispatch_delete('^/objects/(\d*)', 'object_delete');
	
	function object_get()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	id,
							name,
							pic,
							category,
							buy_date,
							price,
							ref,
							serial,
							can_out
					FROM	Object
					WHERE 	id = '" . params(0) . " ';	";
		
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
				else
				{
					$obj["borrower"] = "";
					$query2 = "	SELECT		usrid
								FROM		Borrow
								WHERE 		objid = '" . $obj["id"] . " '
								AND			return_date IS NULL
								ORDER BY 	id DESC
								LIMIT		1;";
					
					$results2 = $db->query($query2);
					$brwu = $results2->fetchArray(SQLITE3_ASSOC);
					if($brwu)
					{
						$obj["borrower"] = $brwu["usrid"];
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
		
		return json_encode($obj);
	}
	
	function object_put()
	{
		//put params are not handled directly by PHP
		//we need to parse input
		parse_str(file_get_contents("php://input"), $put_vars);
		
		if(isset(	$put_vars['pic'],
					$put_vars['category'],
					$put_vars['name'],
					$put_vars['buy_date'],
					$put_vars['price'],
					$put_vars['ref'],
					$put_vars['serial'],
					$put_vars['can_out'])	)
		{
			$db = new SQLite3('../db/biblio.db');
			$query = "UPDATE Object SET pic = '" . SQLite3::escapeString($put_vars['pic']) . "',
										category = '" . SQLite3::escapeString($put_vars['category']) . "',
										name = '" . SQLite3::escapeString($put_vars['name']) . "',
										buy_date = '" . SQLite3::escapeString($put_vars['buy_date']) . "',
										price = '" . SQLite3::escapeString($put_vars['price']) . "',
										ref = '" . SQLite3::escapeString($put_vars['ref']) . "',
										serial = '" . SQLite3::escapeString($put_vars['serial']) . "',
										can_out = '" . SQLite3::escapeString($put_vars['can_out']) . "'
									WHERE id = '" . params(0) . " ';	";
									
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to update object in database");
			}
			else
			{
				$retData['objid'] = params(0);
				return json_encode($retData);
			}
		}
		else
		{
			halt(SERVER_ERROR, "not enough arguments");
		}
	}
	
	function object_delete()
	{
		$db = new SQLite3('../db/biblio.db');
		$query = "UPDATE Object SET is_deleted = '1'
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
