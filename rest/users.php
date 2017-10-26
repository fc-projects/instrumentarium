<?php
	
	dispatch('/users', 'users_get');
	dispatch_post('/users', 'users_post');
	
	function users_get()
	{
		$usrList = array();
		$db = new SQLite3('../db/biblio.db');
		$query = "	SELECT	User.id,
							User.name,
							User.pic,
							User.type,
							UserType.name AS typeStr,
							User.phone,
							User.email
					FROM	User,UserType
					WHERE	User.type = UserType.id
					AND 	is_deleted = '0';	";
					
		$results = $db->query($query);
		while ($row = $results->fetchArray(SQLITE3_ASSOC))
		{
			$row["borrowed"] = [];
			$query2 = "	SELECT	objid
						FROM	Borrow
						WHERE	return_date IS NULL
						AND		usrid = '" . $row["id"] . "'; ";
			
			$results2 = $db->query($query2);
			while ($row2 = $results2->fetchArray(SQLITE3_ASSOC))
			{
				$row["borrowed"][] = $row2;
			}
			
			$usrList[] = $row;
		}
		
		return json_encode($usrList);
	}
	
	function users_post()
	{
		if(isset(	$_POST['pic'],
					$_POST['type'],
					$_POST['name'],
					$_POST['phone'],
					$_POST['email'])	)
		{
			$db = new SQLite3('../db/biblio.db');
			$query = "INSERT INTO User (pic,type,name,phone,email)
										VALUES(	'" . SQLite3::escapeString($_POST['pic']) . "'," .
												"'" . SQLite3::escapeString($_POST['type']) . "'," .
												"'" . SQLite3::escapeString($_POST['name']) . "'," .
												"'" . SQLite3::escapeString($_POST['phone']) . "'," .
												"'" . SQLite3::escapeString($_POST['email']) . "');";
			$res = $db->query($query);
			if(!$res)
			{
				halt(SERVER_ERROR, "unable to insert user in database: " . $db->lastErrorMsg());
			}
			else
			{
				$query2 = "	SELECT	MAX(id)
							FROM	User";
				$results2 = $db->query($query2);
				$maxid = $results2->fetchArray(SQLITE3_NUM);
				
				$retData['usrid'] = $maxid[0];
				
				return json_encode($retData);
			}
		}
		else
		{
			halt(SERVER_ERROR, "not enough arguments");
		}
	}

?>