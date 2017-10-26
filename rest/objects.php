<?php
	
	dispatch('/objects', 'objects_get');
	dispatch_post('/objects', 'objects_post');
	
	function objects_get()
	{
		$objList = array();
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
					WHERE 	is_deleted = '0';	";
		
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$row["borrower"] = "";
			$query2 = "	SELECT		usrid
						FROM		Borrow
						WHERE 		objid = '" . $row["id"] . " '
						AND			return_date IS NULL
						ORDER BY 	id DESC
						LIMIT		1;";
			
			$results2 = $db->query($query2);
			$row2 = $results2->fetchArray(SQLITE3_ASSOC);
			if($row2)
			{
				$row["borrower"] = $row2["usrid"];
			}
			
			$objList[] = $row;
		}
		
		return json_encode($objList);
	}
	
	function objects_post()
	{
		if(isset(	$_POST['pic'],
					$_POST['category'],
					$_POST['name'],
					$_POST['buy_date'],
					$_POST['price'],
					$_POST['ref'],
					$_POST['serial'],
					$_POST['can_out'])	)
		{
			$db = new SQLite3('../db/biblio.db');
			$query = "INSERT INTO Object (pic,category,name,buy_date,price,ref,serial,can_out)
										VALUES(	'" . SQLite3::escapeString($_POST['pic']) . "'," .
												"'" . SQLite3::escapeString($_POST['category']) . "'," .
												"'" . SQLite3::escapeString($_POST['name']) . "'," .
												"'" . SQLite3::escapeString($_POST['buy_date']) . "'," .
												"'" . SQLite3::escapeString($_POST['price']) . "'," .
												"'" . SQLite3::escapeString($_POST['ref']) . "'," .
												"'" . SQLite3::escapeString($_POST['serial']) . "'," .
												"'" . SQLite3::escapeString($_POST['can_out']) . "');";
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to insert object in database: " . $db->lastErrorMsg());
			}
			else
			{
				$query2 = "	SELECT	MAX(id)
							FROM	Object";
				$results2 = $db->query($query2);
				$maxid = $results2->fetchArray(SQLITE3_NUM);
				
				$retData['objid'] = $maxid[0];
				
				return json_encode($retData);
			}
		}
		else
		{
			halt(SERVER_ERROR, "not enough arguments");
		}
	}

?>