#/bin/bash
if [ -d /media/cfmi/CFMI_BACKUP ]
then
	bzip2 -c /var/www/db/biblio.db > /media/cfmi/CFMI_BACKUP/backup_`date +%F_%Hh%Mm%Ss`.db.bz2
	sync
fi
